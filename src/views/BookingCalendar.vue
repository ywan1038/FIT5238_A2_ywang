<template>
  <div id="main" tabindex="-1" class="container py-4">
    <h2 class="mb-3">Booking Calendar</h2>
    <div class="alert alert-info" role="status">
      Select a time range to create an event. Conflicts are prevented.
    </div>
    <div ref="calEl"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const calEl = ref(null)
let calendar

// 初始事件（示例）
const events = [
  {
    id: '1',
    title: 'Booked',
    start: new Date(Date.now() + 24 * 3600e3).toISOString(),
    end: new Date(Date.now() + 24 * 3600e3 + 3600e3).toISOString()
  }
]

// 简单冲突检测：区间有重叠则拒绝
const hasConflict = (a) => events.some(e => !(a.end <= e.start || a.start >= e.end))

onMounted(() => {
  calendar = new Calendar(calEl.value, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    selectable: true,
    events,
    select: (sel) => {
      const next = { title: 'My Booking', start: sel.startStr, end: sel.endStr }
      if (hasConflict(next)) {
        alert('Time conflict with an existing booking.')
      } else {
        events.push(next)
        calendar.addEvent(next)
      }
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  })
  calendar.render()
})
</script>
