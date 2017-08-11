<template>
  <div class="goodsWrapper">
    <div class="goodsWrapperLeft" ref="goodMenu">
      <ul>
        <li class="goodsName" v-for="(goodItem, index) in goods" @click="slide(index,$event)" :class="{'current': currentIndex === index}">
          <div class="itemWrapper">
            <span class="icon" :class="select[goodItem.type]" v-if="goodItem.type != -1"></span><span class="goodWord">{{goodItem.name}}</span>
          </div>
         </li>
      </ul>
    </div>
    <div class="goodsWrapperRight" ref="foodItem">
      <div>
        <ul class="goodsContent food-list-hook" v-for="goodItem in goods">
          <div class="goodTitle">{{goodItem.name}}</div>
          <li  class="item" v-for="food in goodItem.foods">
            <div class="goodBox">
              <div class="goodBoxLeft">
                <div class="pics"><img :src="food.icon" alt="" width="57" height="57"></div>
              </div>
              <div class="goodBoxRight" @click = 'requireFood(food,$event)'>
                <div class="goodBoxRightTitle">{{food.name}}</div>
                <div class="description" v-if="food.description != ''">{{food.description}}</div>
                <div class="goodSell">
                  <span class="sell">月售{{food.sellCount}}份</span>
                  <span class="goodratings">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">￥{{food.price}}</span>
                  <span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </div>
            <cartplus :food="food" @cartAdd="_drop"></cartplus>
          </li>
        </ul>
      </div>
    </div>
    <shopcarts :selectFood="selectFood" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" ref="shopcart"></shopcarts>
    <detailfood :food = "getFood" ref="foods"></detailfood>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcarts from '../shopcarts/shopcarts.vue';
  import cartplus from '../cartsplus/cartsplus.vue';
  import detailfood from '../detailfood/detailfood.vue';
  const ERR_OK = 0;
  export default{
      props: {
          seller: {
              type: Object
          }
      },
      data() {
          return {
              goods: [],
              foodList: [],
              scrollY: 0,
              getFood: {},
              fold: true
          };
      },
    computed: {
      currentIndex: function () {
        for (let i = 0; i < 10; i++) {
          let height1 = this.foodList[i];
          let height2 = this.foodList[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
       return 0;
      },
      selectFood: function () {
        let foodDepot = [];
        this.goods.forEach(function (item) {
          item.foods.forEach(function (itemFood) {
            if (itemFood.count) {
                foodDepot.push(itemFood);
            }
          });
        });
        return foodDepot;
      }
    },
      created() {
         this.$http.get('/api/goods').then((response) => {
           response = response.body;
           if (response.errno === ERR_OK) {
               this.goods = response.data;
           }
           this.$nextTick(function () {
             this._initscroll();
             this._calcuHei();
           });
         });
        this.select = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      },
    methods: {
          _initscroll: function () {
            this.menuScroll = new BScroll(this.$refs.goodMenu, {
                probeType: 3,
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodItem, {
              probeType: 3,
              click: true
            });
            this.foodScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y));
            });
          },
          _calcuHei: function () {
            let foodss = this.$refs.foodItem.getElementsByClassName('food-list-hook');
            let height = 0;
            this.foodList.push(height);
            for (let i = 0; i < foodss.length; i++) {
                height += foodss[i].clientHeight;
                this.foodList.push(height);
            }
            return this.foodList;
          },
         slide: function (index, event) {
           if (!event._constructed) {
             return;
           }
           let foodss = this.$refs.foodItem.getElementsByClassName('food-list-hook');
           let goods = foodss[index];
           this.foodScroll.scrollToElement(goods, 300);
         },
      _drop(target) {
          this.$refs.shopcart.drop(target);
      },
      requireFood: function (food, event) {
              if (!event._constructed) {
                  return;
              }
              this.getFood = food;
              this.$refs.foods.show();
      }
    },
    components: {
          shopcarts,
          cartplus,
          detailfood
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minin.styl"
 .goodsWrapper
   width 100%
   display flex
   position absolute
   top 176px
   bottom 46px
   overflow hidden
   .goodsWrapperLeft
     flex 0 0 80px
     width 80px
     .goodsName
      padding 12px
      height 54px
      background #f3f5f7
      display table
      &.current
        background-color white
      &.current1
        background-color white
      .itemWrapper
          display table-cell
          vertical-align middle
          width: 56px;
          .icon
              display inline-block
              width 15px
              height 15px
              vertical-align middle
              margin-right 4px
              &.decrease
                bg-image(decrease_1)
                background-repeat no-repeat
                background-size 15px 15px
              &.discount
                bg-image(discount_1)
                background-repeat no-repeat
                background-size 15px 15px
              &.guarantee
                bg-image(guarantee_1)
                background-repeat no-repeat
                background-size 15px 15px
              &.invoice
                bg-image(invoice_1)
                background-repeat no-repeat
                background-size 15px 15px
              &.special
                bg-image(special_1)
                background-repeat no-repeat
                background-size 15px 15px
          .goodWord
           font-size 12px
           color rgba(0,0,0,0.8)
           line-height 14px
   .goodsWrapperRight
     flex:1
     .goodsContent
      .goodTitle
        width 100%
        font-size 12px
        color rgb(147,153,159)
        line-height 26px
        background: #f3f5f7
        border-left 4px solid #d9dde1
        padding-left 14px
      .item
        position relative
        .goodBox
          display flex
          font-size 0
          margin 0px 18px
          padding 18px 0
          border-bottom 1px solid rgba(7,17,27,0.1)
          .goodBoxLeft
            flex 0 0 57px
            width 57px
            vertical-align middle
          .goodBoxRight
            flex:1
            padding-left 10px
            vertical-align middle
            .goodBoxRightTitle
              font-size 14px
              line-height 14px
              font-weight 700
              color rgb(7,17,27)
            .description
              color rgb(147,153,159)
              font-size 10px
              line-height 14px
              margin-top 8px
            .goodSell
              margin-top 8px
              .sell
                display inline-block
                color rgb(147,153,159)
                font-size 10px
                line-height 10px
              .goodratings
                display inline-block
                color rgb(147,153,159)
                font-size 10px
                line-height 10px
                margin-left 12px
            .price
              font-size 0
              margin-top 8px
              .newPrice
                font-size 12px
                font-weight 700
                line-height 24px
                color red
              .oldPrice
                color rgb(147,153,159)
                font-weight 700
                line-height 24px
                font-size 10px
                text-decoration line-through
</style>
