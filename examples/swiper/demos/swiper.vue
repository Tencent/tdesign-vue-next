<template>
  <div class="tdesign-demo-block--swiper">
    <t-swiper>
      <t-swiper-item>
        <t-alert theme="success" message="【到期提醒】" />
      </t-swiper-item>
      <t-swiper-item>
        <t-alert theme="info" message="【到期提醒】" />
      </t-swiper-item>
      <t-swiper-item>
        <t-alert theme="warning" message="【到期提醒】" />
      </t-swiper-item>
      <t-swiper-item>
        <t-alert theme="error" message="【到期提醒】" />
      </t-swiper-item>
      <div>这是要被忽略的</div>
    </t-swiper>

    <t-swiper :duration="500">
      <t-swiper-item>
        <t-alert theme="success" message="【到期提醒】" />
      </t-swiper-item>
      <t-swiper-item>
        <t-alert theme="info" message="【到期提醒】" />
      </t-swiper-item>
      <t-swiper-item>
        <t-alert theme="warning" message="【到期提醒】" />
      </t-swiper-item>
      <t-swiper-item>
        <t-alert theme="error" message="【到期提醒】" />
      </t-swiper-item>
    </t-swiper>
  </div>
</template>
