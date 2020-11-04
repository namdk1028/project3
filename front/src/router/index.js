import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//user
import Login from '../views/user/Login.vue'
import Signup from '../views/user/Signup.vue'
import UserInfo from '../views/user/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/MainPage.vue"),
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/Message.vue"),
  },
  {
    path: "/chat/:partner",
    name: "ChatRoom",
    component: () => import("../views/ChatRoom.vue"),
  },
  //user
  {
    path: '/user/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/user/userinfo',
    name: 'userinfo',
    component: UserInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router