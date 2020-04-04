<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class LoginComponent extends Vue {
        message = 'OKE';
    }
</script>

<template>
    <span>{{this.message}}</span>
</template>