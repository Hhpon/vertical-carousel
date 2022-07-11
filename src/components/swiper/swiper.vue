<template>
  <div class="report">
    <div class="wrapper" ref="reportWrapper">
      <div
        class="pageItem"
        v-for="(item, index) in pages"
        :key="item"
        :class="{
          current: currentPage === index,
          active: nextPage === index || lastCurrentPage === index
        }"
        @touchstart.prevent="pageTouchStart"
        @touchmove.passive="pageTouchMove"
        @touchend="pageTouchEnd"
      >
        <div style="height: 30%"></div>
        <div class="left" ref="left">这是页面</div>
        <div class="right" ref="right">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const DIRECTION = {
  FORWARD: -1,
  BACKWARD: 1
};

export default {
  data() {
    return {
      pages: 20,
      lastCurrentPage: null,
      currentPage: 0,
      nextPage: null,
      swiperLists: []
    };
  },
  created() {
    this.touch = {};
  },
  mounted() {
    this.initRender();
  },
  methods: {
    initRender() {
      this.swiperLists = this.$refs.reportWrapper.children;
    },
    pageTouchStart(e) {
      this.touch.initiated = true;
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
      this.touch.direction = null;
    },
    pageTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaY = touch.pageY - this.touch.startY;
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      if (deltaY > 0 && this.currentPage !== 0) {
        // 鼠标向下滑动
        this.touch.direction = DIRECTION.BACKWARD;
        this.nextPage = this.currentPage - 1;
      } else if (deltaY < 0 && this.currentPage !== this.swiperLists.length - 1) {
        // 鼠标向上滑动
        this.touch.direction = DIRECTION.FORWARD;
        this.nextPage = this.currentPage + 1;
      } else {
        return;
      }
      let offsetPercent = deltaY;
      let offsetHeight = deltaY;
      this.touch.percent = Math.abs(offsetPercent / window.innerHeight);
      this.swiperLists[this.currentPage].style.cssText = `transform: translateY(${offsetHeight}px);`;
      this.swiperLists[this.nextPage].style.cssText = `transform: translateY(${offsetHeight +
        (deltaY < 0 ? window.innerHeight : -window.innerHeight)}px);`;
    },
    pageTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      if (this.touch.percent > 0.25) {
        this.lastCurrentPage = this.currentPage;
        this.currentPage = this.touch.direction === DIRECTION.BACKWARD ? this.currentPage - 1 : this.currentPage + 1;
      }
      this.touch.percent = 0;
      this.touch.initiated = false;
      this.swiperLists[this.nextPage].style.cssText = '';
      this.swiperLists[this.currentPage].style.cssText = 'transition-duration: 0.3s;transform: translateY(0px);';
      this.swiperLists[this.lastCurrentPage].style.cssText = `transform: translateY(${
        this.touch.direction === DIRECTION.BACKWARD ? window.innerHeight : -window.innerHeight
      }px); transition-duration: 0.3s;`;

      setTimeout(() => {
        this.nextPage = null;
        this.lastCurrentPage = null;
        this.swiperLists[this.currentPage].style.cssText = '';
      }, 300);
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
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    .pageItem {
      color: #fff;
      font-size: 30px;
      text-align: center;
      background-color: blue;
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    .current {
      display: block;
      z-index: 5;
      will-change: transform;
    }
    .active {
      display: block;
      z-index: 4;
      will-change: transform;
    }
  }
}
</style>
