<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      可删除
      <t-tag
        v-for="(tag, index) in tags"
        :key="index"
        :theme="tag.type"
        :variant="tag.variant"
        :maxWidth="tag.maxWidth"
        :closable="tag.showClose"
        :icon="tag.icon"
        :disabled="!!tag.disabled"
        @click="handleClick"
        @close="handleClose(index)"
      >
        {{ tag.name }}
      </t-tag>
    </div>
    <div class="tdesign-demo-block editable">
      可添加
      <t-tag v-if="!inputVisible" @click="handleClickAdd">
        <t-icon-add />
        添加标签
      </t-tag>
      <t-input
        v-else
        ref="input"
        size="small"
        style="width: 94px"
        @blur="handleInputEnter"
        @enter="handleInputEnter"
      />
    </div>
  </div>
</template>

<script>
import TIconAdd from '@tencent/tdesign-vue-next/lib/icon/add';
import TIconDiscount from '@tencent/tdesign-vue-next/lib/icon/discount';
import { nextTick } from 'vue';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TIconAdd,
    // eslint-disable-next-line vue/no-unused-components
    TIconDiscount,
  },
  data() {
    return {
      inputVisible: false,
      tags: [
        {
          name: '可删除标签',
          type: 'default',
          showClose: true,
        },
        {
          name: '可删除标签',
          type: 'default',
          icon: () => <TIconDiscount />,
          showClose: true,
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
      if (val) {
        this.tags.push({ name: val, type: 'default', showClose: true });
      }
      this.inputVisible = false;
    },
    handleClickAdd() {
      this.inputVisible = true;
      nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tag-demo .tdesign-demo-block {
  display: flex;
  > * {
    margin-left: 30px;
  }
}

.editable .t-tag {
  cursor: pointer;
}
</style>
