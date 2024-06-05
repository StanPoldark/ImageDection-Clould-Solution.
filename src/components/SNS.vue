<template>
  <div class="tags-manager">
    <h2>Manage Your Tags</h2>
    <div class="tags-container">
      <div>
        <h3>Available Tags</h3>
        <draggable v-model="availableTags" group="tags" class="drag-area">
          <template #item="{ element }">
            <div class="tag-item">{{ element }}</div>
          </template>
        </draggable>
      </div>
      <div>
        <h3>Selected Tags</h3>
        <draggable v-model="selectedTags" group="tags" class="drag-area">
          <template #item="{ element }">
            <div class="tag-item">{{ element }}</div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios'; // Ensure you have axios installed or use an alternative method for HTTP requests

export default {
  components: {
    draggable,
  },
  setup() {
    const availableTags = ref([]);
    const selectedTags = ref([]);

    // Fetch tags when component is mounted
    onMounted(async () => {
      try {
        const response = await axios.get('https://vz55txf0b6.execute-api.us-east-1.amazonaws.com/Prod/tags');
        availableTags.value = response.data; // Adjust this line based on the actual structure of your response
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    });

    return { availableTags, selectedTags };
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
