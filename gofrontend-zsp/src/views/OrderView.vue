<template>
    <h1>产品所有订单</h1>
    <el-button @click="loadOrder($route.params.productid)">刷新</el-button>

    <el-divider/>
        <el-card>
            <el-table :data="orderInfo.value" style="width: 100%" max-height="500px" @vue:mounted="loadOrder($route.params.productid)" stripe
                table-layout="auto">
                <el-table-column prop="orderid" label="订单id" width="90" align="center" sortable />
                <el-table-column prop="productid" label="产品id" width="90" align="center" sortable />
                <el-table-column prop="userid" label="用户id" width="90" align="center" sortable />
                <el-table-column prop="num" label="订单数量" width="130" align="center" sortable />
                <el-table-column prop="cost" label="总价" width="240" align="center" sortable />
                <el-table-column prop="year" label="年" width="240" align="center" sortable />
                <el-table-column prop="month" label="月" width="240" align="center" sortable />
                <el-table-column prop="day" label="日" width="240" align="center" sortable />
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


const orderInfo = reactive({
    "orderid": 0,
    "productid": 0,
    "userid":0,
    "num":0,
    "cost":0,
    "year":0,
    "month":0,
    "day":0,
})

const loadOrder = async(proid) => {
    console.log("获取订单信息")
    const response =await request.get('/Select/getProductOrder?productid='+proid);
    console.log(response.data.result[0])
    console.log("获取订单信息")
    orderInfo.value = response.data.result
    console.log(orderInfo)
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