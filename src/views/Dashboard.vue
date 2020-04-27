<template>
  <v-container>
    <NavBar />
    <router-view />
  </v-container>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>
