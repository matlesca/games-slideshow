<template>
  
  <div class="slideshow-wrapper">
    <timeline class="timeline-bar" :games="games" v-on:select-game="selectGame"></timeline>
    <slider-grid :games="games" v-on:select-game="selectGame"></slider-grid>
  </div>

</template>

<script type="text/javascript">
  import slidergrid from './slidergrid.vue'
  import timeline from './timeline.vue'
  import loadGames from './games.json'

  export default {
    replace: false,
    methods: {
      selectGame: function (locTab) {
        this.$broadcast('select-slide', locTab)
      }
    },
    data () {
      return {
        games: loadGames
      }
    },
    components: {'slider-grid': slidergrid, timeline}
  }
</script>
