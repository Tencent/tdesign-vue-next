<template>
  <t-space direction="vertical">
    <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
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
    <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
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
      <template #actions>
        <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
          <t-button variant="text" shape="square">
            <more-icon />
          </t-button>
        </t-dropdown>
      </template>
    </t-card>
    <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
      <template #footer>
        <t-avatar-group cascading="left-up" :max="2">
          <t-avatar :image="image" />
          <t-avatar>Q</t-avatar>
          <t-avatar>C</t-avatar>
          <t-avatar>G</t-avatar>
          <t-avatar :icon="icon" />
        </t-avatar-group>
      </template>
      <template #actions>
        <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
          <t-button variant="text" shape="square">
            <more-icon />
          </t-button>
        </t-dropdown>
      </template>
    </t-card>
  </t-space>
</template>
<script lang="tsx" setup>
import { MessagePlugin, CardProps, AvatarProps, DropdownProps } from 'tdesign-vue-next';
import { ThumbUpIcon, ChatIcon, ShareIcon, HeartIcon, MoreIcon, UserIcon } from 'tdesign-icons-vue-next';
const cover: CardProps['cover'] = 'https://tdesign.gtimg.com/site/source/card-demo.png';
const icon: AvatarProps['icon'] = () => <UserIcon />;
const image: AvatarProps['image'] = 'https://tdesign.gtimg.com/site/avatar-boy.jpg';
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
