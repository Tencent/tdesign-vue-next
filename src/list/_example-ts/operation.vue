<template>
  <t-space direction="vertical">
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容" />
        <template #action>
          <span>
            <t-link theme="primary" hover="color" style="margin-left: 16px">操作1</t-link>
            <t-link theme="primary" hover="color" style="margin-left: 16px">操作2</t-link>
            <t-link theme="primary" hover="color" style="margin-left: 16px">操作3</t-link>
          </span>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容" />
        <template #action>
          <span>
            <t-link theme="primary" hover="color" style="margin-left: 16px">操作1</t-link>
            <t-link theme="primary" hover="color" style="margin-left: 16px">操作2</t-link>
            <t-link theme="primary" hover="color" style="margin-left: 16px">操作3</t-link>
          </span>
        </template>
      </t-list-item>
    </t-list>

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容" />
        <template #action>
          <t-button variant="text" shape="square">
            <edit-icon />
          </t-button>
          <t-button variant="text" shape="square">
            <download-icon />
          </t-button>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容" />
        <template #action>
          <t-button variant="text" shape="square">
            <edit-icon />
          </t-button>
          <t-button variant="text" shape="square">
            <download-icon />
          </t-button>
        </template>
      </t-list-item>
    </t-list>
  </t-space>
</template>

<script lang="ts" setup>
import { ListItemMetaProps } from 'tdesign-vue-next';
import { EditIcon, DownloadIcon } from 'tdesign-icons-vue-next';
const avatarUrl: ListItemMetaProps['image'] = 'https://tdesign.gtimg.com/site/avatar.jpg';
</script>
