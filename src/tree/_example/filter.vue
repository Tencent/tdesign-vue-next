<template>
  <t-space :size="32" direction="vertical">
    <t-space direction="vertical">
      <h3>默认状态</h3>
      <div>
        <div>
          过滤动作由 filter 属性的变更触发，所以不能只修改传递给 filter 属性内部的数据，应当在条件变化时变更 filter
          属性。
        </div>
        <div>清空过滤条件时，应设置 filter 属性为 null, 来触发 tree 组件展示状态还原。</div>
        <div>allowFoldNodeOnFilter 属性默认为 false, 此时过滤状态下展开的路径节点无法被收起。</div>
      </div>
      <t-space>
        <t-input-adornment prepend="filter:">
          <t-input v-model="demo1Text" @change="demo1Input" />
        </t-input-adornment>
      </t-space>
      <t-tree ref="tree" :data="items" expand-on-click-node :filter="demo1Filter" hover line />
    </t-space>
    <t-space direction="vertical">
      <h3>allowFoldNodeOnFilter="true"</h3>
      <div>
        <div>
          allowFoldNodeOnFilter 属性设置为 true 时，过滤状态下展开的节点，允许点击收起，注意这会影响到 tree
          组件当前的展开状态数据。
        </div>
        <div>每次变更过滤条件时，会重设节点展开状态，将命中节点的路径节点展开。</div>
        <div>当清空过滤条件时，将会还原为设置过滤条件之前时的展开状态。</div>
      </div>
      <t-space>
        <t-input-adornment prepend="filter:">
          <t-input v-model="demo2Text" @change="demo2Input" />
        </t-input-adornment>
      </t-space>
      <t-tree
        ref="tree"
        :data="items"
        expand-on-click-node
        allow-fold-node-on-filter
        :filter="demo2Filter"
        hover
        line
      />
    </t-space>
  </t-space>
</template>

<script>
const exampleItems = [
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
        children: [
          {
            value: '1.1.1',
            label: '1.1.1',
            children: [
              {
                value: '1.1.1.1',
                label: '1.1.1.1',
              },
              {
                value: '1.1.1.2',
                label: '1.1.1.2',
              },
            ],
          },
          {
            value: '1.1.2',
            label: '1.1.2',
            children: [
              {
                value: '1.1.2.1',
                label: '1.1.2.1',
              },
              {
                value: '1.1.2.2',
                label: '1.1.2.2',
              },
            ],
          },
        ],
      },
      {
        value: '1.2',
        label: '1.2',
        children: [
          {
            value: '1.2.1',
            label: '1.2.1',
            children: [
              {
                value: '1.2.1.1',
                label: '1.2.1.1',
              },
              {
                value: '1.2.1.2',
                label: '1.2.1.2',
              },
            ],
          },
          {
            value: '1.2.2',
            label: '1.2.2',
            children: [
              {
                value: '1.2.2.1',
                label: '1.2.2.1',
              },
              {
                value: '1.2.2.2',
                label: '1.2.2.2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
];

export default {
  data() {
    return {
      demo1Text: '',
      demo1Filter: null,
      demo2Text: '',
      demo2Filter: null,
      items: exampleItems,
    };
  },
  methods: {
    demo1Input(state) {
      console.info('demo1 input:', state);
      if (this.demo1Text) {
        // 存在过滤文案，才启用过滤
        this.demo1Filter = (node) => {
          const rs = node.data.label.indexOf(this.demo1Text) >= 0;
          // 命中的节点会强制展示
          // 命中节点的路径节点会锁定展示
          // 未命中的节点会隐藏
          return rs;
        };
      } else {
        // 过滤文案为空，则还原 tree 为无过滤状态
        this.demo1Filter = null;
      }
    },
    demo2Input() {
      this.demo2Filter = this.demo2Text ? (node) => node.data.label.indexOf(this.demo2Text) >= 0 : null;
    },
  },
};
</script>
