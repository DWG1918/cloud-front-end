<!--这是写代码时备份的东西，整合时不需要以下内容-->
<template>
    <h1>销量排名</h1>

</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, ElButton, ElInput, ElTable, ElDivider, ElCard, ElTableColumn } from 'element-plus'
import { useRouter } from 'vue-router';

import request from '@/utils/request'


const router = useRouter();




</script>

<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.el-descriptions {
    margin-top: 20px;
}

.box-card {
    height: 800px;
}

.text-wrapper {
    word-break: break-all;
    word-wrap: break-word
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>