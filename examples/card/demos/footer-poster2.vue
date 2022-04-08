<template>
  <div class="tdesign-demo-block">
    <t-row :align="'middle'" justify="start" :gutter="16">
      <t-col :span="6">
        <t-card
          :title="title"
          :subtitle="subtitle"
          :cover="cover"
          theme="poster2"
          head-bordered
          @actions="clickHandler"
        >
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>
<script setup lang="jsx">
import { MessagePlugin } from 'tdesign-vue-next';
import { ThumbUpIcon, ChatIcon, ShareIcon } from 'tdesign-icons-vue-next';

const clickHandler = () => {
  MessagePlugin.success('操作');
};

const title = '标题';
const subtitle = '副标题';
const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png';
</script>
