import axios from "axios";

export default class AccountService {
  constructor() {
    this.idToken = localStorage.getItem("idToken");
  }

  createPost(userData) {
    return axios.post(
      "https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/post",
      userData,
      {
        headers: {
          Authorization: this.idToken,
        },
      }
    );
  }

  updatePost(postId, userId, userData) {
    return axios.put(`https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/post/${postId}/${userId}`,
      userData,
      {headers: {
        Authorization: this.idToken,
      },
    });
  }

  deletePost(postId, userId) {
    return axios.delete(`https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/post/${postId}/${userId}`,
      {headers: {
        Authorization: this.idToken,
      },
    });
  }

  getPosts() {
    return axios.get(
      "https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/posts",
      {
        headers: {
          Authorization: this.idToken,
        },
      }
    );
  }

  getPostById(userId) {
    return axios.get(
      `https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/posts/${userId}`,
      {
        headers: {
          Authorization: this.idToken,
        },
      }
    );
  }

  getComments(postId) {
    return axios.get(
      `https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/comment/${postId}`,
      {
        headers: {
          Authorization: this.idToken,
        },
      }
    );
  }

  createComment(userData) {
    return axios.post(
      "https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/comment",
      userData,
      {
        headers: {
          Authorization: this.idToken,
        },
      }
    );
  }

  deleteComment(postId, commentId) {
    return axios.delete({
      url: `https://3o44b07yni.execute-api.us-east-1.amazonaws.com/dev/comment/${postId}/${commentId}`,
      headers: {
        Authorization: this.idToken,
      },
    });
  }
}
