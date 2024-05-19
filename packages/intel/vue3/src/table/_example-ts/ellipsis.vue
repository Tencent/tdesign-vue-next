<template>
  <div>
    <!-- :attach="getAttach" 统一控制超出省略等元素浮层的挂载元素 -->
    <!-- 方式一：超出省略，全部通过 columns 定义；可使用 jsx 自定义浮层内容 -->
    <t-table row-key="id" :data="data" :columns="columns" lazy-load />

    <!-- 方式二：超出省略浮层内容定义，使用插槽名 ellipsis-<colKey> 定义某一列的超出省略浮层内容 -->
    <!-- 示例代码有效，请勿删除 -->
    <!-- <t-table row-key="id" :data="data" :columns="columns" lazyLoad>
      <template #ellipsis-applicant="{ row, col }">
        <span>插槽定义浮层内容：{{ row[col.colKey] }}</span>
      </template>
    </t-table> -->

    <!-- 方式三：超出省略浮层内容定义，使用插槽名 ellipsis 定义，这种方式会用于自定义所有单元格的省略浮层，一般情况不建议使用 -->
    <!-- 示例代码有效，请勿删除 -->
    <!-- <t-table row-key="id" :data="data" :columns="columns" lazyLoad>
      <template #ellipsis="{ row, col }">
        <span>插槽定义浮层内容：{{ row[col.colKey] }}</span>
      </template>
    </t-table> -->
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { MessagePlugin, TableProps } from 'tdesign-vue-next';
import {
  FileCopyIcon,
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';
const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success',
    icon: <CheckCircleFilledIcon />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <CloseCircleFilledIcon />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <ErrorCircleFilledIcon />,
  },
};

// const getAttach = () => document.body;

// thanks to https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
function copyToClipboard(text: string) {
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
const data: TableProps['data'] = [];
const total = 5;
for (let i = 0; i < total; i++) {
  data.push({
    id: i + 1,
    applicant: ['贾明（kyrieJia）', '张三（threeZhang)', '王芳（fangWang)'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    desc: ['单元格文本超出省略设置', '这是普通文本的超出省略'][i % 2],
    link: '点击查看审批详情',
    something: '仅标题省略',
    // 透传 Tooltip Props 到浮层组件
    ellipsisProps: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    // 完全自定义超出省略的 Tips 内容
    ellipsisContent: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    propsAndContent1: ['2021-11-01', '2021-12-01', '2022-01-01', '2022-02-01', '2022-03-01'][i % 4],
    propsAndContent2: [2, 3, 1, 4][i % 4],
  });
}
const columns = ref<TableProps['columns']>([
  {
    colKey: 'applicant',
    title: '申请人',
    ellipsis: true,
  },
  {
    colKey: 'status',
    title: '审批状态',
    width: 120,
    cell: (h, { row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  {
    title: '签署方式（超长标题示例）',
    colKey: 'channel',
    width: 120,
    ellipsisTitle: true,
  },
  {
    title: '邮箱地址',
    colKey: 'ellipsisProps',
    // 浮层浅色背景，方向默认朝下出现
    ellipsis: {
      theme: 'light',
      placement: 'bottom',
    },
  },
  {
    title: '申请事项',
    colKey: 'ellipsisContent',
    // ellipsis 定义超出省略的浮层内容，cell 定义单元格内容
    ellipsis: (h, { row }) => (
      <div>
        {row.ellipsisContent}
        <FileCopyIcon
          style={{
            cursor: 'pointer',
            marginLeft: '4px',
          }}
          onClick={() => copyToClipboard(row.ellipsisContent)}
        />
      </div>
    ),
  },
  {
    title: '审核时间',
    colKey: 'propsAndContent1',
    // 支持同时设置 tooltipProps 和 浮层内容,
    width: 100,
    ellipsis: {
      props: {
        theme: 'light',
        placement: 'bottom-right',
      },
      content: (h, { row }) => (
        <div>
          <p>
            <b>创建日期:</b> {row.propsAndContent1}
          </p>
          <p>
            <b>审核时长(天):</b> {row.propsAndContent2}
          </p>
        </div>
      ),
    },
  },
  {
    title: '操作',
    colKey: 'link',
    // 超出省略的内容显示纯文本，不带任何样式和元素
    ellipsis: (h, { row }) => row.link,
    // 注意这种 JSX 写法需设置 <script lang='tsx' setup>
    cell: (h, { row }) => (
      <a href="/vue-next/components/table" target="_blank">
        {row.link}
      </a>
    ),
  },
]);
</script>
