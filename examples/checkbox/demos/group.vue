<template>
  <div class="tdesign-checkbox-group">
    <div class="demo-checkbox-row-desc" v-if="city.length">选中值: {{ city }}</div>
    <div class="demo-checkbox-all">
      <t-checkbox :checked="checkAll" :indeterminate="indeterminate" :onChange="handleSelectAll">全选</t-checkbox>
      <t-checkbox v-model="disabled">禁用全部</t-checkbox>
    </div>
    <div>
      <t-checkbox-group v-model="city" :options="options" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ['北京'],
      disabled: false,
      options: [
        {
          value: '北京',
          label: '北京',
        },
        {
          value: '上海',
          label: '上海',
        },
        {
          value: '广州',
          label: '广州',
        },
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

<style scoped>
.tdesign-checkbox-group > div {
  margin-bottom: 16px;
}
.demo-checkbox-all > label {
  margin-right: 16px;
}

.demo-checkbox-row-desc {
  color: rgba(0, 0, 0, 0.6);
}
</style>
