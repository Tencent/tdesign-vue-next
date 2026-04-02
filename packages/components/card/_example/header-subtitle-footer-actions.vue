<template>
  <t-card :title="title" :subtitle="subtitle" :cover="cover" :style="{ width: '400px' }">
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
      <t-row :align="'middle'" justify="center" style="gap: 24px">
        <t-col flex="auto" style="display: inline-flex; justify-content: center">
          <t-button variant="text" shape="square">
            <thumb-up-icon />
          </t-button>
        </t-col>

        <t-col flex="auto" style="display: inline-flex; justify-content: center">
          <t-button variant="text" shape="square">
            <chat-icon />
          </t-button>
        </t-col>

        <t-col flex="auto" style="display: inline-flex; justify-content: center">
          <t-button variant="text" shape="square">
            <share-icon />
          </t-button>
        </t-col>
      </t-row>
    </template>
  </t-card>
</template>
<script lang="tsx" setup>
import { MessagePlugin, CardProps, DropdownProps } from 'tdesign-vue-next';
import { ThumbUpIcon, ChatIcon, ShareIcon, MoreIcon } from 'tdesign-icons-vue-next';
const title: CardProps['title'] = '标题';
const subtitle: CardProps['subtitle'] = '副标题';
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
