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
      <el-menu-item index="/admin/announcement">
          <el-icon><House /></el-icon>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="/admin/manageMatch">
          <el-icon><Pointer /></el-icon>
          <span>管理比赛</span>
        </el-menu-item>
        <el-menu-item index="/admin/handleViolation">
          <el-icon><Pointer /></el-icon>
          <span>处理违规信息</span>
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