import axios from 'axios';

const API = axios.create({ baseURL: 'https://techieshub-backend.onrender.com/api' });


// Auth APIs
export const registerUser = (formData) => API.post('/auth/register', formData);
export const loginUser = (formData) => API.post('/auth/login', formData);

// Post APIs
export const createPost = (formData) => 
    API.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
export const getPosts = () => API.get('/posts');
export const likePost = (data) => API.post('/posts/like', data);
export const unlikePost = (data) => API.post('/posts/unlike', data);
export const commentPost = (data) => API.post('/posts/comment', data);
export const getUserPosts = (userId) => API.get(`/posts/user/${userId}`);
export const followUser = (data) => API.post('/users/follow', data);
export const unfollowUser = (data) => API.post('/users/unfollow', data);

export const getAllUsers = () => API.get('/users');

// Chat APIs
export const accessChat = (data) => API.post('/chat', data);
export const createGroupChat = (data) => API.post('/chat/group', data);
export const sendMessage = (data) => API.post('/chat/message', data);
export const fetchMessages = (chatId) => API.get(`/chat/message/${chatId}`);
export const fetchChats = (userId) => API.get(`/chat?userId=${userId}`);
