import {API} from "./axios"
import {set_user_auth,setCsrf, csrfToken} from "../store/storage"
export async function login_user(userdata: object) {
  try {
    const response = await API.post("/login", userdata);
    const { token, _id } = response.data;
    const headers = response.headers;
    set_user_auth(token, _id);
    API.defaults.headers.common["x-csrf-token"] = headers["x-csrf-token"];
    setCsrf(headers["x-csrf-token"] as string);
    console.log(JSON.stringify(API.defaults.headers));
  } catch (error) {
    console.error(error);
    throw new Error("Unable to log in");
  }
}


export async function  signup_user(userdata:object){
        try {
            const response = await API.post("/signup", userdata);
            const { token, _id } = response.data;
            set_user_auth(token, _id);
          } catch (error) {
            console.error(error);
            throw new Error("Unable to log in");
          }
        }
