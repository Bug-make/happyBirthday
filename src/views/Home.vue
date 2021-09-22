<template>
  <div class="home">
    <div class="header-cart">
      <router-link to="/about" tag="span" class="back">
        <span class="icon">
          <span class="num">{{tocount}}</span>
        </span>
      </router-link>
    </div>
    <div class="main">
      <div class="filter">
        <h4 class="title">Sizes</h4>
        <div
          class="filters-available-size"
          v-for="item in available"
          :key="item.name"
        >
          <input type="checkbox" v-model="item.checkeds" />
          <span :class="{ active: item.checkeds }">{{ item.name }}</span>
        </div>
        <div class="star-button-container">
          <small>Leave a star on Github if this repository was useful :)</small>
          <div>
            <button>Star</button>
            <button>1,777</button>
          </div>
        </div>
      </div>
      <div class="shelf-container">
        <div class="shelf-container-header">
          <small>{{content.length}} Product(s) found.</small>
          <div class="sort">
            Order by
            <select v-model="type">
              <option value="Select">Select</option>
              <option value="Lowest">Lowest to highest</option>
              <option value="Highest">Highest to lowest</option>
            </select>
          </div>
        </div>
        <div
          class="item"
          v-for="(item, index) in content"
          :key="index"
          @click="click(item, 'add')"
        >
          <div :class="{ 'shelf-stopper': item.isFreeShipping }">
            Free shipping
          </div>
          <img
            src="	https://react-shopping-cart-67954.firebaseapp.com/static/media/12064273040195392_1.2995d79a.jpg"
          />
          <p>{{ item.title }}</p>
          <div class="shelf-item__price">
            <div class="val">
              <small>$</small>
              <b>{{ parseInt(item.price) }}</b>
              <span
                >.{{
                  parseFloat(item.price - parseInt(item.price)).toFixed(2) /
                  0.01
                }}</span
              >
            </div>
            <div class="installment">
              <span>or {{ item.installments }} x</span>
              <b
                >${{ parseFloat(item.price / item.installments).toFixed(2) }}</b
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      available: [
        {
          name: "XS",
          checkeds: false,
        },
        {
          name: "S",
          checkeds: false,
        },
        {
          name: "M",
          checkeds: false,
        },
        {
          name: "ML",
          checkeds: false,
        },
        {
          name: "L",
          checkeds: false,
        },
        {
          name: "XL",
          checkeds: false,
        },
        {
          name: "XXL",
          checkeds: false,
        },
      ],
      type: "Select",
    };
  },
  computed: {
    ...mapState(["data", "cartData"]),
    content() {
      let newData = [];
      let newAvailable = this.available.filter((item) => item.checkeds);
      if (newAvailable.length != 0) {
         this.data.map((data) => {
           data.availableSizes.map((item) => {
             newAvailable.map((sizes) => {
               if (item == sizes.name) {
                return newData.push(data)
              }
            });
          });
        });
      } else {
        newData = this.data.map((item) => item);
      }
      // 去重
      newData = newData.filter((item, index, arr) => {
        return arr.indexOf(item) === index
      })

      switch (this.type) {
        case "Select":
          return newData;
        case "Lowest":
          return newData.sort((a, b) => b.price - a.price);
        case "Highest":
          return newData.sort((a, b) => a.price - b.price);
      }
    },
    tocount() {
      let tocount = 0;
      this.cartData.map((item) => {
        return tocount += item.count;
      });
      return tocount
    }
  },
  methods: {
    click(item, _type) {
      this.$store.dispatch("setCart", {
        id: item.id,
        title: item.title,
        price: item.price,
        _type,
        availableSizes: item.availableSizes,
        installments: item.installments,
        style: item.style,
      });
    },
    // change(item) {
    //   let index = this.available.findIndex((data) => data.name == item.name);
    //   this.available[index].checkeds = !this.available[index].checkeds;
    // },
  },
  created() {
    this.$store.dispatch("get_Data");
  },
};
</script>
<style lang="less" scoped>
.home {
  .header-cart {
    .back {
      display: inline-block;
      background: #000;
      width: 60px;
      height: 60px;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      .icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCwwQEgYn7+gWAAABQklEQVRIx9WTsUoDQRRF72xMYSFokcRCjBFESGWRwtZe8AtEFFNrI1bB0tLGQuzs/AJB8AO2kZRCxBiRQNKIoIYoyLFwCZuss9nNgpBXzc7be3j3zow09mU48321zVF8gNtbZ5Q1UwmGYQPIxFU5vnVdUuHfARO+OD5oa9GzM6NcbICkem+CLZ0kA1zKHQ2w6tlpqRUN4AwA5knFiTAISGsuHqDfwoOkgp4kUkoP1WI+Azt02ZYk9hle3cAEBh69c7iKEOJ30IJU/71KpqbaKCH6b0LEGgTcaYXpeIj+GJf54pyI70CSTACxq1M5ehmqvDCHfwIkFrQW4S1WzXUCq+E5lNhkMqSfo0ze3t7hlWeqIfJ3GnQo2n644ZhZYMnSL9OQcKnYAHs0ueUeY+nn6eDyRskGcFjngGxIBkUqVvk41g+oBJ136GBf8AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0xMlQxNjoxODowNiswMTowMEVm3zEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMTJUMTY6MTg6MDYrMDE6MDA0O2eNAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==);
        margin-left: 15px;
        margin-top: 15px;
        .num {
          width: 18px;
          height: 18px;
          color: #0c0b10;
          font-weight: 700;
          font-size: 12px;
          text-align: center;
          line-height: 18px;
          border-radius: 50%;
          background-color: #eabf00;
          position: absolute;
          bottom: 5px;
          right: 10px;
        }
      }
    }
  }
  .main {
    max-width: 1200px;
    margin: 50px auto 0;
    display: flex;
    flex-wrap: wrap;
    padding: 2%;
    margin-top: 42px;
    .filter {
      width: 100%;
      margin-right: 0;
      text-align: center;
      .title {
        margin-bottom: 15px;
      }
      .filters-available-size {
        display: inline-block;
        margin-bottom: 10px;
        position: relative;
        margin-bottom: 8px;
        margin-right: 8px;
        input {
          position: absolute;
          opacity: 0;
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
        span {
          font-size: 12px;
          display: inline-block;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          line-height: 35px;
          text-align: center;
          color: #1b1a20;
          background-color: #ececec;
          border: 1px solid transparent;
        }
        .active {
          background-color: #1b1a20;
          color: #ececec;
          border: 1px solid #1b1a20;
        }
      }
      .star-button-container {
        small {
          color: #aaa;
          margin-bottom: 8px;
          display: inline-block;
          font-size: 80%;
        }
        div {
          button {
            height: 22px;
            padding: 5px 10px;
            font-size: 12px;
            line-height: 10px;
            // color: #24292f;
            // background-color: #fff;
            // border-color: rgba(27, 31, 36, 0.15);
          }
        }
      }
    }
    .shelf-container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      min-height: 600px;
      .shelf-container-header {
        width: 100%;
        margin-bottom: 10px;
        small {
          display: inline-block;
          width: 100%;
          text-align: center;
          margin: 10px 0;
        }
        .sort {
          width: 100%;
          text-align: center;
          select {
            background-color: #fff;
            outline: none;
            border: 1px solid #ececec;
            border-radius: 2px;
            margin-left: 10px;
            width: auto;
            height: 35px;
            cursor: pointer;
          }
        }
      }
      .item {
        width: 50%;
        position: relative;
        text-align: center;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 30px;
        border: 1px solid transparent;
        cursor: pointer;
      }
      .shelf-stopper {
        position: absolute;
        color: #ececec;
        top: 10px;
        right: 10px;
        padding: 5px;
        font-size: 0.6em;
        background-color: #1b1a20;
        cursor: default;
      }
      img {
        width: 100%;
      }
      .shelf-item__price {
        height: 60px;
        .val {
          small {
            font-size: 80%;
          }
          b {
            font-size: 1.5em;
            margin-left: 5px;
          }
          span {
          }
        }
        .installment {
          color: #9c9b9b;
          span {
            color: #9c9b9b;
          }
        }
      }
    }
  }
}
</style>
