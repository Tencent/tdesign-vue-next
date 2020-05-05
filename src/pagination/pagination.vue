<template>
  <div>
    {{ locale.prev }}
    {{ locale.next }}
    {{ t(locale.total, { total: 100 }) }}
  </div>
</template>

<script lang="ts">
import config from '../config';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';

const { prefix } = config;
const name = `${prefix}-pagination`;

const ButtonLocalReceiver = getLocalRecevierMixins('pagination');

export default mixins(ButtonLocalReceiver).extend({
  name,
});
</script>
