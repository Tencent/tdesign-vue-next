<template>
  <div>
    <t-notification theme="info" title="可跳转的消息通知" default="这种一条消息通知" :footer="footer" />
    <t-notification theme="info" title="可跳转的消息通知" default="这种一条消息通知">
      <div slot="footer" class="t-notification__detail">
        <span class="t-notification__detail--item">知道了</span>
      </div>
    </t-notification>
    <t-notification theme="info" title="可跳转的消息通知" default="这种一条消息通知" v-if="visible">
      <div slot="footer" class="t-notification__detail">
        <span class="t-notification__detail--item">重启</span>
        <span class="t-notification__detail--item t-is-active" @click="remind">稍后提醒我(10s)</span>
      </div>
    </t-notification>
    <t-notification theme="info" title="可跳转的消息通知" default="这种一条消息通知">
      <div slot="footer" class="t-notification__detail">
        <span class="t-notification__detail--item">重启</span>
        <t-dropdown :options="options">
          <t-button theme="link" class="tdesign-demo-dropdown"
            >更多 <t-icon name="arrow-down" class="tdesign-demo-arrow"
          /></t-button>
        </t-dropdown>
      </div>
    </t-notification>
  </div>
</template>

<script>
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
  margin-top: 20px;
}
</style>
