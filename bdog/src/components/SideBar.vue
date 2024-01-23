<template>
  <aside class="sidebar">
    <!-- 个人简介 -->
    <section class="profile">
      <img src="../assets/joker.jpeg" alt="Your Name" width="180px" height="180px"
        style="border-radius: 50%; margin-left:5px;margin-top: 2px;" />
      <h3 style="margin-left: 10px;" class="atitle">Townly Stone</h3>
      <p style="margin-left: 10px;" class="atitle">----------------</p>
    </section>
    <section class="my_info" style="margin-left: 50px;">
      <h4>资料库</h4>
      <ul>
        <li>
          <a href="/lib">资料库</a>
        </li>
        <li>
          <a href="/movie">视频库</a>
        </li>
        <li>
          <a href="/av">AV库</a>
        </li>
        <li>
          <a href="/pdf">pdf转换</a>
        </li>
      </ul>
    </section>
    <!-- 最新文章 -->
    <section class="recent-posts" style="margin-left: 50px;">
      <h4><a href="/home">代码区</a></h4>

      <ul>
        <li v-for="post in recentPosts" :key="post.id">
          <a href="#">{{ post.title }}</a>
        </li>
      </ul>
      <h4><a href="/news">今日新闻</a></h4>
    </section>

    <!-- 分类列表 -->
    <section class="categories">
      <h4 style="margin-left: 50px;">描述</h4>
      <ul style="margin-left: 50px;">
        <li v-for="post in recentPosts" :key="post.id">
          <a href="#">{{ post.desc }}</a>
        </li>
      </ul>
    </section>

    <!-- 标签云 -->
    <!--    <section class="tags">-->
    <!--      <h4>标签</h4>-->
    <!--      <div>-->
    <!--        <a v-for="tag in tags" :key="tag" href="#" class="tag">{{ tag }}</a>-->
    <!--      </div>-->
    <!--    </section>-->

    <!-- 社交媒体链接 -->
    <section class="social-media" style="margin-left: 50px;">
      <h4>关注我</h4>
      <a href="https://github.com/tattoo1880">GitHub</a>
      <br>
      <a href="https://www.youtube.com">Youtube</a>
      <br>
      <a href="https://twitter.com/">Twitter</a>
    </section>

  </aside>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { FormdataStore } from "@/stores/formdata"
const formData = FormdataStore()

const recentPosts = ref(formData.formdata)
// 使用watchEffect监听formData.formdata的变化
onBeforeMount(() => {
  watchEffect(() => {
    recentPosts.value = formData.formdata
  })
})

</script>

<style scoped>
a {
  color :#0f0;
  text-decoration: none;
}

a:hover{
  text-decoration: underline;
}

a:visited {
  color: #0f0; /* 可根据需要更改颜色 */
}

h4 {
  color: #0f0;
}
.atitle {
    color: #0f0;
    font-weight: bold;
    font-size: 15px;
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
li {
  color: #0f0; /* 列表项文本颜色 */
  list-style-type: none; /* 去除默认的列表标记 */
  position: relative; /* 设置相对定位，以便为 ::before 伪元素做绝对定位 */
}

/* 使用 ::before 伪元素创建自定义的列表标记 */
li::before {
  content: '\2022'; /* 使用 Unicode 实体，这里是实心圆点（&bull;）*/
  color: #0f0; /* 列表标记颜色，可以根据需要调整 */
  display: inline-block; /* 将 ::before 伪元素设为内联块级元素 */
  width: 1em; /* 设置宽度，可以根据需要调整 */
  margin-left: -1em; /* 负的左外边距，使列表标记与文本对齐 */
  position: absolute; /* 绝对定位，相对于 li 元素定位 */
  left: 0; /* 位置居左 */
}
</style>
