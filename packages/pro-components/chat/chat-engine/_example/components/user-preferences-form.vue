<template>
  <t-card bordered style="margin-top: 8px">
    <!-- 已提交状态 -->
    <template v-if="status === 'complete' && result">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #00a870">✓ 已收到您的偏好设置</div>
      <t-space direction="vertical" size="small">
        <div style="font-size: 12px; color: #666">预算：¥{{ result.budget }}</div>
        <div style="font-size: 12px; color: #666">兴趣：{{ result.interests.join('、') }}</div>
        <div style="font-size: 12px; color: #666">住宿：{{ result.accommodation }}</div>
      </t-space>
    </template>

    <!-- 表单状态 -->
    <template v-else>
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px">请设置您的旅游偏好</div>
      <t-space direction="vertical" size="large" style="width: 100%">
        <div>
          <div style="margin-bottom: 4px; font-size: 12px">预算（元）</div>
          <t-input-number v-model="budget" :min="0" :max="100000" placeholder="请输入预算" style="width: 100%" />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 12px">兴趣爱好</div>
          <t-select v-model="interests" multiple :options="interestOptions" placeholder="请选择兴趣爱好" />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 12px">住宿类型</div>
          <t-select v-model="accommodation" :options="accommodationOptions" placeholder="请选择住宿类型" />
        </div>
        <t-button theme="primary" block @click="handleSubmit"> 确认提交 </t-button>
      </t-space>
    </template>
  </t-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 用户偏好设置组件
 * 展示 Human-in-the-Loop 交互
 */

interface UserPreferencesArgs {
  destination: string;
}

interface UserPreferencesResponse {
  budget: number;
  interests: string[];
  accommodation: string;
}

const props = defineProps<{
  status?: string;
  respond?: (response: UserPreferencesResponse) => void;
  result?: UserPreferencesResponse;
  args?: UserPreferencesArgs;
}>();

const budget = ref(5000);
const interests = ref<string[]>(['美食', '文化']);
const accommodation = ref('经济型');

const interestOptions = [
  { label: '美食', value: '美食' },
  { label: '文化', value: '文化' },
  { label: '自然', value: '自然' },
  { label: '购物', value: '购物' },
];

const accommodationOptions = [
  { label: '经济型', value: '经济型' },
  { label: '舒适型', value: '舒适型' },
  { label: '豪华型', value: '豪华型' },
];

const handleSubmit = () => {
  props.respond?.({
    budget: budget.value,
    interests: interests.value,
    accommodation: accommodation.value,
  });
};
</script>
