<template>
  <t-space direction="vertical" style="width: 100%">
    <t-chat-message
      variant="text"
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      name="TDesignAI"
      :message="message"
    >
      <template #content>
        <template v-for="(contentItem, contentIndex) in message.content" :key="contentItem.data.id || contentIndex">
          <t-chat-content v-if="contentItem.type === 'text'" :content="contentItem.data" />
          <TvisionTcharts
            v-else-if="contentItem.type === 'chart'"
            class="chart"
            :chart-type="contentItem.data.chartType"
            :options="contentItem.data.options"
          />
        </template>
      </template>
    </t-chat-message>
  </t-space>
</template>

<script setup lang="js">
import TvisionTcharts from 'tvision-charts-vue-next';
import { ref } from 'vue';

const message = ref({
  id: '123123',
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
});
</script>
<style scoped>
.chart {
  width: 600px;
  height: 500px;
}
</style>
