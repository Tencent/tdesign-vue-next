<template>
  <t-calendar>
    <template #cell="data">
      <div class="outerWarper">
        <div class="number">
          {{ displayNum(data) }}
        </div>
        <template v-if="isShow(data)">
          <div class="slotWarper">
            <div v-for="(item, index) in dataList" :key="index" class="item">
              <span :class="item.value" />
              {{ item.label }}
            </div>
          </div>
          <div class="shadow" />
        </template>
      </div>
    </template>
  </t-calendar>
</template>

<script lang="tsx" setup>
import dayjs from 'dayjs';
import { CalendarCell } from 'tdesign-vue-next';
const dataList = [
  {
    value: 'error',
    label: '错误事件',
  },
  {
    value: 'warning',
    label: '警告事件',
  },
  {
    value: 'success',
    label: '正常事件',
  },
];
const isShow = (data: CalendarCell) =>
  data.mode === 'month' ? dayjs(data.formattedDate).date() === 15 : dayjs(data.formattedDate).month() === 7;
const displayNum = (cellData: CalendarCell) => {
  if (cellData.mode === 'month') {
    return cellData.date.getDate();
  }
  return cellData.date.getMonth() + 1;
};
</script>

<style lang="less" scoped>
.outerWarper {
  width: 100%;
  height: 100%;
  position: relative;

  .shadow {
    position: absolute;
    width: 100%;
    height: 22px;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  }
  .number {
    font-weight: 600;
    position: absolute;
    right: 0;
    font-size: 14px;
    line-height: 22px;
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    color: var(--td-text-color-secondary);
    font-size: 14px;
    line-height: 22px;
    span {
      display: block;
      left: 1px;
      width: 5px;
      height: 5px;
      border-radius: 10px;
      margin-right: 4px;
    }
  }
  .error {
    background: var(--td-error-color);
  }
  .warning {
    background: var(--td-warning-color);
  }
  .success {
    background: var(--td-success-color);
  }

  .slotWarper {
    position: absolute;
    bottom: 2px;
    left: 5px;
  }
}
</style>
