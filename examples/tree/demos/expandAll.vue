<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button theme="primary" @click="toggleData">切换数据</t-button>
      <t-button :theme="hover ? 'primary' : 'ghost'" @click="toggleHover">提供 hover 状态</t-button>
      <t-button :theme="transition ? 'primary' : 'ghost'" @click="toggleTransition">动画</t-button>
    </div>
    <t-tree
      :data="items"
      :hover="hover"
      :expand-all="true"
      :transition="transition"
    />
  </div>
</template>

<script>

const data1 = [{
  label: '1',
  children: [{
    label: '1.1',
    children: [{
      label: '1.1.1',
    }, {
      label: '1.1.2',
    }],
  }, {
    label: '1.2',
    children: [{
      label: '1.2.1',
    }, {
      label: '1.2.2',
    }],
  }],
}, {
  label: '2',
  children: [{
    label: '2.1',
  }, {
    label: '2.2',
  }],
}];

const data2 = [{
  label: '1',
}, {
  label: '2',
}, {
  label: '3',
  children: [{
    label: '3.1',
  }, {
    label: '3.2',
  }],
}];

export default {
  data() {
    return {
      hover: true,
      transition: true,
      items: data1,
    };
  },
  methods: {
    toggleData() {
      this.items = this.items === data1 ? data2 : data1;
    },
    toggleHover() {
      this.hover = !this.hover;
    },
    toggleTransition() {
      this.transition = !this.transition;
    },
  },
};
</script>
<style scoped>
  .tdesign-tree-base .t-button{
    margin: 0 10px 10px 0;
  }
</style>
