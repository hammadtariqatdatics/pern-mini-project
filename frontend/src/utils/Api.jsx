import axios from "axios";

// creating instance of axios
const http = axios.create({
  baseURL: "http://localhost:5000/api",
  // headers: {
  //   Accept: "application/json",
  // },
});

// handle the request using http
http.interceptors.request.use(
  (request) => {
    request.headers.Accept = `application/json`;
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      request.headers["token"] = loggedInUser.token;
    }
    console.log("request send");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle the response using http
http.interceptors.response.use(
  (response) => {
    console.log("got response");
    return response?.data;
  },
  (error) => {
    if (error.response.status === 404) {
      console.log("Not Found");
    }
    return Promise.reject(error);
  }
);

export default http;
