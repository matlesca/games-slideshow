<template>
	<div class="vertical-slide swiper-container">
		<div class="swiper-wrapper">
			 <div class="swiper-slide" v-for="game in games" data-hash="{{game.hash}}">
				 	<div class="horizontal-slide hor-{{$index}} swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="slide in game.slides">
								<slider :game="game" :rank="games.indexOf(game)" :slide="slide" class="slide-content current-line" v-if="horizontalSwipers" v-bind:class="{'current-line':(games.indexOf(game) === verticalSwiper.activeIndex)}"></slider>
							</div>
						</div>
				 	</div>
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
		created: function () {

		},
		ready: function () {
      this.verticalSwiper = new Swiper('.vertical-slide', {
        direction: 'vertical',
        speed: 500,
				slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        keyboardControl: true,
        mousewheelControl: true,
        onSlideChangeStart: this.onSlideChange,
        hashnav: true
      })
			for (var ii = 0; ii < this.games.length; ii++) {
				this.horizontalSwipers.push(
					new Swiper('.hor-' + ii, {
						direction: 'horizontal',
						speed: 500,
						slidesPerView: 'auto',
						centeredSlides: true,
						spaceBetween: 0,
						keyboardControl: true,
						nested: true
					})
				)
			}
			this.$on('select-slide', function (gRank) {
				this.verticalSwiper.slideTo(gRank, 500)
			})
    },
		data () {
      return {
        verticalSwiper: 0,
				horizontalSwipers: [],
				sliderData: []
      }
    }
	}

</script>
