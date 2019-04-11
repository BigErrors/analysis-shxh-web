let caseAcceptNumChart = (chart, dataset, isLinkage) => {
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

  let data = dataset.data || dataDefault

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
      if (value > dataset.averageNum) {
        style.fontWeight = 'bold'
      }
      return style
    },
    offset: 5
  })
  chart.guide().regionFilter({
    top: true,
    start: ['start', 'max'],
    end: ['end', dataset.averageNum],
    color: '#FF4D4F' // 超出平均值柱体颜色
  })
  chart.guide().line({
    top: true,
    start: ['start', dataset.averageNum],
    end: ['end', dataset.averageNum],
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
      content: '全区平均 ' + dataset.averageNum,
      offsetY: -5,
      offsetX: 20
    }
  })
  if (isLinkage) {
    chart.on('interval:click', ev => { console.log(ev) })
  }
}
export default caseAcceptNumChart
