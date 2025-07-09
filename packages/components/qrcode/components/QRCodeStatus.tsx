import { computed, defineComponent, toRefs } from 'vue';
import { QRCodeStatusProps } from './props';
import { CheckCircleFilledIcon, RefreshIcon } from 'tdesign-icons-vue-next';
import { useTNodeJSX } from '@tdesign/shared-hooks';
import Loading from '@tdesign/components/loading';
import type { TdQRCodeProps } from '../type';

export default defineComponent({
  name: 'QRCodeStatus',
  props: QRCodeStatusProps,
  setup(props) {
    const { classPrefix, locale, status } = toRefs(props);

    const renderTNodeJSX = useTNodeJSX();

    const defaultSpin = <Loading size="32px" />;

    const defaultExpiredNode = computed(() => (
      <>
        <p class={`${classPrefix.value}-expired__text`}>{locale.value?.expiredText}</p>
        {props?.onRefresh && (
          <p class={`${classPrefix.value}-expired__button`} onClick={props?.onRefresh}>
            <RefreshIcon size="16" />
            {locale.value?.refreshText}
          </p>
        )}
      </>
    ));

    const defaultScannedNode = (
      <p class={`${classPrefix.value}-scanned`}>
        <CheckCircleFilledIcon size="16" class={`${classPrefix.value}-scanned__icon`} />
        {locale.value?.scannedText}
      </p>
    );

    const defaultNodes = computed(() => {
      return {
        expired: defaultExpiredNode.value,
        loading: defaultSpin,
        scanned: defaultScannedNode,
        active: null as any,
      };
    });

    const renderStatus: TdQRCodeProps['statusRender'] = (info) => {
      return defaultNodes.value[info.status];
    };

    return () => {
      return (
        <>
          {renderTNodeJSX('statusRender') ||
            renderStatus({
              status: status.value,
              onRefresh: props.onRefresh,
            })}
        </>
      );
    };
  },
});
