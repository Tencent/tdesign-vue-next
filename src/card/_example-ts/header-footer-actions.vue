<template>
  <t-card :cover="cover" title="标题" description="卡片内容" :style="{ width: '400px' }">
    <template #avatar>
      <t-avatar image="https://tdesign.gtimg.com/site/avatar-boy.jpg" size="56px"></t-avatar>
    </template>
    <template #actions>
      <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
        <div class="tdesign-demo-dropdown-trigger">
          <t-button variant="text" shape="square">
            <more-icon />
          </t-button>
        </div>
      </t-dropdown>
    </template>
    <template #footer>
      <t-button variant="text" shape="square" :style="{ 'margin-right': '8px' }">
        <heart-icon />
      </t-button>
      <t-button variant="text" shape="square" :style="{ 'margin-right': '8px' }">
        <chat-icon />
      </t-button>
      <t-button variant="text" shape="square">
        <share-icon />
      </t-button>
    </template>
  </t-card>
</template>
<script lang="tsx" setup>
import { MessagePlugin, CardProps, DropdownProps } from 'tdesign-vue-next';
import { HeartIcon, ChatIcon, ShareIcon, MoreIcon } from 'tdesign-icons-vue-next';
const cover: CardProps['cover'] = 'https://tdesign.gtimg.com/site/source/card-demo.png';
const options: DropdownProps['options'] = [
  {
    content: '操作一',
    value: 1,
  },
  {
    content: '操作二',
    value: 2,
  },
];
const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
