<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import dashboard from './components/Dashboard.vue';
import {Amplify}  from "aws-amplify";
const awsmobile = {
   
};

Amplify.configure(awsmobile);


</script>
<template>
  <main>
    <authenticator  :sign-up-attributes="['given_name', 'family_name']">
      <template v-slot="{ user, signOut }">
        <h1>Hello, {{  user.signInDetails?.loginId || "Google User"   }}</h1>
        <dashboard />
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>

