<template>
  <!-- 首页 -->
  <div id="home">

    <!-- 头部（标题、选择器、日期时间、用户名） -->
    <div class="pageTop">
      <div class="title">徐汇区智慧司法</div>
      <div class="select">
        <span :class="titleDateChecked === index ? 'selectOption checked' : 'selectOption'"  v-for="(date,index) in titleDateSelect" :key="index" @click="changeChecked(index, date.value)" >
          {{ date.label }}
        </span>
      </div>
      <div class="dateAndUser">
        <timeDisplay/>
        <span> {{ userName }} </span>
      </div>
    </div>

    <!-- 内容区（数据展示） -->
    <div class="pageContent">
      <!-- 左侧滚动表格 -->
      <div class="left">
        <div class="boxTitle boxTitle1">
          <div class="icon"></div>
          <span class="content">重点关注事件</span>
        </div>
        <div class="box">
          <div class="tableHead">
            <span v-for="(title,index) in tableTitles" :key="index"> {{ title }}</span>
          </div>
          <!-- 若展示内容行数大于8，则滚动 -->
          <div class="tableBody" v-if="importantEvents.length>=8">
            <!-- rollContent 为自定义的滚动组件 -->
            <tableRolling :height='44' :dLength=importantEvents.length :time='3000' :lineNum='8' >
              <div slot="slide">
                <div class="tableTr clearfix" v-for="(item, index) in importantEvents" :key="index" :class="{eventNumberLine: index % 2 === 1}">
                  <span class="once" > {{ item.laiYuan }} </span>
                  <span class="once" > {{ item.anJianLX }} </span>
                  <span class="once" > {{ item.shiJian }} </span>
                  <span class="once" > {{ item.zhuangTai }} </span>
                </div>
                <div class="tableTr clearfix" v-for="(item, index) in importantEvents" :key="`copy${index}`" :class="{eventNumberLine: index % 2 === 1}">
                  <span class="once" > {{ item.laiYuan }} </span>
                  <span class="once" > {{ item.anJianLX }} </span>
                  <span class="once" > {{ item.shiJian }} </span>
                  <span class="once" > {{ item.zhuangTai }} </span>
                </div>
              </div>
            </tableRolling>
          </div>
          <!-- 若展示内容行数小于8，展示全部；展示内容为空时，显示'暂无重点关注事件' -->
          <div class="tableBody" v-if="importantEvents.length<8" :class="{noneContent:importantEvents.length===0}">
            <div class="tableBody">
              <div class="tableTr clearfix" v-for="(item, index) in importantEvents" :key="index" :class="{eventNumberLine: index % 2 === 1}">
                <span class="once" > {{ item.laiYuan }} </span>
                <span class="once" > {{ item.anJianLX }} </span>
                <span class="once" > {{ item.shiJian }} </span>
                <span class="once" > {{ item.zhuangTai }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧数据展示 -->
      <div class="right">
        <div class="box1">
          <div class="boxTitle boxTitle1">
            <div class="title">
              <div class="icon"></div>
              <span class="content">法律咨询</span>
            </div>
            <div class="dataView">
              <span class="number">
                {{legalAdviceData.jianShu}}
                <span class="unit">次</span>
              </span>
              <div class="contrast" v-if="legalAdviceData.biJiaoZ!==''">
                <div class="arrow" :class="{add:legalAdviceData.biJiaoZ > 0, sub:legalAdviceData.biJiaoZ <= 0 }">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:legalAdviceData.biJiaoZ > 0, reduceNum:legalAdviceData.biJiaoZ <= 0}">
                  {{ Math.round(100 * Math.abs(legalAdviceData.biJiaoZ)) }}%
                </div>
              </div>
            </div>
          </div>
          <div class="boxContent">
            <div class="type" v-for="(item,index) in legalAdviceData.dat" :key="index">
              <div class="name"> {{ item.name }} </div>
              <div class="rate">
                <div class="rated" :style="{width:item.rate * 100 + '%', transition: 'width 1s' }"></div>
              </div>
              <div class="num">
                {{ item.value }}
                <span class="unit">次</span>
              </div>
            </div>
          </div>
        </div>
        <div class="box2">
          <div class="boxTitle boxTitle2" @click="isDisplayMedia">
            <div class="title" >
              <div class="icon"></div>
              <span class="content">人民调解</span>
            </div>
            <div class="dataView">
              <span class="number">
                {{ mediationData.jianShu }}
                <span class="unit">件</span>
              </span>
              <div class="contrast"  v-if="mediationData.biJiaoZ!==''">
                <div class="arrow" :class="{add:mediationData.biJiaoZ > 0, sub:mediationData.biJiaoZ <= 0 }">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:mediationData.biJiaoZ > 0, reduceNum:mediationData.biJiaoZ <= 0}">
                  {{ 100 * Math.abs(mediationData.biJiaoZ) }}%
                </div>
              </div>
            </div>
          </div>
          <div class="pictureRing">
            <div class="ringDisplay">
              <g2-pie :type="'ring'" :legendOption='{show:false}' :colorMap="mediationColor"
                :data="mediationData.dat"
                :guide="{name:'调解类别'}"
                :height='99'
                :useTooltip='false'
                class="picture">
              </g2-pie>
            </div>
            <div class="typeDescription">
              <div class="type" v-for="(item,index) in mediationData.dat" :key='index'>
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
                {{ legalAidData.jianShu }}
                <span class="unit">件</span>
              </span>
              <div class="contrast"  v-if="legalAidData.biJiaoZ!==''">
                <div class="arrow" :class="{add:legalAidData.biJiaoZ > 0, sub:legalAidData.biJiaoZ <= 0}">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:legalAidData.biJiaoZ > 0, reduceNum:legalAidData.biJiaoZ <= 0}">
                  {{ Math.abs(legalAidData.biJiaoZ) * 100 }}%
                </div>
              </div>
            </div>
          </div>
          <div class="pictureRing">
            <div class="ringDisplay">
              <g2-pie :type="'ring'" :useTooltip='false' :legendOption='{show:false}' :colorMap="legalAidColor"
                :data="legalAidData.dat"
                :guide="{name:'援助类别'}"
                :height='99'
                class="picture">
              </g2-pie>
            </div>
            <div class="typeDescription">
              <div class="type" v-for="(item,index) in legalAidData.dat" :key='index'>
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
                <span class="status">当前</span>
                {{ azbjData.jianShu }}
                <span class="unit">人</span>
              </span>
              <div class="contrast"  v-if="azbjData.biJiaoZ!==''">
                <div class="arrow" :class="{add:azbjData.biJiaoZ > 0, sub:azbjData.biJiaoZ <= 0}">
                  <div class="triangle"></div>
                  <div class="line"></div>
                </div>
                <div class="num" :class="{increaseNum:azbjData.biJiaoZ > 0, reduceNum:azbjData.biJiaoZ <= 0}">
                  {{ Math.abs(azbjData.biJiaoZ) * 100 }}%
                </div>
              </div>
            </div>
          </div>
          <div class="boxContent">
            <div class="dividingLine"></div>
            <div class="typeContent" v-for="(item,index) in azbjData.dat" :key="index" :class="'typeContent' + (index + 1)">
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

    <!-- 底部人员机构信息及图层控制 -->
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
      <div class="select">
        <div class="allEvents">
          <el-select v-model="allEventsSelectDefault" placeholder="请选择" @change="changeMapEventData">
            <el-option v-for="item in allEventsSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="allOrg">
          <el-select v-model="allOrgSelectDefault" placeholder="请选择" @change="changeMapOrgData">
            <el-option v-for="item in allOrgSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

      </div>
    </div>
    <!-- 底部遮罩 -->
    <div class="footerMask"></div>
    <!-- 右侧遮罩 -->
    <div class="rightMask"></div>
    <!-- 左侧遮罩 -->
    <div class="leftMask"></div>

    <!-- 地图展示区域 -->
    <div class="mapArea">
      <mapview
        :map-config="{center:centerPosition, zoom:14, pitch:60, bearing:0}"
        :osm-config="{osmUrl: osmUrl , backgroundStyle: 'custombrightstyle'}"
        :map-types="['heatmap']"
        :heatmap="heatmap"
      >
        <markers :data="markerData" @markerClick="markerClick"></markers>
        <popup :showPopup="showPopup" :laglng="popupPosition" :htmlContent="popupHtmlContent" :closeOnClick="false" ></popup>
      </mapview>
    </div>

    <!-- 人民调解下钻页 -->
    <mediation v-if="mediaDisplay"></mediation>
  </div>
</template>

<script>
import tableRolling from '@/components/tableRollingControl.vue'
import mediation from '@/views/Mediation.vue'
import { mapActions, mapGetters } from 'vuex'
import { homePageCount, mapData } from '@/api.js'
import image from '@/utils/imageBase64.js'
import timeDisplay from '@/components/timeDisplay.vue'

export default {
  name: 'home',
  components: {
    tableRolling,
    mediation,
    timeDisplay
  },
  data () {
    return {
      popupHtmlContent: '',
      centerPosition: [121.442054, 31.14045],
      popupPosition: [121.442054, 31.14045],
      showPopup: false,
      legalAdviceData: {}, // 页面右侧法律咨询数据
      memberData: [], // 页面脚部机构人员数据
      mediationData: {}, // 页面右侧人民调解数据
      legalAidData: {}, // 页面右侧法律援助数据
      azbjData: {}, // 页面右侧安置帮教数据
      jiGouRYMap: { // 人员机构中文名映射
        siFaS: '司法所',
        tiaoWeiH: '调委会',
        lvShiSWS: '律师事务所',
        gongZuoRY: '工作人员',
        tiaoJieY: '调解员',
        LvShi: '律师',
        faYuanLS: '法援律师'
      },
      mediationColor: ['#6E56FD', '#EEBC25', '#E33998', '#009CD9'], // 页面右侧人民调解环形图颜色顺序
      legalAidColor: ['#009CD9', '#E33998', '#EEBC25', '#6E56FD'], // 页面右侧法律援助环形图颜色顺序
      allEventsSelectDefault: 0, // 底部下拉框默认选择 隐藏全部事件
      allEventsSelect: [ // 底部事件类下拉框选项
        {
          label: '显示全部事件',
          value: 1
        },
        {
          label: '隐藏全部事件',
          value: 0
        },
        {
          label: '人民调解',
          value: 2
        },
        {
          label: '重点事件',
          value: 3
        }
      ],
      allOrgSelectDefault: 'hiddenIcon', // 底部下拉框默认选择隐藏全部机构
      allOrgSelect: [ // 底部机构类下拉框选项
        {
          label: '显示全部机构',
          value: 'YJ0205'
        },
        {
          label: '隐藏全部机构',
          value: 'hiddenIcon'
        },
        {
          label: '司法所',
          value: 'YJ0201'
        },
        {
          label: '调委会',
          value: 'YJ0202'
        },
        {
          label: '公共法律服务',
          value: 'YJ0203'
        },
        {
          label: '律师事务所',
          value: 'YJ0204'
        }
      ],
      titleDateChecked: 2, // 头部默认选择今日数据
      titleDateSelect: [ // 头部日期选择
        { label: '今日', value: 'YJ0001' },
        { label: '本月', value: 'YJ0002' },
        { label: '本年', value: 'YJ0003' },
        { label: '全部', value: 'YJ0004' }
      ],
      titleDate: '', // 头部左侧日期事件
      userName: '徐汇区司法局', // 头部左侧登录名
      osmUrl: process.env.VUE_APP_OSMURL, // 地图瓦片的加载地址
      tableTitles: [ // 右侧滚动表格表头
        '来源', '案件类型', '时间', '状态'
      ],
      importantEvents: [], // 重点关注事件
      heatmap: {
        data: []
      }, // 热力图数据
      markerData: [] // 标记点数据
    }
  },
  methods: {

    // 点击头部日期类型触发事件
    changeChecked (index, time) {
      this.homePageCount({ time: time })
      this.getMapData(time, this.allOrgSelectDefault, this.allEventsSelectDefault)
      this.titleDateChecked = index
    },

    // 底部全部事件下拉框变化触发函数
    changeMapEventData (value) {
      this.getMapData(this.titleDateSelect[this.titleDateChecked].value, this.allOrgSelectDefault, value)
    },

    // 底部全部机构下拉框变化触发函数
    changeMapOrgData (value) {
      this.showPopup = false
      this.getMapData(this.titleDateSelect[this.titleDateChecked].value, value, this.allEventsSelectDefault)
    },

    // 环形图的颜色控制
    iconColor (colorName, index) {
      return colorName[(index % colorName.length)]
    },

    // marker点击触发事件（渲染popup弹出框）
    markerClick (data) {
      console.log(data)
      this.showPopup = true
      this.popupPosition = [data.lat, data.lng]
      this.centerPosition = this.popupPosition
      if (typeof data.zhuangTai === 'undefined') {
        this.popupHtmlContent = `<div class='title'>
                                  <div class='titleIcon'></div>
                                  <div class='titleContent' title='${data.mingZi || '暂无'}'> ${data.mingZi || '暂无'} </div>
                                </div>
                                <div class='content'>
                                  <div class='contentName'>地址：</div>
                                  <div class='contentValue address' title='${data.diZhi || '暂无'}'>${data.diZhi || '暂无'}</div>
                                </div>
                                <div class='content'>
                                  <div class='contentName'>电话：</div>
                                  <div class='contentValue'>${data.dianHua || '暂无'}</div>
                                </div>
                                <div class='content'>
                                  <div class='contentName'>人员：</div>
                                  <div class='contentValue'>${data.renYuan}人</div>
                                </div>
                                <div class='footer'>
                                  <div class='moreMsg'>详情<div>
                                <div>`
      } else {
        this.popupHtmlContent = `<div class='title'>
                                  <div class='titleIcon titleIcon1'></div>
                                  <div class='titleContent titleContent1' title='${data.anJianLX || '暂无'}'> ${data.anJianLX || '暂无'} </div>
                                </div>
                                <div class='content content1'>
                                  <div class='contentName'>时间：</div>
                                  <div class='contentValue address' title='${data.shiJian || '暂无'}'>${data.shiJian || '暂无'}</div>
                                </div>
                                <div class='content content1'>
                                  <div class='contentName'>地点：</div>
                                  <div class='contentValue' title='${data.diDian || '暂无'}'>${data.diDian || '暂无'}</div>
                                </div>
                                <div class='content content1'>
                                  <div class='contentName'>概要：</div>
                                  <div class='contentValue' title='${data.gaiYao || '暂无'}'>${data.gaiYao || '暂无'}</div>
                                </div>
                                <div class='content content1'>
                                  <div class='contentName'>状态：</div>
                                  <div class='contentValue' title='${data.zhuangTai}'>${data.zhuangTai}</div>
                                </div>
                                <div class='footer content1'>
                                  <div class='moreMsg'>详情<div>
                                <div>`
        setTimeout(() => {
          let popup = document.getElementsByClassName('mapboxgl-popup')[0]
          let popupContent = document.getElementsByClassName('mapboxgl-popup-content')[0]
          console.log(popup)
          popupContent.style.minHeight = '260px'
          popup.style.top = '-40px'
        }, 100)
      }
    },

    // 改变vuex中控制下钻页面显示与隐藏的状态值
    ...mapActions('mediationStore', [
      'isDisplayMedia'
    ]),

    // 页面数据请求、处理
    async homePageCount (params) {
      let res = await homePageCount(params)

      // 脚部人员机构数据
      this.memberData = res.data.data.jiGouRYSLTJ
      this.memberData.map((x) => {
        x.name = this.jiGouRYMap[x.name]
      })

      // 法律咨询数据
      this.legalAdviceData = res.data.data.faLvZXSYJS
      this.legalAdviceData.dat.map((x) => { x.rate = x.value === 0 ? 0 : x.value / this.legalAdviceData.jianShu })

      // 人民调解数据
      this.mediationData = res.data.data.renMinTJSYJS
      this.mediationData.dat = this.mediationData.dat.length === 0 ? [{ name: '行业专业调解', value: 0 }, { name: '传统调解', value: 0 }] : this.mediationData.dat

      // 法律援助数据
      this.legalAidData = res.data.data.faLvYZSYJS
      this.legalAidData.dat = this.legalAidData.dat.length === 0 ? [{ name: '刑事案件', value: 0 }, { name: '非刑事案件', value: 0 }] : this.legalAidData.dat

      // 安置帮教数据
      this.azbjData = res.data.data.anZhiBJSYJS
      this.azbjData.dat = this.azbjData.dat.length === 0 ? [{ name: '帮教-在册', value: 0 }, { name: '矫正-在册', value: 0 }, { name: '再犯人员', value: 0 }, { name: '重新犯罪人员', value: 0 }] : this.azbjData.dat
      let exchange1 = this.azbjData.dat[1]
      this.azbjData.dat[1] = this.azbjData.dat[3]
      let exchange2 = this.azbjData.dat[2]
      this.azbjData.dat[3] = exchange2
      this.azbjData.dat[2] = exchange1
    },

    // 请求地图数据
    async getMapData (dateChecked, orgChecked, eventChecked) {
      this.heatmap.data = []
      this.markerData = []
      this.importantEvents = []
      let res = await mapData({ time: dateChecked, organizationtype: orgChecked })

      // 设置热力图数据
      if (eventChecked === 2 || eventChecked === 1) {
        this.heatmap.data = res.data.data.reLiTSJ
        this.heatmap.data.map((x) => {
          x.value = x.shuLiang
          x.lat = x.weiDu
          x.lng = x.jingDU
          delete x.shuLiang
          delete x.jingDU
          delete x.weiDu
        })
      }
      // 机构地图数据
      if (orgChecked !== 'hiddenIcon') {
        this.markerData = res.data.data.jiGouDTSJ
        this.markerData.map((x) => {
          x.width = 48
          x.height = 48
          x.lat = x.weiDu
          x.lng = x.jingDu
          x.base64 = image[x.leixing]
          delete x.jingDu
          delete x.weiDu
        })
      } else {
        this.markerData = []
        this.centerPosition = [121.442054, 31.14045]
      }

      // 重点事件数据
      if (eventChecked === 3 || eventChecked === 1) {
        this.importantEvents = res.data.data.zhongDianGZSJ
        this.importantEvents.map((x) => {
          x.width = 78
          x.height = 72
          x.lat = x.weiDu
          x.lng = x.jingDu
          x.base64 = image.zhongdianGZSJ
          delete x.jingDu
          delete x.weiDu
          this.markerData.push(x)
        })
        this.markerData = this.markerData.concat(this.importantEvents)
      }
    }
  },
  computed: {

    // 获得vuex中控制下钻页面状态的值
    ...mapGetters('mediationStore', {
      mediaDisplay: 'mediationDisplay'
    })
  },
  created () {},
  mounted () {
    // 请求首页统计数据
    this.homePageCount({ time: this.titleDateSelect[this.titleDateChecked].value })
    // 请求首页地图数据
    this.getMapData(this.titleDateSelect[this.titleDateChecked].value, this.allOrgSelectDefault, this.allEventsSelectDefault)
  },
  updated () {
  }
}
</script>

<style lang="less">
@import url('../assets/css/home.less');
</style>

<style lang="less">

// el-select 下拉输入框样式修改
.el-select {
  width: 160px;
  height: 30px;
  .el-input__inner {
    text-align: center;
    background:rgba(2,19,38,1);
    border: 1px solid rgba(1,71,96,1);
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(25,200,226,1);
    border-radius: 0;
  }
  .el-input__icon{
    color: red !important;
    &:before {
      content: '';
      display: inline-block;
      border: 4px transparent solid;
      border-top: 10px rgba(25,200,226,1) solid;
      margin-top: 16px;
    }
  }
}

// el-select 下拉菜单框样式修改
.el-select-dropdown {
  background:rgba(2,19,38,1);
  border:1px solid rgba(1,71,96,1);
  border-radius: 0;
  .el-select-dropdown__item {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(95,145,164,1);
    line-height: 34px;
    &.hover {
      background:rgba(55,159,199,1);
      color: white;
    }
    &.selected {
      color: white;
    }
  }
  .popper__arrow {
    display: none;
  }
}

// map中的popup弹出框的样式修改
.mapboxgl-popup {
  top: -25px;
  left: 3px;
  .mapboxgl-popup-tip {
    border: 0;
  }
  .mapboxgl-popup-content {
    width: 330px;
    min-height: 250px;
    background: url('../assets/image/popupBackground.png') no-repeat;
    background-size: cover;
    background-position: center;
    padding: 0;
    display: flex;
    flex-direction: column;
    button {
      font-size: 22px;
      color: #20D9F0;
      height: 50px;
      width: 40px;
      padding-top: 10px;
      &:focus {
        border: 0 !important;
      }
    }
    .zhang {

    }
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 10px 13px;
      margin-bottom: 5px;
      .titleIcon {
        height: 30px;
        width: 26px;
        background: url('../assets/image/orgTitle.png');
        margin: 0 10px;
        &.titleIcon1 {
          background: url('../assets/image/importEvent.png');
        }
      }
      .titleContent {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(25,200,226,1);
        line-height: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 230px;
        &.titleContent1 {
          color: rgba(238,188,37,1);
        }
      }
    }
    .content {
      height: 38px;
      display: flex;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      &.content1 {
        height: 30px;
      }
      .contentName {
        color: #19C8E2;
        margin-left: 40px;
      }
      .contentValue {
        color: #CDD4D9;
        margin-left: 10px;
        width: 210px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .footer {
      position: relative;
      .moreMsg {
        position: absolute;
        right: 14px;
        width: 40px;
        text-align: center;
        border: 1px solid rgba(0,212,119,1);
        color: #00D477;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}

</style>
