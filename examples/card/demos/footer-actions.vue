<template>
  <div class="tdesign-demo-block">
    <t-row :align="'middle'" justify="center" :gutter="16">
      <t-col :span="4">
        <t-card :cover="cover">
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
      <t-col :span="4">
        <t-card :cover="cover">
          <template #footer>
            <t-row :align="'middle'" justify="center">
              <t-col flex="auto">
                <t-button variant="text">
                  <heart-icon />
                </t-button>
                <t-button variant="text">
                  <share-icon />
                </t-button>
              </t-col>
              <t-col flex="none">
                <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
                  <div class="tdesign-demo-dropdown-trigger">
                    <t-button variant="text">
                      <more-icon />
                    </t-button>
                  </div>
                </t-dropdown>
              </t-col>
            </t-row>
          </template>
        </t-card>
      </t-col>
      <t-col :span="4">
        <t-card :cover="cover">
          <template #footer>
            <t-row :align="'middle'" justify="space-between">
              <t-col flex="none">
                <t-avatar-group cascading="left-up" :max="2">
                  <t-avatar :image="image" />
                  <t-avatar>Q</t-avatar>
                  <t-avatar>C</t-avatar>
                  <t-avatar>G</t-avatar>
                  <t-avatar :icon="icon" />
                </t-avatar-group>
              </t-col>
              <t-col flex="none">
                <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
                  <div class="tdesign-demo-dropdown-trigger">
                    <t-button variant="text">
                      <more-icon />
                    </t-button>
                  </div>
                </t-dropdown>
              </t-col>
            </t-row>
          </template>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>
<script setup lang="jsx">
import { ThumbUpIcon, ChatIcon, ShareIcon, HeartIcon, MoreIcon, UserIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const title = '标题';
const actions = '默认标签';
const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png';

const icon = () => <UserIcon />;
const image = 'https://tdesign.gtimg.com/site/avatar.jpg';

const options = [
  {
    content: '操作一',
    value: 1,
  },
  {
    content: '操作二',
    value: 2,
  },
  {
    content: '操作三',
    value: 3,
  },
  {
    content: '操作四',
    value: 4,
  },
];

const clickHandler = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
