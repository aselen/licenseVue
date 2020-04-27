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
