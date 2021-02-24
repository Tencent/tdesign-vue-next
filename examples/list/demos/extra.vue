<template>
  <div>
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          avatar="https://midas.gtimg.cn/h5/store/static/images/unlogin.f500767.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
        <div
          slot="extra"
          style="height:100px;line-height:100px;width:160px;text-align:center;background: #f0f0f0;"
        >
          额外内容
        </div>
      </t-list-item>
    </t-list>
  </div>
</template>
