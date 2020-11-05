<template>
    <div class="searchbox">
        <div class="field">
            <div class="control">
                <autocomplete
                    source="https://api.locationiq.com/v1/autocomplete.php?key=pk.05cc2c0ca2586431890b4181b2bcdedd&q="
                    results-property="items" results-display="display_place" class="rounded"
                    @selected="addSelection">
                </autocomplete>
            </div>
        </div>
    </div>
</template>

<script>
import Autocomplete from 'vuejs-auto-complete'

export default {
  name: 'SearchBar',
  data () {
      return {
          query: ''
      }
  },
  components: {
      Autocomplete
  },
  methods: {
      emitCurrStateToParent() {
              this.$emit("emitCurrStateToParent", this.query)
          },
          addSelection(group) {
              this.query = group.display
              // access the autocomplete component methods from the parent
              this.emitCurrStateToParent()
          },
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
