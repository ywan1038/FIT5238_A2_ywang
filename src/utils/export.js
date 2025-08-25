// src/utils/export.js
export function toCSV(rows, columns) {
  const headers = columns.map(c => c.label ?? c.key)
  const keys = columns.map(c => c.key)
  const esc = v =>
    v == null ? '' : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v)
  const lines = [headers.join(',')]
  for (const r of rows) lines.push(keys.map(k => esc(r[k])).join(','))
  return lines.join('\n')
}

export function downloadCSV(csvString, filename = 'export.csv') {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
