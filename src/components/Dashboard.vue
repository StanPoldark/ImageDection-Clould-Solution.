<template>
  <div class="dashboard">
    <nav class="top-nav">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/upload" class="nav-link">Upload</RouterLink>
      <RouterLink to="/query" class="nav-link">Query</RouterLink>
      <RouterLink to="/findImgByTags" class="nav-link">Find By Tags</RouterLink>
      <RouterLink to="/findImgByThumbnailUrl" class="nav-link">Find By Thumbnail</RouterLink>
    </nav>
    <nav class="bottom-nav">
      <RouterLink to="/editTags" class="nav-link">Edit Tags</RouterLink>
      <RouterLink to="/deleteImages" class="nav-link">Delete Images</RouterLink>
      <RouterLink to="/findSimilarImage" class="nav-link">Find Similar</RouterLink>
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
  padding: 10px 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-link {
  margin: 0 10px;
  text-decoration: none;
  color: #555;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover, .nav-link:focus {
  background-color: #e9ecef;
  color: #007bff;
}

.nav-link:active {
  background-color: #007bff;
  color: white;
}

.top-nav, .bottom-nav {
  display: flex;
  justify-content: center;
  padding: 5px 0;
}

.bottom-nav {
  background-color: #dee2e6; 
}
</style>
