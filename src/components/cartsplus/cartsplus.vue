<template>
   <div class="cartPlus">
     <transition name="cartsFade">
       <span class="deca " v-show="food.count > 0" @click="decrease">
         <span class="icon-remove_circle_outline"></span>
       </span>
     </transition>
     <span class="num" v-show="food.count > 0">{{food.count}}</span>
     <span class="icon-add_circle" @click.stop.prevent="crease" ></span>
   </div>
</template>
<script type="text/ecmascript-6">
  import vue from 'vue';
  export default{
      props: {
          food: {
              type: Object
          }
      },
    methods: {
      crease: function (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', event.target);
       },
      decrease: function (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartPlus
    position absolute
    right 18px
    bottom 18px
    font-size 24px
    line-height 24px
    .deca
     display inline-block
     &.cartsFade-enter
       opacity 0
       transform   translate3d(43px,0,0)
     &.cartsFade-enter-active
       transition all 0.5s linear
       .icon-remove_circle_outline
         transition all 0.5s linear
         transform rotateX(180deg)
     &.cartsFade-leave-active
        transition all 0.5s linear
        transform   translate3d(43px,0,0)
        .icon-remove_circle_outline
          transition all 0.5s linear
          transform rotateX(180deg)
     .icon-remove_circle_outline
      display inline-block
      color rgb(0,160,220)
      vertical-align middle
      width 24px
      height 25px
    .icon-add_circle
      display inline-block
      color rgb(0,160,220)
      vertical-align middle
      width 24px
      height 25px
    .num
       display inline-block
       font-size 10px
       color rgb(147,153,159)
       line-height 24px
       vertical-align middle
</style>
