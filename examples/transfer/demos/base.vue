<template>
  <t-transfer
    theme="primary"
    :data="list"
    v-model="targetValue"
    :checked-value="checkedValue"
    :render-item="({transferItem}) => `${transferItem.key}-${transferItem.title}`"
    :pagination="pagination"
    :footer="footer"
    :operations="['right', 'left']"
    @checkChange="checkChange"
  >
    <template v-slot:empty>
      <div>no data</div>
    </template>
    <!--  <div slot="footer" slot-scope="props">
      <p style="padding: 10px;border-top: 1px solid #eee" v-if="props.direction === 'source'">source</p>
      <p style="padding: 10px;border-top: 1px solid #eee" v-else>target</p>
    </div>-->
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
      checkedValue: ['1', '2'],
      pagination: [{
        pageSize: 10,
        total: 120,
        current: 1,
      },
      {
        pageSize: 10,
        total: 110,
        current: 2,
      },
      ],
    };
  },
  computed: {
    // operation() {
    //   return ['1', () => <t-icon name="arrow-right"/>];
    // }
  },
  methods: {
    getItem(item) {
      console.log('====> iiitem', item);
    },
    // :empty="emptyNode"
    // // "item => `${item.key}-${item.title}`"
    renderItem({ transferItem }) {
      const customLabel = (
        <span class="custom-item">
          {transferItem.title} - {transferItem.description}
        </span>
      );

      return {
        title: customLabel, // for displayed item
        value: transferItem.title, // for title and filter matching
      };
    },
    emptyNode() {
      return <span>无数据~</span>;
    },
    footer({ direction }) {
      let footerNode;
      if (direction === 'source') {
        footerNode = <div>source footer</div>;
      } else {
        footerNode = <div>target footer</div>;
      }
      return footerNode;
    },
    // :operations="['right', 'left']" :operations="['operationRight', 'operationLeft']"
    operationRight() {
      return <span>去右边</span>;
    },
    operationLeft() {
      return <span>去左边</span>;
    },
    checkChange(sourceChecked, targetChecked) {
      console.log('====> sourceChecked', sourceChecked);
      console.log('====> targetChecked', targetChecked);
    },
  },
};
</script>
