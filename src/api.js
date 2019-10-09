import http from '@/plugins/axios.js'
// const baseURL = '/xuHuiWisdomJustice/V1.0.0'

// 接口请求
// const homePageCount = (params) => http.get(`${baseURL}/homePageCount`, params) // 实际接口
const homePageCount = (params) => http.get(`/homePageCount.json`, params) // 模拟接口
// const mapData = (params) => http.get(`${baseURL}/homePageMapData`, params) // 实际接口
const mapData = (params) => http.get(`/mapData.json`, params) // 模拟接口
// const renminTJData = (params) => http.get(`${baseURL}/downPageMediation`, params) // 实际接口
const renminTJData = (params) => http.get(`/downPageMediation.json`, params) // 模拟接口
export { homePageCount, mapData, renminTJData }
