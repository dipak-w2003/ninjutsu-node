import axios from "axios";


export const API = axios.create({
  baseURL: "http://localhost:4406/api/",
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:4406/api/",
  headers: {
    // for authorization token we will be creating json {username,token etc} crud
    Authorization: "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { API, APIWITHTOKEN };
