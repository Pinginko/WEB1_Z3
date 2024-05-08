<template>
    <div id="mathChart" class="container-md"></div>
    <RangeSlider id="sliderComponent" @changestate = "changeValue" class="container-md"></RangeSlider>
    <button type="button" id="toggleOff" class="container-md">STOP!</button>
</template>

<script>
import RangeSlider from '../components/RangeSlider.vue';
export default {
    mounted() {
        this.load();
    },
    components:{
        RangeSlider
    },
    data() {
        return{
            value: 50,
            chart: {},
            seriesData1: [],
            seriesData2 : [],
    }
    },
    methods: {
        changeValue(newValue){
            console.log(newValue);
            this.value = Number(newValue);
            this.amplitudeChange();
        },
        amplitudeChange(){
    let seriesData1Tmp = [];
    let seriesData2Tmp = [];

    let elementAmplitude1;
    let elementAmplitude2;  

    this.seriesData1.forEach(element => {
    elementAmplitude1 = Number(element.y*this.value);
    seriesData1Tmp.push({x: element.x, y:elementAmplitude1});
    });

    this.seriesData2.forEach(element => {
    elementAmplitude2 = Number(element.y*this.value);
    seriesData2Tmp.push({x: element.x, y:elementAmplitude2});
    });
    console.log(this.value);

  this.chart?.updateSeries([
    {data: seriesData1Tmp},
    {data: seriesData2Tmp}
  ]);
        },
        load() {

            let chart;
 chart = new ApexCharts(document.querySelector("#mathChart"), {
  series: [
    {
      name: 'Sinus',
      data: []
    },
    {
      name: 'Kosinus',
      data: []
    }
  ],
  chart: {
    type: 'line',
    height: 350,
    animations: {
      initialAnimation: {
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1500
        }
      }
    }
  },
  xaxis: {
    type:'numeric'
  },
});

chart.render();
this.chart = chart;

let isUpdating = true;

document.querySelector("#toggleOff")?.addEventListener('click', function() {
  isUpdating = !isUpdating;
  this.textContent = isUpdating ? 'STOP!' : 'ŠTART!';
});

var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");

source.onmessage = (event) => {
  if (!isUpdating) return; 

  let data = JSON.parse(event.data);

  let x = parseInt(data.x);
  let y1 = parseFloat(data.y1);
  let y2 = parseFloat(data.y2);

  this.seriesData1.push({x: x, y: y1});
  this.seriesData2.push({x: x, y: y2});

    this.amplitudeChange();
};

}
}
}

</script>

<style>

#mathChart{
    margin-top: 2em;
}

#toggleOff{
    display: block;
    width: 220px ;
    height: 40px;
    margin: 1em auto;
    border-radius: 8px;
    background-color: #ddd;
    color: white;
    border: 2px solid aliceblue ;
    font-weight: 700;
    margin-bottom: 5em
}

#sliderComponent{
    margin-top: 3em;
}


</style>