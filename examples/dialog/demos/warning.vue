<template>
  <div>
    <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>
  
    <t-dialog
      theme="info"
      header="提示"
      body="对话框内容"
      v-model:visible="visible1"
      @confirm="onClickConfirm"
      :onClose="close1"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
    <t-dialog
      theme="success"
      header="恭喜"
      body="对话框内容"
      v-model:visible="visible2"
      @confirm="onClickConfirm"
      :onClose="close2"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
    <t-dialog
      theme="warning"
      header="警示"
      body="对话框内容"
      v-model:visible="visible3"
      @confirm="onClickConfirm"
      :onClose="close3"
      :cancelBtn="null"

    >
    </t-dialog>

    <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
    <t-dialog
      theme="danger"
      header="错误"
      body="对话框内容"
      v-model:visible="visible4"
      @confirm="onClickConfirm"
      :onClose="close4"
      :cancelBtn="null"
    >
    </t-dialog>

    <t-button theme="primary" @click="visible5 = true">自定义icon</t-button>
    <t-dialog
      body="对话框内容"
      :closeBtn="false"
      v-model:visible="visible5"
      @confirm="onClickConfirm"
      :onClose="close5"
    >
      <template #header>
        <div>
          <t-icon name="check-circle-filled" color="orange" />
          <span style="vertical-align: middle;">对话框标题</span>
        </div>
      </template>
    </t-dialog>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible1 = ref(false)
    const visible2 = ref(false)
    const visible3 = ref(false)
    const visible4 = ref(false)
    const visible5 = ref(false)

    const onClickConfirm = (context) => {
      const { e } = context;
      // todo something else here
      visible1.value = false;
      visible2.value = false;
      visible3.value = false;
      visible4.value = false;
      visible5.value = false;
      e.stopPropagation();
    }

    return {
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      onClickConfirm,
      close1() {
        visible1.value = false;
      },
      close2() {
        visible2.value = false;
      },
      close3() {
        visible3.value = false;
      },
      close4() {
        visible4.value = false;
      },
      close5() {
        visible5.value = false;
      },
    }
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
