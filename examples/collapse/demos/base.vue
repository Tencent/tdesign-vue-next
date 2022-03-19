<template>
  <div class="accordion-demo">
    <!-- v-model:value="valueBase"  -->
    <t-collapse :value="valueBase" title="基础型">
      <t-collapse-panel v-for="(p, i) in panels" :key="i" :name="i" v-bind="p" :header="p.title">
        {{ p.content }}
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const panels = [
      {
        title: '基础面板',
        name: '0',
        content:
          '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
      },
      {
        title: '基础面板',
        name: '1',
        content: ['一段很长很长的内容文字', '一段很长很长的内容文字', '一段很长很长的内容文字'],
      },
      {
        title: '基础面板',
        extra: '基础面板',
        content: [
          { label: '标题1', content: '预设文本' },
          { label: '类目标题2', content: '预设文本' },
          {
            label: '很长很长很长的内容标题',
            content: '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
          },
        ],
      },
      {
        title: '内容带标签 - 宽度固定',
        extra: '预设文本',
        labelWidth: 80,
        content: [
          { label: '标题1', content: '预设文本' },
          {
            label: '很长很长很长的内容标题',
            content: '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
          },
        ],
      },
    ];
    const state = reactive({
      valueBase: ['0', 3],
      panels,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less">
.accordion-demo {
  background-color: #f9f9f9;
}
</style>
