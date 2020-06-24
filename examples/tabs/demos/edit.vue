<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>可以动态增加选项卡，仅支持卡片型</p>
    </div>

    <t-tabs
      :activeName="activeName"
      theme="card"
      :addable="true"
      @add="addTab"
      @remove="removeTab"
    >
      <t-tab-panel
        v-for="data in panelData"
        :key="data.name"
        :name="data.name"
        :label="data.label"
        :closable="data.closable"
      >
        <p style="padding: 25px;">{{ data.content }}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0',
      panelData: [{
        name: '0',
        label: '原有选项卡',
        closable: false,
        content: '原有选项卡内容',
      }, {
        name: '1',
        label: '原有选项卡',
        closable: true,
        content: '原有选项卡内容',
      }],
    };
  },

  methods: {
    addTab() {
      const len = this.panelData.length;
      this.panelData = [
        ...this.panelData,
        {
          name: `${len}`,
          label: '新选项卡',
          closable: true,
          content: '新选项卡内容',
        },
      ];
      this.activeName = `${len}`;
    },
    removeTab(name) {
      const index = this.panelData.findIndex(data => data.name === name);
      if (index < 0) return false;
      this.panelData.splice(index, 1);
      if (this.activeName === name) {
        this.activeName = this.panelData[index - 1].name;
      }
    },
  },
};
</script>

<style lang="less">
  .t-demo-tabs {

    &__desc {
      margin-bottom: 20px;
      color: #333;
      font-size: 14px;

      &:not(:first-of-type) {
        margin-top: 20px;
      }

      p {
        margin-bottom: 20px;
      }
    }
  }
</style>
