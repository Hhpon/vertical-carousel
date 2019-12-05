<template>
  <div class="report">
    <div
      @touchstart.prevent="pageTouchStart"
      @touchmove.prevent="pageTouchMove"
      @touchend="pageTouchEnd"
      @transitionend="translateNode"
      ref="reportWrapper"
    >
      <div
        class="pageItem"
        ref="reportItem"
        v-if="currentPage === 0 || activePage === 0"
      >
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ 1 }}
        </div>
      </div>
      <div
        class="pageItem"
        ref="reportItem"
        v-if="currentPage === 1 || activePage === 1"
      >
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ 2 }}
        </div>
      </div>
      <div
        class="pageItem"
        ref="reportItem"
        v-if="currentPage === 2 || activePage === 2"
      >
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ 3 }}
        </div>
      </div>
      <div
        class="pageItem"
        ref="reportItem"
        v-if="currentPage === 3 || activePage === 3"
      >
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ 4 }}
        </div>
      </div>
      <div
        class="pageItem"
        ref="reportItem"
        v-if="currentPage === 4 || activePage === 4"
      >
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ 5 }}
        </div>
      </div>
      <div
        class="pageItem"
        ref="reportItem"
        v-if="currentPage === 5 || activePage === 5"
      >
        <div style="height: 30%;"></div>
        <div class="left" ref="left">
          这是一页面
        </div>
        <div class="right" ref="right">
          {{ 6 }}
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
      currentPage: 0,
      activePage: 0
    };
  },
  created() {
    this.touch = {};
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
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) < Math.abs(deltaX)) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      //   let offsetHeight = this.touch.offsetHeight;
      let offsetPercent = 0;
      if (deltaY > 0 && this.currentPage !== 0) {
        // 鼠标向下滑动
        console.log("鼠标向下滑动，isdown是true");
        this.activePage = this.currentPage - 1;
        this.touch.isDown = true;
        offsetPercent = -window.innerHeight + deltaY;
        // offsetHeight = deltaY - this.currentPage * window.innerHeight;
      } else if (deltaY < 0 && this.currentPage !== 5) {
        // 鼠标向上滑动
        console.log("鼠标向上滑动,isdown是false");
        this.activePage = this.currentPage + 1;
        this.touch.isDown = false;
        offsetPercent = deltaY;
        // offsetHeight = deltaY - this.currentPage * window.innerHeight;
        // this.currentPage * window.innerHeight + offsetHeight
      }
      this.touch.percent = Math.abs(offsetPercent / window.innerHeight);
      this.$refs.reportWrapper.style[
        transform
      ] = `translateY(${offsetPercent}px)`;
      // 虽然这个地方只是操作了一个标签，但是他还是移动了所有的页面。接下来尝试一下只是操作两个页面的效果
      //   this.$refs.reportWrapper.style[
      //     transform
      //   ] = `translateY(${offsetHeight}px)`;
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
      //   this.$refs.reportWrapper.style[
      //     transform
      //   ] = `translateY(${this.touch.offsetHeight}px)`;
      this.$refs.reportWrapper.style[transform] = "translateY(0px)";
      this.$refs.reportWrapper.style[transitionDuration] = ".3s";
    },
    translateNode() {
      console.log(this.$refs);
      // if (this.touch.isDown && this.currentPage !== 5) {
      //   this.$refs.left[this.currentPage + 1].style[transform] =
      //     "translateX(-100%)";
      //   this.$refs.right[this.currentPage + 1].style[transform] =
      //     "translateX(100%)";
      // } else if (!this.touch.isDown && this.currentPage !== 0) {
      //   this.$refs.left[this.currentPage - 1].style[transform] =
      //     "translateX(-100%)";
      //   this.$refs.right[this.currentPage - 1].style[transform] =
      //     "translateX(100%)";
      // }
      // this.$refs.left[this.currentPage].style[transform] = "translateX(0)";
      // this.$refs.right[this.currentPage].style[transform] = "translateX(0)";
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
    // .left {
    //   transform: translateX(-100%);
    //   transition-duration: 0.3s;
    // }
    // .right {
    //   transform: translateX(100%);
    //   transition-duration: 0.3s;
    // }
  }
}
</style>
