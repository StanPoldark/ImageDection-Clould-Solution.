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
  import { ref } from 'vue';
  import draggable from 'vuedraggable';
  
  export default {
    components: {
      draggable,
    },
    setup() {
      const availableTags = ref(['tag1', 'tag2', 'tag3', 'tag4', 'tag5']);
      const selectedTags = ref([]);
  
      return { availableTags, selectedTags };
    }
  };
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
  