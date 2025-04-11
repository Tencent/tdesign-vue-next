import { computed, defineComponent, h, toRefs } from 'vue';
import { isString } from 'lodash-es';
import { isPlainObject } from 'lodash-es';
import { useCommonClassName, useConfig, usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import props from './props';
import type { TdEmptyProps } from './type';
import Image from '../image';
import MaintenanceSvg from './components/MaintenanceSvg';
import NetworkErrorSvg from './components/NetworkErrorSvg';
import EmptySvg from './components/EmptySvg';
import FailSvg from './components/FailSvg';
import SuccessSvg from './components/SuccessSvg';

export default defineComponent({
  name: 'TEmpty',
  components: { TImage: Image },
  props,
  setup(props: TdEmptyProps, { slots }) {
    const { size, image: propsImage, description: propsDescription, title: propsTitle, type } = toRefs(props);
    const { globalConfig } = useConfig('empty');
    const classPrefix = usePrefixClass('empty');
    const showAction = computed(() => props.action || slots.action);
    const { SIZE } = useCommonClassName();
    const renderTNodeJSX = useTNodeJSX();

    const defaultMaps: {
      [key in TdEmptyProps['type']]?: Pick<TdEmptyProps, 'image' | 'title'>;
    } = {
      maintenance: {
        image: globalConfig.value.image.maintenance || MaintenanceSvg,
        title: globalConfig.value.titleText.maintenance,
      },
      success: {
        image: globalConfig.value.image.success || SuccessSvg,
        title: globalConfig.value.titleText.success,
      },
      fail: {
        image: globalConfig.value.image.fail || FailSvg,
        title: globalConfig.value.titleText.fail,
      },
      'network-error': {
        image: globalConfig.value.image.networkError || NetworkErrorSvg,
        title: globalConfig.value.titleText.networkError,
      },
      empty: {
        image: globalConfig.value.image.empty || EmptySvg,
        title: globalConfig.value.titleText.empty,
      },
    };

    const emptyClasses = computed(() => [classPrefix.value, SIZE.value[size.value]]);
    const titleClasses = [`${classPrefix.value}__title`];
    const imageClasses = [`${classPrefix.value}__image`];
    const descriptionClasses = [`${classPrefix.value}__description`];
    const actionClass = [`${classPrefix.value}__action`];

    const typeImageProps = computed(() => defaultMaps[type.value] ?? null);
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
      } else if (isPlainObject(data)) {
        result = <Image {...data} />;
      }

      return data ? result : null;
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
