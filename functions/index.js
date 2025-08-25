/**
 * Serverless endpoints:
 *  - /api/poi-search  : 地点搜索（OSM Nominatim）
 *  - /api/route       : 路径规划（OSRM）
 *  - /api/export-csv  : 将 JSON 行列转 CSV
 *  - /api/send-bulk   : 群发邮件（SMTP）
 */
/* eslint-env node */
const functions = require('firebase-functions')
const fetch = require('node-fetch')         // npm i node-fetch@2 -w functions
const nodemailer = require('nodemailer')    // npm i nodemailer -w functions

exports.api = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).send('')

  try {
    if (req.path === '/poi-search') return poiSearch(req, res)
    if (req.path === '/route') return route(req, res)
    if (req.path === '/export-csv') return exportCsv(req, res)
    if (req.path === '/send-bulk') return sendBulk(req, res)
    return res.status(404).json({ error: 'Not found' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.message })
  }
})

async function poiSearch(req, res) {
  const q = req.query.q || ''
  const near = req.query.near || ''
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${encodeURIComponent(q + ' ' + near)}`
  const resp = await fetch(url, { headers: { 'User-Agent': 'demo-app/1.0' } })
  res.json({ results: await resp.json() })
}

async function route(req, res) {
  const { start, end } = req.query // "lon,lat"
  const url = `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
  const resp = await fetch(url)
  const json = await resp.json()
  res.json((json.routes && json.routes[0]) || {})
}

async function exportCsv(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  const { rows, columns } = req.body || {}
  const headers = (columns || []).map(c => c.label || c.key)
  const keys = (columns || []).map(c => c.key)
  const esc = (v) => v == null ? '' : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g,'""')}"` : String(v)
  const lines = [headers.join(',')]
  for (const r of (rows || [])) lines.push(keys.map(k => esc(r[k])).join(','))
  res.set('Content-Type', 'text/csv; charset=utf-8')
  res.send(lines.join('\n'))
}

async function sendBulk(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  const { recipients, subject, html } = req.body || {}
  const { host, port, user, pass } = functions.config().smtp || {}
  if (!host) return res.status(500).json({ error: 'SMTP not configured' })
  const transporter = nodemailer.createTransport({ host, port: port ? Number(port) : 465, secure: true, auth: { user, pass } })
  const info = await transporter.sendMail({ from: user, to: (recipients||[]).join(','), subject, html })
  res.json({ messageId: info.messageId })
}
