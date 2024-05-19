<template>
  <div>
    <p>弹窗内容自定义</p>
    <br />
    <div>
      <t-space break-line>
        <t-button theme="primary" @click="bodyVisible1 = true">隐藏标题</t-button>
        <t-button theme="primary" @click="bodyVisible2 = true">渲染函数定义内容</t-button>
        <t-button theme="primary" @click="bodyVisible3 = true">插槽方式定义内容</t-button>
      </t-space>
      <!-- :onClose="onClose" 和 @close="onClose" 等效 -->
      <!-- :onConfirm="onConfirm" 和 @confirm="onConfirm" 等效 -->
      <t-dialog
        :header="false"
        body="这是对话框内容，对话框标题已被隐藏"
        :visible="bodyVisible1"
        :onClose="bodyClose1"
        :onConfirm="bodyClose1"
      />

      <t-dialog
        :visible="bodyVisible2"
        header="对话框标题"
        :body="renderDialog2Body"
        :onClose="bodyClose2"
        :onConfirm="bodyClose2"
      >
        <!-- <div slot="body">被渲染函数覆盖的插槽内容</div> -->
      </t-dialog>

      <t-dialog header="对话框标题" :visible="bodyVisible3" :onClose="bodyClose3" :onConfirm="bodyClose3">
        <div slot="body">
          <div>这是使用插槽定义的对话框内容</div>
        </div>
      </t-dialog>
    </div>

    <br /><br /><br />
    <p>操作按钮自定义</p>
    <br />
    <p>
      底部按钮有两个控制属性：confirmBtn 和 cancelBtn。属性类型有多种：string | ButtonProps | TNode。也可以通过 footer
      来自定义控制
    </p>
    <br />
    <t-space break-line>
      <t-button theme="primary" @click="visible1 = true">按钮文字</t-button>
      <t-button theme="primary" @click="visible2 = true">按钮属性</t-button>
      <t-button theme="primary" @click="visible3 = true">渲染函数按钮</t-button>
      <t-button theme="primary" @click="visible4 = true">隐藏底部</t-button>
    </t-space>
    <t-dialog
      :visible.sync="visible1"
      header="提示"
      body="自定义底部按钮，直接传入文字"
      confirmBtn="前往支付"
      cancelBtn="关闭"
      :onConfirm="onConfirm"
      :onClose="close1"
    />

    <!-- 透传 ButtonProps，以自定义按钮样式 -->
    <t-dialog
      :visible="visible2"
      header="提示"
      body="自定义底部按钮，传入 ButtonProps"
      :confirmBtn="{
        content: confirmBtnRender,
        icon: confirmBtnIconRender,
        variant: 'base',
      }"
      :cancelBtn="{
        content: '离开',
        variant: 'outline',
      }"
      :onClose="close2"
    />

    <!-- cancelBtn 和 confirmBtn 值为 null 时，隐藏按钮 -->
    <!-- confirmBtn 可以作为渲染函数输出按钮 -->
    <t-dialog
      :visible="visible3"
      header="对话框标题"
      body="自定义底部按钮，传入自定义组件"
      :confirmBtn="getConfirmBtn"
      :cancelBtn="null"
      :onClose="close3"
    />

    <t-dialog
      :visible="visible4"
      header="对话框标题"
      body="不需要底部按钮的内容"
      :footer="false"
      :onClose="close4"
      :onConfirm="close4"
    />
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
import { CartIcon } from 'tdesign-icons-vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const bodyVisible1 = ref(false);
const bodyVisible2 = ref(false);
const bodyVisible3 = ref(false);
const getConfirmBtn = () => (
    <t-button theme="primary" disabled>
      我知道了
    </t-button>
);
// 使用 button.content 渲染函数输出
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmBtnRender = (h) => <span>前往购物车</span>;
// 使用 button.icon 渲染函数输出
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmBtnIconRender = (h) => <CartIcon />;
const close1 = () => {
  visible1.value = false;
};
const close2 = () => {
  visible2.value = false;
};
const close3 = () => {
  visible3.value = false;
};
const close4 = () => {
  visible4.value = false;
};
const onConfirm = () => {
  visible1.value = false;
  alert('跳转支付~');
};
const renderDialog2Body = () => <div>这里的内容使用渲染函数输出，渲染函数优先级高于插槽</div>;
const bodyClose1 = () => {
  bodyVisible1.value = false;
};
const bodyClose2 = () => {
  bodyVisible2.value = false;
};
const bodyClose3 = () => {
  bodyVisible3.value = false;
};
</script>
