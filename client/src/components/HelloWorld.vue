<template>
  <div class="hello">
    <h1>Blog App</h1>
    <md-field class="md-field">
      <label>Username</label>
      <md-input v-model="email"></md-input>
    </md-field>
    <md-field class="md-field">
      <label>Password</label>
      <md-input type="password" v-model="password"></md-input>
    </md-field>
    <div>
      <md-button class="md-raised md-primary" v-on:click="signIn">Sign In</md-button>
      <md-button class="md-raised md-primary" v-on:click="signUp">Sign Up</md-button>
    </div>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function (event) {
      // `this` inside methods points to the Vue instance
      axios.post('http://localhost:5000/api/validateuser', {
        email: this.email,
        password: this.password
      }).then((response) => {
        let isOK = response.data
        if (isOK) {
          swal({
            type: 'success',
            title: 'Welcome To Blog App',
            showConfirmButton: false
          })
          this.$root.userEmail = this.email
          console.log(this.$root.userEmail)
          this.$router.push('Blogs')
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Username Or Password Was Wrong!'
          })
        }
      })
    },

    signUp: function (event) {
      if (this.password.length >= 6) {
        axios.post('http://localhost:5000/api/adduser', {
          email: this.email,
          password: this.password
        }).then((response) => {
          let isOK = response.data
          if (isOK) {
            swal({
              type: 'success',
              title: 'Welcome To Blog App',
              showConfirmButton: false
            })
            this.$root.userEmail = this.email
            this.$router.push('Blogs')
          } else {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Could Not Sign Up!'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        alert('Password Length Must Not Be Less Than 6')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
@import 'vue-material/dist/vue-material.min.css';
div.hello{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
div > input {
  width: 300px;
}
.md-field{
  width: 300px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
