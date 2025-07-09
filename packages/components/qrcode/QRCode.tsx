import { computed, defineComponent, toRefs } from 'vue';
import props from './props';
import { usePrefixClass, useConfig } from '@tdesign/shared-hooks';
import useThemeColor from './hooks/useThemeColor';

import QRCodeCanvas from './components/QRCodeCanvas';
import QRCodeSVG from './components/QRCodeSVG';
import QRcodeStatus from './components/QRCodeStatus';

import type { ImageSettings } from '@tdesign/common-js/qrcode/types';

export default defineComponent({
  name: 'TQrcode',
  props,
  setup(props, { slots }) {
    const { value, borderless, iconSize, color, bgColor, icon, size, type, status, onRefresh, statusRender, level } =
      toRefs(props);
    const classPrefix = usePrefixClass();

    const { globalConfig } = useConfig('qrcode');

    const { color: themeColor, bgColor: themeBgColor } = useThemeColor();

    const finalBgColor = computed(() => bgColor.value || themeBgColor.value || 'transparent');

    if (!value.value) {
      return null;
    }

    const imageSettings = computed<ImageSettings>(() => {
      return {
        src: icon.value,
        x: undefined,
        y: undefined,
        height: typeof iconSize.value === 'number' ? iconSize.value : iconSize.value?.height ?? 40,
        width: typeof iconSize.value === 'number' ? iconSize.value : iconSize.value?.width ?? 40,
        excavate: true,
        crossOrigin: 'anonymous',
      };
    });

    const classes = computed(() => {
      return [
        `${classPrefix.value}-qrcode`,
        {
          [`${classPrefix.value}-borderless`]: borderless.value,
          [`${classPrefix.value}-qrcode-svg`]: type.value === 'svg',
        },
      ];
    });

    const mergedStyle = computed(() => {
      return {
        backgroundColor: finalBgColor.value,
        width: `${size.value}px`,
        height: `${size.value}px`,
      };
    });

    return () => {
      const qrCodeProps = {
        value: value.value,
        size: size.value,
        bgColor: finalBgColor.value,
        fgColor: color.value || themeColor.value,
        imageSettings: icon.value ? imageSettings.value : undefined,
        level: level.value,
      };

      return (
        <div class={classes.value} style={mergedStyle.value}>
          {status.value !== 'active' && (
            <div class={`${classPrefix.value}-mask`}>
              <QRcodeStatus
                classPrefix={classPrefix.value}
                locale={globalConfig.value}
                status={status.value}
                onRefresh={onRefresh.value}
                statusRender={statusRender.value}
                v-slots={{ statusRender: slots?.['status-render'] }}
              />
            </div>
          )}
          {type.value === 'canvas' ? (
            <QRCodeCanvas {...qrCodeProps} size={size.value} />
          ) : (
            <QRCodeSVG {...qrCodeProps} size={size.value} />
          )}
        </div>
      );
    };
  },
});
