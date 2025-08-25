<template>
  <div class="container py-4">
    <h2 class="mb-3">Map & Geo Features</h2>
    <p class="text-muted">Features: POI search + driving route</p>

    <form class="row g-2 align-items-end mb-3" @submit.prevent="handleSearch" aria-label="Search Points of Interest">
      <div class="col-sm-5">
        <label class="form-label" for="q">Keyword</label>
        <input id="q" v-model="query" class="form-control" placeholder="e.g., cafe, library" required />
      </div>
      <div class="col-sm-4">
        <label class="form-label" for="near">Near</label>
        <input id="near" v-model="near" class="form-control" placeholder="e.g., Toronto" />
      </div>
      <div class="col-sm-3">
        <button class="btn btn-primary w-100" type="submit">Search</button>
      </div>
    </form>

    <div class="row g-3">
      <div class="col-lg-8 order-2 order-lg-1">
        <div id="map" style="height:520px" role="region" aria-label="Interactive map"></div>
      </div>
      <div class="col-lg-4 order-1 order-lg-2">
        <div class="card">
          <div class="card-header">Results</div>
          <ul class="list-group list-group-flush" role="listbox" aria-label="Search results">
            <li v-for="(p,i) in pois" :key="i" class="list-group-item d-flex justify-content-between gap-2">
              <div>
                <div class="fw-semibold">{{ p.name || p.display_name }}</div>
                <div class="small text-muted">{{ p.address || p.display_name }}</div>
              </div>
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" @click="flyTo(p)">Focus</button>
                <button class="btn btn-sm btn-outline-primary" @click="routeTo(p)">Route</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import L from 'leaflet'
import { ref, onMounted } from 'vue'

const query = ref(''), near = ref(''), pois = ref([])
let map, markersLayer, routeLayer

onMounted(() => {
  map = L.map('map').setView([43.65, -79.38], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
  markersLayer = L.layerGroup().addTo(map)
  routeLayer = L.layerGroup().addTo(map)
})

function addMarkers(items) {
  markersLayer.clearLayers()
  items.forEach(p => {
    const lat = p.lat ?? (p.geometry && p.geometry.coordinates[1])
    const lon = p.lon ?? (p.geometry && p.geometry.coordinates[0])
    if (lat && lon) L.marker([lat, lon]).addTo(markersLayer).bindPopup(`<strong>${p.name || p.display_name}</strong>`)
  })
  if (items.length) map.fitBounds(L.featureGroup(markersLayer.getLayers()).getBounds().pad(0.2))
}

async function handleSearch() {
  const r = await fetch(`/api/poi-search?q=${encodeURIComponent(query.value)}&near=${encodeURIComponent(near.value||'')}`)
  const data = await r.json()
  pois.value = data.results || []
  addMarkers(pois.value)
}

function flyTo(p) {
  const lat = p.lat ?? (p.geometry && p.geometry.coordinates[1])
  const lon = p.lon ?? (p.geometry && p.geometry.coordinates[0])
  if (lat && lon) map.flyTo([lat, lon], 15)
}

async function routeTo(p) {
  if (!navigator.geolocation) return alert('Geolocation not supported')
  navigator.geolocation.getCurrentPosition(async pos => {
    const start = `${pos.coords.longitude},${pos.coords.latitude}`
    const endLat = p.lat ?? (p.geometry && p.geometry.coordinates[1])
    const endLon = p.lon ?? (p.geometry && p.geometry.coordinates[0])
    const end = `${endLon},${endLat}`
    const r = await fetch(`/api/route?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`)
    const data = await r.json()
    drawRoute(data)
  }, () => alert('Unable to get your location'))
}

function drawRoute(data) {
  routeLayer.clearLayers()
  if (!data || !data.geometry) return
  const coords = data.geometry.coordinates.map(([lon,lat]) => [lat,lon])
  L.polyline(coords, { weight: 5 }).addTo(routeLayer)
  map.fitBounds(L.polyline(coords).getBounds().pad(0.2))
}
</script>
