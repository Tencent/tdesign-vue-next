import { computed, ComputedRef, onBeforeMount, onMounted, watch } from 'vue';
import { TdInputProps } from './type';
import log from '../_common/js/log';
import { getCharacterLength } from '../_common/js/utils/helper';

export interface UseLengthLimitParams {
  value: string;
  maxlength: number;
  maxcharacter: number;
  allowInputOverMax: boolean;
  status: TdInputProps['status'];
  onValidate: TdInputProps['onValidate'];
}

export default function useLengthLimit(params: ComputedRef<UseLengthLimitParams>) {
  // 文本超出数量限制时，是否允许继续输入
  const getValueByLimitNumber = (inputValue: string) => {
    const { allowInputOverMax, maxlength, maxcharacter } = params.value;
    if (!(maxlength || maxcharacter) || allowInputOverMax || !inputValue) return inputValue;
    if (maxlength) {
      return inputValue.slice(0, maxlength);
    }
    if (maxcharacter) {
      const r = getCharacterLength(inputValue, maxcharacter);
      if (typeof r === 'object') {
        return r.characters;
      }
    }
  };

  const limitNumber = computed(() => {
    const { maxlength, maxcharacter, value } = params.value;
    if (maxlength && maxcharacter) {
      log.warn('Input', 'Pick one of maxlength and maxcharacter please.');
    }
    if (maxlength) {
      return `${value?.length || 0}/${maxlength}`;
    }
    if (maxcharacter) {
      return `${getCharacterLength(value || '')}/${maxcharacter}`;
    }
    return '';
  });

  const innerStatus = computed(() => {
    if (limitNumber.value) {
      const [current, total] = limitNumber.value.split('/');
      return Number(current) > Number(total) ? 'error' : '';
    }
    return '';
  });

  const tStatus = computed(() => {
    const { status } = params.value;
    return status || innerStatus.value;
  });

  const onValidateChange = () => {
    params.value.onValidate?.({
      error: innerStatus.value ? 'exceed-maximum' : undefined,
    });
  };

  watch(innerStatus, onValidateChange);

  onMounted(() => {
    innerStatus.value && onValidateChange();
  });

  return {
    tStatus,
    limitNumber,
    getValueByLimitNumber,
  };
}
