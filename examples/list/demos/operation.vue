<template>
  <div>
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
      </t-list-item>
    </t-list>

    <div style="margin-bottom: 16px"></div>

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
        <template #action>
          <li><t-icon-check-circle-filled /></li>
          <li><t-icon-check-circle-filled /></li>
          <li><t-icon-check-circle-filled /></li>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="avatarUrl" title="列表主内容" description="列表内容列表内容"></t-list-item-meta>
        <template #action>
          <li><t-icon-check-circle-filled /></li>
          <li><t-icon-check-circle-filled /></li>
          <li><t-icon-check-circle-filled /></li>
        </template>
      </t-list-item>
    </t-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TIconCheckCircleFilled from '@tencent/tdesign-vue-next/icon/check-circle-filled';

export default defineComponent({
  components: { TIconCheckCircleFilled },
  setup() {
    return {
      avatarUrl: 'https://tdesign.gtimg.com/list-icon.png',
    }
  }
});
</script>
