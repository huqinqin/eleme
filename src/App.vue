<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <div class="content_nav border-1px">
      <div class="seller_item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="seller_item">
        <router-link to="/seller">商家</router-link>
      </div>
      <div class="seller_item">
        <router-link to="/ratings">评论</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  import header from './components/header/header.vue';
export default {
    data() {
        return {
            seller: {}
        };
    },
    components: {
        'v-header': header
    },
  created() {
        this.$http.get('/api/seller').then(function (response) {
           response = response.body;
           if (response.errno === ERR_OK) {
                this.seller = response.data;
           }
        });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/minin.styl'
  .content_nav
    width 100%
    display flex
    line-height 40px
    height 40px
    text-align center
    border-1px(rgba(7,17,27,0.1))
    .seller_item
     flex 1
     &:first-child
      a
       display inline-block
       width 100%
       font-size 14px
       color rgb(240,20,20)
     &:nth-child(2)
       a
         display inline-block
         width 100%
         font-size 14px
         color rgb(77,85,93)
     &:nth-child(3)
       a
          display inline-block
          width 100%
          font-size 14px
          color rgb(77,85,93)
</style>
