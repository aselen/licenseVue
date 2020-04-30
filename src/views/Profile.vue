<template>
  <v-container>
    <v-card class="mx-3" width="400">
      <v-card-title>{{ user.name + ' ' + user.surname }}</v-card-title>

      <v-card-actions>
        <v-form>
          <v-text-field v-model="user.name" label="Name">
            {{ user.name }}
          </v-text-field>

          <v-text-field v-model="user.surname" label="Surname">
            {{ user.surname }}
          </v-text-field>

          <v-btn color="primary" @click="saveChanges"> Save Changes </v-btn>
        </v-form>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import * as jsonpatch from 'fast-json-patch'

export default {
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    this.observer = jsonpatch.observe(this.user)
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    saveChanges() {
      var patchArray = jsonpatch.generate(this.observer)
      var patch = patchArray.map(a => ({
        op: a.op,
        value: a.value,
        path: a.path
      }))

      let data = JSON.stringify(patch)

      this.$store
        .dispatch('updateUserInfo', {
          data: data
        })
        .catch(() => {
          console.log('There was a problem when update user info')
        })
    }
  }
}
</script>
