<template>
  <div id='mediation' class="mediation">
    <!-- 内容展示区域 -->
    <div class="displayArea">
      <!-- 头部标题部分 -->
      <div class="title">
        <span>人民调解</span>
        <div class="close" @click="isDisplayMedia"></div>
      </div>

      <!-- 头部行业及日期选择框部分 -->
      <div class="select">
        <div class="mediateTypeSelect">
          <span class="option1" v-for="item in mediateTypeSelectData"
            :key="item.value"
            :class="{selected:optionSelected1 === item.value}"
            @click="mediateTypeChoice(item)"> {{ item.name }}
          </span>
        </div>
        <div class="dateTypeSelect">
          <span class="option2" v-for="item in mediateDateSelectData"
            :key="item.value"
            :class="{selected:optionSelected2 === item.value}"
            @click="mediateDateChoice(item)"> {{ item.name }}
          </span>
        </div>
      </div>

      <!-- 图表展示区域部分 -->
      <div class="content">
        <!-- 第一行 -->
        <div class="row1">
          <!-- 业务数量展示 -->
          <div class="businessNum">
            <div class="chartTitleCommon">业务数量</div>
            <div class="businessContent">
              <div class="type" v-for="(item,index) in businessData" :key="index">
                <div class="icon" :class="'icon' + (index+1)"></div>
                <div class="name">
                  <span> {{ item.name }} </span>
                  <br>
                  <span class="num"> {{ item.value }} </span>
                </div>
              </div>
            </div>
          </div>
          <!-- 案件受理量展示 -->
          <div class="caseAcceptanceNum">
            <div class="chartTitleCommon">各司法所案件受理量</div>
            <div class="linkage">
              <span>联动：</span>
              <el-switch v-model="isLinkage" active-color="#1990FF" inactive-color="gray"> </el-switch>
            </div>
            <div class="chartContainer">
              <g2-custom :option="customOption" :height='320' :padding="['auto', 60]" ref="g2Custom"></g2-custom>
            </div>
          </div>
        </div>

        <!-- 第二行 -->
        <div class="row2">
          <!-- 案件类型排名展示 -->
          <div class="typeRanking">
            <div class="chartTitleCommon">案件类型排名</div>
            <div class="noTypeRakingData" v-if="typeRakingData.length===0">暂无排名数据</div>
            <div class="typeContent">
              <div class="type" v-for="(item,index) in typeRakingData"
                :key="index"
                :class="{evenNumberLine: index % 2 === 1}"
              >
                <div class="icon" :class="{overThree: index - 2 > 0}"> {{ index + 1 }} </div>
                <div class="name"> {{ item.name }} </div>
                <div class="num"> {{ item.value }} </div>
              </div>
            </div>
          </div>
          <!-- 案件受理趋势展示 -->
          <div class="acceptanceTrend">
            <div class="chartTitleCommon">案件受理趋势</div>
            <div class="trendContent">
              <g2-custom :option="customOption1" :height='300' :padding="['auto', 70]" ref="g2Custom1"></g2-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import caseAcceptNumChart from '@/utils/caseAcceptNumChart'
import caseAcceptTrendChart from '@/utils/caseAcceptTrendChart'
import { renminTJData } from '@/api.js'
export default {
  name: 'mediation',
  data () {
    return {
      isLinkage: false, // 是否联动
      optionSelected1: '', // 默认行业选择
      optionSelected2: 'YJ0003', // 默认日期选择
      mediateTypeSelectData: [ // 行业类型选择项
        {
          name: '全部',
          value: ''
        },
        {
          name: '行业专业',
          value: 1
        },
        {
          name: '传统调解',
          value: 0
        }
      ],
      mediateDateSelectData: [ // 日期类型选择项
        {
          name: '今日',
          value: 'YJ0001'
        },
        {
          name: '本月',
          value: 'YJ0002'
        },
        {
          name: '本年',
          value: 'YJ0003'
        },
        {
          name: '全部',
          value: 'YJ0004'
        }
      ],
      acceptCaseNumData: { // 案件受理量数据
        zhuZhuangT: [],
        pingJun: 0
      },
      TrendData: [], // 案件受理趋势数据
      businessData: [], // 业务数量数据
      businessDataMap: { // 业务数量类型映射表
        anJianSL: '案件受理',
        tiaoJieCG: '调解成功',
        xieYiSSL: '协议书数量'
      },
      typeRakingData: [], // 案件类型排名数据
      name: '', // 默认选择的司法所名称（请求接口数据用）
      bgControl: {// 控制选定柱状图的隐隐位置
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    // 改变显示与否的状态值的方法
    ...mapActions('mediationStore', [
      'isDisplayMedia'
    ]),

    // 案件受理量自定义图表配置项
    customOption (chart) {
      // chart 为图表实例，dataset为数据集实例
      caseAcceptNumChart(chart, this.acceptCaseNumData, this.isLinkage, this.intervalClick, this.bgControl)
    },

    // 案件受理趋势自定义图表配置项
    customOption1 (chart) {
      caseAcceptTrendChart(chart, this.TrendData, this.optionSelected2)
    },

    // 调解数据统计日期粒度变化时触发的函数（重新传入新参数请求数据）
    mediateDateChoice (item) {
      this.optionSelected2 = item.value
      this.getRenMinTJData({ time: this.optionSelected2, flag: 'True', name: this.name, profession: this.optionSelected1 })
    },

    // 调解数据统计类型变化时触发的函数（重新传入新参数请求数据）
    mediateTypeChoice (item) {
      this.optionSelected1 = item.value
      this.getRenMinTJData({ time: this.optionSelected2, flag: 'True', name: this.name, profession: this.optionSelected1 })
    },
    getShadowInterval () {

    },
    // 柱状图单个柱体点击触发函数
    intervalClick (name, index) {
      this.getRenMinTJData({ time: this.optionSelected2, flag: 'True', name: name, profession: this.optionSelected1 }, index)
    },

    // 请求并处理人民调解下钻页面数据
    async getRenMinTJData (params, params2) {
      let res = await renminTJData(params)

      // 案件受理量数据
      if (typeof params2 !== 'undefined') {
        this.bgControl = { x: params2 - 0.5, y: params2 + 0.5 }
        this.$refs.g2Custom.drawChart()
      } else {
        this.bgControl = { x: 0, y: 0 }
        this.acceptCaseNumData = res.data.data.geSiFSAJSLL
        this.$refs.g2Custom.drawChart()
      }
      // 业务数量数据
      this.businessData = []
      for (let x in res.data.data.yeWUSL) {
        this.businessData.push({ name: this.businessDataMap[x], value: res.data.data.yeWUSL[x] })
      }
      // 类型排名数据
      this.typeRakingData = res.data.data.anJianLXPM
      // 案件受理趋势数据
      this.TrendData = res.data.data.anJianSLQS
      this.$refs.g2Custom1.drawChart()
    }
  },
  created () {
    // 根据默认参数请求统计数据
    this.getRenMinTJData({ time: this.optionSelected2, flag: 'True', name: this.name, profession: this.optionSelected1 })
  },
  watch: {
    // 监听联动选项的变化来重新绘制图表以注册或消除点击事件，并重新请求数据
    isLinkage: function () {
      this.getRenMinTJData({ time: this.optionSelected2, flag: 'True', name: this.name, profession: this.optionSelected1 })
      this.$refs.g2Custom.drawChart()
    }
  }
}
</script>

<style lang="less">
  @import url('../assets/css/mediation.less');
</style>
