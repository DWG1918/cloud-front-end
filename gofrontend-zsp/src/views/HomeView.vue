<template>

    <h1>这是主页</h1>
    <button @click="useToken">token</button>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const useToken = () => {
  var service = axios.create({
    headers: {
      // 设置后端需要的传参类型
      'Content-Type': 'application/json',
      'Authorization':'bearer '+localStorage.getItem('token')
    }
  })

  service.post("http://43.139.128.42:9876/api/User/check?i=1").then(res => {
    console.log(res.data)
  }).catch((error) => {
          console.log(error)//对于所有需要token的接口，若token过期接口调用失败，
          //应跳转回登录界面，清除localstorage
        })
}


</script>