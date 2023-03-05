<template>
  <t-sticky-tool
    :offset="[10, 10]"
    placement="right-center"
    :popup-props="{ placement: 'right' }"
    :width="60"
    :on-click="handleClick"
    @hover="handleHover"
  >
    <t-sticky-item label="添加" popup="666">
      <template #icon><add-icon /></template>
    </t-sticky-item>
    <t-sticky-item
      :label="renderLabel"
      :icon="renderIcon"
      trigger="click"
      :popup="renderPopup"
      :popup-props="{ placement: 'bottom' }"
    ></t-sticky-item>
    <t-sticky-item :icon="renderIcon">
      <template #label>
        <div>搜索</div>
      </template>
      <template #popup>
        <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png" />
      </template>
    </t-sticky-item>
  </t-sticky-tool>
</template>

<script lang="jsx">
import { AddIcon, SearchIcon } from 'tdesign-icons-vue-next';

export default {
  components: {
    AddIcon,
  },
  methods: {
    renderIcon() {
      return <SearchIcon />;
    },
    renderLabel() {
      return <div style="color: red">搜索</div>;
    },
    renderPopup() {
      return <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png"></img>;
    },
    handleClick(context) {
      console.log('click', context);
    },
    handleHover(context) {
      console.log('hover', context);
    },
  },
};
</script>
