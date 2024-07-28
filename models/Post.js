// models/Post.js
export default class Post {
     
  
    async getAllPosts() {
      return this.collection.find({}).toArray();
    }
  
    async getPostById(id) {
      return this.collection.findOne({ _id: id });
    }
  
    async createPost(postData) {
      return this.collection.insertOne(postData);
    }
  
    // Additional methods for updating and deleting posts...
  }
  