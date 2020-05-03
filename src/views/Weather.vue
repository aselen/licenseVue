<template>
  <div class="page">
    <v-btn class="px-30" @click="updateWeather" color="warning">
      Update Weather
    </v-btn>

    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-data-table
        :elevation="hover ? 16 : 2"
        :headers="headers"
        :items="weathers"
        class="elevation-1"
      >
        <template v-slot:item.date="{ item }">
          {{ item.date | customDate }}
        </template>
        <template v-slot:item.temperatureC="{ item }">
          <v-chip :color="getColor(item.temperatureC)" dark>{{
            item.temperatureC
          }}</v-chip>
        </template>
      </v-data-table>
    </v-hover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as moment from 'moment'

export default {
  mounted() {
    this.updateWeather()
  },
  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date'
        },
        { text: 'Temperature (C)', value: 'temperatureC' },
        { text: 'Temperature (F)', value: 'temperatureF' },
        { text: 'Summary', value: 'summary' }
      ]
    }
  },
  computed: {
    ...mapState({
      weathers: state => state.weather
    })
  },
  methods: {
    updateWeather() {
      this.$store.dispatch('getWeather').catch(() => {
        console.log('There was a problem when fetch weather')
      })
    },
    getColor(temperatureC) {
      if (temperatureC < 0) return 'red'
      else if (temperatureC > 30) return 'orange'
      else return 'green'
    }
  },
  filters: {
    customDate: function(date) {
      return moment(date)
        .locale('tr')
        .format('MMMM Do YYYY, h:mm:ss')
    }
  }
}
</script>
