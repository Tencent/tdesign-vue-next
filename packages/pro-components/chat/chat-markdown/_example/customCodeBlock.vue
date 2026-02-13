<template>
  <ChatMarkdown :content="mdContent" :options="options" />
</template>

<script setup lang="ts">
import { ChatMarkdown } from '@tdesign-vue-next/chat';
// 自定义代码块示例引入
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

// 注册常用语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

const mdContent = `
\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
\`\`\`

\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`
`;

/**
 * 自定义代码块渲染器
 * 使用 highlight.js 进行语法高亮，并内联 GitHub Light 主题样式
 */
const customCodeBlockRenderer = (code: string, _sign: string, _cherry: any, lang: string) => {
  // 使用 highlight.js 进行代码高亮
  let highlightedCode = code;
  try {
    if (lang && hljs.getLanguage(lang)) {
      highlightedCode = hljs.highlight(code, {
        language: lang,
        ignoreIllegals: true,
      }).value;
    } else {
      // 如果语言不支持，使用自动检测
      highlightedCode = hljs.highlightAuto(code).value;
    }
  } catch (e) {
    console.error('代码高亮失败:', e);
    // 降级处理：转义 HTML
    highlightedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 生成唯一ID用于复制功能
  const blockId = `code-block-${Math.random().toString(36).substr(2, 9)}`;

  // 将原始代码进行 base64 编码，避免特殊字符问题
  const encodedCode = btoa(encodeURIComponent(code));

  // 返回带有完整样式的代码块
  // 注意：由于在 Shadow DOM 中，我们需要内联所有样式
  return `
    <div class="custom-code-block" style="margin: 16px 0; border-radius: 12px; overflow: hidden; border: 1px solid #d0d7de; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;">
      <div style="background: linear-gradient(to bottom, #f6f8fa, #f0f3f6); color: #24292f; padding: 10px 16px; font-size: 13px; border-bottom: 1px solid #d0d7de; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #57606a;">${
          lang || 'text'
        }</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button
            class="copy-code-btn"
            data-code="${encodedCode}"
            style="background: transparent; border: 1px solid #d0d7de; border-radius: 6px; padding: 4px 8px; font-size: 12px; color: #57606a; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s; font-family: inherit;"
            onmouseenter="this.style.background='#f3f4f6';this.style.borderColor='#8c959f';"
            onmouseleave="this.style.background='transparent';this.style.borderColor='#d0d7de';"
            onclick="(function(btn){try{const code=decodeURIComponent(atob(btn.getAttribute('data-code')));navigator.clipboard.writeText(code).then(function(){const orig=btn.innerHTML;btn.innerHTML='✓ 已复制';btn.style.color='#2da44e';setTimeout(function(){btn.innerHTML=orig;btn.style.color='#57606a';},2000);}).catch(function(err){console.error('复制失败:',err);btn.innerHTML='✗ 失败';setTimeout(function(){btn.innerHTML='复制';},2000);});}catch(e){console.error('解码失败:',e);}})(this);return false;"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
              <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
            </svg>
            复制
          </button>
        </div>
      </div>
      <pre style="margin: 0; background: #ffffff; overflow-x: auto;"><code id="${blockId}" class="hljs language-${lang}" style="display: block; padding: 20px; color: #24292f; background: #ffffff; font-size: 13px; line-height: 1.6; tab-size: 4;">${highlightedCode}</code></pre>
      <style>
        /* GitHub Light Theme - 内联样式 */
        .hljs { color: #24292f; background: #ffffff; }
        .hljs-comment, .hljs-quote { color: #6a737d; font-style: italic; }
        .hljs-doctag, .hljs-keyword, .hljs-formula { color: #d73a49; font-weight: 600; }
        .hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion { color: #22863a; }
        .hljs-subst { color: #24292f; }
        .hljs-literal { color: #005cc5; }
        .hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string { color: #032f62; }
        .hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo { color: #6f42c1; }
        .hljs-number { color: #005cc5; }
        .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title { color: #6f42c1; }
        .hljs-built_in, .hljs-title.class_, .hljs-class .hljs-title { color: #e36209; }
        .hljs-emphasis { font-style: italic; }
        .hljs-strong { font-weight: bold; }
        .hljs-link { text-decoration: underline; }
      </style>
    </div>
  `;
};

const options = {
  engine: {
    syntax: {
      codeBlock: {
        customRenderer: {
          all: {
            render: customCodeBlockRenderer,
          },
        },
      },
    },
  },
};
</script>
