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

    const getAccessTokenFromLocalStorage = () => {
      const regex = /^CognitoIdentityServiceProvider\.[^.]+\.[^.]+\.idToken$/;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && regex.test(key)) {
          return localStorage.getItem(key);
        }
      }
      return null;
    };

    const fetchTags = () => {
      const token = getAccessTokenFromLocalStorage();
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      axios.get('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/tags', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const tags = response.data;  // Assuming response.data directly contains the tags array
        console.log(tags.body);
        items.value = JSON.parse(tags.body).map((tag, index) => ({ name: tag, id: index }));
      })
      .catch(error => console.error('Error fetching tags:', error));
    };

    onMounted(fetchTags);

    const subscribeTags = () => {
      const token = getAccessTokenFromLocalStorage();
      if (!token) {
        alert('Authentication data is missing.');
        return;
      }
      const data = jwtDecode(token);
      axios.post('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/subscribe', {
        user_id: data.sub,
        email: data.email,
        tags: selectedItems.value.map(item => item.name)
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        alert("Successfully subscribed to tags");
      })
      .catch(error => {
        console.error('Error during subscription:', error);
        alert('Failed to subscribe to tags. Please check the console for more details.');
      });
    };

    return {
      items,
      selectedItems,
      drag,
      fetchTags,
      subscribeTags
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
