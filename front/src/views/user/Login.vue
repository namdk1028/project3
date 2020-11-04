<template>
  <div id="login">
    <v-form class="login-form" v-model="valid">
      <v-container>
        <v-row>
          <h2>계정에<br />로그인하세요.</h2>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              color="white"
              :rules="nameRules"
              label="이름"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              color="white"
              label="비밀번호"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn class="submit-btn" rounded color="black" dark> Login </v-btn>
          <v-btn class="submit-btn" rounded color="white" @click="googleLogin">
            Login with Google
          </v-btn>
          <v-btn class="submit-btn" rounded color="white" @click="kakaoLogin">
            Login with Kakao
          </v-btn>
          <v-btn class="submit-btn" rounded color="white" @click="naverLogin">
            Login with Naver
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import KEY from '@/api/SecretKey'
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    googleLogin() {
      axios.get('http://127.0.0.1:8000/accounts/login/google/')
      .then(res => {
        window.open(res.data.url)
      })
    },
    naverLogin() {
      axios.get('http://127.0.0.1:8000/accounts/login/naver/')
      .then(res => {
        // window.open(res.data.url)
        // console.log(res.data.url)
        // const request_url = "https://nid.naver.com/oauth2.0/authorize?cliend_id=" + KEY.NAVER_CLIENT_ID + "&redirect_uri=http://localhost:8080/user/login&response_type=code"
        // console.log(request_url)
        window.open(res.data.url)
      })
    },
    kakaoLogin() {
      axios.get('http://127.0.0.1:8000/accounts/login/kakao/')
      .then(res => {
        window.open(res.data.url)
      })
    },
  },
  created() {
    console.log(this.$route.hash.split('&')[0].split('=')[1])
    console.log(this.$route.hash.length)
    if(this.$route.query.code !== undefined) {
      console.log(this.$route.query.code.length)
      if(this.$route.query.code.length === 18) {
        // console.log('naver')
        // const headers = {
        //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        //     'Access-Control-Allow-Origin':'*'
        // }
        // const body = {
        //     'grant_type': 'authorization_code',
        //     'client_id': KEY.NAVER_CLIENT_ID,
        //     'client_secret': KEY.NAVER_SECRET_KEY,
        //     'code': this.$route.query.code,
        //     'state':this.$route.query.state,
        // }
        // // const request_url = 'https://nid.naver.com/oauth2.0/token?'+'grant_type=authorization_code&'+'client_id='+KEY.NAVER_CLIENT_ID+'&client_secret='+KEY.NAVER_SECRET_KEY+'&code='+this.$route.query.code
        // axios.get('https://nid.naver.com/oauth2.0/token',{
        //   headers:headers,
        //   params:body
        // })
        // .then(res => console.log(res)) 
        // .catch(err => console.log(err.response))
        const body = {
          'token': this.$route.hash.split('&')[0].split('=')[1]
        }
        axios.post('http://127.0.0.1:8000/accounts/login/naver/callback/', body)
        .then(res => {
          console.log(res)
        })
      }else if(this.$route.query.code.length === 86) {
        console.log('kakao')
        const headers = {
            'Content-type':'application/x-www-form-urlencoded; charset=utf-8'
        }
        const body = {
            'grant_type': 'authorization_code',
            'client_id': KEY.KAKAO_API_KEY,
            'redirect_uri': 'http://localhost:8080/user/login',
            'code': this.$route.query.code,
        }
        const request_url = 'https://kauth.kakao.com/oauth/token?'+ 'grant_type=authorization_code&client_id='+KEY.KAKAO_API_KEY+'&redirect_uri=http://localhost:8080/user/login&'+'code='+this.$route.query.code
        axios.post(request_url,body,headers)
        .then(res => {
          console.log(res)
          axios.post('http://127.0.0.1:8000/accounts/login/kakao/callback/',res.data)
          .then(res => {
            console.log(res)
            this.$cookie.set('token', res.data.token)
          })
          .then(() => {
            window.close()
          })
        })
        .catch(err => console.log(err.response))
      }else {
        console.log('google')
        const body = {
          'code': this.$route.query.code,
          'client_id': KEY.GOOGLE_CLIENT_ID,
          'client_secret':  KEY.GOOGLE_SECRET_KEY,
          'redirect_uri': 'http://localhost:8080/user/login',
          'grant_type': 'authorization_code'
        }
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded'
        }
        axios.post('https://www.googleapis.com/oauth2/v4/token',body,headers)
        .then(res => {
          console.log(res)
          axios.post('http://127.0.0.1:8000/accounts/login/google/callback/',res.data)
          .then(res => {
            console.log(res)
            this.$cookie.set('token', res.data.token)
          })
          .then(() => {
            window.close()
          })
      })
      }
    }else if(this.$route.hash.length > 0) {
      console.log('hi')
      const body = {
          'token': this.$route.hash.split('&')[0].split('=')[1]
        }
        axios.post('http://127.0.0.1:8000/accounts/login/naver/callback/', body)
        .then(res => {
          console.log(res)
          this.$cookie.set('token', res.data.token)
        })
        .then(() => {
          window.close()
        })
    }else {
      console.log('no')
    }
  }
};
</script>
<style scoped src="../../assets/static/login.scss" lang="scss">
