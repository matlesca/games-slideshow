<template>
	<div class="vertical-slider swiper-container">
		<div class="swiper-wrapper">
			 <div class="swiper-slide vslide" v-for="game in games" data-hash="{{game.hash}}">
				 	<div class="horizontal-slider swiper-container hor-{{$index}}">
						<div class="swiper-wrapper">
							<div class="swiper-slide hslide" v-for="slide in game.slides">
								<slider :game="game" :rank="games.indexOf(game)" :slide="slide" class="slide-content"></slider>
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
				if (this.horizontalSwipers.length) {
					this.$dispatch('select-game', [msp.activeIndex, this.horizontalSwipers[msp.activeIndex].activeIndex])
				} else {
					// case when a slide change occurs before horizontal swipers are instanciated
					this.$dispatch('select-game', [msp.activeIndex, 0])
				}
      }
		},
		ready: function () {
      this.verticalSwiper = new Swiper('.vertical-slider', {
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
			this.$on('select-slide', function (locTab) {
				this.verticalSwiper.slideTo(locTab[0], 500)
				this.horizontalSwipers[locTab[0]].slideTo(locTab[1], 500)
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
