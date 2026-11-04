import type { VNode } from 'vue';
import { computed, ComputedRef, defineComponent, h, isVNode, toRefs } from 'vue';
import { isString, isPlainObject } from 'lodash-es';
import {
  TrafficEventsFilledIcon as TdTrafficEventsFilledIcon,
  CheckCircleIcon as TdCheckCircleIcon,
  ErrorCircleIcon as TdErrorCircleIcon,
  WifiNoFilledIcon as TdWifiNoFilledIcon,
  NoResultFilledIcon as TdNoResultFilledIcon,
} from 'tdesign-icons-vue-next';

import { useConfig, useGlobalIcon, useTNodeJSX, usePrefixClass, useCommonClassName } from '@tdesign/shared-hooks';

import props from './props';
import type { TdEmptyProps } from './type';
import Image, { ImageProps } from '../image';

export default defineComponent({
  name: 'TEmpty',
  components: { TImage: Image },
  props,
  setup(props: TdEmptyProps, { slots }) {
    const { size, image: propsImage, description: propsDescription, title: propsTitle, type } = toRefs(props);
    const { globalConfig } = useConfig('empty');
    const classPrefix = usePrefixClass('empty');
    const { TrafficEventsFilledIcon, CheckCircleIcon, ErrorCircleIcon, WifiNoFilledIcon, NoResultFilledIcon } =
      useGlobalIcon({
        TrafficEventsFilledIcon: TdTrafficEventsFilledIcon,
        CheckCircleIcon: TdCheckCircleIcon,
        ErrorCircleIcon: TdErrorCircleIcon,
        WifiNoFilledIcon: TdWifiNoFilledIcon,
        NoResultFilledIcon: TdNoResultFilledIcon,
      });

    const showAction = computed(() => props.action || slots.action);
    const { SIZE } = useCommonClassName();
    const renderTNodeJSX = useTNodeJSX();

    const defaultMaps: ComputedRef<{
      [key in TdEmptyProps['type']]?: { image: TdEmptyProps['image'] | VNode; title: TdEmptyProps['title'] };
    }> = computed(() => {
      return {
        maintenance: {
          image: globalConfig.value.image.maintenance || (
            <TrafficEventsFilledIcon fillColor="var(--td-text-color-placeholder)" />
          ),
          title: globalConfig.value.titleText.maintenance,
        },
        success: {
          image: globalConfig.value.image.success || <CheckCircleIcon strokeColor="var(--td-success-color)" />,
          title: globalConfig.value.titleText.success,
        },
        fail: {
          image: globalConfig.value.image.fail || <ErrorCircleIcon strokeColor="var(--td-error-color)" />,
          title: globalConfig.value.titleText.fail,
        },
        'network-error': {
          image: globalConfig.value.image.networkError || (
            <WifiNoFilledIcon fillColor="var(--td-text-color-placeholder)" />
          ),
          title: globalConfig.value.titleText.networkError,
        },
        empty: {
          image: globalConfig.value.image.empty || <NoResultFilledIcon fillColor="var(--td-text-color-placeholder)" />,
          title: globalConfig.value.titleText.empty,
        },
      };
    });

    const emptyClasses = computed(() => [classPrefix.value, SIZE.value[size.value]]);
    const titleClasses = [`${classPrefix.value}__title`];
    const imageClasses = [`${classPrefix.value}__image`];
    const descriptionClasses = [`${classPrefix.value}__description`];
    const actionClass = [`${classPrefix.value}__action`];

    const typeImageProps = computed(() => defaultMaps.value[type.value] ?? null);
    const showImage = computed(() => propsImage.value || slots?.image?.() || typeImageProps.value?.image);
    const showTitle = computed(() => propsTitle.value || slots?.title?.() || typeImageProps.value?.title);
    const showDescription = computed(() => propsDescription.value || slots?.description?.());

    const renderTitle = () => {
      if (!showTitle.value) {
        return null;
      }
      return <div class={titleClasses}>{showTitle.value}</div>;
    };
    const renderDescription = () => {
      if (!showDescription.value) {
        return null;
      }
      return <div class={descriptionClasses}>{showDescription.value}</div>;
    };
    const getImageIns = () => {
      const data = showImage.value;
      let result = null;
      if (isString(data)) {
        result = <Image src={data} />;
      } else if (data && Reflect.has(data, 'setup')) {
        result = h(data as unknown);
      } else if (isVNode(data)) {
        result = data;
      } else if (isPlainObject(data)) {
        result = <Image {...(data as ImageProps)} />;
      }

      return result;
    };

    return () => {
      return (
        <div class={emptyClasses.value}>
          {showImage.value ? (
            <div class={imageClasses} style={props.imageStyle}>
              {slots?.image ? renderTNodeJSX('image') : getImageIns()}
            </div>
          ) : null}
          {renderTitle()}
          {renderDescription()}
          {showAction.value ? <div class={actionClass}>{renderTNodeJSX('action')}</div> : null}
        </div>
      );
    };
  },
});
