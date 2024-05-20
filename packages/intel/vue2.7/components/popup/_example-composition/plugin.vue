<template>
  <t-space direction="vertical">
    <t-button variant="outline" @click="handleElement1" class="trigger-element1">正常的方式打开</t-button>
    <t-button variant="outline" @click="handleElement2" class="trigger-element2"
    >通过Plugin打开，并修改不同浮层的配置</t-button
    >
    <div>
      <span>这里是一个日志查询的例子，在很长的日志内容中，日志内容存在换行的情况，可以点击链接进行日志查询操作</span>
      <a class="trigger-element3" style="color: var(--td-text-color-brand)" @click="handleCreatePopupOffset"
      >点击此链接，会打开浮层进行跳转操作</a
      >
    </div>
  </t-space>
</template>

<script setup lang="jsx">
import { PopupPlugin } from 'tdesign-vue';

const handleElement1 = () => {
  PopupPlugin('.trigger-element1', '渲染文本的内容');
};
const handleElement2 = () => {
  PopupPlugin('.trigger-element2', '渲染文本的内容', {
    placement: 'right',
    showArrow: false,
  });
};
const handleCreatePopupOffset = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PopupPlugin('.trigger-element3', (h) => <div>透传popperOptions，在offset里控制节点位置</div>, {
    placement: 'bottom',
    popperOptions: {
      modifiers: [
        {
          name: 'offset',
          trigger: 'click',
          options: {
            offset: ({ reference }) => {
              const target = document.querySelector('.trigger-element2');
              let { lineHeight } = getComputedStyle(target);
              if (lineHeight === 'normal') {
                const temp = document.createElement('div');
                temp.innerText = 't';
                document.body.appendChild(temp);
                lineHeight = `${temp.offsetHeight}px`;
                document.body.removeChild(temp);
              }
              const isBreakLine = reference.height > parseInt(lineHeight, 10);
              return isBreakLine ? [reference.x, -reference.height + 10] : [0, 0];
            },
          },
        },
      ],
    },
  });
};
</script>
<style scoped>
.trigger-element3 {
  text-decoration: underline;
  cursor: pointer;
}
</style>
