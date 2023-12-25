<!--这是写代码时备份的东西，整合时不需要以下内容-->
<template>
    <h1>该类别产品界面</h1>
    <el-button @click="loadProduct($route.params.category)">刷新</el-button>

    <el-divider/>
        <el-card>
            <el-table :data="productInfo.value" style="width: 100%" max-height="500px" @vue:mounted="loadProduct($route.params.category)" stripe
                table-layout="auto">
                <el-table-column prop="productid" label="产品id" width="90" align="center" sortable />
                <el-table-column prop="productname" label="产品名称" width="130" align="center" sortable />
                <el-table-column prop="category" label="产品类别" width="240" align="center" sortable />
                <el-table-column prop="price" label="产品价格" width="240" align="center" sortable />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="seeDetail(scope.row.productid)">
                            查看产品所有订单
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


const productInfo = reactive({
    "productid": 0,
    "productname": '',
    "category": '',
    "price": 0,
})

const loadProduct = async(category) => {
    //console.log("获取产品信息")
    const response =await request.get('/Select/getProductByCategory?category='+category);
    //console.log(response.data.result[0])
    console.log("获取产品信息")
    productInfo.value = response.data.result
    console.log(productInfo)
}


const seeDetail = (productid) => {
    router.push({name: "orderView", params:{productid: productid}})
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