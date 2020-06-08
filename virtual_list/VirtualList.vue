<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        v-for="item in visibleData"
        class="infinite-list-item"
        ref="items"
        :key="item.id"
        :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => ([])
    },
    itemSize: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      screenHeight: 0, // 可视区域高度
      startOffset: 0, // 偏移量
      start: 0,
      end: null
    }
  },
  computed: {
    // 列表的总高度
    listHeight () {
      return this.listData.length * this.itemSize
    },
    // 可显示的列表项数
    visibleCount () {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    getTransform () {
      return `translate3d(0, ${this.startOffset}px, 0)`
    },
    // 可视区域内要显示的数据
    visibleData () {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
    }
  },
  methods: {
    scrollEvent (e) {
      const scrollTop = this.$refs.list.scrollTop
      this.start = Math.floor(scrollTop / this.itemSize)
      this.end = this.start + this.visibleCount
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    }
  },
  mounted () {
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
    const io = new IntersectionObserver(this.scrollEvent)
    io.observe(document.getElementsByTagName('body')[0])
  }
}
</script>

<style>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
}

.infinite-list-item {
  /* padding: 10px; */
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
