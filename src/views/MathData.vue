<template>
       <h1 id="heading" class="container-md">
        Grafy
        <small class="text-body-secondary">Študentov predmetu WebTe</small>
    </h1>    
    
    <div id="chart" class="container-md"></div>


    <div id="box">
        <div id="chart0" class="chart-container"></div>
        <div id="chart1" class="chart-container"></div>
        <div id="chart2" class="chart-container"></div>
        <div id="chart3" class="chart-container"></div>
        <div id="chart4" class="chart-container"></div>
        <div id="chart5" class="chart-container"></div>
    </div>

    <div id="radar"></div>

</template>

<style scoped>
    
#box{
    width: 100%;
    display: flex; 
    flex-wrap: wrap; 
}

.chart-container{
    width: 33.33%;
}

#radar{
    margin-top: 2em;
}

@media (max-width: 850px) {
    .chart-container {
      width: 50%; 
    }
} 

  @media (max-width: 530px) {
    .chart-container {
      width: 100%; 
    
    }
} 
</style>

<script>

export default{

    mounted() {
        this.load();
    },
    methods: {
        load() {

            const data = [
    {
      rok: 'ZS 2021/2022',
      a: 50,
      b: 42,
      c: 36,
      d: 18,
      e: 10,
      fx: 0,
      fn: 7,
    },
    {
      rok: 'ZS 2020/2021',
      a: 55,
      b: 48,
      c: 26,
      d: 8,
      e: 5,
      fx: 0,
      fn: 2,
    },
    {
      rok: 'ZS 2019/2020',
      a: 22,
      b: 36,
      c: 36,
      d: 35,
      e: 4,
      fx: 3,
      fn: 1,
    },
    {
      rok: 'ZS 2018/2019',
      a: 23,
      b: 20,
      c: 14,
      d: 3,
      e: 1,
      fx: 5,
      fn: 2,
    },
    {
      rok: 'ZS 2017/2018',
      a: 24,
      b: 31,
      c: 24,
      d: 10,
      e: 6,
      fx: 5,
      fn: 1,
    },
    {
      rok: 'ZS 2016/2017',
      a: 14,
      b: 55,
      c: 45,
      d: 15,
      e: 2,
      fx: 4,
      fn: 0,
    },
  ];
  
const categories = data.map(item => item.rok);

const series = ['a', 'b', 'c', 'd', 'e', 'fx', 'fn'].map(grade => {
  return {
    name: grade.toUpperCase(),
    data: data.map(item => item[grade])
  };
});

var windowWidth = window.innerWidth;
var horizontal = windowWidth < 450 ? true : false;

const options = {
  series: series,
  colors: ['#007bff', '#0091f7', '#00a7ef', '#00bde8', '#00d3e0', '#00e9d8','#00ffd0'],
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType:"100%"
  },
  plotOptions: {
    bar: {
      horizontal: horizontal,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  xaxis: {
    categories: categories,
    labels: {
      formatter: function (val) {
        return val;
      }
    }
  },
  yaxis: {
    title: {
      text: undefined
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        if(val > 1){
            return val + " Študentov"
             }else{
                return val + " Študent"
             }
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'left',
    offsetX: 40
  }
};

if(document.querySelector("#chart")) {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart?.render();
}

window.addEventListener('resize', function() {
    var windowWidth = window.innerWidth;
    var newHorizontal = windowWidth < 450 ? true : false;
  
    if (newHorizontal !== horizontal) {
      horizontal = newHorizontal;
  
      chart.updateOptions({
        plotOptions: {
          bar: {
            horizontal: horizontal
          }
        }
      }, true);
    }
  });
   

 data.forEach((item, index) => {
    const series = [item.a, item.b, item.c, item.d, item.e, item.fx, item.fn];

    const options = {
      series: series,
      colors: ['#007bff', '#0091f7', '#00a7ef', '#00bde8', '#00d3e0', '#00e9d8','#00ffd0'],

      chart: {
        type: 'pie',
        height:"300px"
        
      },title: {
        text: item.rok, 
        align: 'center',
      },
      labels: ['A', 'B', 'C', 'D', 'E', 'Fx', 'Fn'],
      legend: {
        position: 'bottom'
      }
    };

    if(document.querySelector(`#chart${index}`)) {
        const chart = new ApexCharts(document.querySelector(`#chart${index}`), options);
        chart.render();
    }
  });

  const sums = data.reduce((acc, item) => {
    acc.a += item.a;
    acc.b += item.b;
    acc.c += item.c;
    acc.d += item.d;
    acc.e += item.e;
    acc.fx += item.fx;
    acc.fn += item.fn;
    return acc;
  }, {a: 0, b: 0, c: 0, d: 0, e: 0, fx: 0, fn: 0});
  
  const radarOptions = {
  colors: ['#007bff', '#0091f7', '#00a7ef', '#00bde8', '#00d3e0', '#00e9d8','#00ffd0'],

  series: [{
    name: 'Celkovy počet',
    data: [sums.a, sums.b, sums.c, sums.d, sums.e, sums.fx, sums.fn]
  }],
  chart: {
    height: 350,
    type: 'radar',
  },
  title: {
    text: 'Celkový počet študentov so známkou',
    align: 'center'
  },
  xaxis: {
    categories: ['A', 'B', 'C', 'D', 'E', 'Fx', 'Fn']
  }
};
  
  if(document.querySelector("#radar")) {
    const radarChart = new ApexCharts(document.querySelector("#radar"), radarOptions);
    radarChart.render();
  }
        
}
}
}

</script>