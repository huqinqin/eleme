<template>
  <div class="header">
     <div class="contentWrapper">
       <div class="contentLeft">
         <img :src="seller.avatar" alt="" width="64" height="64" style="border-radius: 4px">
       </div>
       <div class="contentRight">
         <div class="name">
           <span class="famous_icon"></span><span class="shopname">{{seller.name}}</span>
         </div>
         <div class="arive">
           <span class="description">{{seller.description}}</span>/<span class="ariveTime">{{seller.deliveryTime}}送达</span>
         </div>
         <div class="onSell">
           <span class="icon" :class="select[seller.supports[0].type]"></span><span class="supportsDec">{{seller.supports[0].description}}</span>
         </div>
         <div class="five" @click="show">
           <span class="fiveNum">{{seller.supports.length}}个</span><span class="icon-keyboard_arrow_right arror"></span>
         </div>
       </div>
       <div class="background"><img :src="seller.avatar" alt="" width="100%" height="100%"></div>
     </div>
     <div class="bulletion" @click="show">
       <span class="bulletionIcon"><span class="text">{{seller.bulletin}}</span></span>
       <span class="icon-keyboard_arrow_right rignt_icon"></span>
     </div>
    <transition name="fade">
      <div class="showDetail" v-show="flag">
        <div class="showWrapper">
          <div class="showBox">
            <div class="showName">{{seller.name}}</div>
            <stars :size="36" :score="seller.score"></stars>
            <div class="sellInfo">
              <div class="line"></div>
              <div class="title">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="sellContent">
              <li class="sellItem" v-for="(item,index) in seller.supports"><span class="icon" :class="select[index]"></span><span class="sellItemContent">{{item.description}}</span></li>
            </ul>
            <div class="sellInfo">
              <div class="line"></div>
              <div class="title">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="notice">{{seller.bulletin}}</p>
          </div>
        </div>

        <div class="close icon-close" @click="close"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import stars from '../stars/stars.vue';
  export default {
      data() {
          return {
              flag: false
          };
      },
     props: {
         seller: {
             type: Object
         }
     },
    created() {
      this.select = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
          show: function () {
            this.flag = !this.flag;
          },
         close: function () {
           this.flag = false;
      }
    },
    components: {
          stars
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minin.styl"
  .header
    width 100%
    .contentWrapper
      position relative
      padding 24px 24px 18px 24px
      background rgba(0,0,0,0.4)
      display flex
     .contentLeft
       flex 0 0 64px
       width 64px
     .contentRight
       flex 1
       margin-left 16px
       position relative
       .name
         font-size 16px
         font-weight bold
         color rgb(255,255,255)
         margin-bottom 8px
        .famous_icon
          display inline-block
          width 35px
          height 20px
          bg-image(brand)
          background-size 35px 20px
          margin-right 6px
          vertical-align middle
        .shopname
           display inline-block
           height 18px
           line-height 18px
       .arive
         color rgb(255,255,255)
         font-weight 200px
         line-height 12px
         font-size 12px
         margin-bottom 8px
       .onSell
         color rgb(255,255,255)
         font-weight 200
         line-height 12px
         font-size 10px
         .icon
           display inline-block
           width 15px
           height 15px
           vertical-align middle
           margin-right 4px
           &.decrease
             bg-image(decrease_1)
             background-size 15px 15px
           &.discount
             bg-image(discount_1)
             background-size 25px 20px
           &.guarantee
             bg-image(guarantee_1)
             background-size 25px 20px
           &.invoice
             bg-image(invoice_1)
             background-size 25px 20px
           &.special
             bg-image(special_1)
             background-size 25px 20px
       .five
         position absolute
         right 0
         bottom 5px
         width 40px
         height 24px
         background rgba(0,0,0,0.2)
         border-radius 24%
         text-align center
         .fiveNum
           display inline-block
           color rgb(255,255,255)
           font-weight 200
           line-height 24px
           font-size 10px
         .arror
           display inline-block
           vertical-align top
           line-height 24px
           color rgb(255,255,255)
     .background
       position absolute
       left:0
       top 0
       height 100%
       width 100%
       z-index -1
       filter blur(10px)
       background rgba(0,0,0,0.2)
    .bulletion
      width 100%
      height 28px
      background rgba(7,17,27,0.2)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      line-height 28px
      padding  0 12px
      color rgb(255,255,255)
      box-sizing border-box
      position relative
      .bulletionIcon
        bg-image(bulletin)
        background-repeat no-repeat
        background-size 20px 15px
        vertical-align middle
        font-size 10px
        font-weight 200
        color: rgb(255,255,255)
        .text
          margin-left 24px
      .rignt_icon
        position absolute
        right:0
        top 9px
    .showDetail
      width 100%
      height 100%
      background rgba(7,17,27,0.8)
      position fixed
      left 0
      top 0
      z-index 1000
      box-sizing border-box
      overflow auto
    .fade-enter-active, .fade-leave-active
       transition: opacity  .5s
    .fade-enter, .fade-leave-active
       opacity:0
      .showWrapper
       min-height 100%
       .showBox
          padding: 0 36px
          padding-top 64px
          padding-bottom 64px
          text-align center
          .showName
            width 100%
            color rgb(255,255,255)
            font-weight 700
            font-size 16px
            line-height 18px
            margin-bottom 16px
          .sellInfo
            display flex
            width 100%
            margin-top 28px
            .line
              flex 1
              border-top 1px solid rgba(255,255,255,0.2)
              position relative
              top 6px
              left 0
            .title
              padding 0 12px
              font-size 16px
              font-weight 700
              color rgb(255,255,255)
              line-height 16px
          .sellContent
            margin-top 24px
            width 100%
            text-align left
            .sellItem
              width 100%
              padding-left 6px
              font-size 0
              margin-top 6px
              .icon
                display inline-block
                width 15px
                height 15px
                vertical-align middle
                margin-right 4px
                &.decrease
                  bg-image(decrease_1)
                  background-size 15px 15px
                &.discount
                  bg-image(discount_1)
                  background-size 15px 15px
                &.guarantee
                  bg-image(guarantee_1)
                  background-size 15px 15px
                &.invoice
                  bg-image(invoice_1)
                  background-size 15px 15px
                &.special
                  bg-image(special_1)
                  background-size 15px 15px
              .sellItemContent
                display inline-block
                font-size 12px
                font-weight 200
                color rgb(255,255,255)
                line-height 12px
                margin-left 6px
                vertical-align middle
          .notice
            text-align left
            margin-top 24px
            font-size 12px
            font-weight 200
            color rgb(255,255,255)
            line-height 24px
      .close
        width 32px
        height 32px
        position relative
        margin -64px auto 0 auto
        color rgba(255,255,255,0.5)
        font-size 32px
        text-align center
</style>
