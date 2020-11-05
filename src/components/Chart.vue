<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :options="datacollection.options" ></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    props: [
        'hour',
        'temp'
    ],
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    watch: {
    temp: function () {
      this.fillData()
    }
  },
    methods: {
      fillData() {
          this.datacollection = {
              labels: this.hour,
              datasets: [{

                  data: this.temp,
                  fill: false,
                  borderColor: '#0099CC',
                  backgroundColor: '#0099CC',
                  borderWidth: 2,
                  pointBackgroundColor: "#ffffff"
              }],
              options: {
                  scales: {
                      yAxes: [{
                          gridLines: {
                              display: false
                          },
                          scaleLabel: {
                              display: true,
                              labelString: 'Temperature'
                          }

                      }],
                      xAxes: [{
                          gridLines: {
                              display: true
                          },
                          scaleLabel: {
                              display: true,
                              labelString: 'Hours'
                          }

                      }]
                  },
                  legend: {
                      display: false
                  },
                  responsive: true,
                  maintainAspectRatio: false
              }

          }
      },
    }
}
</script>

<style>

</style>
