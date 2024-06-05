<template>
  <div class="dashboard">
    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/upload" class="nav-link">Upload</RouterLink>
      <RouterLink to="/findImgByTags" class="nav-link">Find Image By Tags</RouterLink>
      <RouterLink to="/findImgByThumbnailUrl" class="nav-link">Find Image By Thumbnail URL</RouterLink>
      <RouterLink to="/sns" class="nav-link">Subscribe Tags</RouterLink>
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
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover, .nav-link:focus {
  background-color: #e9ecef;
  color: #007bff;
}

.nav-link:active {
  background-color: #007bff;
  color: white;
}
</style>
