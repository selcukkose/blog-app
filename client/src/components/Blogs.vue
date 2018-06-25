<template>
  <div class="blogs">
    <h1>Blog App</h1>
    <div>
      <md-button class="md-raised md-primary" v-on:click="getAllBlogs">
        <md-icon class="md-primary">view_list</md-icon>
        All Blogs
      </md-button>
      <md-button class="md-raised md-primary" v-on:click="getUserBlogs">
        <md-icon class="md-primary">account_box</md-icon>
        My Blogs
      </md-button>
      <md-button class="md-raised md-primary" v-on:click="goCreateNewBlog">
        <md-icon class="md-primary">add</md-icon>
        Create New Blog
      </md-button>
    </div>
    <br/>

    <div>
      <md-list class="md-triple-line">
        <md-list-item class="list-item" v-bind:key="blog._id" v-for="blog in blogs.blogs">
          <div class="md-list-item-text">
            <span class="blog-title">{{ blog.title }}</span>
            <p>{{ blog.lastModified }}</p>
            <p>{{ blog.text }}</p>
          </div>

          <md-button class="md-icon-button md-list-action" v-on:click="goEditBlog(blog)">
            <md-icon class="md-primary">edit</md-icon>
          </md-button>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
      </md-list>
    </div>

  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'
import axios from 'axios'

export default {
  name: 'Blogs',
  data () {
    return {
      blogs: {},
      isDataLoaded: false
    }
  },
  mounted: function () {
    this.getAllBlogs()
  },
  methods: {
    goCreateNewBlog: function () {
      this.$router.push('CreateNewBlog')
    },
    goEditBlog: function (blog) {
      this.$root.selectedBlog = blog
      this.$router.push('EditBlog')
    },
    getAllBlogs: async function () {
      let response = await axios.get('http://localhost:5000/api/allblogs')
      response.data = response.data.map(blogData => {
        blogData.lastModified = this.getTurkishDate(blogData.lastModified)
        return blogData
      })
      console.log(response.data)
      this.$set(this.blogs, 'blogs', response.data)
    },
    getUserBlogs: async function () {
      console.log(this.$root.userEmail)
      let response = await axios.post('http://localhost:5000/api/userblogs', {
        email: this.$root.userEmail
      })
      this.$set(this.blogs, 'blogs', response.data)
    },
    getTurkishDate: function (dateData) {
      let date = new Date(dateData)
      return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + '  ' + date.getHours() + ':' + date.getMinutes()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
div.blogs{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.list-item{
  border-bottom: 1px solid black;
  width: 500px;
}
.blog-title{
  font-weight: bold;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
