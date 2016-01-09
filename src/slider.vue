<template>
	<div class="content-wrapper" v-bind:style="{'background-color':game.bckColor}" v-on:click="selectSlide">
		<h2>{{game.name}}</h2>
		<em v-show="game.type === 'game'">{{game.date}}</em>
		<p>{{game.description}}</p>

	</div>
</template>

<script type="text/javascript">
  import './slider.css'

  export default {
    replace: false,
    props: ['game', 'rank'],
    methods: {
      selectSlide: function () {
        this.$dispatch('select-game', this.rank)
      }
    },
    created: function () {
      this.currentSlide = 0
    },
    data () {
      return {
        text: 'vue'
      }
    }
  }

</script>
