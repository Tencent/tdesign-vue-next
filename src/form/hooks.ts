import { Ref, inject, computed, getCurrentInstance, ref, ComputedRef, unref } from 'vue';
import { TdFormProps } from './type';
import { MaybeRef } from '@src/watermark/hooks';
import { SizeEnum } from '..';
import { FormInjectionKey, FormItemInjectionKey } from './const';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

/**
 * 用于实现 form 的全局禁用状态hook
 * @returns
 */
export function useFormDisabled(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsDisabled = computed(() => ctx.props.disabled as boolean);
  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  return computed(() => propsDisabled.value || disabled?.value || extend?.value || false);
}

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance();
  return computed(() => (vm?.proxy?.$props as any)?.[name]);
};

const formatSize = (size: SizeEnum) => {
  return size === 'medium' ? '' : size;
};

export const useFormSize = (
  fallback?: MaybeRef<SizeEnum | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem', boolean>> = {},
) => {
  const emptyRef = ref(undefined);
  const size = ignore.prop ? emptyRef : useProp<SizeEnum>('size');
  const form = ignore.form ? { size: '' } : inject(FormInjectionKey, undefined);
  const formItem = ignore.formItem ? { size: '' } : inject(FormItemInjectionKey, undefined);
  return computed(
    (): SizeEnum | string =>
      formatSize(size.value) ||
      formatSize(unref(fallback)) ||
      formatSize(unref(formItem?.size) as SizeEnum) ||
      formatSize(unref(form?.size) as SizeEnum) ||
      '',
  );
};
