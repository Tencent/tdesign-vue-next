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
        mode="dialog"
        @change="handleChange"
        @prev-step-click="handlePrevStepClick"
        @next-step-click="handleNextStepClick"
        @finish="handleFinish"
        @skip="handleSkip"
      />
    </t-drawer>
  </t-row>
</template>

<script setup>
import { ref } from 'vue';
import DialogBody from './components/dialog-body.vue';

const visible = ref(false);
const current = ref(-1);

const steps = [
  {
    element: '.main-title',
    title: '新手引导标题',
    body: DialogBody,
    placement: 'bottom-right',
  },
  {
    element: '.label-field',
    title: '新手引导标题',
    body: DialogBody,
    placement: 'bottom',
  },
  {
    element: '.action',
    title: '新手引导标题',
    body: DialogBody,
    placement: 'right',
  },
];

const handleClick = () => {
  visible.value = true;
  setTimeout(() => {
    current.value = 0;
  }, 800);
};

const handleChange = (current, { e, total }) => {
  console.log(current, e, total);
};

const handlePrevStepClick = ({ e, prev, current, total }) => {
  console.log(e, prev, current, total);
};

const handleNextStepClick = ({ e, next, current, total }) => {
  console.log(e, next, current, total);
};

const handleFinish = ({ e, current, total }) => {
  visible.value = false;
  console.log(e, current, total);
};

const handleSkip = ({ e, current, total }) => {
  visible.value = false;
  console.log(e, current, total);
};
</script>

<style scoped>
.guide-container {
  max-width: 600px;
  padding: 40px;
}

.title-major {
  color: var(--td-text-color-primary);
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
}

.title-sub {
  margin-top: 8px;
  color: var(--td-text-color-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.field {
  margin-top: 50px;
}

.label {
  margin-bottom: 8px;
  color: var(--td-text-color-primary);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.action {
  display: inline-flex;
  margin-top: 50px;
}

.action button:first-child {
  margin-right: 10px;
}
</style>
