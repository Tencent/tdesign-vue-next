<template>
  <t-transfer
    theme="primary"
    :data="list"
    v-model="targetValue"
    :checked-value="checkedValue"
    :render-item="(item) => `${item.key}-${item.title}`"
    @checkChange="checkChange"
  >
    <template v-slot:empty>
      <div>no data</div>
    </template>
    <template v-slot:source>
      <div>source footer</div>
    </template>
    <template v-slot:target>
      <div>target footer</div>
    </template>
    <!-- <template v-slot:renderList="item">
      <span>{{ item.description }}</span>
    </template>-->
    Transfer
  </t-transfer>
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    key: i.toString(),
    title: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
    disabled: i % 3 < 1,
  });
}
console.log('111111111', list);
export default {
  data() {
    return {
      list,
      targetValue: [],
      checkedValue: ['0', '1', '2'],
    };
  },
  methods: {
    // :empty="emptyNode"
    // // "item => `${item.key}-${item.title}`"
    renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.description}
        </span>
      );

      return {
        title: customLabel, // for displayed item
        value: item.title, // for title and filter matching
      };
    },
    emptyNode() {
      return <span>无数据~</span>;
    },
    checkChange(sourceChecked, targetChecked) {
      console.log('====> sourceChecked', sourceChecked);
      console.log('====> targetChecked', targetChecked);
    },
  },
};
</script>
