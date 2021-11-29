<template>
  <t-calendar>
    <template #cell="{ data }">
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

<script>
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

const dataList = [
  {
    value: 'error',
    label: '错误事件',
  },
  {
    value: 'waring',
    label: '警告事件',
  },
  {
    value: 'success',
    label: '正常事件',
  },
];

export default defineComponent({
  setup() {
    const isShow = (data) =>
      data.mode === 'month' ? dayjs(data.formattedDate).date() === 15 : dayjs(data.formattedDate).month() === 7;

    const displayNum = (cellData) => {
      if (cellData.mode === 'month') {
        return cellData.date.getDate();
      }
      return cellData.date.getMonth() + 1;
    };

    return {
      dataList,
      displayNum,
      isShow,
    };
  },
});
</script>

<style lang="less" scoped>
.outerWarper {
  width: 100%;
  height: 100%;
  position: relative;

  .shadow {
    position: absolute;
    width: 100%;
    height: 12px;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
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
  .error {
    background: #e34d59;
  }
  .waring {
    background: #ed7b2f;
  }
  .success {
    background: #00a870;
  }

  .slotWarper {
    position: absolute;
    bottom: 2px;
    left: 5px;
  }
}
</style>
