<template>
  <div class="playground-demo-container">
    <h2 class="title">Affix</h2>
    <t-affix ref="affix" :offset-top="110" :offset-bottom="20">
      <t-button>Base</t-button>
    </t-affix>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">Breadcrumb</h2>
    <t-breadcrumb max-item-width="100">
      <t-breadcrumbItem>页面1</t-breadcrumbItem>
      <t-breadcrumbItem>页面2页面2页面2页面2页面2页面2页面2页面2</t-breadcrumbItem>
      <t-breadcrumbItem max-width="160">
        页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3
      </t-breadcrumbItem>
    </t-breadcrumb>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">Dropdown</h2>
    <t-dropdown
      :trigger="'click'"
      :options="[
        {
          content: '操作一',
          value: 1,
          active: true,
          disabled: true,
          divider: true,
        },
        {
          content: '操作二',
          value: 2,
          onClick: handleClick,
        },
        {
          content: renderContent,
          value: 4,
        },
      ]"
      direction="left"
    >
      <t-button type="submit"> Dropdown </t-button>
    </t-dropdown>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">Menu</h2>
    <div class="todo">TODO</div>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">Pagination</h2>
    <t-pagination
      :default-current="current"
      :total="100"
      :show-jumper="true"
      :default-page-size="pageSize"
      :total-content="renderContent"
      @change="handleChange"
      @pageSizeChange="handlePageSizeChange"
      @currentChange="handleCurrentChange"
    >
      <template #totalContent> 123123 </template>
    </t-pagination>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">Steps</h2>
    <t-steps :current="stepValue" sequence="reverse" @change="handleChange">
      <t-step-item title="已完成的步骤" />
      <t-step-item title="进行中的步骤" />
      <t-step-item title="未进行的步骤" />
      <t-step-item title="未进行的步骤" />
    </t-steps>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const stepValue = ref(2);
    const pageSize = ref(10);
    const current = ref(2);

    return {
      current,
      stepValue,
      pageSize,
      renderContent() {
        return <div>自定义操作</div>;
      },
      handleClick(e: any) {
        console.log(e);
      },
      handleChange(e: any, b: any, c: any) {
        console.log(e);
        console.log(b);
        console.log(c);
        // console.log('handleChange')
        // console.log(pageInfo)
      },
      handlePageSizeChange(current: any, pageInfo: any) {
        console.log('handlePageSizeChange');
        console.log(current);
        console.log(pageInfo);
      },
      handleCurrentChange(current: any, pageInfo: any) {
        console.log('handleCurrentChange');
        console.log(current);
        console.log(pageInfo);
      },
    };
  },
});
</script>
