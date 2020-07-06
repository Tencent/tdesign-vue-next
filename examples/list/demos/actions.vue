<template>
  <div>
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
      </t-list-item>
    </t-list>

    <div style="margin-bottom:16px"></div>

    <t-list :split="true" action-layout="vertical">
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href="">操作1</a></li>
          <li><a href="">操作2</a></li>
          <li><a href="">操作3</a></li>
        </template>
      </t-list-item>
    </t-list>

    <div style="margin-bottom:16px"></div>

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href=""><t-icon-success-fill /></a></li>
          <li><a href=""><t-icon-success-fill /></a></li>
          <li><a href=""><t-icon-success-fill /></a></li>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          avatar="undefined.png"
          title="列表主内容"
          description="列表内容列表内容"
        ></t-list-item-meta>
        <template #action>
          <li><a href=""><t-icon-success-fill /></a></li>
          <li><a href=""><t-icon-success-fill /></a></li>
          <li><a href=""><t-icon-success-fill /></a></li>
        </template>
      </t-list-item>
    </t-list>
  </div>
</template>

<script>
import TIconSuccessFill from '@/src/icon/success-fill.tsx';

export default {
  components: { TIconSuccessFill },
};
</script>
