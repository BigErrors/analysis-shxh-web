<template>
  <div id='mediation' class="mediation">
    <div class="displayArea">
      <div class="title">
        <span>人民调解</span>
        <div class="close" @click="isDisplayMedia"></div>
      </div>
      <div class="select">
        <div class="mediateTypeSelect">
          <span class="option1" v-for="item in mediateTypeSelectData"
            :key="item.value"
            :class="{selected:optionSelected1 === item.value}"
            @click="optionSelected1 = item.value"> {{ item.name }}
          </span>
        </div>
        <div class="dateTypeSelect">
          <span class="option2" v-for="item in mediateDateSelectData"
            :key="item.value"
            :class="{selected:optionSelected2 === item.value}"
            @click="optionSelected2 = item.value"> {{ item.name }}
          </span>
        </div>
      </div>
      <div class="content">
        <div class="row1">
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
        <div class="row2">
          <div class="typeRanking">
            <div class="chartTitleCommon">案件类型排名</div>
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
          <div class="acceptanceTrend">
            <div class="chartTitleCommon">案件受理趋势</div>
            <div class="trendContent">
              <g2-custom :option="customOption1" :height='300' :padding="['auto', 70]" ></g2-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import caseAcceptNumChart from '@/components/caseAcceptNumChart'
import caseAcceptTrendChart from '@/components/caseAcceptTrendChart'
export default {
  name: 'mediation',
  data () {
    return {
      isLinkage: true,
      optionSelected1: 1,
      optionSelected2: 1,
      mediateTypeSelectData: [
        {
          name: '全部',
          value: 1
        },
        {
          name: '行业专业',
          value: 2
        },
        {
          name: '传统调解',
          value: 3
        }
      ],
      mediateDateSelectData: [
        {
          name: '今日',
          value: 1
        },
        {
          name: '本月',
          value: 2
        },
        {
          name: '本年',
          value: 3
        },
        {
          name: '全部',
          value: 4
        }
      ],
      businessData: [
        {
          name: '案件受理',
          value: 1245
        },
        {
          name: '调解成功',
          value: 937
        },
        {
          name: '协议书数量',
          value: 684
        }
      ],
      acceptCaseNumData: {
        averageNum: 136,
        data: [
          {
            name: '长桥',
            value: 304
          }, {
            name: '华泾',
            value: 225
          }, {
            name: '徐家汇',
            value: 213
          }, {
            name: '渭河泾',
            value: 199
          }, {
            name: '枫林路',
            value: 187
          }, {
            name: '田林',
            value: 142
          }, {
            name: '龙华',
            value: 137
          }, {
            name: '凌云路',
            value: 113
          }, {
            name: '湖南路',
            value: 79
          }, {
            name: '斜土路',
            value: 55
          }, {
            name: '天平路',
            value: 54
          }, {
            name: '虹梅路',
            value: 39
          }, {
            name: '康健',
            value: 30
          }
        ]
      },
      typeRakingData: [
        {
          name: '道路交通事故',
          value: 534
        },
        {
          name: '消费纠纷',
          value: 212
        },
        {
          name: '房产纠纷',
          value: 158
        },
        {
          name: '劳动纠纷',
          value: 79
        },
        {
          name: '邻里纠纷',
          value: 76
        },
        {
          name: '继承纠纷',
          value: 54
        },
        {
          name: '治安刑事',
          value: 31
        }
      ],
      TrendData: [
        {
          name: '0点',
          value: 0,
          type: '当前'
        },
        {
          name: '2点',
          value: 0,
          type: '当前'
        },
        {
          name: '4点',
          value: 0,
          type: '当前'
        },
        {
          name: '6点',
          value: 0,
          type: '当前'
        },
        {
          name: '8点',
          value: 0,
          type: '当前'
        },
        {
          name: '10点',
          value: 5,
          type: '当前'
        },
        {
          name: '12点',
          value: 3,
          type: '当前'
        },
        {
          name: '14点',
          value: 25,
          type: '当前'
        },
        {
          name: '16点',
          value: 23,
          type: '当前'
        },
        {
          name: '18点',
          value: 13,
          type: '当前'
        },
        {
          name: '20点',
          value: 1,
          type: '当前'
        },
        {
          name: '22点',
          value: 0,
          type: '当前'
        },
        {
          name: '24点',
          value: 0,
          type: '当前'
        },
        {
          name: '0点',
          value: 0,
          type: '历史平均'
        },
        {
          name: '2点',
          value: 0,
          type: '历史平均'
        },
        {
          name: '4点',
          value: 0,
          type: '历史平均'
        },
        {
          name: '6点',
          value: 0,
          type: '历史平均'
        },
        {
          name: '8点',
          value: 0,
          type: '历史平均'
        },
        {
          name: '10点',
          value: 2,
          type: '历史平均'
        },
        {
          name: '12点',
          value: 4,
          type: '历史平均'
        },
        {
          name: '14点',
          value: 10,
          type: '历史平均'
        },
        {
          name: '16点',
          value: 22,
          type: '历史平均'
        },
        {
          name: '18点',
          value: 13,
          type: '历史平均'
        },
        {
          name: '20点',
          value: 1,
          type: '历史平均'
        },
        {
          name: '22点',
          value: 0,
          type: '历史平均'
        },
        {
          name: '24点',
          value: 0,
          type: '历史平均'
        }
      ],
      datatest: []
    }
  },
  methods: {
    ...mapActions('mediationStore', [
      'isDisplayMedia'
    ]),
    customOption (chart) {
      // chart 为图表实例，dataset为数据集实例
      caseAcceptNumChart(chart, this.acceptCaseNumData, this.isLinkage)
    },
    customOption1 (chart) {
      caseAcceptTrendChart(chart, this.datatest)
    }
  },
  watch: {
    // 监听联动选项的变化来重新绘制图表以注册或消除点击事件
    isLinkage: function () {
      this.$refs.g2Custom.drawChart()
      // this.$refs.g2Area.drawChart(this.$refs.g2Area.data)
    }
  }
}
</script>

<style lang="less">
  @import url('../assets/css/mediation.less');
</style>
