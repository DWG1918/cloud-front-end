<template>
    <h1>管理公告</h1>

    <div>
        <el-button type="primary" @click="publishAnn">发布公告</el-button>
        <el-button @click="refreshAnn">刷新</el-button>
    </div>

    <el-divider />
    <!-- 主页的表格 -->
    <div>
        <el-card style="height: 600px; margin-bottom: 0px">
            <el-table :data="annAll.value" style="width: 100%" max-height="560px" @vue:mounted="getAnnouncement" stripe
                table-layout="auto">
                <el-table-column type="index" width="50" />
                <el-table-column prop="announcement_Name" label="名称" align="center" sortable />
                <el-table-column prop="announcement_ID" label="公告ID" align="center" sortable />
                <el-table-column prop="announcement_Time" label="发布时间" align="center" sortable />
                <el-table-column prop="administrator_ID" label="管理员ID" align="center" sortable />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="seeDetail(scope.row)">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <el-divider />

    <!-- 详情弹出框 -->
    <div class="text-wrapper">
        <el-dialog v-model="dialogDetailVisible" title="详情" draggable>
            <el-descriptions :column="1">
                <el-descriptions-item label="名称">{{ showAnn.value.announcement_Name }}</el-descriptions-item>
                <el-descriptions-item label="公告ID">{{ showAnn.value.announcement_ID }}</el-descriptions-item>
                <el-descriptions-item label="发布时间">{{ showAnn.value.announcement_Time }}</el-descriptions-item>
                <el-descriptions-item label="管理员ID">{{ showAnn.value.administrator_ID }}</el-descriptions-item>
                <el-descriptions-item label="内容">{{ showAnn.value.announcement_Content }}</el-descriptions-item>
            </el-descriptions>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogDetailVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

    <!-- 发布弹出框 -->
    <div>
        <el-dialog v-model="dialogFormVisible" title="发布新公告" draggable>
            <el-form :model="announcementData">
                <el-form-item label="标题">
                    <el-input v-model="announcementData.announcement_Name" clearable type="text" :rows="1" maxlength="10"
                        placeholder="请输入标题" show-word-limit />
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="announcementData.announcement_Content" clearable type="textarea" :rows="5"
                        maxlength="100" placeholder="请输入公告内容" show-word-limit />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button @click="clearAnnouncement">清空</el-button>
                    <el-button type="primary" @click="commitAnnouncement">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>

    <!-- 发布后确认信息弹出框 -->
    <div class="text-wrapper">
        <el-dialog v-model="dialogVisible" title="确认信息" width="30%">
            <span>您的新公告已成功发出！</span>
            <br />
            <span>名称：{{ announcementData.announcement_Name }}</span>
            <br />
            <span>内容：{{ announcementData.announcement_Content }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, ElButton, ElInput } from 'element-plus'

const showAnn = reactive({
    "announcement_ID": 0,
    "announcement_Name": '',
    "announcement_Time": '',
    "administrator_ID": 0,
    "announcement_Content": ''
})

const annAll = reactive({
    "announcement_ID": 0,
    "announcement_Name": '',
    "announcement_Time": '',
    "administrator_ID": 0,
    "announcement_Content": ''
})

const announcementData = reactive({
    "announcement_Name": "",
    "announcement_Content": ""
})

const refreshAnn = () => {
    console.log("shauxin")
    annAll.value = []
    getAnnouncement()
}

const getAnnouncement = () => {
    console.log("获取数据")

    var service = axios.create({
        headers: {
            // 设置后端需要的传参类型
            //'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    })

    service
        .get('http://43.139.128.42:9876/api/User/getAllAnnouncement')
        .then((response) => {
            console.log(response.data)
            if (response.data.isSuccess) {
                console.log("获取数据成功！")
                annAll.value = response.data.result
                console.log(annAll)
            }
            else
                ElMessageBox.alert(response.data.msg)
        })
        .catch((error) => {
            console.log(error)
        })
}

const seeDetail = (data) => {
    console.log("看详情")
    showAnn.value = data
    console.log(data)
    console.log(showAnn.value)
    dialogDetailVisible.value = true
}

const publishAnn = () => {
    console.log("编辑新公告")
    dialogFormVisible.value = true
}

const commitAnnouncement = () => {
    console.log("发布数据")
    let data = JSON.parse(JSON.stringify(announcementData))
    console.log(announcementData)
    console.log(JSON.stringify(announcementData))
    console.log(data)

    var service = axios.create({
        headers: {
            // 设置后端需要的传参类型
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    })

    service.post("http://43.139.128.42:9876/api/Admin/publishAnnouncement", data).then(res => {
        console.log(res.data)
        if (res.data.isSuccess) {
            console.log("发送成功！")
            dialogVisible.value = true
            dialogFormVisible.value = false
        }
        else
            ElMessageBox.alert(res.data.msg)
    })
        .catch((error) => {
            console.log(error)
        })
}

const clearAnnouncement = () => {
    announcementData.announcement_Content = ""
    console.log("清空数据" + announcementData.announcement_Content)
}

//详情弹出框
const dialogDetailVisible = ref(false)

//新公告弹出框
const dialogFormVisible = ref(false)

//发布后确认弹出框
const dialogVisible = ref(false)

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
</style>