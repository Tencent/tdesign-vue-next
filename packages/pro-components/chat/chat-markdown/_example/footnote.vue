<template>
  <t-chat-markdown class="hover-markdown" :content="markdownContent" :options="options" />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
// MarkdownEngine是内置的cherry
import { MarkdownEngine } from '@tdesign-vue-next/chat';

const hoverStyles = `
<style>
  ::part(hover-ref) {
    color: rgba(0,0,0,0.6);
    font-size: 12px;
    background: rgba(0, 0, 0, .05);
    cursor: pointer;
    text-decoration: none;
    padding: 2px 6px;
    border-radius: 22px;
    position: relative;
    text-align: center;
    margin: 0 2px;
  }
  
  ::part(hover-ref):hover {
    background: rgba(0, 0, 0, .1);
  }
  
  .hover-tooltip {
    position: fixed;
    background: #2c3e50;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    border: 3px solid #34495e;
    font-size: 13px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    white-space: normal;
    pointer-events: auto;
    line-height: 1.4;
    display: none;
  }
  
  .hover-tooltip .hover-title {
    font-weight: bold;
    margin-bottom: 6px;
    display: block;
    font-size: 14px;
    color: #ecf0f1;
    cursor: pointer;
    text-decoration: none;
  }
  
  .hover-tooltip .hover-title:hover {
    color: #3498db;
    text-decoration: underline;
  }
  
  .hover-tooltip .hover-summary {
    color: #bdc3c7;
    font-size: 12px;
    line-height: 1.3;
  }
</style>
`;

/**
 * 自定义悬停提示语法插件
 * 语法格式：[ref:1|标题|摘要|链接]
 */
const hoverRefHook = MarkdownEngine.createSyntaxHook('hoverRef', MarkdownEngine.constants.HOOKS_TYPE_LIST.SEN, {
  makeHtml(str) {
    return str.replace(this.RULE.reg, (_whole, id, title, summary, link) => {
      const tooltipId = `tooltip-${id}-${Math.random().toString(36).substr(2, 9)}`;
      return `<span class="hover-ref" part="hover-ref" data-tooltip-id="${tooltipId}" data-title="${title}" data-summary="${summary}" data-link="${link}" onmouseenter="this.dispatchEvent(new CustomEvent('hover-enter', { bubbles: true, composed: true, detail: { id: '${tooltipId}', title: '${title}', summary: '${summary}', link: '${link}', target: this }}))" onmouseleave="this.dispatchEvent(new CustomEvent('hover-leave', { bubbles: true, composed: true, detail: { id: '${tooltipId}' }}))">${id}</span>`;
    });
  },
  rule() {
    // 匹配 [ref:1|标题|摘要|链接] 语法
    return { reg: /\[ref:([^|\]]+)\|([^|\]]+)\|([^|\]]+)\|([^\]]+)\]/g };
  },
});

const tooltipTimeouts = new Map();

const handleHoverEnter = (e) => {
  const { id, title, summary, link, target } = e.detail;

  // 清除该 tooltip 的隐藏定时器
  if (tooltipTimeouts.has(id)) {
    clearTimeout(tooltipTimeouts.get(id));
    tooltipTimeouts.delete(id);
  }

  // 移除其他所有浮层（确保同时只显示一个）
  document.querySelectorAll('.hover-tooltip').forEach((tooltip) => {
    if (tooltip.id !== id) {
      tooltip.remove();
    }
  });

  // 移除已存在的同 ID 浮层
  const existingTooltip = document.getElementById(id);
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // 创建新的浮层
  const tooltip = document.createElement('div');
  tooltip.id = id;
  tooltip.className = 'hover-tooltip';

  // 创建可点击的标题
  const titleElement = link
    ? `<a href="${link}" target="_blank" class="hover-title">${title}</a>`
    : `<div class="hover-title">${title}</div>`;

  tooltip.innerHTML = `
    ${titleElement}
    <div class="hover-summary">${summary}</div>
  `;

  document.body.appendChild(tooltip);

  // 定位浮层
  const rect = target.getBoundingClientRect();
  tooltip.style.display = 'block';
  tooltip.style.left = `${rect.left}px`;
  tooltip.style.top = `${rect.bottom + 5}px`;

  // 添加 tooltip 的鼠标事件
  tooltip.addEventListener('mouseenter', () => {
    if (tooltipTimeouts.has(id)) {
      clearTimeout(tooltipTimeouts.get(id));
      tooltipTimeouts.delete(id);
    }
  });

  tooltip.addEventListener('mouseleave', () => {
    const timeout = setTimeout(() => {
      tooltip.remove();
      tooltipTimeouts.delete(id);
    }, 100);
    tooltipTimeouts.set(id, timeout);
  });
};

const handleHoverLeave = (e) => {
  const { id } = e.detail;

  // 延迟隐藏，给用户时间移动到 tooltip 上
  const timeout = setTimeout(() => {
    const tooltip = document.getElementById(id);
    if (tooltip) {
      tooltip.remove();
    }
    tooltipTimeouts.delete(id);
  }, 100);

  tooltipTimeouts.set(id, timeout);
};

const markdownContent = `人工智能的发展经历了不同的阶段和研究方法，包括​​符号处理、神经网络、机器学习、深度学习等[ref:1|人工智能的发展历程|探讨AI从诞生到现在的重要里程碑和技术突破|https://tdesign.tencent.com][ref:2|机器学习算法详解|深入分析各种机器学习算法的原理和应用场景|https://tdesign.tencent.com]。`;

const options = {
  engine: {
    global: {
      htmlAttrWhiteList: 'part|class|data-tooltip-id|data-title|data-summary|data-link|onmouseenter|onmouseleave',
    },
    customSyntax: {
      hoverRefHook: {
        syntaxClass: hoverRefHook,
        force: true,
        before: 'link',
      },
    },
  },
};

onMounted(() => {
  // 添加样式
  document.head.insertAdjacentHTML('beforeend', hoverStyles);

  // 添加事件监听器
  document.addEventListener('hover-enter', handleHoverEnter);
  document.addEventListener('hover-leave', handleHoverLeave);
});

onUnmounted(() => {
  document.removeEventListener('hover-enter', handleHoverEnter);
  document.removeEventListener('hover-leave', handleHoverLeave);
});
</script>

<style scoped></style>
