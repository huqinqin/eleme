<template>
  <transition name="animate">
    <div class="detailFood"  v-show="fold" ref="detailFood">
      <div>
        <span class="icon-arrow_lift" @click="fold = !fold"></span>
        <div class="first">
          <div class="images"><img :src="food.image" alt="" width="100%"></div>
          <div class="title">{{food.name}}</div>
          <div class="sell">
            <span class="monthSell">月售{{food.sellCount}}份</span>
            <span class="goodRatings">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="newPrice">￥{{food.price}}</span>
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <split></split>
        <div class="intro">
          <h2 class="title">商品介绍</h2>
          <p class="word">{{food.info}}</p>
        </div>
        <split></split>
        <div class="ratings">
          <h2 class="title">商品评价</h2>
          <satisfy></satisfy>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import satisfy from '../satisfy/satisfy.vue';
export default{
    props: {
        food: {
            type: Object
        }
    },
  data() {
        return {
          fold: false
        };
  },
  methods: {
     show: function () {
       this.fold = true;
       this.$nextTick(function () {
         if (!this.scroll) {
           this.scroll = new BScroll(this.$refs.detailFood, {
             click: true
           });
         } else {
           this.scroll.refresh();
         }
       });
     },
    _initscroll: function () {
       if (!this.scroll) {
           this.scroll = new BScroll(this.$refs.detailFood, {
               click: true
           });
       } else {
           this.scroll.refresh();
       }
    }
  },
  components: {
        split,
        satisfy
  },
  created() {
        this.$nextTick(function () {
          this._initscroll();
        });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .detailFood
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 800
    background-color rgb(255,255,255)
    &.animate-enter
      transform translate3d(-100%,0,0)
    &.animate-enter-active
      transition all 0.5s linear
    &.animate-leave-active
      transform translate3d(-100%,0,0)
      transition all 0.5s linear
    .icon-arrow_lift
      display inline-block
      position absolute
      top 10px
      left 0
      color white
      font-weight 700
      font-size 20px
    .first
      width 100%
      .title
       color rgb(7,17,27)
       font-size 14px
       font-weight 700
       line-height 14px
       margin-left 18px
       margin-top 18px
      .sell
        font-size 0px
        line-height 18px
        color rgb(7,17,27,0.3)
        margin-left 18px
        margin-top 8px
       .monthSell
         display inline-block
         font-size 12px
       .goodRatings
         font-size 12px
         display inline-block
         margin-left 12px
      .price
        margin-left 18px
        font-size 0
        .newPrice
          display inline-block
          font-weight 700
          color rgb(240,20,20)
          line-height 24px
          font-size 14px
        .oldPrice
          font-size 10px
          display inline-block
          color rgb(143,157,159)
          text-decoration line-through
          margin-left 8px
          font-weight 700
    .intro
       box-sizing border-box
       padding 18px
       width 100%
       .title
         color rgb(7,17,27)
         font-size 14px
         font-weight 700
         line-height 14px
       .word
         font-weight 200
         color rgb(77,85,93)
         line-height 24px
         font-size 12px
         margin-top 12px
    .ratings
       width 100%
       .title
         padding 18px 18px 0 18px
</style>
