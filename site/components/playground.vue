<template>
  <div class="demo-warrper">
    <h1 class="title">Button</h1>
    <t-button type="submit" variant="dashed">button</t-button>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Divider</h1>
    <span>正直</span>
    <t-divider theme="vertical" dashed/>
    <t-divider align="left" dashed>TDesign</t-divider>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Affix</h1>
    <t-affix
      :offset-top="10"
      :offset-bottom="20"
      ref="affix"
    >
      <t-button>Base</t-button>
    </t-affix>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Breadcrumb</h1>
    <t-breadcrumb maxItemWidth="100">
      <t-breadcrumbItem>页面1</t-breadcrumbItem>
      <t-breadcrumbItem>页面2页面2页面2页面2页面2页面2页面2页面2</t-breadcrumbItem>
      <t-breadcrumbItem maxWidth="160">页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3页面3</t-breadcrumbItem>
    </t-breadcrumb>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Dropdown</h1>
    <t-dropdown :trigger="'click'" :options="[{
          content: '操作一',
          value: 1,
          active: true,
          disabled: true,
          divider: true,
        }, {
          content: '操作二',
          value: 2,
          onClick: this.handleClick
        }, {
          content: this.renderContent,
          value: 4,
        }]" direction="left">
      <t-button type="submit">Dropdown</t-button>
    </t-dropdown>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Menu</h1>
    <div class="todo">TODO</div>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Pagination</h1>
    <t-pagination
      :defaultCurrent="current"
      :total="100"
      :showJumper="true"
      @change="handleChange"
      :defaultPageSize="pageSize"
      @pageSizeChange="handlePageSizeChange"
      @currentChange="handleCurrentChange"
      :totalContent="renderContent"
    >
      <template #totalContent>
        123123
      </template>
    </t-pagination>
  </div>
  <div class="demo-warrper">
    <h1 class="title">Steps</h1>
    <t-steps :current="stepValue" sequence="reverse" @change="handleChange">
      <t-step-item title="已完成的步骤"></t-step-item>
      <t-step-item title="进行中的步骤"></t-step-item>
      <t-step-item title="未进行的步骤"></t-step-item>
      <t-step-item title="未进行的步骤"></t-step-item>
    </t-steps>
  </div>
</template>
<script lang="jsx">
export default {
  data() {
    return {
      stepValue: 2,
      current: 2,
      pageSize: 10,
    };
  },
  methods: {
    handleClick(e) {
      console.log(e)
    },
    handleChange(e, b, c) {
      console.log(e)
      console.log(b)
      console.log(c)
      this.stepValue = e
      // console.log('handleChange')
      // console.log(pageInfo)
    },
    handlePageSizeChange(current, pageInfo) {
      console.log('handlePageSizeChange')
      console.log(current)
      console.log(pageInfo)
    },
    handleCurrentChange(current, pageInfo) {
      console.log('handleCurrentChange')
      console.log(current)
      console.log(pageInfo)
    },
    renderContent() {
      return <div>自定义操作</div>;
    }
  },
};
</script>
<style scoped>
.title {
  font-size: 24px;
  display: block;
  font-weight: bold;
  margin-bottom: 20px;
}
.demo-warrper {
  padding: 10px;
  border: 1px solid gray;
  margin: 10px;
}

.todo {
  color: #e34d59;
  font-size: 32px;
  font-weight: bold;
}
</style>