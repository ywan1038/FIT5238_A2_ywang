<template>
  <!-- Skip Link：键盘用户可快速跳到主内容 -->
  <a href="#main" class="visually-hidden-focusable skip-link">Skip to main content</a>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">App</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/register">Register</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/dashboard">Dashboard</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/booking">Booking</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/resources">Resources</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/email">Email</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/tables">Tables</router-link></li>

          <!-- 新增菜单：与后续 D/E 功能保持一致 -->
          <li class="nav-item"><router-link class="nav-link" to="/map">Map</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/calendar">Calendar</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/admin">Admin</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 无脚本必需逻辑
</script>

<style scoped>
.navbar-brand { font-weight: bold; }

/* Skip Link 的可见焦点样式（键盘 Tab 时出现） */
.skip-link:focus {
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1000;
  background: #fff;
  padding: .5rem 1rem;
  border-radius: .5rem;
  box-shadow: 0 0 0 3px #0d6efd;
}
</style>
