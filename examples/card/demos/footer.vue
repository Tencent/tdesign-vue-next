<template>
  <t-card :cover="cover" bordered :style="{ width: '400px' }">
    <template #avatar>
      <t-avatar size="56px" :icon="icon" />
    </template>
    <template #actions>
      <t-tag theme="success">{{ actions }}</t-tag>
    </template>
    <template #footer>
      <t-row :align="'middle'" justify="center">
        <t-col flex="auto">
          <t-button block variant="text">
            <thumb-up-icon size="24" />
          </t-button>
        </t-col>
        <t-col flex="none">
          <t-divider theme="vertical" />
        </t-col>
        <t-col flex="auto">
          <t-button block variant="text">
            <chat-icon size="24" />
          </t-button>
        </t-col>
        <t-col flex="none">
          <t-divider theme="vertical" />
        </t-col>
        <t-col flex="auto">
          <t-button block variant="text">
            <share-icon size="24" />
          </t-button>
        </t-col>
      </t-row>
    </template>
  </t-card>
</template>
<script setup lang="jsx">
import { computed } from 'vue';
import { ThumbUpIcon, ChatIcon, ShareIcon, UserIcon } from 'tdesign-icons-vue-next';

const icon = computed(() => () => <UserIcon />);
const actions = '默认标签';
const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png';
</script>
