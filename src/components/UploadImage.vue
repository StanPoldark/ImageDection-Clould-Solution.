<template>
  <div>
    <h1>Upload Image</h1>
    <input type="file" @change="onFileChange" />
    <button :disabled="!file" @click="uploadFile">Upload</button>
    <div v-if="labels.length">
      <h2>Detected Labels:</h2>
      <ul>
        <li v-for="label in labels" :key="label.Name">{{ label.Name }} ({{ label.Confidence.toFixed(2) }}%)</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadImage',
  data() {
    return {
      file: null,
      labels: []
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
    uploadFile() {
      if (!this.file) return;
      const token = localStorage.getItem('userToken');
      console.log(token);
      this.convertImageToBase64(this.file, (base64String) => {
        axios.post('https://7m6gw11u0l.execute-api.us-east-1.amazonaws.com/prod/api/upload', { 
             image: base64String  
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          alert('Upload successful')
          console.log('Upload successful:', response.data);
        })
        .catch(error => {
          console.error('Upload failed:', error.response.data);
        });
      });
    },
  }
};
</script>
