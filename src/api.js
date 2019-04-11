import http from '@/plugins/axios.js'
const baseURL = '/xuHuiWisdomJustice/V1.0.0'

// 接口请求
const homePageCount = (params) => http.get(`${baseURL}/homePageCount`, params)
const mapData = (params) => http.get(`${baseURL}/homePageMapData`, params)
export { homePageCount, mapData }
