<template>
  <div>
    <t-dialog v-model:visible="visible1" header="下单确认" body="信息已全部保存，是否确认下单？" mode="normal" theme="info" :onConfirm="close1" ></t-dialog>
    <br>
    <t-dialog v-model:visible="visible2" header="温馨提示" body="系统重启后会短暂影响页面访问，确认重启吗？" mode="normal" theme="warning" :onConfirm="close2" ></t-dialog>
    <br>
    <t-dialog v-model:visible="visible3" header="推送失败" body="请检查推送数据是否符合要求" mode="normal" theme="error" :onConfirm="close3" ></t-dialog>
    <br>
    <t-dialog v-model:visible="visible4" header="操作成功" body="是否前往查看订单列表" mode="normal" theme="success" :onConfirm="close4" ></t-dialog>
    <br>
    <t-button v-if="!visible1" theme="primary" @click="visible1 = true">theme: info</t-button>
    <t-button v-if="!visible2" theme="primary" @click="visible2 = true">theme: warning</t-button>
    <t-button v-if="!visible3" theme="primary" @click="visible3 = true">theme: error</t-button>
    <t-button v-if="!visible4" theme="primary" @click="visible4 = true">theme: success</t-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible1: true,
      visible2: true,
      visible3: true,
      visible4: true,
    };
  },
  methods: {
    close1() {
      this.visible1 = false;
    },
    close2() {
      this.visible2 = false;
    },
    close3() {
      this.visible3 = false;
    },
    close4() {
      this.visible4 = false;
    },

  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
