
// 司法所案件受理趋势柱状图

const caseAcceptTrendChart = (chart, data, dateChoice) => {
  const dataDefault = [
    {
      time: '0',
      value: 0,
      type: '历史平均'
    },
    {
      time: '2',
      value: 0,
      type: '历史平均'
    },
    {
      time: '4',
      value: 0,
      type: '历史平均'
    },
    {
      time: '6',
      value: 0,
      type: '历史平均'
    },
    {
      time: '8',
      value: 0,
      type: '历史平均'
    },
    {
      time: '10',
      value: 0,
      type: '历史平均'
    },
    {
      time: '12',
      value: 0,
      type: '历史平均'
    },
    {
      time: '14',
      value: 0,
      type: '历史平均'
    },
    {
      time: '16',
      value: 0,
      type: '历史平均'
    },
    {
      time: '18',
      value: 0,
      type: '历史平均'
    },
    {
      time: '20',
      value: 0,
      type: '历史平均'
    },
    {
      time: '22',
      value: 0,
      type: '历史平均'
    },
    {
      time: '24',
      value: 0,
      type: '历史平均'
    },

    {
      time: '0',
      value: 0,
      type: '当前'
    },
    {
      time: '2',
      value: 0,
      type: '当前'
    },
    {
      time: '4',
      value: 0,
      type: '当前'
    },
    {
      time: '6',
      value: 0,
      type: '当前'
    },
    {
      time: '8',
      value: 0,
      type: '当前'
    },
    {
      time: '10',
      value: 0,
      type: '当前'
    },
    {
      time: '12',
      value: 0,
      type: '当前'
    },
    {
      time: '14',
      value: 0,
      type: '当前'
    },
    {
      time: '16',
      value: 0,
      type: '当前'
    },
    {
      time: '18',
      value: 0,
      type: '当前'
    },
    {
      time: '20',
      value: 0,
      type: '当前'
    },
    {
      time: '22',
      value: 0,
      type: '当前'
    },
    {
      time: '24',
      value: 0,
      type: '当前'
    }
  ]
  data = data.length === 0 ? dataDefault : data
  const unitMap = {
    'YJ0001': '点',
    'YJ0002': '日',
    'YJ0003': '月',
    'YJ0004': '年'
  }
  chart.source(data, {
    time: {
      range: [0, 1],
      formatter: (value) => (value + unitMap[dateChoice])
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
  chart.axis('time', {
    label: {
      textStyle: {
        fill: 'rgba(255,255,255,0.45)',
        fontSize: '16'
      }
    },
    tickLine: null
  })
  chart.area().position('time*value').color('type').shape('smooth')
  chart.line().position('time*value').color('type').shape('smooth')
  chart.legend({
    position: 'top-right', // 设置图例的显示位置
    itemGap: 30, // 图例项之间的间距
    width: 50,
    marker: 'square'
    // attachLast: true
  })
}

export default caseAcceptTrendChart
