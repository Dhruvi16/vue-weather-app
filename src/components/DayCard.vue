<template>
    <div class="column is-full">
        <a @click="emitCurrStateToParent()">
        <div class="card has-text-centered is-shadowless" :class ="(selected)?'selected':'not-selected'">
            <div class="card-content">
                <div class="content">
                    <div class="has-text-weight-bold">{{day}}</div>
                    <div class="has-text-weight-semibold">{{temp}}</div>
                    <figure class="image is-48x48 has-image-centered is-paddingless">
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
                    <div class="is-capitalized">{{weather}}</div>
                </div>
            </div>
        </div>
        </a>
    </div>
</template>

<script>
export default {
  name: 'DayCard',
  props: [
      'day',
      'temp',
      'weather',
      'pressure',
      'humidity',
      'selected'
  ],
  methods: {
      emitCurrStateToParent() {
          this.$emit("emitCurrStateToParent", {x:this.day, y:this.weather, z:this.temp, w:this.humidity, t:this.pressure});
      },
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
  height: 100%;
}
.selected {
    border: 2px solid #0099CC;
    background-color: #FFFF99;
}

</style>
