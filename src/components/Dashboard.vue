<template>
  <div class="dashboard">
    <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/upload">Go to Upload</RouterLink>
    <RouterLink to="/query">Go to Query</RouterLink>
  </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
nav {
  padding: 10px;
}
nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #333;
}
</style>
