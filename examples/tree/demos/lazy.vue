<template>
  <div class="tdesign-tree-demo">
    <h3 class="title">数据延迟加载</h3>
    <p class="tips">默认为点击加载数据。</p>
    <p class="tips">valueMode 默认为 'onlyLeaf'。选中父节点时，子节点由于未加载，无法更新和获取选中状态，导致无法更新父节点的状态。</p>
    <p class="tips">所以使用延迟加载时，推荐 valueMode 设置为 'all' 或者 'parentFirst'。</p>
    <div class="operations">
      <t-form labelWidth="150">
        <t-form-item label="可选">
          <t-switch v-model="checkable" />
        </t-form-item>
        <t-form-item label="严格模式">
          <t-switch v-model="checkStrictly" />
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      ref="tree"
      :data="items"
      hover
      expand-all
      :checkable="checkable"
      :checkStrictly="checkStrictly"
      :load="load"
      valueMode="all"
      @load="onLoad"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkable: true,
      checkStrictly: false,
      value: [
        '1.1',
        '1.1.1',
      ],
      items: [{
        label: '1',
        value: '1',
        children: true,
      }, {
        label: '2',
        value: '2',
        children: true,
      }],
    };
  },
  methods: {
    onLoad(state) {
      console.log('on load:', state);
    },
    load(node) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [{
              label: `${node.label}.1`,
              value: `${node.value}.1`,
              children: true,
            }, {
              label: `${node.label}.2`,
              value: `${node.value}.2`,
              children: true,
            }];
          }
          resolve(nodes);
        }, 1000);
      });
    },
  },
};
</script>
<style scoped>
.tdesign-tree-demo .t-tree {
  margin-bottom: 20px;
}
.tdesign-tree-demo .title{
  margin-bottom: 10px;
}
.tdesign-tree-demo .tips{
  margin-bottom: 10px;
}
.tdesign-tree-demo .operations{
  margin-bottom: 10px;
}
.tdesign-tree-demo .t-form__item {
  margin-bottom: 5px;
}
.tdesign-tree-demo .t-button{
  margin: 0 10px 10px 0;
}
</style>
