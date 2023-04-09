import { useAtom,atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { store } from '../../index'
import { API } from '../controller/axios'
import Jwt  from 'jsonwebtoken'
// export const JWT = atom<string | undefined>(localStorage.getItem("authToken") || undefined)
interface _fetch_user {
  _id: string
  fullname: string;
  username: string;
  email: string;
  phone: number;
  DOB: string;
  country : string;
}

const token = atomWithStorage<string>("authtoken", '')
const user_id  = atomWithStorage<string>("_id", '')
const user_details = atom<_fetch_user>({  _id: "",
fullname: "",
username: "",
email: "",
phone: 0,
DOB: "",
country: ""})
export const  csrfToken  = atom<string>("")

    export function set_user_auth(jwt:string, _id:string) {
    store.set(token, jwt)
    store.set(user_id, _id)
}
export function setCsrf (token:string){
  console.log(token)
  store.set(csrfToken, token)
  console.log("get",store.get(csrfToken))
}
interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
      color: string;
      type: string;
    };
    domain: string;
    ip: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    macAddress: string;
    university: string;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    company: {
      address: {
        address: string;
        city: string;
        coordinates: {
          lat: number;
          lng: number;
        };
        postalCode: string;
        state: string;
      };
      department: string;
      name: string;
      title: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
  }
  interface UserList {
    users: User[];
    total: number;
    skip: number;
    limit: number;
  }
const allusers = atom<UserList>({
    users: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  interface post_interface {
 
      id: number;
      title: string;
      body: string;
      userId: number;
      tags: string[];
      reactions: number;
    }
    interface allposts_interface  {
      posts: post_interface[];
      total: number;
      skip: number;
      limit: number;
    }
export const allposts = atom<allposts_interface>({   posts: [],
  total: 0,
  skip: 0,
  limit: 0,});
export async function  fetch_user(){
const fetch_user = await fetch("https://dummyjson.com/users")
const user = await fetch_user.json()
user && store.set(allusers, user)
}

export async function  fetch_post()
{
    const fetch_user = await fetch("https://dummyjson.com/posts")
    const posts = await fetch_user.json()
    posts && store.set(allposts, posts)
    }

 export  async function  get_user_details(){
 API.get(`/fetchuser/?id=${store.get(user_id)}`).then(response => {
  const header = response.headers
  API.defaults.headers.common["x-csrf-token"] = header["x-csrf-token"];
  store.set(user_details, response.data)})
}
export const followers_count = atom<number>(0)
export const following_count = atom<number>(0)
export async function getFollowcount(){
  await API.get(`/follow/counts/?id=${store.get(user_id)}`).then(response =>
    {
store.set(followers_count, response.data.followersCount)
store.set(following_count, response.data.followingCount)
    })
    console.log(store.get(followers_count))
}
export {token,allusers,user_id,user_details}