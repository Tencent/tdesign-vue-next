<template>
  <t-calendar
    :head="renderHead"
    :cell="renderCell"
  >
  </t-calendar>
</template>

<script lang="jsx">
import dayjs from 'dayjs';

export default {
  methods: {
    renderHead(h, params) {
      let title = params.filterDate.getFullYear();
      if (params.mode === 'month') {
        title += `-${params.filterDate.getMonth() + 1}`;
      }
      title += ' 工作安排';
      return <div>{title}</div>;
    },
    renderCell(h, params) {
      const dataList = [{
        value: 'error',
        label: '错误事件',
      }, {
        value: 'waring',
        label: '警告事件',
      }, {
        value: 'success',
        label: '正常事件',
      }];
      return <div class="calendar-slot-props-api-demo">
        {(params.mode === 'month' ? params.day === 15 : dayjs(params.formattedDate).month() === 7) && <span>
            <div class="calendar-slot-props-api-demo-slot-warrper">
            {dataList.map((item) => <div class="item">
              <span class={item.value}></span>
              {item.label}
            </div>)}
          </div>
          <div class="shadow"/>
        </span>}
        <div class="number">
          {params.mode === 'year' ? dayjs(params.formattedDate).month() : dayjs(params.formattedDate).date()}
        </div>
      </div>;
    },
  },
};
</script>
