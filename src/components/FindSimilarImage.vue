<template>
    <div class="page-container">
        <h1>Find Similar Image</h1>
        <input type="file" @change="onFileChange" />
        <button :disabled="!file" @click="uploadFile">Upload</button>
    </div>
</template>

<style scoped>
input {
    margin-top: 10px;
    margin-bottom: 10px;
}

button {
    margin-bottom: 40px;
}

.page-container {
    margin-left: 5%;
    margin-right: 5%
}
</style>


<script>
import axios from 'axios';


export default {
    name: 'UploadImage',
    data() {
        return {
            file: null,
        };
    },
    methods: {
        onFileChange(e) {
            this.file = e.target.files[0];
        },
        convertImageToBase64(file, callback) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1];
                callback(base64String);
            };
            reader.readAsDataURL(file);
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
        },
        uploadFile() {
            if (!this.file) return;
            const token = this.getAccessTokenFromLocalStorage();
            this.convertImageToBase64(this.file, (base64String) => {
                axios.post('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/findImgByUploadImgTags', {
                    image: base64String
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
            });
        },
    }
}
</script>
