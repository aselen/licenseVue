<template>
  <v-container>
    <v-layout justify-center>
      <v-img max-height="50" max-width="250" src="../assets/logo.png" />
    </v-layout>

    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-card
        :elevation="hover ? 16 : 2"
        width="400"
        class="mx-auto mt-10 pa-1"
      >
        <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-btn v-if="loggedIn" @click="logout">
              {{ user.name + ' ' + user.surname }} Değiştir
            </v-btn>
            <v-text-field
              v-else
              v-model="username"
              label="Username"
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="px-10"
            color="primary"
            :loading="loading"
            rounded
            @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-hover>

    <v-layout v-show="error" class="my-5" justify-center>
      <p style="color: red">Giriş işlemi başarısız</p>
    </v-layout>

    <v-footer absolute color="white">
      <v-spacer></v-spacer>
      <div>ASELSAN A.Ş &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      loading: false,
      error: false,
      showPassword: false,
      username: undefined,
      password: undefined
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store
        .dispatch('fetchUser', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push('/test')
        })
        .catch(err => {
          this.loading = false
          this.error = true
          console.log('There was a problem when login')
          console.log(err)
        })
    },
    logout() {
      this.$store.dispatch('logout')
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

<style></style>
