<script>
import TodosComponent from '../components/Todos/Todos.vue'
export default {
  name: 'Todos',
  components: {
    TodosComponent
  },
}
</script>

<template>
  <v-app>
    <h1>Latihan VUEX :(</h1>
    <TodosComponent :todos="this.$store.state.todos" :mantap="'TEST PROPS!'" />
  </v-app>
</template>