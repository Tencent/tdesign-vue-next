<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>可以动态增加选项卡，仅支持卡片型</p>
    </div>

    <t-tabs
      :value="value"
      theme="card"
      :addable="true"
      @add="addTab"
      @remove="removeTab"
      @change="changeTab"
    >
      <t-tab-panel
        v-for="data in panelData"
        :key="data.value"
        :value="data.value"
        :label="data.label"
        :removable="data.removable"
      >
        <p style="padding: 25px;">{{ data.content }}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
let id = 0;

export default {
  data() {
    return {
      value: 'first',
      panelData: [{
        value: 'first',
        label: '原有选项卡',
        removable: false,
        content: '原有选项卡内容',
      }, {
        value: 'second',
        label: '原有选项卡',
        removable: true,
        content: '原有选项卡内容',
      }],
    };
  },

  methods: {
    addTab() {
      this.panelData = [
        ...this.panelData,
        {
          value: `${id}`,
          label: '新选项卡',
          removable: true,
          content: '新选项卡内容',
        },
      ];
      this.value = `${id}`;
      id += 1;
    },
    removeTab(value) {
      const index = this.panelData.findIndex(data => data.value === value);
      if (index < 0) return false;
      this.panelData.splice(index, 1);
      if (this.value === value) {
        this.value = this.panelData[index - 1].value;
      }
    },
    changeTab(value) {
      this.value = value;
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
