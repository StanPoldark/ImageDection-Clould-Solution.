<template>
    <div>
        <h2>Edit Tags</h2>

        <form v-on:submit.prevent="submit">
            <h3>Type</h3>
            <div class="form-group">
                <select v-model="type" required>
                    <option disabled value="">Please select one</option>
                    <option value="1">Add</option>
                    <option value="0">Delete</option>
                </select>
            </div>

            <h3>URLs</h3>
            <div class="form-group" v-for="(input, k) in urls" :key="k">
                <input type="text" class="form-control urlInput" placeholder="url" v-model="input.url" required>
                <span>
                    <button @click="removeUrl(k)" v-show="k || (!k && urls.length > 1)">Remove</button>
                    <button @click="addUrl()" v-show="k == urls.length - 1">Add fields</button>
                </span>
            </div>

            <h3>Tags</h3>
            <div class="form-group" id="tagsInput" v-for="(input, k) in tags" :key="k">
                <input type="text" class="form-control" placeholder="tag" v-model="input.tag" required>
                <span>
                    <button @click="removeTag(k)" v-show="k || (!k && tags.length > 1)">Remove</button>
                    <button @click="addTag()" v-show="k == tags.length - 1">Add fields</button>
                </span>
            </div>
            <button type="submit">Submit</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FindImgByTags',
    data() {
        return {
            tags: [{
                tag: ''
            }],
            urls: [{
                url: ''
            }],
            type: -1
        }
    },
    methods: {
        submit() {
            console.log(this.tags)
            console.log(this.urls)
            console.log(this.type)
            const token = this.getAccessTokenFromLocalStorage();
            const user_data = jwtDecode(token);
            let data = {
                "url": [],
                "type": Number(this.type),
                "tags": [],
                'user_id': user_data.sub
            }

            this.tags.forEach(obj => {
                data.tags.push(obj.tag)
            });

            this.urls.forEach(obj => {
                data.url.push(obj.url)
            });

            var api = 'https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/editTags'
            axios.post(api, {
                data: data
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Upload successful:', response.data);
                    let alertStr = "No images edited"
                    let imagesEdited = response.data.imagesEdited

                    if (imagesEdited.length > 0) {
                        alertStr = "Images Edited:"
                        imagesEdited.forEach(url => {
                            alertStr += ('\n\n' + url);
                        });
                    }
                    alert(alertStr);

                })
                .catch(error => {
                    console.error('Upload failed:', error.response.data);
                });

        },
        addTag() {
            this.tags.push({ tag: '' });
        },
        removeTag(index) {
            this.tags.splice(index, 1);
        },
        addUrl() {
            this.urls.push({ url: '' });
        },
        removeUrl(index) {
            this.urls.splice(index, 1);
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
input, select {
    padding: 12px 20px;
    margin: 8px 0;
    width: 100%; 
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.urlInput {
    transition: border 0.3s ease-in-out;
}

.urlInput:focus, input:focus {
    border-color: #4A90E2; 
}

button {
    background-color: #4A90E2; 
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease; 
}

button:hover {
    background-color: #357ABD; 
}

.form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-group span {
    margin-left: auto; 
}

button[type="submit"] {
    width: 100%;
    margin-top: 20px;
}

h2, h3 {
    color: #333; 
}
</style>
