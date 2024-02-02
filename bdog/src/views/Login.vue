<template>
    <div class="login-container">
        <el-form class="login-form">
            <h1 class="title">Clean The World</h1>
            <el-input v-model="form.username" placeholder="Username"></el-input>
            <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
            <el-button @click="handleLogin" type="primary" style="margin-left: 112px;">Login</el-button>
        </el-form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import service from '@/utils/request';
import { useLoginStore } from '@/stores/logstore.js';
const loginStore = useLoginStore();
const form = ref({
    username: '',
    password: ''
});
console.log(loginStore.isLogin);
const handleLogin = async () => {
    console.log('Login:', form.value);
    try {
        const response = await service.post('/login/', form.value);
        console.log(response.data);
        if (response.data['code'] == 200) {
            alert('登录成功');
            // useLoginStore 方法
            loginStore.setLogin(form.value.username);
            console.log(loginStore.isLogin)
            window.location.href = '/home';
        } else {
            alert('登录失败');
        }
    } catch (error) {
        console.error('An error occurred while sending the query:', error);
    }
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #000;
}

.title {
    color: #0f0;
    font-weight: bold;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0;
    animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0;
    }

    to {
        text-shadow: 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0, 0 0 50px #0f0, 0 0 60px #0f0;
    }
}

.login-form {
    width: 300px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.el-input,
.el-button {
    margin-bottom: 20px;
}

.el-input input {
    color: #0f0;
    background-color: #000;
    border-color: #0f0;
}

.el-button {
    background-color: #0f0;
    border-color: #0f0;
    color: #000;
}
</style>
  