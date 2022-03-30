<template>
  <div class="tdesign-demo-block">
    <t-row :align="'middle'" justify="center">
      <t-col flex="auto">
        <t-card :title="title" :cover="cover" shadow>
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
                <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
                  <div class="tdesign-demo-dropdown-trigger">
                    <t-button variant="text">
                      <span class="tdesign-demo-dropdown__text">
                        下拉菜单 <t-icon name="chevron-down" size="16" />
                      </span>
                    </t-button>
                  </div>
                </t-dropdown>
              </t-col>
            </t-row>
          </template>
        </t-card>
      </t-col>
      <t-col flex="auto">
        <t-card :title="title" :cover="cover" shadow>
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
      <t-col flex="auto">
        <t-card :title="title" :cover="cover" shadow>
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
                <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
                  <div class="tdesign-demo-dropdown-trigger">
                    <t-button variant="text">
                      <span class="tdesign-demo-dropdown__text">
                        下拉菜单 <t-icon name="chevron-down" size="16" />
                      </span>
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
import { ThumbUpIcon, ChatIcon, ShareIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const title = '标题';
const actions = '默认标签';
const cover = 'https://tdesign.gtimg.com/site/doc/doc-card.png';

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
