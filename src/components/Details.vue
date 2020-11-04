<template>
    <div>
        <div class="columns">
            <p class="big-title column is-marginless is-3">{{this.temp}}</p>
            <div class="column is-marginless">
                <figure class="image is-64x64">
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
                </figure>
            </div>
            <div class="column"></div>
            <div class="column"></div>
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
.big-title {
    font-size: 3.25rem;
}

</style>
