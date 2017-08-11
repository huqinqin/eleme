<template>
  <div class="wrapper">
    <div class="threeNum">
      <span class="first" :class="{active: rateType === 2}">{{ratingType.All}}</span>
      <span class="second" :class="{active: rateType === 0}">{{ratingType.satisfy}}</span>
      <span class="three" :class="{active: rateType === 1}">{{ratingType.noSatisfy}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
   export default{
       data() {
           return {
               ratingType: {
                 All: '全部',
                 satisfy: '推荐',
                 noSatisfy: '吐槽'
               },
               rateType: 2
           };
       }
   };
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .wrapper
   width 100%
   box-sizing border-box
   .threeNum
     padding 18px  0
     margin 0 18px
     font-size 0
     border-bottom 1px solid rgba(7,17,27,0.2)
     .first
       width 50px
       border-radius 24px
       background-color rgba(0,160,220,0.2)
       line-height 32px
       height 32px
       display inline-block
       color rgb(77,85,93)
       text-align center
       font-size 12px
       &.active
         background-color rgb(0,160,220)
         color rgb(255,255,255)
     .second
       width 50px
       border-radius 24px
       background-color rgba(0,160,220,0.2)
       line-height 32px
       height 32px
       display inline-block
       text-align center
       font-size 12px
       color rgb(77,85,93)
       margin-left 8px
       &.active
         background-color rgb(0,160,220)
         color rgb(255,255,255)
     .three
       width 50px
       border-radius 24px
       background-color rgba(0,160,220,0.2)
       line-height 32px
       height 32px
       display inline-block
       text-align center
       font-size 12px
       color rgb(77,85,93)
       margin-left 8px
       &.active
         background-color rgb(0,160,220)
         color rgb(255,255,255)
</style>
