<template>
  <div class="tags-manager">
    <h2>Manage Your Tags</h2>
    <div class="tags-container">
      <div>
        <h3>Available Tags</h3>
        <draggable v-model="items" group="tags" @change="handleDrag" class="drag-area">
          <template #item="{ element }">
            <div class="tag-item">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
      <div>
        <h3>Selected Tags</h3>
        <draggable v-model="selectedItems" group="tags" @change="handleDrag" class="drag-area">
          <template #item="{ element }">
            <div class="tag-item">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
  <button @click="subscribeTags">Subscribe</button>
</template>

<script>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios';
const jwtDecode = require('jwt-decode').default;

export default {
  components: {
    draggable,
  },
  setup() {
    const items = ref([]);
    const selectedItems = ref([]);
    const drag = ref(false);

    const fetchTags = () => {
      axios.get('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/tags', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        try {
          const tags = JSON.parse(response.data.body);
          items.value = tags.map((tag, index) => ({
            name: tag,
            id: index
          }));
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      })
      .catch(error => console.error('Error fetching tags:', error));
    };

    const handleDrag = (event) => {
      // This function is called whenever an item is dragged and dropped across lists
      if (event.added) {
        const newItem = event.added.element;
        if (event.from === event.to) {
          // Same list: no action needed
        } else if (event.from === items.value) {
          // From items to selectedItems
          selectedItems.value.push(newItem);
          items.value.splice(items.value.indexOf(newItem), 1);
        } else {
          // From selectedItems to items
          items.value.push(newItem);
          selectedItems.value.splice(selectedItems.value.indexOf(newItem), 1);
        }
      }
    };

    onMounted(fetchTags);

    return {
      items,
      selectedItems,
      drag,
      handleDrag
    };
  },
  methods:{
    subscribeTags(){
      const id =  this.getAccessTokenFromLocalStorage();
    },
    getAccessTokenFromLocalStorage() {
    const regex = /^CognitoIdentityServiceProvider\.[^.]+\.[^.]+\.idToken$/;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && regex.test(key)) {
        console.log(jwtDecode(localStorage.getItem(key)));
        return  jwtDecode(localStorage.getItem(key));
      }
    }
    return null;
  },
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
