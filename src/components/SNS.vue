<template>
  <div class="tags-manager">
    <h2>Manage Your Tags</h2>
    <div class="tags-container">
      <div>
        <h3>Available Tags</h3>
        <draggable v-model="items" group="people" @start="drag = true" @end="drag = false" item-key="id">
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
      </div>
      <div>
        <h3>Selected Tags</h3>
        <draggable v-model="items" group="people" @start="drag = true" @end="drag = false" item-key="id">
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      items: [],
      drag: false
    };
  },
  mounted() {
    this.fetchTags();
  },
  methods: {
  fetchTags() {
    axios.get('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/tags', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.items = response.data.map((tag, index) => ({
        name: tag,
        id: index
      }));
    })
    .catch(error => console.error('Error fetching tags:', error));
  }
}
}
</script>

<style>
.tags-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.drag-area {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 150px;
}

.tag-item {
  padding: 5px;
  margin: 5px;
  background-color: #efefef;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>