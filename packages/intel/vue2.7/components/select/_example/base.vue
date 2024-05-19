<template>
  <t-space>
    <!-- 方式一：使用 options 输出下拉选项。优先级高于 t-option-->
    <t-select label="属性：" v-model="value1" :options="options1" placeholder="请选择云解决方案" />

    <!-- 方式二：使用 t-option 输出下拉选项。options 和 t-option 两种实现方式二选一即可 -->
    <t-select label="插槽：" v-model="value2" placeholder="请选择云产品">
      <t-option v-for="item in options2" :value="item.value" :label="item.label" :key="item.value"></t-option>
    </t-select>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      value1: '',
      value2: '',
      // 如果此处数据字段不是 label 和 value，而是 name 和 id，则可以传入参数 `keys` 定义别名
      // 示例： <t-select :options="options1" :keys="{ label: 'name', value: 'id' }" />
      options1: [
        { label: '架构云', value: '1', title: '架构云选项' },
        { label: '大数据', value: '2' },
        { label: '区块链', value: '3' },
        { label: '物联网', value: '4', disabled: true },
        { label: '人工智能', value: '5' },
        // 可以使用渲染函数自定义下拉选项内容和样式
        {
          label: '计算场景',
          value: true,
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
};
</script>
