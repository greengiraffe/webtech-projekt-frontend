<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{ name: 'home' }" exact class="title-link">
          <span class="font-weight-light">Learn</span>
          <span class="font-weight-black">IT</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          exact
          :to="{ name: 'home' }"
        >
          Home
        </v-btn>
        <v-btn flat :to="{ name: 'about' }"
        >
          About
        </v-btn>

        <v-btn
          v-if="!loggedIn"
          color="primary"
          flat
          :to="{ name: 'login' }"
        >
          Login
        </v-btn>
        <v-btn
          v-else
          color="warning"
          flat
          @click="logout"
        >
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
    mounted () {
        this.$store.dispatch('quiz/getAll')
        this.$store.dispatch('quiz/getCategories')
    },
    computed: {
        ...mapState({
            loggedIn: state => state.user.loggedIn
        })
    },
    methods: {
        logout () {
            this.$store.dispatch('user/logout')
        }
    }
}
</script>
<style lang="scss" scoped>
  .title-link {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
  .v-input--selection-controls__input input{
    opacity: 1 !important;
  }
</style>
