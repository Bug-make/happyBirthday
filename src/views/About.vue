<!--  -->
<template>
  <div class="cart">
    <div class="header-cart">
      <router-link to="/" tag="span" class="back"> X </router-link>
    </div>
    <div class="item">
      <div class="header-title">
        <span class="icon">
          <span class="num">{{ tocount }}</span>
        </span>
        <span class="title">Cart</span>
      </div>
      <div class="shelf-item" v-for="(item, index) in cartData" :key="item.id">
        <img
          src="https://react-shopping-cart-67954.firebaseapp.com/static/media/12064273040195392_1.2995d79a.jpg"
          alt=""
        />
        <div class="shelf-item__thumb">
          <div class="title">{{ item.title }}</div>
          <div class="dele">
            {{ item.availableSizes[0] }} | {{ item.style }}
          </div>
          <div class="count">{{ item.count }}</div>
        </div>
        <div class="right">
          <p class="del" @click="$store.commit('DELECT', index)"></p>
          <p class="price">{{ parseFloat(item.price).toFixed(2) }}</p>
          <div>
            <button @click="click(item, 'add')">+</button>
            <button :disabled="item.count == 1" @click="click(item, 'jian')">
              -
            </button>
          </div>
        </div>
      </div>
      <div v-show="cartData.length == 0" class="shelf-empty" >
        Add some products in the cart
        <br />
        :)
      </div>
    </div>
    <div class="footer">
      <div class="sub">SUBTOTAL</div>
      <div class="toprice">
        <div class="to">${{ parseFloat(to).toFixed(2) }}</div>
        <div class="stages">
          OR UP TO {{ Max }} x $ {{ (to > 0 ? to / Max : 0).toFixed(2) }}
        </div>
      </div>

      <button>Checkout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  computed: {
    ...mapState(["cartData"]),
    to() {
      let toprice = 0;
      this.cartData.map((item) => {
        return (toprice = toprice + parseFloat(item.Tprice));
      });
      return parseFloat(toprice).toFixed(2);
    },
    tocount() {
      let tocount = 0;
      this.cartData.map((item) => {
        return (tocount += item.count);
      });
      return tocount;
    },
    Max() {
      return this.cartData.length == 0
        ? 0
        : this.cartData.sort((a, b) => b.installments - a.installments)[0]
            .installments;
    },
  },
  methods: {
    click(item, _type) {
      this.$store.dispatch("setCart", {
        id: item.id,
        title: item.title,
        price: item.price,
        _type,
        availableSizes: item.availableSizes,
      });
    },
  },
  created() {
    this.$store.dispatch("setCartData");
  },
};
</script>
<style lang='less' scoped>
.cart {
  width: 100%;
  height: 5rem;
  background: #1b1a20;
  .header-cart {
    z-index: 9;
    .back {
      display: inline-block;
      width: 60px;
      height: 60px;
      position: fixed;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 60px;
      color: #ececec;
    }
  }
  .header-title {
    padding: 25px 0;
    color: #ececec;
    box-sizing: border-box;
    text-align: center;
    .icon {
      width: 40px;
      height: 40px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin-right: 15px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCwwQEgYn7+gWAAABQklEQVRIx9WTsUoDQRRF72xMYSFokcRCjBFESGWRwtZe8AtEFFNrI1bB0tLGQuzs/AJB8AO2kZRCxBiRQNKIoIYoyLFwCZuss9nNgpBXzc7be3j3zow09mU48321zVF8gNtbZ5Q1UwmGYQPIxFU5vnVdUuHfARO+OD5oa9GzM6NcbICkem+CLZ0kA1zKHQ2w6tlpqRUN4AwA5knFiTAISGsuHqDfwoOkgp4kUkoP1WI+Azt02ZYk9hle3cAEBh69c7iKEOJ30IJU/71KpqbaKCH6b0LEGgTcaYXpeIj+GJf54pyI70CSTACxq1M5ehmqvDCHfwIkFrQW4S1WzXUCq+E5lNhkMqSfo0ze3t7hlWeqIfJ3GnQo2n644ZhZYMnSL9OQcKnYAHs0ueUeY+nn6eDyRskGcFjngGxIBkUqVvk41g+oBJ136GBf8AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0xMlQxNjoxODowNiswMTowMEVm3zEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMTJUMTY6MTg6MDYrMDE6MDA0O2eNAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50%;
      .num {
        display: inline-block;
        width: 18px;
        height: 18px;
        color: #0c0b10;
        font-weight: 700;
        font-size: 0.7em;
        text-align: center;
        line-height: 18px;
        border-radius: 50%;
        background-color: #eabf00;
        position: absolute;
        bottom: -5px;
        right: 0;
      }
    }
    .title {
      font-weight: 700;
      font-size: 1.2em;
      vertical-align: middle;
    }
  }
  .item {
    // padding-top: 50px;
    .shelf-item {
      border-bottom: 1px solid;
      margin-bottom: 2px;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      img {
        vertical-align: middle;
        margin-right: 3%;
        width: 15%;
      }
      .shelf-item__thumb {
        .title {
          color: #ececec;
          margin: 0;
          font-size: 18px;
        }
        .dele,
        .count {
          color: #5b5a5e;
          margin: 0;
          font-size: 16px;
        }
      }
      .right {
        // position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .del {
          width: 16px;
          height: 16px;
          // top: 15px;
          right: 5%;
          border-radius: 50%;
          // position: absolute;
          background-size: auto 100%;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAOCAYAAADT0Rc6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMzgwMTE3NDA3MjA2ODExODA4MzlFRjgwMkJGMENDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NzRFMzQ0QjI3MzgxMUU4QjRFMUVBNEJCODU5RDAzMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NzRFMzQ0QTI3MzgxMUU4QjRFMUVBNEJCODU5RDAzMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUE3RjExNzQwNzIwNjgxMUIxQTQ5QTgyNkJBMzJBOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDM4MDExNzQwNzIwNjgxMTgwODM5RUY4MDJCRjBDQzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5cNiR0AAAA50lEQVR42qSUaw6EMAiEYY8rB7JcVrYoNaQCNbsk88N2ypc+HICrtq69CyEvNM8mIuCk33sXTuNeaJ5zrRZ1HV361RIw2pyYd4Cp65CrWgJGmxPz6gbvZpKAMfJYw9FMEjBGntGUE3AEVC+6ppyAI6B60e8mAldAWIBD4LjTCvwAqjG5txkcAmdoBWZ/z8UL5RVQ9YF3JfB7lWtXx9v+ON4WHW8E5GTszUPiZOx+SBkQq7kFEKs5yH6LxbFn4cBBOHAUDj4GuYhBdjFIQQxyEYPsYpBGUypyd45DmppSkbtzHJ5rvwIMAKXLCXxfiHXkAAAAAElFTkSuQmCC);
          background-repeat: no-repeat;
          z-index: 2;
          cursor: pointer;
        }
        .price {
          color: #eabf00;
          text-align: right;
        }
        button {
          padding: 5px 10px;
        }
      }
    }
    .shelf-empty {
      color: #ececec;
      text-align: center;
      line-height: 40px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 200px;
    background-color: #1b1a20;
    .sub {
      float: left;
      color: #5b5a5e;
      margin-top: 10px;
    }
    .toprice {
      float: right;
      text-align: right;
      margin-right: 15px;
      .to {
        color: #eabf00;
        font-size: 22px;
      }
      .stages {
        font-size: 80%;
        color: #5b5a5e;
      }
    }
    button {
      width: 70%;
      margin-left: 0.6rem;
      color: #ececec;
      text-transform: uppercase;
      background-color: #0c0b10;
      text-align: center;
      padding: 15px 0;
      margin-top: 40px;
      cursor: pointer;
      -webkit-transition: background-color 0.2s;
      transition: background-color 0.2s;
    }
  }
}
</style>