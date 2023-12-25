<!--这是写代码时备份的东西，整合时不需要以下内容-->
<template>
    <h1>所有类别界面</h1>
    <el-button @click="loadCategory">刷新</el-button>

    <el-divider/>
        <el-card>
            <el-table :data="categoryInfo.value" style="width: 100%" max-height="500px" @vue:mounted="loadCategory" stripe
                table-layout="auto">
                <el-table-column prop="category" label="类别名称" width="90" align="center" sortable />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="seeProduct(scope.row.category)">
                            查看类别的所有产品
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    <el-divider/>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, ElButton, ElInput, ElTable, ElDivider, ElCard, ElTableColumn } from 'element-plus'
import { useRouter } from 'vue-router';

import request from '@/utils/request'


const router = useRouter();


const categoryInfo = reactive({
    "category": '',
})

const loadCategory = async() => {
    //console.log("获取产品信息")
    const response =await request.get('/Select/getAllCategory');
    //console.log(response.data.result[0])
    console.log("获取产品类别信息")
    categoryInfo.value = response.data.result
    console.log(categoryInfo)
}


const seeProduct = (category) => {
    router.push({name: "productView", params:{category: category}})
}




//详情弹出框
const dialogDetailVisible = ref(true)

//新公告弹出框
const dialogFormVisible = ref(false)

//发布后确认弹出框
const dialogVisible = ref(false)

var centerDialogVisible = ref(false)

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