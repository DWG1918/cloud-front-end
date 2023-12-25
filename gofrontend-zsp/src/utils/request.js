import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
});

export default service;  // 导出创建的 axios 实例