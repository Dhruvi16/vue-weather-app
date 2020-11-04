<template>
  <div id="app" class="container">
    <SearchBar @emitCurrStateToParent="fetchWeather($event)" class="m-2"></SearchBar>
    <Carousel v-if="weather != {}" class="columns">
      <div v-for="index in 39" :key="index">
        <Slide
          v-if="cardCondition (index)">
          <DayCard :day="moment.unix(weather.list[index].dt).format('dddd')" :temp="weather.list[index].main.temp + '° C'"
            :weather="weather.list[index].weather[0].description" :humidity="weather.list[index].main.humidity" :pressure="weather.list[index].main.pressure" :selected="selectStyles(moment.unix(weather.list[index].dt).format('dddd'))" @emitCurrStateToParent="selectDay($event)"></DayCard>
        </Slide>
      </div>
    </Carousel>
     <div class="card">
            <div class="card-content">
                <div class="content">
                    <Details :temp="this.selectedTemp" :weather="this.selectedWeather"></Details>
                    <Chart class="m-2"></Chart>
                    <Pressure class="m-2" :pressure="this.selectedPressure" :humidity="this.selectedHumidity"></Pressure>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import DayCard from './components/DayCard'
import moment from 'moment'
import Details from './components/Details'
import Chart from './components/Chart'
import Pressure from './components/Pressure'
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'App',
  data () {
    return {
      api_key: '0187a3b9de67848159f5fa95b0f54dd6',
      api_base: 'https://api.openweathermap.org/data/2.5',
      location:null,
      gettingLocation: false,
      errorStr:null,
      currentCity: '',
      selectedDay: '',
      selectedTemp: '',
      selectedWeather: '',
      selectedPressure: '',
      selectedHumidity: '',
      weather: {}
    }
  },
  components: {
    SearchBar,
    DayCard,
    Details,
    Chart,
    Pressure,
    Carousel,
    Slide
  },
  methods: {
    fetchWeather (query) {
      fetch(`${this.api_base}/forecast?q=${query}&units=metric&appid=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);
    },
    setResults (results) {
      this.weather = results;
      this.selectedDay = moment.unix(this.weather.list[0].dt).format('dddd');
      this.selectedTemp = this.weather.list[0].main.temp + '° C';
      this.selectedWeather = this.weather.list[0].weather[0].description;
      this.selectedPressure = this.weather.list[0].main.pressure;
      this.selectedHumidity = this.weather.list[0].main.humidity;
      this.selectStyles (this.selectedDay)
    },
    cardCondition (index) {
      if (moment.unix(this.weather.list[index].dt).format('dddd') != moment.unix(this.weather.list[index - 1].dt).format('dddd') || index == 0) {
        return true
      }
      else {
        return false
      }
    },
    fetchWeatherthroughcoords (lat,long) {
      fetch(`${this.api_base}/forecast?lat=${lat}&lon=${long}&units=metric&appid=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);
    },
    selectDay (day) {
      this.selectedDay = day.x;
      this.selectedTemp = day.z;
      this.selectedWeather = day.y;
      this.selectedHumidity = day.w;
      this.selectedPressure = day.t;
    },
    selectStyles (day) {
      if (this.selectedDay == day) {
        return true
      }
      else {
        return false
      }
    }
  },
  created() {
    //do we support geolocation
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;
      this.fetchWeatherthroughcoords(this.location.coords.latitude,this.location.coords.longitude)
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
}
}
</script>

<style>
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

</style>
