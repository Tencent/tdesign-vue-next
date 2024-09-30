<template>
  <t-space size="large">
    <t-button variant="outline" class="trigger-element1" @click="handleElement1">已渲染的节点1</t-button>
    <t-button variant="outline" class="trigger-element2" @click="handleElement2"
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
import { PopupPlugin } from 'tdesign-vue-next';

function handleElement1() {
  PopupPlugin('.trigger-element1', '渲染文本内容', {
    showArrow: true,
    trigger: 'hover',
    destroyOnClose: true,
  });
}

function handleElement2() {
  PopupPlugin('.trigger-element2', '渲染文本的内容', {
    placement: 'right',
    showArrow: false,
  });
}

function handleCreatePopupOffset() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PopupPlugin('.trigger-element3', (h) => <div>透传popperOptions，在offset里控制节点位置</div>, {
    placement: 'bottom',
    attach: '.trigger-element3',
    showArrow: true,
    popperOptions: {
      modifiers: [
        {
          name: 'offset',
          trigger: 'click',
          options: {
            offset: ({ reference }) => {
              const target = document.querySelector('.trigger-element3');
              let { lineHeight } = getComputedStyle(target);
              if (lineHeight === 'normal') {
                const temp = document.createElement('div');
                temp.innerText = 't';
                document.body.appendChild(temp);
                lineHeight = `${temp.offsetHeight}px`;
                document.body.removeChild(temp);
              }
              const isBreakLine = reference.height > parseInt(lineHeight, 10);
              return isBreakLine ? [null, -reference.height + 10] : [0, 0];
            },
          },
        },
      ],
    },
  });
}
</script>
