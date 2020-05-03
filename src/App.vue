<template>
  <v-app>
    <router-view>
      <Authenticate />
    </router-view>
  </v-app>
</template>

<script>
import Authenticate from '@/views/Authenticate'

export default {
  name: 'App',
  components: {
    Authenticate
  }
}
</script>

<style>
/*** TRANSITIONS ***/
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}

.page {
  position: fixed;
  width: inherit;
  max-width: 85vw;
}
</style>
