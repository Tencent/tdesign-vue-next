<template>
  <t-space direction="vertical" :size="24">
    <t-notification theme="info" title="超出的文本省略号显示" :content="content" :footer="footer" />
    <t-notification theme="info" title="带关闭按钮" content="这是一条消息通知" :close-btn="true" />
    <t-notification theme="info" title="消息通知标题" content="使用 function 自定义底部内容" :footer="footer2" />
    <t-notification v-if="visible" theme="info" content="1. 使用插槽自定义标题 2. 使用插槽自定义底部内容">
      <template #title>
        <div>消息通知标题 <small>消息通知副标题</small></div>
      </template>
      <template #footer>
        <div class="t-notification__detail">
          <t-button class="t-notification__detail-item" theme="default" variant="text">取消</t-button>
          <t-button class="t-notification__detail-item" theme="primary" variant="text" @click="remind">
            稍后提醒我(10s)
          </t-button>
        </div>
      </template>
    </t-notification>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      visible: true,
      options: [
        {
          text: '操作一',
          id: 1,
        },
        {
          text: '操作二',
          id: 2,
        },
        {
          text: '操作三',
          id: 3,
        },
        {
          text: '操作四',
          id: 4,
        },
      ],
    };
  },
  methods: {
    footer() {
      return (
        <div slot="footer" class="t-notification__detail">
          <t-button class="t-notification__detail-item" theme="primary" variant="text">
            查看详情
          </t-button>
        </div>
      );
    },
    footer2() {
      return (
        <div slot="footer" class="t-notification__detail">
          <t-button class="t-notification__detail-item" theme="primary" variant="text">
            查看详情
          </t-button>
        </div>
      );
    },
    content() {
      return '文案不限长度，但在实际使用时建议文案显示内容不易过多，建议最大展示行数数量以三行为宜，最后一行折行末尾处超出文本建议会变为省略号显示。';
    },
    title() {
      return (
        <div>
          自定义标题 <small>我是副标题</small>
        </div>
      );
    },
    remind() {
      this.visible = false;
      setTimeout(() => {
        this.visible = true;
      }, 10000);
    },
  },
};
</script>
