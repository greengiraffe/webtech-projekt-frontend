<template>
  <v-container>
    <v-layout
      wrap
      align-center
      justify-center
    >
      <v-flex xs12 sm8 md6 lg4>
        <v-card>

          <v-tabs grow>
            <v-tabs-slider color="red"></v-tabs-slider>

            <v-tab>Login</v-tab>
            <v-tab>Create Account</v-tab>

            <v-tabs-items>
              <v-tab-item>
                <LoginForm></LoginForm>
              </v-tab-item>
              <v-tab-item>
                <RegisterForm></RegisterForm>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'

export default {
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>
