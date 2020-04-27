<template>
  <v-navigation-drawer
    v-if="loggedIn"
    absolute
    class="primary"
    mini-variant
    expand-on-hover
    mobile-break-point
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/58.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.name + ' ' + user.surname }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.name }} @gmail.com</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'Test', icon: 'mdi-view-dashboard', route: '/test' },
        { title: 'Test2', icon: 'mdi-view-dashboard', route: '/test2' }
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(['loggedIn'])
  }
}
</script>
