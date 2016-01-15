<template>
	<div class="content-wrapper" v-bind:style="{'background-color':game.bckColor}" v-on:click="selectSlide">
		<h2>{{game.name}}</h2>
		<em v-show="game.hash !== 'intro' && slide.type === 'info'">{{game.date}}</em>
		<p>{{slide.content}}</p>

	</div>
</template>

<script type="text/javascript">
	import './slider.css'

	export default {
		replace: false,
		props: ['game', 'slide', 'rank'],
		methods: {
				selectSlide: function () {
					this.$dispatch('select-game', this.rank)
				}
			}
		}

</script>
