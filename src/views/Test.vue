<template>
  <v-container>
    <v-btn @click="updateWeather" color="warning"> Update Weather </v-btn>
    <h1>{{ weather }}</h1>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.updateWeather()
  },
  computed: {
    ...mapState({
      weather: state => state.weather
    })
  },
  methods: {
    updateWeather() {
      this.$store.dispatch('getWeather').catch(() => {
        console.log('There was a problem when fetch weather')
      })
    }
  }
}
</script>
