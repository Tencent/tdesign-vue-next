<template>
  <t-calendar>
    <template #cell="{ data }">
      <div class="outerWarrper">
        <div class="number">{{ diaplayNum(data) }}</div>
        <template v-if="isShow(data)">
          <div class="slotWarrper">
            <div v-for="(item, index) in dataList" :key="index" class="item">
              <span :class="item.value"></span>
              {{item.label}}
            </div>
          </div>
          <div class="shadow"/>
        </template>
      </div>
    </template>
  </t-calendar>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      dataList: [{
        value: 'error',
        label: '错误事件',
      }, {
        value: 'waring',
        label: '警告事件',
      }, {
        value: 'success',
        label: '正常事件',
      }],
    };
  },
  methods: {
    isShow(data) {
      return data.mode === 'month' ? data.day === 15 : dayjs(data.formattedDate).month() === 7;
    },
    diaplayNum(cellData) {
      if (cellData.mode === 'month') {
        return cellData.date.getDate();
      }
      return cellData.date.getMonth() + 1;
    },
  },
};
</script>

<style lang="less" scoped>
.outerWarrper {
  width: 100%;
  height: 100%;
  position: relative;
}
.slotWarrper {
  position: absolute;
  bottom: 2px;
  left: 5px;
}
.shadow {
  position: absolute;
  width: 100%;
  height: 12px;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
}
.number {
  font-weight: bold;
  position: absolute;
  top: 3px;
  right: 5px;
  font-size: 14px;
}
.item {
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  span {
    display: block;
    left: 1px;
    width: 5px;
    height: 5px;
    border-radius: 10px;
    margin-right: 4px;
  }
}
.error  {
  background: #E34D59;
}
.waring {
  background: #ED7B2F;
}
.success {
  background: #00A870;
}
</style>
