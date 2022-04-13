<template>
  <div class="tdesign-demo-block">
    <t-row :align="'middle'" justify="start" :gutter="16">
      <t-col :span="6">
        <t-card :title="title" :subtitle="subtitle" :cover="cover" shadow theme="poster2">
          <template #header>
            <t-avatar>C</t-avatar>
            <t-tag theme="success">{{ actions }}</t-tag>
          </template>
          <template #actions>
            <t-tag theme="success">{{ actions }}</t-tag>
          </template>
          <template #footer>
            <t-row :align="'middle'" justify="center">
              <t-col flex="auto">
                <t-button block variant="text">
                  <thumb-up-icon />
                </t-button>
              </t-col>
              <t-col flex="none">
                <t-divider theme="vertical" />
              </t-col>
              <t-col flex="auto">
                <t-button block variant="text">
                  <chat-icon />
                </t-button>
              </t-col>
              <t-col flex="none">
                <t-divider theme="vertical" />
              </t-col>
              <t-col flex="auto">
                <t-button block variant="text">
                  <share-icon />
                </t-button>
              </t-col>
            </t-row>
          </template>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>
<script setup lang="jsx">
import { ThumbUpIcon, ChatIcon, ShareIcon } from 'tdesign-icons-vue-next';

const title = '标题';
const subtitle = '副标题';
const actions = '默认标签';
const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png';
</script>
