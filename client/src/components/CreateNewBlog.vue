<template>
  <div id="createBlog">
    <h1>Create New Blog</h1>
    <md-field class="md-field">
      <label>Blog Title</label>
      <md-input v-model="blogTitle"></md-input>
    </md-field>
    <textarea rows="10" cols="50" v-model="blogText" placeholder="Blog Text"/><br/>
    <div>
      <md-button class="md-raised md-primary" v-on:click="saveBlog">Save</md-button>
      <md-button class="md-raised md-primary" v-on:click="goBackToMainPage">Go Back To Main Page</md-button>
    </div>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'CreateNewBlog',
  data () {
    return {
      blogTitle: '',
      blogText: ''
    }
  },
  mounted: function () {
  },
  methods: {
    goBackToMainPage: function () {
      this.$router.push('Blogs')
    },
    saveBlog: function () {
      console.log(this.$root.userEmail)
      axios.post('http://localhost:5000/api/insertblog', {
        title: this.blogTitle,
        text: this.blogText,
        createDate: new Date(),
        lastModified: new Date(),
        email: this.$root.userEmail
      }).then((response) => {
        let isOK = response.data
        if (isOK) {
          swal({
            type: 'success',
            title: 'Your Blog Created Succesfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.goBackToMainPage()
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Sorry:( Could Not Created!',
            showConfirmButton: true
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
#createBlog{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.md-field{
  width: 300px;
}
textarea{
  resize: none;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
