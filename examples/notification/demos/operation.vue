<template>
  <div>
    <t-notification
      theme="info"
      title="可跳转的消息通知"
      content="文案不限长度，但是展示最大显示三行折行的末尾显示折行末尾显示折行末尾显示折行末尾显示折行末尾显示折行折行末尾显示折行折行末尾显示折行末尾显示折行折行末尾"
      :footer="footer"
    />

    <t-notification theme="info" title="可跳转的消息通知" content="这种一条消息通知" :footer="footer2" />
    <t-notification theme="info" title="可跳转的消息通知" content="这种一条消息通知">
      <template #footer>
        <div class="t-notification__detail">
          <span class="t-notification__detail--item">知道了</span>
        </div>
      </template>
    </t-notification>
    <t-notification theme="info" title="可跳转的消息通知" content="这种一条消息通知" v-if="visible">
      <template #footer>
        <div class="t-notification__detail">
          <span class="t-notification__detail--item">重启</span>
          <span class="t-notification__detail--item t-is-active" @click="remind">稍后提醒我(10s)</span>
        </div>
      </template>
    </t-notification>
    <t-notification theme="info" title="可跳转的消息通知" content="这种一条消息通知">
      <template #footer>
        <div  class="t-notification__detail">
          <span class="t-notification__detail--item">重启</span>
          <t-dropdown :options="options">
            <t-button variant="text" class="tdesign-demo-dropdown"
            >更多 <t-icon name="chevron-down" class="tdesign-demo-arrow"
            /></t-button>
          </t-dropdown>
        </div>
      </template>
    </t-notification>
  </div>
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
          <span class="t-notification__detail--item t-is-active">查看详情</span>
        </div>
      );
    },

    footer2() {
      return (
        <div slot="footer" class="t-notification__detail">
          <span class="t-notification__detail--item t-is-active">查看详情</span>
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

<style scoped>
.t-notification + .t-notification {
  margin-top: 24px;
}
</style>
