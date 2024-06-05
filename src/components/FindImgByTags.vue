<template>
    <div>

        <!-- 
        <form v-on:submit.prevent="submit">
            <p>Add Tags</p>
            <p>Item name: <input type="text" required v-model="tag"></p>
            <p>How many: <input type="number" required v-model="count"></p>
            <button type="submit">Add item</button>
        </form> -->
        <h2>Find Image by Tags</h2>
        <div class="form-group" v-for="(input, k) in tags" :key="k">
            <input type="text" class="form-control" placeholder="tag" v-model="input.tag">
            <input type="number" class="form-control" placeholder="count" v-model="input.count">
            <span>
                <button @click="remove(k)" v-show="k || (!k && tags.length > 1)">Remove</button>
                <button @click="add(k)" v-show="k == tags.length - 1">Add fields</button>
            </span>
        </div>
        <button @click="submit">
            Submit
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FindImgByTags',
    data() {
        return {
            tags: [{
                tag: '',
                count: ''
            }]
        }
    },
    methods: {
        submit() {
            this.tags.forEach(e => {
                console.log(e.tag + " " + e.count)
            });
            console.log(this.tags)
            console.log(JSON.stringify(this.tags))
            // console.log(this.count)
            const token = this.getAccessTokenFromLocalStorage();
            // console.log(token);
            var api = 'https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/findByTags'
            axios.post(api, {
                tags: this.tags
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Upload successful:', response.data);
                    let urls = response.data.urls
                    let alertStr = "URLs:"
                    urls.forEach(url => {
                        alertStr += ('\n\n' + url);
                    });
                    alert(alertStr);
                })
                .catch(error => {
                    console.error('Upload failed:', error.response.data);
                });

        },
        add(index) {
            this.tags.push({ tag: '' });
        },
        remove(index) {
            this.tags.splice(index, 1);
        },
        getAccessTokenFromLocalStorage() {
            const regex = /^CognitoIdentityServiceProvider\.[^.]+\.[^.]+\.idToken$/;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && regex.test(key)) {
                    return localStorage.getItem(key);
                }
            }
            return null;
        }
    }
}
</script>

<style scoped>
input {
    padding: 10px;
    margin: 10px;
}

button {
    /* padding: 10px; */
    margin: 10px;
}

/* nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #333;
} */
</style>
