<template>
    <div>
        <h2>Delete Images</h2>

        <form v-on:submit.prevent="submit">


            <h3>URLs</h3>
            <div class="form-group" v-for="(input, k) in urls" :key="k">
                <input type="text" class="form-control urlInput" placeholder="url" v-model="input.url" required>
                <span>
                    <button @click="removeUrl(k)" v-show="k || (!k && urls.length > 1)">Remove</button>
                    <button @click="addUrl()" v-show="k == urls.length - 1">Add fields</button>
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

            urls: [{
                url: ''
            }]
        }
    },
    methods: {
        submit() {
            console.log(this.urls)

            let data = []

            this.urls.forEach(obj => {
                data.push(obj.url)
            });


            const token = this.getAccessTokenFromLocalStorage();
            var api = 'https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/deleteImages'
            axios.post(api, {
                url: data
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Upload successful:', response.data);
                    let imagesDeleted = response.data.result.imagesDeleted
                    let failed = response.data.result.failed

                    let alertStr = "No Images deleted"
                    if (imagesDeleted.length > 0) {
                        alertStr = "Images Deleted:"
                        imagesDeleted.forEach(url => {
                            alertStr += ('\n\n' + url);
                        });
                    }
                    if (failed.length > 0) {
                        alertStr += "\n\nFailed images:"
                        failed.forEach(url => {
                            alertStr += ('\n\n' + url);
                        });
                    }
                    alert(alertStr);

                })
                .catch(error => {
                    console.error('Upload failed:', error.response.data);
                });

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
input,
select {
    padding: 10px;
    margin: 10px;
}

.urlInput {
    width: 100%;
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
