<template>
  <div class="timeline-center">
    <div class="events-wrapper">
      <div class="events">
        <em class="month-mobile" v-if="games[selectedGame].hash === 'intro'">Welcome</em>
        <em class="month-mobile" v-if="games[selectedGame].hash !== 'intro'">{{games[selectedGame].date | full-month-year}}</em>
        <ol>
          <li v-for="game in games">
            <a href v-on:click.prevent="selectDate($index)" v-if="games[$index].hash !== 'intro'" v-bind:style="{left:shiftGames[$index]}" v-bind:class="{'selected':($index === selectedGame), 'older-event':($index < selectedGame)}">
              {{game.date | month-year}}
            </a>
          </li>
        </ol>

        <span class="filling-line" v-bind:style="{width:shiftLine}" aria-hidden="true"></span>
      </div> <!-- .events -->
    </div> <!-- .events-wrapper -->
  </div> <!-- .timeline-center -->

  <!-- <ul class="timeline-navigation">
    <li>
      <a class="prev" v-bind:class="{inactive:(selectedGame === 0)}" v-on:click.prevent="previous" >
        <svg viewBox="0 0 100 70" preserveAspectRatio="none">
          	<path d="M100,34.275L48.533,0v33.376L0,0.057v69.639l48.533-32.332V70L100,34.275z"/>
        </svg>
      </a>
    </li>
    <li>
      <a class="next" v-bind:class="{inactive:(selectedGame === games.length - 1)}" v-on:click.prevent="next" >
        <svg viewBox="0 0 100 70" preserveAspectRatio="none">
          	<path d="M100,34.275L48.533,0v33.376L0,0.057v69.639l48.533-32.332V70L100,34.275z"/>
        </svg>
      </a>
    </li>
  </ul> -->
</template> <!-- .timeline-bar -->

<script type="text/javascript">
  import './timeline.css'

  export default {
    replace: false,
    props: ['games'],
    methods: {
      selectDate: function (gRank) {
        this.selectedGame = gRank
        this.$dispatch('select-game', [gRank, 0])
        this.shiftLine = Math.floor(100 * (gRank) / (this.games.length)) + '%'
      },
      previous: function () {
        if (this.selectedGame > 0) {
          this.selectDate(this.selectedGame - 1)
        }
      },
      next: function () {
        if (this.selectedGame < this.games.length - 1) {
          this.selectDate(this.selectedGame + 1)
        }
      }
    },
    created: function () {
      this.selectedGame = 0
      for (var ii = 0; ii < this.games.length; ii++) {
        if (ii === 0) {
          this.shiftGames.push(0)
        } else {
          this.shiftGames.push(Math.floor(100 * (ii) / (this.games.length)) + '%')
        }
      }
      this.shiftLine = 0
    },
    events: {
      'select-slide': function (locTab) {
        this.selectedGame = locTab[0]
        this.shiftLine = Math.floor(100 * (locTab[0]) / (this.games.length)) + '%'
      }
    },
    data () {
      return {
        shiftGames: [],
        shiftLine: 0,
        selectedGame: 0
      }
    }
  }

</script>
