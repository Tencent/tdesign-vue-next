import { defineComponent, computed, nextTick, onMounted, ref, toRefs, watch, h, Teleport } from 'vue';
import isFunction from 'lodash/isFunction';
import setStyle from '../_common/js/utils/set-style';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useConfig } from '../hooks/useConfig';

import props from './props';
import { TdDescriptionsProps } from './type';

/**
 * 实现思路
 * 直接利用 table tbody tr td 来实现即可
 * 先要计算总共有几行，然后再渲染
 */

export default defineComponent({
  name: 'TDescriptionsItem',
  props,
});
