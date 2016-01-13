<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			 <div v-for="game in games" class="swiper-slide" data-hash="{{game.hash}}">
					<slider :game="game" :rank="$index" class="slide-content" v-bind:class="{current:($index === mySwiper.activeIndex)}"></slider>
			 </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import slider from './slider.vue'

	import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

	export default {
	  replace: false,
	  props: ['games'],
		components: {slider},
	  methods: {
      onSlideChange: function (msp) {
        this.$dispatch('select-game', msp.activeIndex)
      }
		},
		ready: function () {
      this.mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 0,
        keyboardControl: true,
        mousewheelControl: true,
        onSlideChangeStart: this.onSlideChange,
        hashnav: true
      })
			this.$on('select-slide', function (gRank) {
				this.mySwiper.slideTo(gRank, 500)
			})
    },
		data () {
      return {
        mySwiper: 0
      }
    }
	}

</script>
