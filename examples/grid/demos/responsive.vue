<template>
  <div class="tdesign-demo-item--grid">
    <span>宽度响应式</span>
    <t-row>
      <t-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
        <div>Col</div>
      </t-col>
      <t-col :xs="10" :sm="8" :md="6" :lg="4" :xl="2">
        <div>Col</div>
      </t-col>
    </t-row>

    <span>其他属性响应式（支持span，offset，order，pull，push）</span>
    <t-row>
      <t-col
        :xs="{offset: 0, span: 3}"
        :sm="{offset: 2, span: 3}"
        :md="{offset: 4, span: 3}"
        :lg="{offset: 6, span: 3}"
        :xl="{offset: 8, span: 3}">
        <div>Col</div>
      </t-col>
    </t-row>
  </div>
</template>
<script />