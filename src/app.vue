<template>
  <div class="slideshow-wrapper">
    <timeline class="timeline-bar" :games="games" v-on:select-game="selectGame"></timeline>
    <div class="swiper-container">
      <div class="swiper-wrapper">
    	   <div v-for="game in games" class="swiper-slide" data-hash="{{game.hash}}">
    	      <slider :game="game" :rank="$index" v-on:select-game="selectGame" class="slide-content" v-bind:class="{current:($index === mySwiper.activeIndex)}"></slider>
    		 </div>
    	</div>
    </div>

  </div>

</template>

<script type="text/javascript">
  import slider from './slider.vue'
  import timeline from './timeline.vue'
  import loadGames from './games.json'

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    replace: false,
    methods: {
      selectGame: function (gRank) {
        this.mySwiper.slideTo(gRank, 500)
      },
      onSlideChange: function (msp) {
        this.$broadcast('select-slide', msp.activeIndex)
      },
      pressKey: function (event) {
        if (event.keyCode === 37) {
          this.mySwiper.slidePrev(true, 500)
        } else if (event.keyCode === 39) {
          this.mySwiper.slideNext(true, 500)
        }
      }
    },
    ready: function () {
      this.mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'vertical',
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 0,
        keyboardControl: true,
        mousewheelControl: true,
        onSlideChangeStart: this.onSlideChange,
        hashnav: true
      })
      window.addEventListener('keyup', this.pressKey)
    },
    data () {
      return {
        games: loadGames,
        mySwiper: 0
      }
    },
    components: {slider, timeline}
  }
</script>
