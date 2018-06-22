import axios from 'axios';

const instance = axios.create({
  baseURL: "https://react-my-burger-app-c74f8.firebaseio.com/"
});

export default instance;
