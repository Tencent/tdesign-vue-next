<template>
  <t-chat
    :clear-history="false"
    :reverse="true"
    :text-loading="loading"
    :data="[
      {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        name: 'TDesignAI',
        datetime: '今天16:38',
        role: 'assistant',
        content: [
          {
            type: 'text',
            data: '昨日上午北京道路车辆通行状况，9:00的峰值（1330）可能显示早高峰拥堵最严重时段，10:00后缓慢回落，可以得出如下折线图：',
          },
          {
            type: 'chart',
            data: {
              id: '13123',
              chartType: 'line',
              options: {
                xAxis: {
                  type: 'category',
                  data: [
                    '0:00',
                    '1:00',
                    '2:00',
                    '3:00',
                    '4:00',
                    '5:00',
                    '6:00',
                    '7:00',
                    '8:00',
                    '9:00',
                    '10:00',
                    '11:00',
                    '12:00',
                  ],
                },
                yAxis: {
                  axisLabel: { inside: false },
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 600, 500, 700, 900, 1330, 1320, 1200, 1300, 1100],
                    type: 'line',
                  },
                ],
              },
            },
          },
        ],
      },
      {
        avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
        name: '自己',
        datetime: '今天16:38',
        role: 'user',
        content: [
          {
            type: 'text',
            data: '南极的自动提款机叫什么名字？',
          },
        ],
      },
    ]"
  >
    <!-- eslint-disable vue/no-unused-vars -->
    <template #name="{ item, index }">
      {{ item.name }}
    </template>
    <template #avatar="{ item, index }">
      <t-avatar size="large" shape="circle" :image="item.avatar" />
    </template>
    <template #datetime="{ item, index }">
      {{ item.datetime }}
    </template>
    <template #content="{ item, index }">
      <template v-for="(contentItem, contentIndex) in item.content" :key="contentItem.data.id || contentIndex">
        <t-chat-content v-if="contentItem.type === 'text'" :content="contentItem.data" :role="item.role" />
        <TvisionTcharts
          v-else-if="contentItem.type === 'chart'"
          class="chart"
          :chart-type="contentItem.data.chartType"
          :options="contentItem.data.options"
        />
      </template>
    </template>
    <template #footer>
      <t-chat-sender :loading="isStreamLoad" @send="inputEnter" @stop="handleStop">
        <template #suffix="{ renderPresets }">
          <!-- 不需要附件操作的使用方式 -->
          <component :is="renderPresets([])" />
        </template>
      </t-chat-sender>
    </template>
  </t-chat>
</template>
<script setup lang="ts">
import TvisionTcharts from 'tvision-charts-vue-next';
import { ref } from 'vue';
const loading = ref(false);
const isStreamLoad = ref(false);
const handleStop = function () {
  isStreamLoad.value = false;
};
// 模拟消息发送
const inputEnter = function (inputValue: string) {
  if (isStreamLoad.value) {
    return;
  }
  if (!inputValue) return;
  isStreamLoad.value = true;
  loading.value = true;
  // 模拟接口请求响应中
  setTimeout(() => {
    loading.value = false;
  }, 3000);
  //   模拟流式数据加载中
  setTimeout(() => {
    isStreamLoad.value = false;
  }, 5000);
};
</script>
<style scoped>
.chart {
  width: 600px;
  height: 500px;
}
</style>
