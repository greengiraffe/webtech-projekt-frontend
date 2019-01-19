<template>
  <v-card flat>
    <v-card-text>
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          label="Name"
          required
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-Mail"
          required
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="passwordErrors"
          label="Password"
          @blur="$v.password.$touch()"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          type="password"
          :error-messages="passwordConfirmErrors"
          label="Confirm password"
          @blur="$v.confirmPassword.$touch()"
        ></v-text-field>

        <v-btn @click="submit">Register</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        name: { required },
        email: { required, email },
        password: {
            required,
            minLength: minLength(6)
        },
        confirmPassword: {
            required,
            sameAs: sameAs('password') }
    },

    data: () => ({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    }),

    computed: {
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('Name is required')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            !this.$v.password.minLength && errors.push('Must be at least 6 characters long')
            return errors
        },
        passwordConfirmErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.confirmPassword.required && errors.push('Must confirm password')
            !this.$v.confirmPassword.sameAs && errors.push('Password must be identical')
            return errors
        }
    },

    methods: {
        submit () {
            this.$v.$touch()
            if (this.$v.$invalid) {
                // TODO
            } else {
                this.$store.dispatch('user/signup', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                this.$router.push({ name: 'home' })
            }
        },
        clear () {
            this.$v.$reset()
            this.name = ''
            this.email = ''
            this.select = null
            this.checkbox = false
        }
    }
}
</script>

<style>

</style>
