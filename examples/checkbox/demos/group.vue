<template>
  <div class="tdesign-demo-block-column">
    <div>选中值: {{ city.join(',') }}</div>
    <div>
      <t-checkbox :checked="checkAll" :indeterminate="indeterminate" :onChange="handleSelectAll">全选</t-checkbox>
      <t-checkbox v-model="disabled">禁用全部</t-checkbox>
    </div>
    <t-checkbox-group v-model="city" :options="options" :disabled="disabled" />

    <div>选中值: {{ city2.join(',') }}</div>
    <t-checkbox-group v-model="city2" :options="options2"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ['北京'],
      disabled: false,
      options: [
        { value: '北京', label: '北京' },
        { value: '上海', label: '上海' },
        { value: '广州', label: '广州' },
      ],

      city2: ['深圳'],
      options2: [
        { label: '全选', checkAll: true },
        { value: '深圳', label: '深圳' },
        { value: '杭州', label: '杭州' },
        { value: '厦门', label: '厦门' },
      ],
    };
  },
  computed: {
    checkAll() {
      return this.options.length === this.city.length;
    },
    indeterminate() {
      return !!(this.options.length > this.city.length && this.city.length);
    },
  },
  methods: {
    handleSelectAll(checked) {
      this.city = checked ? ['北京', '上海', '广州'] : [];
    },
  },
};
</script>
