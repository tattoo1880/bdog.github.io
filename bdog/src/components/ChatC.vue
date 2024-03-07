<template>
    <el-container class="chat-container">
        <el-row class="message-container" ref="messageContainer">
            <el-card v-for="(message, index) in messages" :key="index" class="message-card">
                <p>{{ message.text }}</p>
            </el-card>
        </el-row>
    </el-container>
    <el-row class="input-message">
        <el-input v-model="inputMessage" placeholder="请输入消息" @keyup.enter="sendMessage" class="elinput"/>
        <el-button :span="3" @click="sendMessage">submit</el-button>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Groq from 'groq-sdk'
const reply = ref('')
const boardcast = ref('')
const inputMessage = ref('')
const messages= ref([])
const apiKey = "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"
const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
})
const getReply = async (text) => {
    boardcast.value = ''
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": "You are a friendly chatbot."
            },
            {
                "role": "user",
                "content": text
            }
        ],
        "model": "mixtral-8x7b-32768",
        "temperature": 0.5,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });

    for await (const chunk of chatCompletion) {
        // process.stdout.write(chunk.choices[0]?.delta?.content || '');
        reply.value = chunk.choices[0]?.delta?.content || ''
        // console.log(chunk.choices[0]?.delta?.content || '')
        // console.log(reply.value)
        // messages.value.push({ text: reply.value, isUser: false })
        boardcast.value += reply.value + ' ' 
    }

}


const sendMessage = async () => {
    await getReply(inputMessage.value)
    inputMessage.value = ''
    messages.value.push({ text: boardcast.value, isUser: true })
    console.log(messages.value)
    scrollToBottom()
}

const scrollToBottom = () => {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


</script>

<style scoped>
.chat-container {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.message-container {
    flex: 1;
    overflow-y: auto;
}

.message-card {
    width: 70vw;
    height: 200px;
    margin: 60px auto;
    padding: 10px;
    background-color: black;
    border: 1px solid #d3e0ea;
    border-radius: 10px;
    overflow: auto;
    /* overflow-y: auto; */
}

.user-message {
    background-color: #d3e0ea;
    align-self: flex-end;
}

.input-message {
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 30px;
    margin: 100px 300px;
    /* 组件间距 */
    justify-content: space-evenly;
    align-items: center;


}


/* 自动换行 */
.message-card p {
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.elinput{
    width: 70%;
    margin: 0 auto;
}
</style>