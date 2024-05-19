<template>
  <t-space direction="vertical">
    <t-space>
      <t-tag theme="primary" closable>标签一</t-tag>
      <t-tag theme="success" closable>标签二</t-tag>
      <t-tag theme="warning" closable>标签三</t-tag>
      <t-tag theme="danger" closable>标签四</t-tag>
    </t-space>
    <t-space>
      <t-tag theme="primary" variant="light" closable>标签一</t-tag>
      <t-tag theme="success" variant="light" closable>标签二</t-tag>
      <t-tag theme="warning" variant="light" closable>标签三</t-tag>
      <t-tag theme="danger" variant="light" closable>标签四</t-tag>
    </t-space>
    <t-space>
      <t-tag variant="outline" theme="primary" closable>标签一</t-tag>
      <t-tag variant="outline" theme="success" closable>标签二</t-tag>
      <t-tag variant="outline" theme="warning" closable>标签三</t-tag>
      <t-tag variant="outline" theme="danger" closable>标签四</t-tag>
    </t-space>
    <t-space>
      <t-tag
        v-for="(tag, index) in tags"
        :key="index"
        :theme="tag.type"
        :closable="tag.showClose"
        :icon="tag.icon"
        :disabled="!!tag.disabled"
        :maxWidth="tag.maxWidth"
        @click="handleClick"
        @close="handleClose(index)"
      >
        {{ tag.name }}
      </t-tag>
    </t-space>
    <div class="tag-block editable">
      <t-tag v-if="!inputVisible" @click="handleClickAdd">
        <add-icon />
        添加标签
      </t-tag>
      <t-input v-else ref="input" size="small" style="width: 94px" @blur="handleInputEnter" @enter="handleInputEnter" />
    </div>
  </t-space>
</template>

<script lang="jsx">
import { AddIcon, DiscountIcon } from 'tdesign-icons-vue';
import Vue from 'vue';

export default {
  components: {
    AddIcon,
    // eslint-disable-next-line vue/no-unused-components
    DiscountIcon,
  },
  data() {
    return {
      inputVisible: false,
      tags: [
        {
          name: '可删除标签可删除标签',
          type: 'default',
          showClose: true,
          maxWidth: 100,
        },
        {
          name: '可删除标签可删除标签',
          type: 'default',
          icon: () => <discount-icon />,
          showClose: true,
          maxWidth: 100,
        },
        {
          name: '可删除标签',
          type: 'default',
          showClose: true,
          disabled: true,
        },
      ],
    };
  },
  methods: {
    handleClose(index) {
      this.tags.splice(index, 1);
    },
    handleClick(event) {
      console.log(event);
    },
    handleInputEnter(val) {
      if (val && !this.tags.some((item) => item.name === val)) {
        this.tags.push({ name: val, type: 'default', showClose: true });
      }
      this.inputVisible = false;
    },
    handleClickAdd() {
      this.inputVisible = true;
      Vue.nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tag-block {
  display: flex;
  margin-bottom: 30px;
  > * {
    margin-right: 30px;
  }
}

.editable .t-tag {
  cursor: pointer;
}
</style>
