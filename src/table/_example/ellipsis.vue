<template>
  <div>
    <t-table row-key="id" :data="data" :columns="columns" />
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { FileCopyIcon } from 'tdesign-icons-vue-next';

// thanks to https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    textarea.value = text;
    textarea.select();
    document.execCommand('copy', true);
    document.body.removeChild(textarea);
  }
  MessagePlugin.success('文本复制成功');
}

const data = [];
const total = 5;
for (let i = 0; i < total; i++) {
  data.push({
    id: i + 1,
    desc: ['单元格文本超出省略设置', '这是普通文本的超出省略'][i % 2],
    link: 'Long link text. Popup content is pure text',
    something: '仅标题省略',
    // 透传 Tooltip Props 到浮层组件
    ellipsisProps: 'Setting ellipsis tooltip to be light',
    // 完全自定义超出省略的 Tips 内容
    ellipsisContent: 'Custom Ellipsis Content',
    propsAndContent1: 'Setting props and content at the same time',
    propsAndContent2: 'Setting props and content at the same time',
  });
}

const columns = ref([
  // {
  //   title: 'ID',
  //   colKey: 'id',
  //   width: 80,
  // },
  {
    title: 'Description',
    colKey: 'desc',
    ellipsis: true,
  },
  {
    title: '这是一个很长很长的标题',
    colKey: 'something',
    width: 120,
    ellipsisTitle: true,
  },
  {
    title: 'Link',
    colKey: 'link',
    // 超出省略的内容显示纯文本，不带任何样式和元素
    ellipsis: (h, { row }) => row.link,
    // 注意这种 JSX 写法需设置 <script lang="jsx" setup>
    cell: (h, { row }) => (
      <a href="/vue-next/components/table" target="_blank">
        {row.link}
      </a>
    ),
  },
  {
    title: 'Ellipsis Props',
    colKey: 'ellipsisProps',
    // 浮层浅色背景，方向默认朝下出现
    ellipsis: {
      theme: 'light',
      placement: 'bottom',
    },
  },
  {
    title: 'Ellipsis Content',
    colKey: 'ellipsisContent',
    // ellipsis 定义超出省略的浮层内容，cell 定义单元格内容
    ellipsis: (h, { row }) => (
      <div>
        {row.ellipsisContent}
        <FileCopyIcon
          style={{ cursor: 'pointer', marginLeft: '4px' }}
          onClick={() => copyToClipboard(row.ellipsisContent)}
        />
      </div>
    ),
  },
  {
    title: 'Props & Content',
    colKey: 'propsAndContent1',
    // 支持同时设置 tooltipProps 和 浮层内容,
    ellipsis: {
      props: {
        theme: 'light',
        placement: 'bottom-right',
      },
      content: (h, { row }) => (
        <div>
          <p>
            <b>Tooltip1:</b> {row.propsAndContent1}
          </p>
          <p>
            <b>Tooltip2:</b> {row.propsAndContent2}
          </p>
        </div>
      ),
    },
  },
]);
</script>
