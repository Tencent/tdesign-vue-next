<template>
  <div>
    <!-- 使用插槽自定义 -->
    <t-drawer :visible.sync="visible" :closeBtn="true">
      <p>抽屉的内容</p>
      <template #header>
        <div>自定义头部</div>
      </template>
      <template #footer>
        <t-button @click="visible = false">确定</t-button>
        <t-button variant="outline" @click="visible = false">取消</t-button>
      </template>
    </t-drawer>

    <!-- 使用 props 自定义 -->
    <t-drawer :visible.sync="visible2" :header="() => '抽屉标题'" :footer="renderFooter" :closeBtn="true">
      <p>抽屉的内容</p>
    </t-drawer>

    <!-- 单独定义确认/取消按钮 -->
    <t-drawer
      :visible.sync="visible3"
      header="抽屉标题"
      cancelBtn="取消"
      :confirmBtn="{
        content: '确认',
        disabled: true,
      }"
      :closeBtn="true"
    >
      <p>抽屉的内容</p>
    </t-drawer>

    <t-button variant="outline" @click="visible = true">打开(插槽定义)</t-button>
    &nbsp;&nbsp;
    <t-button variant="outline" @click="visible2 = true">打开(属性定义)</t-button>
    &nbsp;&nbsp;
    <t-button variant="outline" @click="visible3 = true">打开(单独设置确认/取消按钮)</t-button>
  </div>
</template>

<script lang="jsx">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
    };
  },
  methods: {
    renderFooter() {
      return (
        <div>
          <t-button>confirm</t-button>
          <t-button variant="outline" onClick={() => (this.visible2 = false)}>
            cancel
          </t-button>
        </div>
      );
    },
  },
});
</script>
