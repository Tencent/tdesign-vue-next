<script setup lang="jsx">
import { Space } from 'tdesign-react';
import TvisionTcharts from 'tvision-charts-vue';

const message = {
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
};

const ChartDemo = ({ data }) => (
  <div
    style={{
      width: '600px',
      height: '400px',
    }}
  >
    <TvisionTcharts chartType={data.chartType} options={data.options} theme={data.theme} />
  </div>
);
</script>

<template>
  <Space direction="vertical" style="width: 100%">
    <t-chat-message
      variant="text"
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      name="TDesignAI"
      :message="message"
    >
      <template v-for="(item, index) in message.content" :key="item.data.id">
        <div v-if="item.type === 'chart'">
          <ChartDemo :data="item.data" />
        </div>
      </template>
    </t-chat-message>
  </Space>
</template>
