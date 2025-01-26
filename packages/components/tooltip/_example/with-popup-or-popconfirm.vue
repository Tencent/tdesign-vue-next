<template>
  <t-space>
    <t-popup content="Popup 内容" trigger="click">
      <!-- 在中间包一层元素 -->
      <!-- 搭配 Popconfirm 同理 -->
      <div style="display: inline-block">
        <t-tooltip placement="bottom" content="Tooltip 内容">
          <t-button>Tooltip 在 Popup 内部</t-button>
        </t-tooltip>
      </div>
    </t-popup>

    <t-tooltip placement="bottom" content="Tooltip 内容">
      <div style="display: inline-block">
        <t-popup content="Popup 内容" trigger="click">
          <t-button>Popup 在 Tooltip 内部</t-button>
        </t-popup>
      </div>
    </t-tooltip>
  </t-space>
</template>
