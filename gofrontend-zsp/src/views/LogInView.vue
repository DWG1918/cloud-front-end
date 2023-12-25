<template>
  <!-- <goban maxWidth="600" maxHeight="600"></goban> -->
  <div>
    <el-input v-model="registerForm.Mail" placeholder="邮箱"></el-input>
    <el-input v-model="registerForm.password" placeholder="密码"></el-input>
  </div>
  <el-button @click="sendTheCerificationCode">发送验证码</el-button>
  <el-button @click="getuser">getAllUser</el-button>
  <el-button @click="login">登录</el-button>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox , ElButton, ElInput} from 'element-plus'

const router = useRouter();

const registerForm = reactive({
  Mail: '999@123.com',
  user_ID: "",
  password: "666666",
  create_Time: null,
  user_Permission: null,
})

const combined={
  j:registerForm,
  num:3
}

const sendTheCerificationCode = () => {
  let data = JSON.parse(JSON.stringify(registerForm))
  console.log(registerForm)
  console.log(JSON.stringify(registerForm))
  console.log(data)

  var service = axios.create({
    headers: {
      // 设置后端需要的传参类型
      'Content-Type': 'application/json',
    }
  })

  service.post("http://43.139.128.42:9876/api/User/sendEmail", data).then(res => {
    console.log(res.data)
  })
  .catch((error) => {
      console.log(error)
    })
}


const getuser = () => {
  axios
    .get('http://43.139.128.42:9876/api/User/getAllUser')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

const login = () => {
  var service = axios.create({
    headers: {
      // 设置后端需要的传参类型
      'Content-Type': 'application/json',
    }
  })

  service.post("http://43.139.128.42:9876/api/User/logIn",registerForm).then(res => {
    console.log(res.data)
    if(res.data.isSuccess){
      
      //后续写到logout时要清除localstorage
      localStorage.setItem('token', res.data.result['token']);
      const userPermissionValue = res.data.result['user_Permission'];
      const role = userPermissionValue === 1 ? 'player' : 'admin';
      localStorage.setItem('user_Permission', role);

      if(role === 'player')
        router.push('/player/home');
      else
        router.push('/admin/announcement');
    }
    else
      ElMessageBox.alert(res.data.msg)
  })
  .catch((error) => {
          console.log(error)
        })
}



</script>
