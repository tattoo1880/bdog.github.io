<template>
<!--  使用element-plus 建立一个个人博客主页的头部-->
  <el-header>
    <el-row>
<!--      <el-col :span="8">-->
<!--        <div class="grid-content bg-purple">-->
<!--          <img src="../assets/logo.svg" alt="logo" width="40" style="margin-top: 10px"/>-->
<!--        </div>-->
<!--      </el-col>-->
      <el-col :span="16">
        <div class="grid-content bg-purple fonnnn" style=" margin-left: 650px">
          <h1>Tattoo B-Dog</h1>
        </div>
      </el-col>
<!--      <el-col :span="8">-->
<!--        <div class="grid-content bg-purple">-->
<!--          <h1>个人博客</h1>-->
<!--        </div>-->
<!--      </el-col>-->
    </el-row>
  </el-header>
</template>
<script setup></script>
<style>
.fonnnn{
    /*更改字体为中空的斜体*/
    font-style: italic;
    font-weight: 900;
    font-family: "Times New Roman", Times, serif;
  }

</style>
