<template>
    <div class="page-container">

        <h2>Find Image by Thumbnail URL</h2>
        
        <form v-on:submit.prevent="submit">
            <!-- <p>Thumbnail URL</p> -->
            <input type="text" required v-model="thumbnailUrl" placeholder="Thumbnail URL"></input>
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
            thumbnailUrl: ''
        }
    },
    methods: {
        submit() {
            console.log(this.thumbnailUrl)
            // console.log(JSON.stringify(this.tags))
            // // console.log(this.count)
            const token = this.getAccessTokenFromLocalStorage();
            // console.log(token);
            var api = 'https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/findImgByThumbnailUrl'
            axios.post(api, {
                url: this.thumbnailUrl
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Upload successful:', response.data);
                    alert("Full Image URL:\n\n" + response.data.url);
                })
                .catch(error => {
                    console.error('Upload failed:', error.response.data);
                });

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
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
}

button {
    /* padding: 10px; */
    margin: 10px;
}

form {
    margin-bottom: 40px
}
.page-container {
    margin-left: 5%;
    margin-right: 5%
}

</style>
