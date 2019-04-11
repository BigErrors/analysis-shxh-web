
const caseAcceptTrendChart = (chart, data) => {
  const dataDefault = [
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
    },

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
    }
  ]

  data = data.length === 0 ? dataDefault : data
  chart.source(data, {
    name: {
      range: [0, 1]
    }
  })
  chart.tooltip({
    crosshairs: {
      type: 'line'
    }
  })
  chart.axis('value', {
    grid: {
      type: 'line',
      lineStyle: {
        stroke: 'rgba(227,227,227,0.1)'
        // lineWidth: 1,
        // lineDash: [ 4, 4 ]
      }
      // align: 'center' // 网格顶点从两个刻度中间开始
    },
    label: {
      textStyle: {
        fill: 'rgba(255,255,255,0.45)',
        fontSize: '16'
      }
    }
  })
  chart.axis('name', {
    label: {
      textStyle: {
        fill: 'rgba(255,255,255,0.45)',
        fontSize: '16'
      }
    },
    tickLine: null
  })
  chart.area().position('name*value').color('type').shape('smooth')
  chart.line().position('name*value').color('type').shape('smooth')
  chart.legend({
    position: 'top-right', // 设置图例的显示位置
    itemGap: 30, // 图例项之间的间距
    width: 50,
    marker: 'square'
    // attachLast: true
  })
}

export default caseAcceptTrendChart
