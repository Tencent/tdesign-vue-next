<template>
  <div>
    <!-- 下拉浮层默认触发方式为 focus，如果期望更为其他，可以设置 :popupProps="{ trigger: 'click' }" -->
    <t-auto-complete v-model="value" :options="options" highlightKeyword @change="onChange">
      <t-textarea v-model="value" placeholder="自定义联想词触发元素"></t-textarea>
    </t-auto-complete>
  </div>
</template>

<script>
export default {
  name: 'AutoCompleteTriggerElement',

  data() {
    return {
      value: '',
      options: ['First AutoComplete Textarea', 'Second AutoComplete Textarea', 'Third AutoComplete Textarea'],
      timer: null,
    };
  },

  methods: {
    // 输入框内容发生变化时进行搜索，200ms 搜索一次
    onChange(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const text = 'AutoComplete Textarea';
        const pureValue = value.replace(`First ${text}`, '').replace(`Second ${text}`, '').replace(`Third ${text}`, '');

        this.options = [`${pureValue}First ${text}`, `${pureValue}Second ${text}`, `${pureValue}Third ${text}`];
        clearTimeout(this.timer);
      }, 200);
    },
  },
};
</script>
