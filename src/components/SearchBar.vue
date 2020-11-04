<template>
  <div class="searchbox">
      <div class="field">
          <div class="control has-icons-left has-icons-right">
              <input class="input rounded" type="email" v-model="query" placeholder="Search" value="Search" @change="emitCurrStateToParent()">
              <span class="icon is-small is-left">
                  <i class="fa fa-map-marker"></i>
              </span>
              <span class="icon is-small is-right">
                  <i class="fa fa-search"></i>
              </span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
      return {
          query: ''
      }
  },
  methods: {
      emitCurrStateToParent () {
        this.$emit("emitCurrStateToParent", this.query)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rounded {
        border: 1px solid #ccc;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        border-radius: 10px;
        -moz-box-shadow: 2px 2px 3px #666;
        -webkit-box-shadow: 2px 2px 3px #666;
        box-shadow: 2px 2px 3px #666;
        outline: 0;
        color: black;
        -webkit-appearance: none;
        position: relative;
        padding: 8px;
    }

</style>
