<template>
  <div class="tdesign-tree-demo">
    <div class="operations">
      <t-form labelWidth="150">
        <t-form-item label="切换数据">
          <t-switch @change="toggleData" />
        </t-form-item>
        <t-form-item label="展开动画">
          <t-switch v-model="transition"/>
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      :data="items"
      expand-all
      :transition="transition"
    />
  </div>
</template>

<script>

const data1 = [{
  label: '1',
  children: [{
    label: '1.1',
    children: [{
      label: '1.1.1',
    }, {
      label: '1.1.2',
    }],
  }, {
    label: '1.2',
    children: [{
      label: '1.2.1',
    }, {
      label: '1.2.2',
    }],
  }],
}, {
  label: '2',
  children: [{
    label: '2.1',
  }, {
    label: '2.2',
  }],
}];

const data2 = [{
  label: '1',
}, {
  label: '2',
}, {
  label: '3',
  children: [{
    label: '3.1',
  }, {
    label: '3.2',
  }],
}];

export default {
  data() {
    return {
      transition: true,
      items: data1,
    };
  },
  methods: {
    toggleData() {
      this.items = this.items === data1 ? data2 : data1;
    },
  },
};
</script>
<style scoped>
  .tdesign-tree-base .t-button{
    margin: 0 10px 10px 0;
  }
</style>
