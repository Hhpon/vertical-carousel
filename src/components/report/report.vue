<template>
  <div class="report">
    <div
      @touchstart.prevent="pageTouchStart"
      @touchmove.prevent="pageTouchMove"
      @touchend="pageTouchEnd"
      v-for="item in pages"
      :key="item"
      class="pageItem"
      ref="pageItem"
    >
      这是一页面{{ item }}
    </div>
  </div>
</template>
<script>
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
  methods: {
    pageTouchStart(e) {
      console.log("touchStart");
      this.touch.initiated = true;
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    pageTouchMove(e) {
      console.log("touchMove");
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
      let offsetHeight = 0;
      let offsetPercent = 0;
      if (deltaY > 0) {
        console.log("正在向下滑动");
        this.touch.isDown = true;
        offsetPercent = -window.innerHeight + deltaY;
        offsetHeight = deltaY - this.currentPage * window.innerHeight;
      } else {
        this.touch.isDown = false;
        offsetPercent = deltaY;
        offsetHeight = deltaY - this.currentPage * window.innerHeight;
        // this.currentPage * window.innerHeight + offsetHeight
        console.log("正在向上滑动");
      }
      this.touch.percent = Math.abs(offsetPercent / window.innerHeight);
      console.log(this.touch.percent);
      this.$refs.pageItem.forEach(ele => {
        ele.style.transform = `translateY(${offsetHeight}px)`;
      });
    },
    pageTouchEnd() {
      console.log("touchEnd");
      if (!this.touch.moved) {
        return;
      }
      if (this.touch.isDown) {
        if (this.touch.percent < 0.75) {
          console.log("触发向下换页");
          this.currentPage -= 1;
        }
      } else {
        if (this.touch.percent > 0.25) {
          this.currentPage += 1;
        }
      }
      this.touch.offsetHeight = -this.currentPage * window.innerHeight;
      console.log(this.touch);
      this.touch.percent = 0;
      this.$refs.pageItem.forEach(ele => {
        ele.style.transform = `translateY(${this.touch.offsetHeight}px)`;
        ele.style.transitionDuration = "0.3s";
      });
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
    line-height: 100vh;
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
      rgba(0, 0, 255, 0.5),
      rgba(255, 255, 0, 0.5)
    );
  }
}
</style>
