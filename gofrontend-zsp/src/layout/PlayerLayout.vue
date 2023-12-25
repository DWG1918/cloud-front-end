<template>
    <el-container>
    <el-aside width="255px"> <!-- 侧边栏宽255px -->
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo left-menu"
        :default-active="$route.path"
        text-color="#fff"
        :router="true"
      >
        <el-menu-item index="/player/home">
          <el-icon><House /></el-icon>
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="/player/apply">
          <el-icon><Pointer /></el-icon>
          <span>对局申请</span>
        </el-menu-item>
        <el-menu-item index="/player/game">
          <el-icon><Pointer /></el-icon>
          <span>当前对局</span>
        </el-menu-item>
        <el-menu-item index="/player/allGame">
          <el-icon><Pointer /></el-icon>
          <span>所有对局</span>
        </el-menu-item>
        <el-menu-item index="/player/allMatch">
          <el-icon><Pointer /></el-icon>
          <span>所有比赛</span>
        </el-menu-item>
        <el-menu-item index="/player/allPost">
          <el-icon><Pointer /></el-icon>
          <span>论坛</span>
        </el-menu-item>
        <el-menu-item index="/player/allExercise">
          <el-icon><Pointer /></el-icon>
          <span>习题</span>
        </el-menu-item>
        <el-menu-item index="/player/selfInfo">
          <el-icon><Pointer /></el-icon>
          <span>个人信息</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>


</script>

<style>
.left-menu{
    height: 100vh;
  }
</style>