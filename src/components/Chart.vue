<template>
    <div>
       <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'Chart',
  props: [
      'day',
      'weather'
  ],
  data () {
      return {
          chart: null,
          dates: [1,2,3,4,5,6],
          temps: [20.5,20.8,21,21.6,22,21.8,21.9]
      }
  },
  methods: {
      generateChart() {
          var ctx = document.getElementById("myChart");
          this.chart = new Chart(ctx, {
              type: "line",
              data: {
                  labels: this.dates,

                  datasets: [{
                      label: "Avg. Temp during the day",
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                      borderColor: "rgb(54, 162, 235)",
                      fill: false,
                      data: this.temps
                  }]
              },
              options: {
                  title: {
                      display: false,
                      text: ""
                  },
                  tooltips: {
                      callbacks: {
                          label: function (tooltipItem, data) {
                              var label =
                                  data.datasets[tooltipItem.datasetIndex].label || "";

                              if (label) {
                                  label += ": ";
                              }

                              label += Math.floor(tooltipItem.yLabel);
                              return label + "°F";
                          }
                      }
                  },
                  scales: {
                      xAxes: [{
                          type: "time",
                          time: {
                              unit: "hour",
                              displayFormats: {
                                  hour: "M/DD @ hA"
                              },
                              tooltipFormat: "MMM. DD @ hA"
                          },
                          scaleLabel: {
                              display: true,
                              labelString: "Time"
                          },
                          gridLines: {
                            drawOnChartArea: true,
                            display: true

                        }   
                      }],
                      yAxes: [{
                          display: false,
                          scaleLabel: {
                              display: false,
                          },
                          gridLines: {
                            display: false

                        }  
                      }]
                  }
              }
          });
      }
  },
   mounted: function () {
    this.generateChart()
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
.card {
  overflow-x: auto;
}
.big-title {
    font-size: 4rem;
}

</style>
