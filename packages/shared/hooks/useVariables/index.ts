import { ref } from 'vue';
import type { Ref } from 'vue';
import { isString } from 'lodash-es';
import { THEME_MODE } from '@tdesign/common-js/common';
import { getColorTokenColor } from '@tdesign/shared-utils/dom';
import useMutationObservable from '../useMutationObservable';

export function useVariables(variable: string): Ref<string>;
export function useVariables(variables: string[]): Record<string, Ref<string>>;
export function useVariables(variables: string | string[]): Ref<string> | Record<string, Ref<string>> {
  const values: Record<string, Ref<string>> = {};
  const varsArray = isString(variables) ? [variables] : variables;

  varsArray.forEach((varName) => {
    values[varName] = ref(getColorTokenColor(varName));
  });

  const targetElement = document?.documentElement;
  useMutationObservable(targetElement, (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === THEME_MODE) {
        varsArray.forEach((varName) => {
          values[varName].value = getColorTokenColor(varName);
        });
        break;
      }
    }
  });

  return isString(variables) ? values[variables] : values;
}
