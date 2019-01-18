<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
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
          color="primary"
          flat
          :to="{ name: 'login' }"
        >
          Login
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      
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
</style>
