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
          :to="{ name: 'home'}"
        >
          <span class="mr-2">Home</span>
        </v-btn>
        <v-btn
          flat
          :to="{ name: 'about'}"
        >
          <span class="mr-2">About</span>
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
