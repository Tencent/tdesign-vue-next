import { computed, defineComponent } from 'vue';
import { QRCodeStatusProps } from './props';
import { CheckCircleFilledIcon, RefreshIcon } from 'tdesign-icons-vue-next';
import Loading from '@tdesign/components/loading';
import type { TdQRCodeProps } from '../type';
import { usePrefixClass } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'QRCodeStatus',
  props: QRCodeStatusProps,
  setup(props) {
    const classPrefix = usePrefixClass();

    const defaultSpin = <Loading size="32px" />;

    const defaultExpiredNode = computed(() => (
      <>
        <p class={`${classPrefix.value}-expired__text`}>{props.locale?.expiredText}</p>
        {props?.onRefresh && (
          <p class={`${classPrefix.value}-expired__button`} onClick={props?.onRefresh}>
            <RefreshIcon size="16" />
            {props.locale?.refreshText}
          </p>
        )}
      </>
    ));

    const defaultScannedNode = (
      <p class={`${classPrefix.value}-scanned`}>
        <CheckCircleFilledIcon size="16" class={`${classPrefix.value}-scanned__icon`} />
        {props.locale?.scannedText}
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
          {props.statusRender ||
            renderStatus({
              status: props.status,
              onRefresh: props.onRefresh,
            })}
        </>
      );
    };
  },
});
