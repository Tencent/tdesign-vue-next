<template>
  <div>
    <t-notification theme="info" title="超出的文本省略号显示" :content="content" :footer="footer" />

    <t-notification theme="info" title="消息通知标题" content="使用 function 自定义底部内容" :footer="footer" />
    <t-notification v-if="visible" theme="info" content="1. 使用插槽自定义标题 2. 使用插槽自定义底部内容">
      <template #title>
        <div>消息通知标题 <small>消息通知副标题</small></div>
      </template>
      <template #footer>
        <div class="t-notification__detail">
          <t-button class="t-notification__detail--item" theme="default" variant="text"> 取消 </t-button>
          <t-button class="t-notification__detail--item" theme="primary" variant="text" @click="remind">
            稍后提醒我(10s)
          </t-button>
        </div>
      </template>
    </t-notification>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(true);

    const remind = () => {
      visible.value = false;
      setTimeout(() => {
        visible.value = true;
      }, 10000);
    };

    return {
      visible,
      remind,
      footer() {
        return (
          <div slot="footer" class="t-notification__detail">
            <t-button class="t-notification__detail--item" theme="primary" variant="text">
              查看详情
            </t-button>
          </div>
        );
      },
      content() {
        return '文案不限长度，但在实际使用时建议文案显示内容不易过多，建议最大展示行数数量以三行为宜，最后一行折行末尾处超出文本建议会变为省略号显示。';
      },
    };
  },
});
</script>

<style scoped>
.t-notification + .t-notification {
  margin-top: 24px;
}
</style>
