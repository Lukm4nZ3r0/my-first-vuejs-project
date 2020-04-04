<template>
  <v-app>
    <span>{{msg}}</span>
  </v-app>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class HomeComponent extends Vue {
    @Prop() private msg!: string;
  }
</script>
