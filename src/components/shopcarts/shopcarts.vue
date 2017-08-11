<template>
  <div class="shopcarts">
      <div class="shopcartsLeft" @click="show">
        <span class="cartsIcon icon-shopping_cart" :class="{'active': totalCount > 0}"></span>
        <span class="zero">￥{{totalPrice}}</span>
        <span class="extprice">另需配送费{{deliveryPrice}}元</span>.
        <span class="num" v-show="totalCount">{{totalCount}}</span>
      </div>
      <div class="shopcartsRight" v-show="!totalCount">{{minPrice}}元起送</div>
      <div class="shopcartsRight" v-show="totalCount > 0 && minPrice > totalPrice">还差{{minPrice - totalPrice}}元起送</div>
      <div class="shopcartsRight blue" v-show="minPrice <= totalPrice">去结算</div>
      <div class="shopInfo" v-show="listShow">
        <ul class="detailInfo">
          <div class="title">
            <span class="carts">购物车</span>
            <span class="clear">清空</span>
          </div>
          <div ref="info" style="max-height: 300px">
            <div>
              <li class="foodItem" v-for="food in selectFood">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price}}</span>
                <cartplus :food="food" class="oldCarts" @cartAdd="_drop"></cartplus>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div class="ballContain">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop" >
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
   </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartplus from '../cartsplus/cartsplus.vue';
  export default{
      data() {
        return {
            fold: true,
            balls: [{
                show: false
            },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              }],
          dropBalls: []
        };
      },
      props: {
        selectFood: {
            type: Array,
           default() {
            return [];
          }
        },
        minPrice: {
            type: Number,
            default: 0
        },
        deliveryPrice: {
          type: Number,
          default: 0
        }
      },
    computed: {
          totalCount: function () {
            let count = 0;
            this.selectFood.forEach(function (food) {
                  count += food.count;
            });
            return count;
          },
          totalPrice: function () {
            let price = 0;
            this.selectFood.forEach(function (food) {
               price += food.count * food.price;
            });
            return price;
          },
          listShow: function () {
            if (!this.totalCount) {
                return false;
            }
            let show = !this.fold;
            if (show) {
              if (!this.scroll) {
                this.$nextTick(function () {
                  this.scroll = new BScroll(this.$refs.info, {
                    click: true
                  });
                });
              } else {
                this.scroll.refresh();
              }
            }
            return show;
          }
     },
    components: {
      cartplus
    },
    methods: {
          show: function () {
             this.fold = !this.fold;
             return this.fold;
          },
          _initScroll: function () {
              if (!this.scroll) {
                  this.$nextTick(function () {
                    this.scroll = new BScroll(this.$refs.info, {
                      click: true
                    });
                  });
              } else {
                  this.scroll.refresh();
              }
          },
          drop: function (el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
      },
      _drop(target) {
        this.drop(target);
      },
      beforeDrop: function(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
            el.style.transform = 'translate3d(0,' + y + 'px,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0, 0)';
            inner.style.transform = 'translate3d(' + x + 'px, 0, 0)';
          }
        }
      },
      dropping: function(el, done) {
        /* eslint-disadle no-unused-vars */
        let refresh = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          console.log(inner);
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop: function(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
            console.log(el);
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcarts
   width 100%
   position fixed
   bottom 0
   left 0
   z-index 1000
   display flex
   height 56px
   line-height 56px
   box-sizing border-box
   .shopcartsLeft
     flex 1
     background-color #141d27
     font-size 0
     position relative
     z-index 1000
     .cartsIcon
         display inline-block
         width 42px
         height 42px
         line-height 42px
         border-radius 50%
         background-color rgba(255,255,255,0.2)
         text-align center
         box-shadow 0 0 0 9px #141d27, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05)
         margin-left  18px
         font-size 24px
         color #80858a
         &.active
           background-color rgb(0,160,220)
           color rgb(255,255,255)
     .zero
        display inline-block
        font-size 16px
        color rgba(255,255,255,0.4)
        font-weight 700
        line-height 24px
        padding 0 18px
        border-right 1px solid rgba(255,255,255,0.1)
     .extprice
       display inline-block
       color rgba(255,255,255,0.4)
       font-size 16px
       margin-left 18px
     .num
       display inline-block
       width 24px
       height 16px
       text-align center
       background-color red
       font-size 9px
       font-weight 700
       color rgb(255,255,255)
       line-height 16px
       position absolute
       left 43px
       top -6px
       border-radius 30%
   .shopcartsRight
    flex 0 0 105px
    width 105px
    text-align center
    font-size 12px
    color rgba(255,255,255,0.4)
    background-color rgba(0,0,0,0.7)
    font-weight 700
   .blue
     background-color #00a0dc
     color white
     z-index 1000
   .shopInfo
      position absolute
      bottom 56px
      left 0
      width 100%
      z-index 100
      background-color white
      max-height 300px
      overflow hidden
      .detailInfo
        width 100%
        margin 0 auto
        .title
          width 100%
          display flex
          border-bottom 1px solid rgba(7,17,27,0.1)
          padding 0 18px
          box-sizing border-box
          background-color #f3f5f7
          .carts
            display inline-block
            flex 1
            text-align left
            font-size 14px
            font-weight 200
            color rgb(7,17,27)
            height 40px
            line-height 40px
          .clear
            display inline-block
            flex 1
            text-align right
            font-size 14px
            font-weight 200
            color rgb(0,160,220)
            height 40px
            line-height 40px
        .foodItem
          height 48px
          line-height 48px
          width 90%
          margin 0 auto
          position relative
          border-bottom 1px solid rgba(7,17,27,0.2)
          .name
            display inline-block
            line-height 24px
            color rgb(7,17,27)
            font-size 14px
            width 50%
          .price
            display inline-block
            font-size 14px
            color rgb(240,20,20)
            line-height 24px
            width 20%
            font-weight 700
            text-align right
          .oldCarts
            bottom 11px
            margin-left 12px
   .ballContain
     .ball
       position fixed
       left 32px
       bottom 22px
       z-index 200
       &.drop-enter-active
         transition  all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
         .inner
           transition all 0.4s
       .inner
         border-radius 50%
         background-color rgb(0,160,220)
         width 16px
         height 16px
</style>
