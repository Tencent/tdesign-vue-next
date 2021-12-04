<template>
  <div class="tdesign-demo-block-column">
    <div class="tdesign-demo-block-row">
      <div class="item">
        <t-button theme="primary" shape="rectangle" variant="base"> 填充按钮 </t-button>
      </div>
      <div class="item">
        <t-button theme="primary" shape="square" variant="base">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
      <div class="item">
        <t-button theme="primary" shape="round" variant="base"> 填充按钮 </t-button>
      </div>
      <div class="item">
        <t-button theme="primary" shape="circle" variant="base">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
    </div>
    <div class="tdesign-demo-block-row">
      <div class="item">
        <t-button shape="rectangle" variant="outline"> 描边按钮 </t-button>
      </div>
      <div class="item">
        <t-button shape="square" variant="outline">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
      <div class="item">
        <t-button shape="round" variant="outline"> 描边按钮 </t-button>
      </div>
      <div class="item">
        <t-button shape="circle" variant="outline">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
    </div>
    <div class="tdesign-demo-block-row">
      <div class="item">
        <t-button shape="rectangle" variant="dashed"> 虚框按钮 </t-button>
      </div>
      <div class="item">
        <t-button shape="square" variant="dashed">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
      <div class="item">
        <t-button shape="round" variant="dashed"> 虚框按钮 </t-button>
      </div>
      <div class="item">
        <t-button shape="circle" variant="dashed">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
    </div>
    <div class="tdesign-demo-block-row">
      <div class="item">
        <t-button shape="rectangle" variant="text"> 文字按钮 </t-button>
      </div>
      <div class="item">
        <t-button shape="square" variant="text">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
      <div class="item">
        <t-button shape="round" variant="text"> 文字按钮 </t-button>
      </div>
      <div class="item">
        <t-button shape="circle" variant="text">
          <template #icon>
            <calendar-icon />
          </template>
        </t-button>
      </div>
    </div>
  </div>
</template>
<script>
import { CalendarIcon } from 'tdesign-icons-vue-next';

export default {
  components: {
    CalendarIcon,
  },
};
</script>
