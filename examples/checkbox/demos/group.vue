<template>
  <div class="tdesign-demo-block-column">
    <div>选中值: {{ city.join(',') }}（业务侧自定义全选功能）</div>
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
import { defineComponent, ref, computed } from 'vue';

const options = [
  { value: '北京', label: '北京' },
  { value: '上海', label: '上海' },
  { value: '广州', label: '广州' },
]

const options2 = [
  { label: '全选', checkAll: true },
  { value: '深圳', label: '深圳' },
  { value: '杭州', label: '杭州' },
  { value: '厦门', label: '厦门' },
]

export default defineComponent({
  setup() {
    const city = ref(['北京']);
    const city2 = ref(['深圳']);
    const disabled = ref(false);

    const checkAll = computed(() => {
      return options.length === city.value.length;
    })

    const indeterminate = computed(() => {
      return !!(options.length > city.value.length && city.value.length);
    })

    const handleSelectAll = () => {
      city.value = checked ? ['北京', '上海', '广州'] : [];
    }
    return {
      indeterminate,
      checkAll,
      city,
      city2,
      disabled,
      options,
      options2,
      handleSelectAll
    }
  },
});
</script>
