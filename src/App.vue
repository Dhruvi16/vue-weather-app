<template>
  <div id="app" class="container">
    <SearchBar @emitCurrStateToParent="fetchWeather($event)" class="mt-3"></SearchBar>
    <div v-if="weather.cod == 200">
      <Carousel :per-page="3" :paginationEnabled="false" :centerMode="true" v-if="proccessedWeather"
        class="columns mt-4">
        <Slide class="column slide" v-for="weather in proccessedWeather" :key="weather">
          <DayCard :day="weather.day" :temp="weather.temp" :weather="weather.weather" :humidity="weather.humidity"
            :pressure="weather.pressure" :selected="selectStyles(weather.day)"
            @emitCurrStateToParent="selectDay($event)"></DayCard>
        </Slide>
        <Slide class="column slide">
          <DayCard :day="'Sunday'" :temp="'23° C'" :weather="'Clear sky'" :humidity="'50'" :pressure="'1012'"></DayCard>
        </Slide>
        <Slide class="column slide">
          <DayCard :day="'Sunday'" :temp="'23° C'" :weather="'Clear sky'" :humidity="'50'" :pressure="'1012'"></DayCard>
        </Slide>
      </Carousel>
      <div class="card">
        <div class="card-content">
          <div class="content">
            <Details :temp="this.selectedTemp" :weather="this.selectedWeather"></Details>
            <div v-if="temp">
              <Chart class="mt-6" :hour="hour" :temp="temp"></Chart>
            </div>
            <Pressure class="mt-6" :pressure="this.selectedPressure" :humidity="this.selectedHumidity"></Pressure>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="weather.cod == 404" class="mt-3">
      <article class="message is-danger">
        <div class="message-header">
          <p>Error</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          We cannot process the request, try to add another city or try to reload the website
        </div>
      </article>
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
      api_key: '',
      api_base: 'https://api.openweathermap.org/data/2.5',
      location:null,
      gettingLocation: false,
      errorStr:null,
      selectedDay: '',
      selectedTemp: '',
      selectedWeather: '',
      selectedPressure: '',
      selectedHumidity: '',
      lastDay: '',
      weather: {},
      proccessedWeather: [],
      hour: [],
      temp: []
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
      this.proccessedWeather = []
      this.selectedDay = moment.unix(this.weather.list[0].dt).format('dddd');
      this.selectedTemp = this.weather.list[0].main.temp + '° C';
      this.selectedWeather = this.weather.list[0].weather[0].description;
      this.selectedPressure = this.weather.list[0].main.pressure;
      this.selectedHumidity = this.weather.list[0].main.humidity;
      this.selectStyles (this.selectedDay)
      this.processWeathertoRequired();
      this.processTemperature(this.selectedDay);
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
    processWeathertoRequired () {
      let i = 1;
      while (i < 39) {
            if (moment.unix(this.weather.list[i].dt).format('dddd') != moment.unix(this.weather.list[i - 1].dt).format('dddd')) {
              this.proccessedWeather.push( {
                day: moment.unix(this.weather.list[i].dt).format('dddd'),
                temp: this.weather.list[i].main.temp + '° C',
                weather: this.weather.list[i].weather[0].description,
                humidity: this.weather.list[i].main.humidity,
                pressure: this.weather.list[i].main.pressure,
              })
            }
        i++;
      }
    },
    selectDay (day) {
      this.selectedDay = day.x;
      this.selectedTemp = day.z;
      this.selectedWeather = day.y;
      this.selectedHumidity = day.w;
      this.selectedPressure = day.t;
      this.temp = []
      this.hour = []
      this.processTemperature(this.selectedDay);
    },
    processTemperature (day) {
      let i = 1;
      while (i < 39) {
            if (moment.unix(this.weather.list[i].dt).format('dddd') == day) {
              this.temp.push(this.weather.list[i].main.temp)
              this.hour.push(moment.unix(this.weather.list[i].dt).format('HH'))
            }
        i++;
      }
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
.slide {
  height: 100%;
}

</style>
