<template>
  <v-layout>
    <admin-navbar v-if="$route.fullPath.includes('/admin/')" />
    <navbar v-else />
    <v-main>
      <router-view style="background-color: #ffffe8;" :key="$route.fullPath" />
    </v-main>
  </v-layout>
</template>

<script>
import NavBar from "./components/NavBar/NavBar.vue";
import AdminNavBar from "./components/Admin/AdminNavBar.vue";

export default {
  components: {
    navbar: NavBar,
    "admin-navbar": AdminNavBar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&family=Gwendolyn&display=swap');

.v-layout,
.d-flex,
[class^="text-"],
[class^="v-"],
.v-main,
.v-application, 
.v-overlay-container {
  font-family: "Fira Sans", sans-serif !important;
}

/* Scroll bar stylings */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #F2F2DC; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #774D3C; 
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #664233; 
  }
</style>
