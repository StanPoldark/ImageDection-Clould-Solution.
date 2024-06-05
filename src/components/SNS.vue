<template>
  <div class="tags-manager">
    <h2>Manage Your Tags</h2>
    <div class="tags-container">
      <div>
        <h3>Available Tags</h3>
        <draggable v-model="items" group="tags" class="drag-area" item-key="id">
          <template #item="{ element }">
            <div class="tag-item">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
      <button @click="subscribeTags()">Subscribe</button>
      <div>
        <h3>Selected Tags</h3>
        <draggable v-model="selectedItems" group="tags" class="drag-area" item-key="id">
          <template #item="{ element }">
            <div class="tag-item">{{ element.name }}</div>
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
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    draggable,
  },
  setup() {
    const items = ref([]);
    const selectedItems = ref([]);
    const drag = ref(false);

    const fetchTags = () => {
      const token = this.getAccessTokenFromLocalStorage();
      axios.get('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/tags', {
        headers: {
          'Authorization': `Bearer ${token}`,
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
    onMounted(fetchTags);

    return {
      items,
      selectedItems,
      drag
    };
  },
  methods: {
    subscribeTags() {
      const token = this.getAccessTokenFromLocalStorage();
      const data = jwtDecode(token); 
      if (!token) {
        alert('Authentication data is missing.');
        return; // Stop execution if there is no user data.
      }
      axios.post('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/subscribe', {
        user_id: data.sub,
        email: data.email,
        tags: this.selectedItems.map(item => item.name)  // Ensure this.selectedItems is correctly referenced.
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('Successfully subscribed to tags');
        alert("Successfully subscribed to tags"); // Correct way to display an alert after a successful operation.
      }).catch(error => {
        console.error('Error during subscription:', error);
        alert('Failed to subscribe to tags. Please check the console for more details.');
      })},
        getAccessTokenFromLocalStorage() {
        const regex = /^CognitoIdentityServiceProvider\.[^.]+\.[^.]+\.idToken$/;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && regex.test(key)) {
            return localStorage.getItem(key);
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
