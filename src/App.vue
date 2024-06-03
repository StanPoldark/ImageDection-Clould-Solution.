<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import dashboard from './components/Dashboard.vue';
import {Amplify}  from "aws-amplify";
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:4665d7a5-6347-489d-b63e-a804586c7802",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_2xfWPXYCv",
    "aws_user_pools_web_client_id": "683f6k1hvnufqm1anmnc4g6pr7",
    "oauth": {
        "domain": "fit5225a3g54-dev.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://master.d3jrv6e4dy8yez.amplifyapp.com/",
        "redirectSignOut": "https://master.d3jrv6e4dy8yez.amplifyapp.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_AND_IDENTITY_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL",
        "FAMILY_NAME",
        "GIVEN_NAME"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};

Amplify.configure(awsmobile);

</script>

<template>
  <main>
    <authenticator  :sign-up-attributes="['given_name', 'family_name']">
      <template v-slot="{ user, signOut }">
        <dashboard />
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>

