<template>
  <aside class="sidebar">
    <!-- 个人简介 -->
    <section class="profile">
      <img src="../assets/GA_ZLJ3WYAAETew.jpeg" alt="Your Name" width="150px" height="200px" />
      <h3>Townly Stone</h3>
      <p>一只迷路的Blind Dog</p>
    </section>

    <!-- 最新文章 -->
    <section class="recent-posts">
      <h4>最新文章</h4>
      <ul>
        <li v-for="post in recentPosts" :key="post.id">
          <a :href="`/post/${post.id}`">{{ post.title }}</a>
        </li>
      </ul>
    </section>

    <!-- 分类列表 -->
    <section class="categories">
      <h4>分类</h4>
      <ul>
        <li v-for="category in categories" :key="category">
          <a href="#">{ category }</a>
        </li>
      </ul>
    </section>

    <!-- 标签云 -->
    <section class="tags">
      <h4>标签</h4>
      <div>
        <a v-for="tag in tags" :key="tag" href="#" class="tag">{{ tag }}</a>
      </div>
    </section>

    <!-- 社交媒体链接 -->
    <section class="social-media">
      <h4>关注我</h4>
      <a href="https://github.com/your-github">GitHub</a>
      <a href="https://linkedin.com/in/your-linkedin">LinkedIn</a>
      <a href="https://twitter.com/your-twitter">Twitter</a>
    </section>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
const recentPosts = ref([
  { id: 1, title: 'Hello World' },
  { id: 2, title: 'Hello Vue 3' },
  { id: 3, title: 'Hello Vite' },
])
const categories = ref([
  'Vue',
  'React',
  'Angular',
  'JavaScript',
  'CSS',
  'HTML',
])
const tags = ref([
  'Vue',
  'React',
  'Angular',
  'JavaScript',
  'CSS',
  'HTML',
])

</script>

<style scoped>
.sidebar {
  /* 你的侧边栏样式 */
}

.profile img {
  /* 个人照片样式 */
}

.recent-posts ul, .categories ul, .tags div {
  /* 列表样式 */
}

.tag {
  /* 标签样式 */
}
</style>
