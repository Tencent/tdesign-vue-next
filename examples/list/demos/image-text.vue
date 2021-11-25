<template>
  <div>
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="imageUrl" title="列表标题" description="列表内容的描述性文字" />
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="imageUrl" title="列表标题" description="列表内容的描述性文字" />
      </t-list-item>
      <t-list-item>
        <t-list-item-meta :image="imageUrl" title="列表标题" description="列表内容的描述性文字" />
      </t-list-item>
    </t-list>

    <div style="margin-bottom: 16px" />

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta :image="imageUrl" title="列表标题">
          <template #description>
            <p>列表内容的描述性文字</p>
          </template>
        </t-list-item-meta>
      </t-list-item>
    </t-list>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      imageUrl: 'https://tdesign.gtimg.com/list-icon.png',
    };
  },
});
</script>
<style scoped>
.t-list {
  overflow: hidden;
  margin-bottom: 32px;
}
</style>
