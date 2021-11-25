<template>
  <div class="tdesign-demo-select-options">
    <!-- 方式一：使用 options 自定义下拉选项内容 -->
    <t-select
      v-model="value1"
      :options="optionsData"
      :popup-props="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
      placeholder="请选择"
    />
    <br /><br />

    <!-- 方式二：使用插槽自定义下拉选项内容 -->
    <t-select
      v-model="value2"
      placeholder="请选择"
      :popup-props="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
    >
      <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label">
        <div class="tdesign-demo__user-option">
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
          <div class="tdesign-demo__user-option-info">
            <div>{{ item.label }}</div>
            <div class="tdesign-demo__user-option-desc">
              {{ item.description }}
            </div>
          </div>
        </div>
      </t-option>
    </t-select>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref, computed } from 'vue';

const options = [
  {
    label: '周瑜',
    value: 'zhouyu',
    description: '周瑜（175年-210年），字公瑾，庐江舒县人 。东汉末年军事家、政治家、谋略家、东吴名将。',
  },
  { label: '小乔', value: 'xiaoqiao', description: '东汉末年国色美女，桥公次女，名将周瑜的夫人。' },
  {
    label: '刘备',
    value: 'liubei',
    description: '汉昭烈帝刘备（161年－223年6月10日），汉族，字玄德，涿郡涿县（今河北省涿州市）人。',
  },
  {
    label: '马超',
    value: 'machao',
    description: '马超（176年～222年），字孟起，扶风茂陵（今陕西省兴平市）人，汉伏波将军马援的后人。',
  },
  { label: '关羽', value: 'guanyu', description: '东汉末年名将。汉末亡命涿郡，与张飞从刘备起兵。' },
  { label: '张飞', value: 'zhangfei', description: '张飞勇武过人，与结拜兄弟关羽并称为“万人敌”。' },
  {
    label: '诸葛亮',
    value: 'zhugeliang',
    description: '诸葛亮（181年—234年10月8日），字孔明，号卧龙，琅琊阳都人，三国时期蜀汉丞相',
  },
  {
    label: '司马懿',
    value: 'simayi',
    description: '司马懿（179年～251年9月7日），字仲达，河内郡温县孝敬里（今河南省焦作市温县）人。',
  },
  {
    label: '司马昭',
    value: 'simazhao',
    description: '司马昭（211年—265年9月6日），字子上（小说《三国演义》为子尚），河内温县人。',
  },
];

export default defineComponent({
  setup() {
    const value1 = ref([]);
    const value2 = ref([]);
    const optionRender = (h, option) => (
      <div class="tdesign-demo__user-option">
        <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
        <div class="tdesign-demo__user-option-info">
          <div>{option.label}</div>
          <div class="tdesign-demo__user-option-desc">{option.description}</div>
        </div>
      </div>
    );
    const optionsData = computed(() =>
      options.map((item) => ({
        ...item,
        // options 自定义下拉选项关键代码
        content: (h) => optionRender(h, item),
      })),
    );

    return {
      value1,
      value2,
      options,
      optionsData,
    };
  },
});
</script>

<style>
.tdesign-demo__user-option {
  display: flex;
}

.tdesign-demo__user-option > img {
  max-width: 40px;
  border-radius: 50%;
}

.tdesign-demo__user-option-desc {
  font-size: 13px;
  color: var(--td-gray-color-9);
}

.tdesign-demo__user-option-info {
  margin-left: 16px;
}

.tdesign-demo-select__overlay-option .t-select-option {
  height: 60px;
}
</style>
