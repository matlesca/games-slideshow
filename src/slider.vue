<template>
	<div class="content-wrapper" v-bind:style="{'background-color':game.bckColor}" v-on:click="selectSlide">
		<div class="table-wrap">
			<div class="content-center">
				<h2>{{game.name}}</h2>
				<em v-show="game.hash !== 'intro' && slide.type === 'info'">{{game.date}}</em>
				<p>{{slide.content}}</p>
			</div>
		</div>

		<!-- Scrolling helpers : -->
		<div class="scroll-bottom-info" v-show="game.hash === 'intro'">
			<em>Scroll <span>or press arrow keys</span> to continue</em>
			<br>
			<svg width="50px" height="10px" viewBox="0 0 50 10">
				<polygon points="25,10 0,0 50,0 "/>
			</svg>
		</div>
		<div class="scroll-right-info" v-show="game.hash !== 'intro' && game.slides.indexOf(slide) < game.slides.length - 1">
			<svg width="10px" height="50px" viewBox="0 0 10 50">
				<polygon points="10,25 0,50 0,0 "/>
			</svg>
		</div>
		<div class="scroll-left-info" v-show="game.hash !== 'intro' && game.slides.indexOf(slide) > 0">
			<svg width="10px" height="50px" viewBox="0 0 10 50">
				<polygon points="0,25 10,50 10,0 "/>
			</svg>
		</div>

		<!-- Download button : -->
		<a class="dl-button" v-if="game.hash !== 'intro' && game.slides.indexOf(slide) === 0" href="{{game.dl_url}}">
			<button type="button" name="Download">
				<svg viewBox="0 0 25 25" >
					<polygon points="18.235,11.917 18.235,0 6.765,0 6.765,11.917 0,11.917 12.5,25 25,11.917 "/>
				</svg>
				<span>DOWNLOAD</span>
			</button>
		</a>

	</div>
</template>

<script type="text/javascript">
	import './slider.css'

	export default {
		replace: false,
		props: ['game', 'slide', 'rank'],
		methods: {
				selectSlide: function () {
					this.$dispatch('select-game', [this.rank, this.game.slides.indexOf(this.slide)])
				}
			}
		}

</script>
