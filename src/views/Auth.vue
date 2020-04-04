<script>
// @ is an alias to /src
import LoginComponent from '@/components/LoginComponent.vue'
import HomeComponent from '@/components/HomeComponent.vue'

export default {
  name: 'Auth',
  components: {
    LoginComponent,
    HomeComponent
  }
}
</script>

<template>
  <v-app>
    <LoginComponent/>
    <HomeComponent msg="HI!" />
  </v-app>
</template>

