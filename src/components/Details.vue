<template>
    <div>
        <div class="big-title is-flex is-vertical-center">
            
                {{this.temp}}
                
                        <img src="../assets/weather/sun.svg" v-if="weather == 'clear sky'">
                        <img src="../assets/weather/clouds-and-sun.svg" v-else-if="weather == 'few clouds'">
                        <img src="../assets/weather/cloud.svg" v-else-if="weather == 'scattered clouds'">
                        <img src="../assets/weather/clouds.svg" v-else-if="weather == 'broken clouds'">
                        <img src="../assets/weather/rain.svg" v-else-if="weather == 'light rain'">
                        <img src="../assets/weather/rain(1).svg" v-else-if="weather == 'rain'">
                        <img src="../assets/weather/storm.svg" v-else-if="weather == 'thunderstorm'">
                        <img src="../assets/weather/snowflake.svg" v-else-if="weather == 'snow'">
                        <img src="../assets/weather/wind.svg" v-else-if="weather == 'mist'">
                        <img src="../assets/weather/thermometer.svg" v-else>
               
        
            
        </div>
    </div>
</template>

<script>
export default {
  name: 'DayCard',
  props: [
      'temp',
      'weather'
  ],
  data () {
      return {
          query: ''
      }
  }
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
img {
    width: 96px;
    height: 96px;
    padding-left: 16px ;
}
.big-title {
    font-size: 3rem;
    font-weight: bold;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}

</style>
