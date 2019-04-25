
// 司法所案件受理量柱状图

let caseAcceptNumChart = (chart, dataset, isLinkage, intervalClick, customRegion) => {
  let dataDefault = [{
    name: '长桥',
    value: 0
  }, {
    name: '华泾',
    value: 0
  }, {
    name: '徐家汇',
    value: 0
  }, {
    name: '渭河泾',
    value: 0
  }, {
    name: '枫林路',
    value: 0
  }, {
    name: '田林',
    value: 0
  }, {
    name: '龙华',
    value: 0
  }, {
    name: '凌云路',
    value: 0
  }, {
    name: '湖南路',
    value: 0
  }, {
    name: '斜土路',
    value: 0
  }, {
    name: '天平路',
    value: 0
  }, {
    name: '虹梅路',
    value: 0
  }, {
    name: '康健',
    value: 0
  }]
  let data = dataset.zhuZhuangT.length === 0 ? dataDefault : dataset.zhuZhuangT
  let guideOffsetX = dataset.pingJun === 0 ? -30 : 20
  let guideOffsetY = dataset.pingJun === 0 ? 0 : -5
  // chart.source(data)
  chart.source(data, {
    name: {
      type: 'cat'
    }
  })
  chart.scale('value', {
    alias: '受理量（件）'
  })
  chart.axis('name', {
    label: {
      textStyle: {
        fill: '#aaaaaa'
      }
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    }
  })
  chart.axis('value', {
    label: null,
    title: null,
    grid: {
      type: 'line',
      lineStyle: {
        stroke: 'rgba(227,227,227,0.1)'
        // lineWidth: 1,
        // lineDash: [ 4, 4 ]
      }
      // align: 'center' // 网格顶点从两个刻度中间开始
    }
  })
  chart.legend(false)
  chart.interval().position('name*value').opacity(1).label('value', {
    textStyle: function textStyle (val) {
      var value = parseInt(val)
      var style = {
        fill: '#fff', // 柱顶数字样式
        fontWeight: 'normal',
        fontSize: 12
      }
      if (value > dataset.pingJun) {
        style.fontWeight = 'bold'
      }
      return style
    },
    offset: 5
  })
  chart.guide().regionFilter({
    top: true,
    start: ['start', 'max'],
    end: ['end', dataset.pingJun],
    color: '#FF4D4F' // 超出平均值柱体颜色
  })
  chart.guide().line({
    top: true,
    start: ['start', dataset.pingJun],
    end: ['end', dataset.pingJun],
    lineStyle: {
      stroke: 'rgba(256,256,256,0.6)',
      lineWidth: 1,
      lineDash: [3, 3]
    },
    text: {
      position: 'start',
      style: {
        fill: 'white',
        fontSize: 12,
        fontWeight: 300
      },
      content: '全区平均 ' + dataset.pingJun,
      offsetY: guideOffsetY,
      offsetX: guideOffsetX
    }
  })
  let test = (x, y) => chart.guide().region({
    top: true,
    start: [x, 'min'], // 辅助框起始位置
    end: [y, 'max'], // 辅助框结束位置
    style: {
      fill: '#fff',
      fillOpacity: 0.1
    } // 辅助框的图形样式属性
  })
  test(customRegion.x, customRegion.y)
  let getIndex = (name) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        return i
      }
    }
  }
  let intervalClickDefault = () => console.log('click')
  intervalClick = intervalClick || intervalClickDefault
  if (isLinkage) {
    chart.on('interval:click', ev => {
      let name = ev.shape._id.substring(ev.shape._id.lastIndexOf('-') + 1, ev.shape._id.length)
      let index = getIndex(name)
      intervalClick(name, index)
    })
  }
  // chart.on('guide-region:click', ev => console.log(ev))
}
export default caseAcceptNumChart
