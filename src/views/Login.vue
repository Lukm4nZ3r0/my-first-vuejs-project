<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    @Component({
        components:{
            ValidationObserver, 
            ValidationProvider
        }
    })
    export default class Login extends Vue {
        public valid = true;
        public name = '';
        public nameRules = [
          (v: string): string | boolean => !!v || 'Name is required',
          (v: string): string | boolean => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ];

        mounted(){
          if(this.$store.getters.isLogin){
            this.$router.push({ 
              name: 'Todos'
            })
          }
        }

        goToAbout(){
          this.$router.push({ 
            name: 'About', 
            params: { 
              userId: '123' 
            }
          })
        }

        submit(){
            console.log('OK!')
            // this.$refs.observer.validate()
            console.log(this.$refs.observer)
        }
        validate() {
          if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
            console.log('OK!',this.name)
            this.$store.dispatch('login',this.name)
          }
        }
        reset () {
          // this.$refs.form.reset()
          (this.$refs.form as Vue & { reset: () => boolean }).reset()
          
        }
        resetValidation () {
          (this.$refs.form as Vue & { resetValidation: () => boolean }).resetValidation()
          // this.$refs.form.resetValidation()
        }
    }
</script>

<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-btn
      :disabled="this.$store.getters.isLoading"
      color="success"
      class="mr-4"
      @click="validate"
    >
      {{this.$store.getters.isLoading ? 'Loading' : 'Login'}}
    </v-btn>

    <v-btn
      color="success"
      @click="goToAbout"
      class="ml-4"
    >
        Go To About
    </v-btn>
  </v-form>
</template>