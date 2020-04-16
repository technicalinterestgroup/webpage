<template lang="html">
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="width-limit">
      <!-- logo -->
      <a href="/" class="logo">
        <img src="../../assets/images/logo.png" alt="">
        <span class="motto">Create your VBlog！</span>
      </a>
      <!-- 主体布局 -->
      <div class="container">
        <ul>
          <li class="tab" v-for="(nav, index) in navTitles" :key="nav" @click="tabAction(index)" :class="{active: tabActive===index}">
            <SvgIcon :iconClass="icons[index]" />
            <span>{{nav}}</span>
          </li>
          <li class="search">
            <form accept-charset="UTF-8" action="/so/search" method="get">
              <input
              type="text" class="search-query" name="keywords" v-model="keywords"
              autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;" placeholder="搜索">
              <a href="javascript:void(0)" class="search-btn">
                <SvgIcon iconClass="search" />
              </a>
            </form>
          </li>
        </ul>
      </div>
      <!-- 用户操作模块 -->
      <div class="mode">
        <!-- 通知 -->
        <span class="notice">
          <SvgIcon iconClass="notification" />
        </span>
        <!-- 用户 -->
        <div class="user">
          <a href="javascript:void(0)">
            <img :src="defaultSrc" alt="">
          </a>
          <ul class="dropdown-menu">
            <li v-for="item in menus" :key="item.authName">
              <a :href="item.url">
                <SvgIcon :iconClass="item.icon" />
                <span>{{item.authName}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions,  mapState} from 'vuex'
export default {
  name: 'SimpleHeader',
  data () {
    return {
      navTitles: ['首页', '博客', '问答', '资源', '关于'],
      icons: ['home', 'eblog', 'question', 'source', 'about'],
      tabActive: 0,
      keywords: '',
      src: '',
      menus: [],
      userName: '',
      password: ''
    }
  },
  mounted () {
    this.userLoginFn()
  },
  methods: {
    ...mapActions(['USERINFO']),
    tabAction (index) {
      this.tabActive = index
    },
    userLoginFn () {
      // this.USERINFO('heihei')
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      console.log(userinfo)
      this.menus = userinfo.authList
    }
  },
  computed: {
    defaultSrc () {
      return this.src || require('@/assets/images/default.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(./style/header.scss);
  nav {
    height: 56px;
    border: 1px solid transparent;
    border-color: #f0f0f0;
    border-width: 0 0 1px;
    .width-limit {
      min-width: 768px;
      max-width: 1440px;
      margin: 0 auto;
      .logo {
        float: left;
        height: 50px;
        padding: 0 15px 0;
        img {
          height: 100%;
        }
        .motto {
          font-size: 12px;
          color: $vTheme;
          font-weight: 600;
        }
      }
      .container {
        ul {
          float: left;
          &:after {
            visibility: hidden;
            display: block;
            content: " ";
            // clear: both;
            height: 56px;
          }
          li {
            height: 56px;
            line-height: 26px;
            list-style: none;
            float: left;
            margin-right: 15px;
            color: $v333;
            /deep/ .svg-icon {
              font-size: 20px;
              margin-right: 5px;
              font-weight: 400;
            }
          }
          .search {
            padding-left: 15px;
            form {
              position: relative;
              top: 9px;
              margin: 0 0 20px;
              .search-query {
                padding: 0 40px 0 20px;
                width: 160px;
                height: 38px;
                font-size: 14px;
                border: 1px solid #eee;
                border-radius: 40px;
                background: #eee;
                transition: width .5s;
                -moz-transition: width .5s;
                -webkit-transition: width .5s;
                -o-transition: width .5s;
                transition-delay: .1s;
                -moz-transition-delay: .1s;
                -webkit-transition-delay: .1s;
                -o-transition-delay: .1s;
              }
              .search-query:focus {
                transition-delay: 0s;
                -moz-transition-delay: 0s;
                -webkit-transition-delay: 0s;
                -o-transition-delay: 0s;
                width: 240px;
                outline: none;
              }
              .search-btn {
                top: 9px;
                right: 0px;
                position: absolute;
                width: 30px;
                height: 30px!important;
                line-height: normal!important;
                padding: 0!important;
                color: #969696!important;
                text-align: center;
              }
              @media (min-width: 1439px) {
                .search-query:focus {
                    width: 320px;
                }
                .search-query {
                  width: 240px;
                }
              }
              .search-query:focus+.search-btn {
                background-color: #969696;
                border-radius: 50%;
                top: 5px;
                right: 5px;
                color: #fff !important;
                line-height: 30px !important;
              }
            }
          }
          li.tab {
            cursor: pointer;
            padding: 15px;
          }
          .tab:hover {
            background: $vHover;
          }
          li.active {
            color: $vTheme;
          }
          .active:hover {
            background: none;
          }
        }
      }
      .mode {
        height: 56px;
        line-height: 56px;
        float: right;
        margin-right: 20px;
        color: $v333;
        font-size: 20px;
        .notice {
          /deep/ .svg-icon {
            font-size: 20px;
            margin-right: 5px;
            font-weight: 400;
          }
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            color: $vTheme;
          }
        }
        .user {
          float: right;
          margin-right: 15px;
          height: 100%;
          img {
            margin-top:5px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
          a {
            padding: 0 10px;
          }
          &:hover {
            background: $vHover;
            .dropdown-menu {
              display: block;
            }
          }
          .dropdown-menu {
            left: auto;
            border-radius: 0 0 4px 4px;
            display: none;
            border-color: #f0f0f0;
            li {
              line-height: 30px;
              a {
               padding: 10px 20px;
               line-height: 30px;
               display: block;
               clear: both;
               font-weight: 400;
               color: $v333;
               white-space: nowrap;
             }
             /deep/ .svg-icon {
               margin-right: 15px;
               font-size: 18px;
               color: $vTheme;
               vertical-align: middle;
             }
            }
          }
        }
      }
    }
  }
</style>
<style>

</style>
