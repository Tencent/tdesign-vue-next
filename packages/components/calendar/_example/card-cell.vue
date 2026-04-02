<template>
  <t-space>
    <!-- 外部控制 -->
    <div>
      <label>请选择风格：</label>
      <t-select v-model="theme" class="demo-select-base">
        <t-option v-for="item in themeOptions" :key="item.value" :value="item.value" :label="item.label" />
      </t-select>
    </div>

    <t-calendar ref="myCalendar" :theme="theme" @cell-right-click="handleClick">
      <template #cell="scope">
        <div class="demo-cell">
          <div class="cellAppend" :class="getCellAppendCls(scope)">
            {{ getDateStr(scope) }}
          </div>
        </div>
      </template>
    </t-calendar>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CalendarCell, CalendarProps } from 'tdesign-vue-next';
const themeOptions = [
  {
    value: 'full',
    label: '全屏风格',
  },
  {
    value: 'card',
    label: '卡片风格',
  },
];
const theme = ref<CalendarProps['theme']>('card');
const getDateStr = (cellData: CalendarCell) => {
  const y = cellData.date.getFullYear();
  const m = cellData.date.getMonth() + 1;
  const d = cellData.date.getDate();
  if (theme.value === 'full') {
    return `${y}-${m}-${d}`;
  }
  if (cellData.mode === 'month') {
    return `${d}`;
  }
  return `${y}-${m}`;
};
const getCellAppendCls = (cellData: CalendarCell) => ({
  belongCurrent: cellData.mode === 'year' || cellData.belongTo === 0,
  activated: cellData.isCurrent,
});
const handleClick: CalendarProps['onCellRightClick'] = () => {
  console.log('handleClick');
};
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 10px 0 0;
}
.demo-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.cellAppend {
  margin: 10px;
  color: #888;
  border-radius: 3px;
  padding: 2px 4px;
}

.cellAppend.activated {
  background-color: #0052d9;
  color: #ebf2ff;
}
</style>
