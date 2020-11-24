<template>
  <t-transfer
    theme="primary"
    :data="list"
    :target-value="targetValue"
    :checked-value="checkedValue"
    :render-item="item => `${item.key}-${item.title}`"
    @checkChange="checkChange"
  >
    <template v-slot:renderList="item">
      <span>{{item.description}}</span>
    </template>
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
      checkedValue: ['1', '2'],
    };
  },
  methods: {
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
    checkChange(sourceChecked, targetChecked) {
      console.log('====> sourceChecked', sourceChecked);
      console.log('====> targetChecked', targetChecked);
    },
  },
};
</script>
