<template>
  <div>
    <draggable v-model="items" group="people" @start="drag = true" @end="drag = false" item-key="id">
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data() {
    return {
      items: [
        { name: "约翰", id: 0 },
        { name: "若昂", id: 1 },
        { name: "Jean", id: 2 }
      ],
      drag: false
    };
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
