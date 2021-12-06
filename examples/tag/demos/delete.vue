<template>
  <div class="tag-demo">
    <div class="tag-block">
      <t-tag theme="primary" closable> 标签一 </t-tag>
      <t-tag theme="success" closable> 标签二 </t-tag>
      <t-tag theme="warning" closable> 标签三 </t-tag>
      <t-tag theme="danger" closable> 标签四 </t-tag>
    </div>
    <div class="tag-block light">
      <t-tag theme="primary" variant="light" closable> 标签一 </t-tag>
      <t-tag theme="success" variant="light" closable> 标签二 </t-tag>
      <t-tag theme="warning" variant="light" closable> 标签三 </t-tag>
      <t-tag theme="danger" variant="light" closable> 标签四 </t-tag>
    </div>
    <div class="tag-block plain">
      <t-tag variant="plain" theme="primary" closable> 标签一 </t-tag>
      <t-tag variant="plain" theme="success" closable> 标签二 </t-tag>
      <t-tag variant="plain" theme="warning" closable> 标签三 </t-tag>
      <t-tag variant="plain" theme="danger" closable> 标签四 </t-tag>
    </div>
    <div class="tag-block">
      <t-tag
        v-for="(tag, index) in tags"
        :key="index"
        :theme="tag.type"
        :closable="tag.showClose"
        :icon="tag.icon"
        :disabled="!!tag.disabled"
        :max-width="tag.maxWidth"
        @click="handleClick"
        @close="handleClose(index)"
      >
        {{ tag.name }}
      </t-tag>
    </div>
    <div class="tag-block editable">
      <t-tag v-if="!inputVisible" @click="handleClickAdd">
        <add-icon />
        添加标签
      </t-tag>
      <t-input v-else ref="input" size="small" style="width: 94px" @blur="handleInputEnter" @enter="handleInputEnter" />
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent, nextTick, ref } from 'vue';
import { AddIcon, DiscountIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {
    AddIcon,
  },
  setup() {
    const inputVisible = ref(false);
    const tags = ref([
      {
        name: '可删除标签可删除标签',
        type: 'default',
        showClose: true,
        maxWidth: 100,
      },
      {
        name: '可删除标签可删除标签',
        type: 'default',
        icon: () => <DiscountIcon />,
        showClose: true,
        maxWidth: 100,
      },
      {
        name: '可删除标签',
        type: 'default',
        showClose: true,
        disabled: true,
      },
    ]);
    const input = ref('');

    const handleClose = (index) => {
      console.log(index);
      tags.value.splice(index, 1);
    };

    const handleClick = (event) => {
      console.log(event);
    };

    const handleInputEnter = (val) => {
      if (val && !tags.value.some((item) => item.name === val)) {
        tags.value.tags.push({ name: val, type: 'default', showClose: true });
      }
      inputVisible.value = false;
    };

    const handleClickAdd = () => {
      inputVisible.value = true;
      nextTick(() => {
        input.value.focus();
      });
    };

    return {
      inputVisible,
      tags,
      input,
      handleClose,
      handleClick,
      handleInputEnter,
      handleClickAdd,
    };
  },
});
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
