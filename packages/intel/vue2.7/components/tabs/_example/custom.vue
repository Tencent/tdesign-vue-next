<template>
  <t-tabs
    :value="value"
    theme="card"
    :addable="true"
    @add="addTab"
    @remove="removeTab"
    @change="changeTab"
    style="width: 100%"
  >
    <t-tab-panel
      v-for="data in panelData"
      :key="data.value"
      :value="data.value"
      :label="data.label"
      :removable="data.removable"
    >
      <p style="padding: 25px">{{ data.content }}</p>
    </t-tab-panel>
  </t-tabs>
</template>

<script>
let id = 0;

export default {
  data() {
    return {
      value: 'first',
      panelData: [
        {
          value: 'first',
          label: '原有选项卡',
          removable: true,
          content: '原有选项卡内容',
        },
        {
          value: 'second',
          label: '原有选项卡',
          removable: true,
          content: '原有选项卡内容',
        },
      ],
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
    removeTab({ value }) {
      const index = this.panelData.findIndex((data) => data.value === value);
      if (index < 0) return false;
      this.panelData.splice(index, 1);
      if (this.value === value && this.panelData.length) {
        this.value = this.panelData[Math.max(index - 1, 0)].value;
      }
    },
    changeTab(value) {
      this.value = value;
    },
  },
};
</script>
