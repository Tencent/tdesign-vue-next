<template>
  <div>
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
      </t-list-item>
    </t-list>

    <div style="margin-bottom:16px" />

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
        >
          <template #description>
            <p>列表内容列表内容列表内容</p>
            <p>列表内容列表内容列表内容</p>
            <p>列表内容列表内容列表内容</p>
            <p>列表内容列表内容列表内容</p>
            <p>列表内容列表内容列表内容</p>
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
      avatarUrl: 'https://tdesign.gtimg.com/list-icon.png',
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
