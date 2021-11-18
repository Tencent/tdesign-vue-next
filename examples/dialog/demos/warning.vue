<template>
  <div>
    <t-button
      theme="primary"
      @click="visible1 = true"
    >
      提示反馈
    </t-button>

    <t-dialog
      v-model:visible="visible1"
      theme="info"
      header="提示"
      body="对话框内容"
      :on-close="close1"
      @confirm="onClickConfirm"
    />

    <t-button
      theme="primary"
      @click="visible2 = true"
    >
      成功反馈
    </t-button>
    <t-dialog
      v-model:visible="visible2"
      theme="success"
      header="恭喜"
      body="对话框内容"
      :on-close="close2"
      @confirm="onClickConfirm"
    />

    <t-button
      theme="primary"
      @click="visible3 = true"
    >
      警示反馈
    </t-button>
    <t-dialog
      v-model:visible="visible3"
      theme="warning"
      header="警示"
      body="对话框内容"
      :on-close="close3"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    />

    <t-button
      theme="primary"
      @click="visible4 = true"
    >
      错误反馈
    </t-button>
    <t-dialog
      v-model:visible="visible4"
      theme="danger"
      header="错误"
      body="对话框内容"
      :on-close="close4"
      :cancel-btn="null"
      @confirm="onClickConfirm"
    />

    <t-button
      theme="primary"
      @click="visible5 = true"
    >
      自定义icon
    </t-button>
    <t-dialog
      v-model:visible="visible5"
      body="对话框内容"
      :close-btn="false"
      :on-close="close5"
      @confirm="onClickConfirm"
    >
      <template #header>
        <div>
          <t-icon
            name="check-circle-filled"
            color="orange"
          />
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
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    const visible5 = ref(false);

    const onClickConfirm = (context) => {
      const { e } = context;
      // todo something else here
      visible1.value = false;
      visible2.value = false;
      visible3.value = false;
      visible4.value = false;
      visible5.value = false;
      e.stopPropagation();
    };

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
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
