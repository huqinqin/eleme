<template>
  <div class="starBox">
    <div class="star" :class="starSize" >
      <span class="starItem" :class="starType" v-for="starType in starTypes"></span>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  const LEN = 5;
  const CLI_ON = 'on';
  const CLI_OFF = 'off';
  const CLI_HALF = 'HALF';
  export default{
     props: {
         size: {
             type: Number
         },
        score: {
             type: Number
        }
     },
    computed: {
      starSize: function () {
        return 'star-' + this.size;
      },
      starTypes: function () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let isDec = score % 1;
        let Inter = Math.floor(score);
        for (var i = 0; i < Inter; i++) {
            result.push(CLI_ON);
        }
        if (isDec) {
            result.push(CLI_HALF);
        }
        while (result.length < LEN) {
            result.push(CLI_OFF);
        }
        return result;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minin.styl"
  .starBox
    width 100%
    .star
        width 100%
        &.star-48
          .starItem
            display inline-block
            width 30px;
            height 30px
            margin-left 4px
            &.on
             bg-image(star48_on)
             background-size 30px 30px
             background-repeat no-repeat
            &.half
             bg-image(star48_half)
             background-size 30px 30px
             background-repeat no-repeat
            &.off
             bg-image(star48_off)
             background-size 30px 30px
             background-repeat no-repeat
        &.star-36
          .starItem
            display inline-block
            width 23px;
            height 23px
            margin-left 4px
            &.on
             bg-image(star36_on)
             background-size 23px 23px
             background-repeat no-repeat
            &.half
             bg-image(star36_half)
             background-size 23px 23px
             background-repeat no-repeat
            &.off
             bg-image(star36_off)
             background-size 23px 23px
             background-repeat no-repeat
        &.star-24
          .starItem
            display inline-block
            width 15px;
            height 15px
            margin-left 4px
            &.on
             bg-image(star24_on)
             background-size 15px 15px
             background-repeat no-repeat
            &.half
             bg-image(star24_half)
             background-size 15px 15px
             background-repeat no-repeat
            &.off
             bg-image(star24_off)
             background-size 15px 15px
             background-repeat no-repeat
</style>
