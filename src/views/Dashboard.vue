<template>
  <v-row>
    <v-col cols="1">
      <NavBar />
    </v-col>

    <v-col cols="11">
      <transition name="fade">
        <router-view />
      </transition>
    </v-col>
  </v-row>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>
