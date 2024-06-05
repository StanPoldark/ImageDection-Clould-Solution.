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
import axios from 'axios';

export default {
  components: {
    draggable,
  },
  setup() {
    const availableTags = ref([]);
    const selectedTags = ref([]);

    onMounted(async () => {
      axios.get('https://vz55txf0b6.execute-api.us-east-1.amazonaws.com/Prod/tags', {
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Tags fetched successfully:', response.data);
        })
        .catch(error => {
          if (error.response) {
            // The server responded with a status code that falls out of the range of 2xx
            console.error('Fetching tags failed:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
          }
        });
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
