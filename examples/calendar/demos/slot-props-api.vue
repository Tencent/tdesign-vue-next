<template>
  <t-calendar
    :head="renderHead"
    :cell="renderCell"
  >
  </t-calendar>
</template>

<script lang="jsx">
import dayjs from 'dayjs';
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const renderHead = (h, params) => {
      let title = params.filterDate.getFullYear();
      if (params.mode === 'month') {
        title += `-${params.filterDate.getMonth() + 1}`;
      }
      title += ' 工作安排';
      return <div>{title}</div>;
    }

    const renderCell = (h, params) => {
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
    }

    return {
      renderHead,
      renderCell
    }
  }
});
</script>
<style lang="less" scoped>
.calendar-slot-props-api-demo {
  width: 100%;
  height: 100%;
  position: relative;

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
}
.calendar-slot-props-api-demo-slot-warrper {
  position: absolute;
  bottom: 2px;
  left: 5px;
}
</style>