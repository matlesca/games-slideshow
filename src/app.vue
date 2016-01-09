<template>
  <div class="slideshow-wrapper loaded no-touch">

    <timeline class="timeline-bar" :games="games" v-on:select-game="selectGame"></timeline>
    <ol class="slideshow" style="transform: translateY({{currentOffset}})">
  	   <li class="visible" v-for="game in games">
  	      <slider :game="game" :rank="$index" v-on:select-game="selectGame" id="slider-{{$index}}" class="slider-content" v-bind:class="{current:($index === selectedGame)}"></slider>
  		 </li>
  	</ol>
    {{paddingValues}}

  </div>

</template>

<script type="text/javascript">
  import slider from './slider.vue'
  import timeline from './timeline.vue'
  import loadGames from './games.json'

  export default {
    replace: false,
    methods: {
      selectGame: function (gRank) {
        this.selectedGame = gRank
        this.$broadcast('select-slide', this.selectedGame)
        this.currentOffset = this.offsetValues[this.selectedGame]
      }
    },
    created: function () {
      this.selectedGame = 0
    },
    ready: function () {
      var delta
      var retTab = []
      for (var ii = 0; ii < this.games.length; ii++) {
        if (ii === 0) {
          delta = -20
        } else {
          delta = -Math.floor(document.getElementById('slider-' + ii).getBoundingClientRect().top - document.getElementById('slider-0').getBoundingClientRect().top)
        }
        retTab.push(delta + 'px')
      }
      this.offsetValues = retTab
    },
    data () {
      return {
        games: loadGames,
        selectedGame: 0,
        paddingSlideshow: 0,
        currentOffset: '-20px',
        offsetValues: []
      }
    },
    components: {slider, timeline}
  }
</script>
