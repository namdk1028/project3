import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

//user
import Login from "../views/user/Login.vue";
import Signup from "../views/user/Signup.vue";
import UserInfo from "../views/user/UserInfo.vue";
import Upload from "../views/user/Upload.vue";
import Loading from "../views/user/Loading.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/MainPage.vue"),
  },
  {
    path: "/maincopy",
    name: "MainCopy",
    component: () => import("../views/MainPageCopy.vue"),
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
    props: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  //user
  {
    path: "/user/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/user/userinfo",
    name: "UserInfo",
    component: UserInfo,
  },
  {
    path: "/user/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/user/loading",
    name: "Loading",
    component: Loading,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
