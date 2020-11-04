<template>
    <div>
        <div class="columns">
            <div class="column is-one-half m-3">
                <p class="is-size-5 has-text-weight-semibold">Pressure</p>
                <p>{{this.pressure}}</p>
            </div>
             <div class="column is-one-half m-3">
                <p class="is-size-5 has-text-weight-semibold">Humidity</p>
                <p>{{this.humidity}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DayCard',
  props: [
      'pressure',
      'humidity'
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
.column {
    background-color: #c8f4ff;
}

</style>
