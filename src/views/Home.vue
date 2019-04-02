<template>
  <div id="home">
    <div class="pageTop">
      <div class="title">徐汇区智慧司法</div>
      <div class="select">
        <span :class="titleDateChecked === index ? 'selectOption checked' : 'selectOption'"  v-for="(date,index) in titleDateSelect" :key="index" @click="changeChecked(index)" >
          {{ date.label }}
        </span>
      </div>
      <div class="dateAndUser">
        <span> {{ test }} </span>
        <span> {{ userName }} </span>
      </div>
    </div>
    <div class="pageContent">
      <div class="left">
        <div class="boxTitle boxTitle1">
          <div class="icon"></div>
          <span class="content">重点关注事件</span>
        </div>
        <div class="box">
          <div class="tableHead">
            <span v-for="(title,index) in tableTitles" :key="index"> {{ title }}</span>
          </div>
          <div class="tableBody" v-if="importantEvents.length>=8">
            <rollScreen :height='44' :lineNum='8' :time='3000' :dLength="importantEvents.length">
              <div class="tableTr clearfix" slot="slide" v-for="(item, index) in importantEvents" :key="index">
                <span class="once" v-for="(value,index1) in item" :key="index1"> {{ value }} </span>
              </div>
              <div class="tableTr clearfix" slot="slide" v-for="(item, index) in importantEvents" :key="`copy${index}`">
                <span class="once" v-for="(value,index1) in item" :key="index1"> {{ value }} </span>
              </div>
            </rollScreen>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="box1">
          <div class="boxTitle boxTitle1">
            <div class="title">
              <div class="icon"></div>
              <span class="content">法律咨询</span>
            </div>
            <div class="dataView">
              <span class="number">
                {{ legalAdvice.num }}
                <span class="unit">次</span>
              </span>
              <div class="contrast" v-if="legalAdvice.contrast!=='none'">
                <div class="arrow" :class="{add:legalAdvice.contrast === 'increase', sub:legalAdvice.contrast === 'reduce'}">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:legalAdvice.contrast === 'increase', reduceNum:legalAdvice.contrast === 'reduce'}">
                  {{ legalAdvice.contrastNum }}
                </div>
              </div>
            </div>
          </div>
          <div class="boxContent">
            <div class="type" v-for="(item,index) in legalAdviceType" :key="index">
              <div class="name"> {{ item.name }} </div>
              <div class="rate">
                <div class="rated" :style="{width:item.rate + '%'}"></div>
              </div>
              <div class="num">
                {{ item.num }}
                <span class="unit">次</span>
              </div>
            </div>
          </div>
        </div>
        <div class="box2">
          <div class="boxTitle boxTitle2">
            <div class="title">
              <div class="icon"></div>
              <span class="content">人民调解</span>
            </div>
            <div class="dataView">
              <span class="number">
                {{ mediation.num }}
                <span class="unit">件</span>
              </span>
              <div class="contrast"  v-if="mediation.contrast!=='none'">
                <div class="arrow" :class="{add:mediation.contrast === 'increase', sub:mediation.contrast === 'reduce'}">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:mediation.contrast === 'increase', reduceNum:mediation.contrast === 'reduce'}">
                  {{ mediation.contrastNum }}
                </div>
              </div>
            </div>
          </div>
          <div class="pictureRing">
            <div class="ringDisplay">
              <g2-pie :type="'ring'" :axis-name="{name:'年份', value:'GDP(亿美元)'}" :legendOption='{show:false}' :colorMap="mediationColor"
                :data="mediationData"
                :guide="{name:'调解类别'}"
                :height='99'
                class="picture">
              </g2-pie>
            </div>
            <div class="typeDescription">
              <div class="type" v-for="(item,index) in mediationData" :key='index'>
                <div class="icon" :style="{background:iconColor(mediationColor, index)}"></div>
                <div class="name"> {{ item.name }} </div>
                <div class="num">
                  {{ item.value }}
                  <span class="unit">件</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box3">
          <div class="boxTitle boxTitle3">
            <div class="title">
              <div class="icon"></div>
              <span class="content">法律援助</span>
            </div>
            <div class="dataView">
              <span class="number">
                {{ legalAidData.num }}
                <span class="unit">件</span>
              </span>
              <div class="contrast"  v-if="legalAidData.contrast!=='none'">
                <div class="arrow" :class="{add:legalAidData.contrast === 'increase', sub:legalAidData.contrast === 'reduce'}">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:legalAidData.contrast === 'increase', reduceNum:legalAidData.contrast === 'reduce'}">
                  {{ legalAidData.contrastNum }}
                </div>
              </div>
            </div>
          </div>
          <div class="pictureRing">
            <div class="ringDisplay">
              <g2-pie :type="'ring'" :axis-name="{name:'年份', value:'GDP(亿美元)'}" :legendOption='{show:false}' :colorMap="legalAidColor"
                :data="legalAid"
                :guide="{name:'援助类别'}"
                :height='99'
                class="picture">
              </g2-pie>
            </div>
            <div class="typeDescription">
              <div class="type" v-for="(item,index) in legalAid" :key='index'>
                <div class="icon" :style="{background:iconColor(legalAidColor, index)}"></div>
                <div class="name"> {{ item.name }} </div>
                <div class="num">
                  {{ item.value }}
                  <span class="unit">件</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box4">
          <div class="boxTitle boxTitle4">
            <div class="title">
              <div class="icon"></div>
              <span class="content">安置帮教</span>
            </div>
            <div class="dataView">
              <span class="number">
                {{ azbj.num }}
                <span class="unit">件</span>
              </span>
              <div class="contrast"  v-if="azbj.contrast!=='none'">
                <div class="arrow" :class="{add:azbj.contrast === 'increase', sub:azbj.contrast === 'reduce'}">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:azbj.contrast === 'increase', reduceNum:azbj.contrast === 'reduce'}">
                  {{ azbj.contrastNum }}
                </div>
              </div>
            </div>
          </div>
          <div class="boxContent">
            <div class="typeContent" v-for="(item,index) in azbjData" :key="index" :class="'typeContent' + (index + 1)">
              <div class="icon" :class="'icon' + (index + 1)"></div>
              <div class="textContent">
                <span class="title"> {{item.name}} </span>
                <br>
                <span class="num"> {{item.value}} </span>
                <span class="unit">人</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageFooter">
      <div class="member">
        <div class="typeContent" v-for="(item,index) in memberData" :key="index">
          <div class="icon" :class="'icon' + (index+1)"></div>
          <div class="textContent">
            <span class="title"> {{ item.name }} </span>
            <br>
            <span class="num"> {{ item.value }} </span>
          </div>
        </div>
      </div>
      <div class="select"></div>
    </div>
    <div class="mapArea">
      <mapview
        :map-config="{center:[121.43764247619627,31.189655076352018], zoom:15, pitch:60, bearing:0}"
        :osm-config="{osmUrl: osmUrl , backgroundStyle: 'custombrightstyle'}"
        :map-types="['point']"
        :line="{color: 'green', width: 3, opacity: 0.5, useCurve: true, showAnimation: true, data:[[{lat: 122,lng: 40},{lat: 120,lng: 30}], [{lat: 110,lng: 36},{lat: 120,lng: 30}]]}"
        :point="{color: 'yellow', textColor: 'red', showAnimation: true, opacity: 0.8, radius: 10, textOffset: 1, data: [{ lat: 122, lng: 40, value: 10, name: '地点1' }, { lat: 122, lng: 40.1, value: 30, name: '地点2' }, { lat: 122, lng: 42, value: 10, name: '地点3' }]}"
        :heatmap="[{lat: 120.1,lng: 30.1,value: 2.1}, {lat: 120.2,lng: 30.2,value: 2.2}, {lat: 120.3,lng: 30.3,value: 2.1}, {lat: 120.4,lng: 30.4,value: 2.2}, {lat: 120.5,lng: 30.5,value: 2.1}, {lat: 120.6,lng: 30.6,value: 2.2}]"
      ></mapview>
    </div>
  </div>
</template>

<script>
import { getCustomDate } from '../plugins/dateFormat'
import rollScreen from '../components/rollScreen.vue'
export default {
  name: 'home',
  components: {
    rollScreen
  },
  data () {
    return {
      mediationColor: ['#6E56FD', '#EEBC25', '#E33998', '#009CD9'],
      legalAidColor: ['#009CD9', '#E33998', '#EEBC25', '#6E56FD'],
      azbjData: [
        {
          name: '帮教-在册',
          value: 4125
        },
        {
          name: '重新犯罪人员',
          value: 190
        },
        {
          name: '矫正-在册',
          value: 295
        },
        {
          name: '再犯罪人员',
          value: 4
        }
      ],
      memberData: [
        {
          name: '司法所',
          value: 13
        },
        {
          name: '调委会',
          value: 349
        },
        {
          name: '律师事务所',
          value: 18
        },
        {
          name: '工作人员',
          value: 27
        },
        {
          name: '调解员',
          value: 1779
        },
        {
          name: '律师',
          value: 191
        },
        {
          name: '法援律师',
          value: 19
        }
      ],
      legalAdvice: {
        num: 1389,
        contrast: 'increase',
        contrastNum: 3296
      },
      mediation: {
        num: 12,
        contrast: 'reduce',
        contrastNum: 1896
      },
      legalAidData: {
        num: 4,
        contrast: 'none',
        contrastNum: 0
      },
      azbj: {
        num: 4614,
        contrast: 'none',
        contrastNum: 0
      },
      mediationData: [
        {
          name: '行业专业调解',
          value: 10
        },
        {
          name: '传统调解',
          value: 2
        }
      ],
      legalAid: [
        {
          name: '刑事案件',
          value: 3
        },
        {
          name: '非刑事案件',
          value: 1
        }
      ],
      legalAdviceType: [
        {
          name: '热线服务',
          rate: 90,
          num: 1000
        },
        {
          name: '互联网咨询',
          rate: 80,
          num: 290
        },
        {
          name: '线下服务',
          rate: 30,
          num: 99
        }
      ],
      titleDateChecked: 0,
      titleDateSelect: [
        { label: '今日', value: 0 },
        { label: '本月', value: 1 },
        { label: '本年', value: 2 },
        { label: '全部', value: 3 }
      ],
      titleDate: '',
      userName: '徐汇区司法局',
      osmUrl: process.env.VUE_APP_OSMURL,
      tableTitles: [
        '来源', '案件类型', '时间', '状态'
      ],
      importantEvents: [
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' },
        { origin: '人名调解', type: '群体性事件', time: '19-3-6 09:00', status: '案件受理' }
      ]
    }
  },
  methods: {
    changeChecked (index) {
      this.titleDateChecked = index
    },
    setTitleDate () {
      this.titleDate = getCustomDate(new Date(), 'default')
      console.log(getCustomDate(new Date(), 'default'))
    },
    iconColor (colorName, index) {
      return colorName[(index % colorName.length)]
    }
  },
  computed: {
    test () {
      return this.titleDate
    }
  },
  created () {},
  mounted () {
    this.setTitleDate()
  },
  updated () {
  }
}
</script>

<style lang="less">
@import url('../assets/css/home.less');
</style>
