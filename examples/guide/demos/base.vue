<template>
  <t-row justify="center">
    <t-button @click="handleClick">新手引导</t-button>
    <t-drawer v-model:visible="visible" header="演示新手引导" size="60%" :show-overlay="false" destroy-on-close>
      <template #footer>
        <t-button @click="visible = false"> 关闭抽屉 </t-button>
      </template>
      <div class="guide-container">
        <div class="main-title">
          <div class="title-major">Guide 用户引导</div>
          <div class="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</div>
        </div>
        <div class="field label-field">
          <div class="label">Label</div>
          <t-input placeholder="请输入内容" />
        </div>
        <div class="field">
          <div class="label">Label</div>
          <t-input placeholder="请输入内容" />
        </div>
        <t-row class="action">
          <t-button>确定</t-button>
          <t-button theme="default" variant="base">取消</t-button>
        </t-row>
      </div>

      <t-guide
        v-model="current"
        :steps="steps"
        @change="handleChange"
        @click-prev-step="handelClickPrevStep"
        @click-next-step="handleClickNextStep"
        @finish="handleFinish"
        @skip="handleSkip"
      />
    </t-drawer>
  </t-row>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const current = ref(-1);

const steps = [
  {
    element: '.main-title',
    title: '新手引导标题',
    description: '新手引导的说明文案',
    placement: 'bottom-right',
  },
  {
    element: '.label-field',
    title: '新手引导标题',
    description: '新手引导的说明文案',
    placement: 'bottom',
  },
  {
    element: '.action',
    title: '新手引导标题',
    description: '新手引导的说明方案',
    placement: 'right',
  },
];

const handleClick = () => {
  visible.value = true;
  setTimeout(() => {
    current.value = 0;
  }, 800);
};

const handleChange = (current, total, context) => {
  console.log(current, total, context);
};

const handelClickPrevStep = (prev, current, total, context) => {
  console.log(prev, current, total, context);
};

const handleClickNextStep = (next, current, total, context) => {
  console.log(next, current, total, context);
};

const handleFinish = (current, total, context) => {
  visible.value = false;
  console.log(current, total, context);
};

const handleSkip = (current, total, context) => {
  visible.value = false;
  console.log(current, total, context);
};
</script>

<style>
.guide-container {
  max-width: 600px;
  padding: 40px;
}

.title-major {
  color: rgba(0, 0, 0, 0.9);
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
}

.title-sub {
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.field {
  margin-top: 50px;
}

.label {
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.action {
  display: inline-flex;
  margin-top: 50px;
}

.action button {
  margin-right: 10px;
}
</style>
