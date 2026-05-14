<template>
  <t-cascader v-model="value" :options="options">
    <template #columnHeader="{ panelIndex, onFilter }">
      <t-input
        v-model="searchValues[panelIndex]"
        :placeholder="'搜索第' + (panelIndex + 1) + '级'"
        @change="(val) => onFilter(val)"
      />
    </template>
    <template #columnFooter="{ filteredOptions, options: columnOptions }">
      <div class="demo-panel-footer">{{ filteredOptions.length }} / {{ columnOptions.length }} 项</div>
    </template>
  </t-cascader>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const value = ref('');
const searchValues = reactive<Record<number, string>>({});

const options = [
  {
    label: '北京市',
    value: '1',
    children: [
      {
        label: '东城区',
        value: '1.1',
        children: [
          { label: '安定门街道', value: '1.1.1' },
          { label: '建国门街道', value: '1.1.2' },
          { label: '朝阳门街道', value: '1.1.3' },
          { label: '东直门街道', value: '1.1.4' },
          { label: '和平里街道', value: '1.1.5' },
          { label: '北新桥街道', value: '1.1.6' },
          { label: '交道口街道', value: '1.1.7' },
          { label: '景山街道', value: '1.1.8' },
        ],
      },
      {
        label: '西城区',
        value: '1.2',
        children: [
          { label: '西长安街街道', value: '1.2.1' },
          { label: '新街口街道', value: '1.2.2' },
          { label: '月坛街道', value: '1.2.3' },
          { label: '展览路街道', value: '1.2.4' },
          { label: '德胜街道', value: '1.2.5' },
          { label: '金融街街道', value: '1.2.6' },
        ],
      },
      {
        label: '朝阳区',
        value: '1.3',
        children: [
          { label: '三里屯街道', value: '1.3.1' },
          { label: '望京街道', value: '1.3.2' },
          { label: '呼家楼街道', value: '1.3.3' },
          { label: '双井街道', value: '1.3.4' },
          { label: '建外街道', value: '1.3.5' },
        ],
      },
      {
        label: '海淀区',
        value: '1.4',
        children: [
          { label: '中关村街道', value: '1.4.1' },
          { label: '海淀街道', value: '1.4.2' },
          { label: '清河街道', value: '1.4.3' },
          { label: '上地街道', value: '1.4.4' },
        ],
      },
      { label: '丰台区', value: '1.5' },
      { label: '石景山区', value: '1.6' },
      { label: '通州区', value: '1.7' },
      { label: '顺义区', value: '1.8' },
      { label: '大兴区', value: '1.9' },
      { label: '昌平区', value: '1.10' },
    ],
  },
  {
    label: '上海市',
    value: '2',
    children: [
      {
        label: '黄浦区',
        value: '2.1',
        children: [
          { label: '南京东路街道', value: '2.1.1' },
          { label: '外滩街道', value: '2.1.2' },
          { label: '豫园街道', value: '2.1.3' },
          { label: '老西门街道', value: '2.1.4' },
        ],
      },
      {
        label: '徐汇区',
        value: '2.2',
        children: [
          { label: '徐家汇街道', value: '2.2.1' },
          { label: '天平路街道', value: '2.2.2' },
          { label: '漕河泾街道', value: '2.2.3' },
        ],
      },
      { label: '长宁区', value: '2.3' },
      { label: '静安区', value: '2.4' },
      { label: '普陀区', value: '2.5' },
      { label: '虹口区', value: '2.6' },
      { label: '杨浦区', value: '2.7' },
      { label: '浦东新区', value: '2.8' },
      { label: '闵行区', value: '2.9' },
    ],
  },
  {
    label: '广东省',
    value: '3',
    children: [
      {
        label: '广州市',
        value: '3.1',
        children: [
          { label: '天河区', value: '3.1.1' },
          { label: '越秀区', value: '3.1.2' },
          { label: '海珠区', value: '3.1.3' },
          { label: '荔湾区', value: '3.1.4' },
          { label: '白云区', value: '3.1.5' },
          { label: '番禺区', value: '3.1.6' },
        ],
      },
      {
        label: '深圳市',
        value: '3.2',
        children: [
          { label: '南山区', value: '3.2.1' },
          { label: '福田区', value: '3.2.2' },
          { label: '罗湖区', value: '3.2.3' },
          { label: '宝安区', value: '3.2.4' },
          { label: '龙岗区', value: '3.2.5' },
        ],
      },
      { label: '珠海市', value: '3.3' },
      { label: '佛山市', value: '3.4' },
      { label: '东莞市', value: '3.5' },
      { label: '中山市', value: '3.6' },
    ],
  },
  {
    label: '浙江省',
    value: '4',
    children: [
      { label: '杭州市', value: '4.1' },
      { label: '宁波市', value: '4.2' },
      { label: '温州市', value: '4.3' },
      { label: '嘉兴市', value: '4.4' },
    ],
  },
  {
    label: '江苏省',
    value: '5',
    children: [
      { label: '南京市', value: '5.1' },
      { label: '苏州市', value: '5.2' },
      { label: '无锡市', value: '5.3' },
    ],
  },
  {
    label: '四川省',
    value: '6',
    children: [
      { label: '成都市', value: '6.1' },
      { label: '绵阳市', value: '6.2' },
    ],
  },
  {
    label: '湖北省',
    value: '7',
    children: [
      { label: '武汉市', value: '7.1' },
      { label: '宜昌市', value: '7.2' },
    ],
  },
  {
    label: '福建省',
    value: '8',
    children: [
      { label: '福州市', value: '8.1' },
      { label: '厦门市', value: '8.2' },
    ],
  },
  {
    label: '山东省',
    value: '9',
    children: [
      { label: '济南市', value: '9.1' },
      { label: '青岛市', value: '9.2' },
    ],
  },
  {
    label: '河南省',
    value: '10',
    children: [
      { label: '郑州市', value: '10.1' },
      { label: '洛阳市', value: '10.2' },
    ],
  },
];
</script>

<style scoped>
.demo-panel-footer {
  padding: 4px 8px;
  font-size: 12px;
  color: var(--td-text-color-placeholder);
  text-align: center;
}
</style>
