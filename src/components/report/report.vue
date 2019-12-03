<template>
  <div class="report">
    <div
      @touchstart.prevent="pageTouchStart"
      @touchmove.prevent="pageTouchMove"
      @touchend="pageTouchEnd"
      @transitionend="translateNode"
      ref="reportWrapper"
    >
      <div class="pageItem" v-for="item in pages" :key="item">
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { prefixStyle } from "common/js/dom";

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");

export default {
  data() {
    return {
      pages: 6,
      currentPage: 0
    };
  },
  created() {
    this.touch = {};
  },
  mounted() {
    this.translateNode();
  },
  methods: {
    pageTouchStart(e) {
      this.touch.initiated = true;
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
      this.touch.isDown = false;
    },
    pageTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      // const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      // if (Math.abs(deltaY) < Math.abs(deltaX)) {
      //   return;
      // }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      let offsetHeight = this.touch.offsetHeight;
      let offsetPercent = 0;
      if (deltaY > 0 && this.currentPage !== 0) {
        // 鼠标向下滑动
        this.touch.isDown = true;
        console.log("鼠标向下滑动，isdown是true");
        offsetPercent = -window.innerHeight + deltaY;
        offsetHeight = deltaY - this.currentPage * window.innerHeight;
      } else if (deltaY < 0 && this.currentPage !== 5) {
        // 鼠标向上滑动
        this.touch.isDown = false;
        console.log("鼠标向上滑动,isdown是false");
        offsetPercent = deltaY;
        offsetHeight = deltaY - this.currentPage * window.innerHeight;
        // this.currentPage * window.innerHeight + offsetHeight
      }
      this.touch.percent = Math.abs(offsetPercent / window.innerHeight);
      // this.$refs.reportWrapper.style[
      //   transform
      // ] = `translateY(${offsetHeight}px)`;
      this.$refs.reportWrapper.style.transform = `translateY(${offsetHeight}px)`;
    },
    pageTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      if (this.touch.isDown) {
        if (this.touch.percent < 0.75) {
          this.currentPage -= 1;
        }
      } else {
        if (this.touch.percent > 0.25) {
          this.currentPage += 1;
        }
      }
      this.touch.offsetHeight = -this.currentPage * window.innerHeight;
      this.touch.percent = 0;
      this.$refs.reportWrapper.style[
        transform
      ] = `translateY(${this.touch.offsetHeight}px)`;
      this.$refs.reportWrapper.style[transitionDuration] = ".3s";
    },
    translateNode() {
      if (this.touch.isDown && this.currentPage !== 5) {
        this.$refs.left[this.currentPage + 1].style[transform] =
          "translateX(-100%)";
        this.$refs.right[this.currentPage + 1].style[transform] =
          "translateX(100%)";
      } else if (!this.touch.isDown && this.currentPage !== 0) {
        this.$refs.left[this.currentPage - 1].style[transform] =
          "translateX(-100%)";
        this.$refs.right[this.currentPage - 1].style[transform] =
          "translateX(100%)";
      }
      this.$refs.left[this.currentPage].style[transform] = "translateX(0)";
      this.$refs.right[this.currentPage].style[transform] = "translateX(0)";
    }
  }
};
</script>
<style lang="scss" scoped>
.report {
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .pageItem {
    color: #fff;
    font-size: 30px;
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
      rgba(0, 0, 255, 0.5),
      rgba(255, 255, 0, 0.5)
    );
    .left {
      transform: translateX(-100%);
      transition-duration: 0.3s;
    }
    .right {
      transform: translateX(100%);
      transition-duration: 0.3s;
    }
  }
}
</style>
