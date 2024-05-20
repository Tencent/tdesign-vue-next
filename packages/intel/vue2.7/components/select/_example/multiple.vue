<template>
  <t-space direction="vertical">
    <!-- 方式一：使用 options 输出下拉选项。优先级高于 t-option-->
    <t-select v-model="value1" :options="options1" placeholder="请选择云解决方案" multiple @change="handleChange" />
    <!-- 方式二：使用 t-option 输出下拉选项。options 和 t-option 两种实现方式二选一即可 -->
    <t-select v-model="value2" placeholder="请选择云产品" multiple clearable>
      <t-option v-for="item in options2" :value="item.value" :label="item.label" :key="item.value"></t-option>
    </t-select>

    <!-- 超出 2 个的选中项折叠，如果想要自定义折叠项，参考下文「自定义折叠的选中项」 -->
    <t-select
      v-model="value3"
      :options="options1"
      :minCollapsedNum="2"
      placeholder="请选择云解决方案"
      multiple
      :valueDisplay="valueDisplay"
      clearable
      filterable
    />
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      value1: ['3', '5'],
      value2: ['1', '2', '3', '4', '5', '6'],
      value3: ['3', '5', '6', '2'],
      options1: [
        { label: '全选', checkAll: true },
        { label: '架构云', value: '1' },
        { label: '大数据', value: '2' },
        { label: '区块链', value: '3' },
        { label: '物联网', value: '4', disabled: true },
        { label: '人工智能', value: '5' },
        // 可以使用渲染函数自定义下拉选项内容和样式
        {
          label: '计算场景',
          value: '6',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          content: (h) => <span>计算场景（高性能计算）</span>,
        },
      ],
      options2: [
        { label: '云服务器', value: '1' },
        { label: '云数据库', value: '2' },
        { label: '域名注册', value: '3' },
        { label: '网站备案', value: '4' },
        { label: '对象存储', value: '5' },
        { label: '低代码平台', value: '6' },
      ],
    };
  },
  methods: {
    handleChange(...args) {
      console.log('change', ...args);
    },
    valueDisplay(h, { onClose, displayValue }) {
      if (!(displayValue instanceof Array)) return;
      return displayValue.map((item, index) => (
        <t-tag
          key={index}
          closable={true}
          onClose={(context) => {
            context.e && context.e.stopPropagation();
            onClose(index);
          }}
        >
          {item.label}
        </t-tag>
      ));
    },
  },
};
</script>
