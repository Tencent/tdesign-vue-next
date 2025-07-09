import { computed, defineComponent, toRefs } from 'vue';
import props from './props';
import { DEFAULT_FRONT_COLOR } from '@tdesign/common-js/qrcode/utils';
import { usePrefixClass, useConfig } from '@tdesign/shared-hooks';
import useThemeColor from './hooks/useThemeColor';

import QRCodeCanvas from './components/QRCodeCanvas';
import QRCodeSVG from './components/QRCodeSVG';
import QRcodeStatus from './components/QRCodeStatus';

import type { ImageSettings } from '@tdesign/common-js/qrcode/types';
import { isNumber } from 'lodash-es';

export default defineComponent({
  name: 'TQrcode',
  props,
  setup(props, { slots }) {
    const { value, borderless, iconSize, color, bgColor, icon, size, type, status, onRefresh, statusRender, level } =
      toRefs(props);
    const classPrefix = usePrefixClass();

    const { globalConfig } = useConfig('qrcode');

    const { color: themeFgColor, bgColor: themeBgColor } = useThemeColor();

    // bgColor：自定义颜色 > 主题色适配 > 透明[transparent]
    const finalBgColor = computed(() => bgColor.value || themeBgColor.value || 'transparent');
    // color[fgColor]：自定义颜色 > 主题色适配 > 默认颜色[#000000]
    const finalFgColor = computed(() => color.value || themeFgColor.value || DEFAULT_FRONT_COLOR);

    if (!value.value) {
      return null;
    }

    const imageSettings = computed<ImageSettings>(() => {
      return {
        src: icon.value,
        x: undefined,
        y: undefined,
        height: isNumber(iconSize.value) ? iconSize.value : iconSize.value?.height ?? 40,
        width: isNumber(iconSize.value) ? iconSize.value : iconSize.value?.width ?? 40,
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
      const QRCodeProps = {
        value: value.value,
        size: size.value,
        // 优先级：自定义颜色 > 根据主题色适配 > 默认颜色
        bgColor: finalBgColor.value,
        fgColor: finalFgColor.value,
        imageSettings: icon.value ? imageSettings.value : undefined,
        level: level.value,
      };

      return (
        <div class={classes.value} style={mergedStyle.value} {...{ level: level.value }}>
          {status.value !== 'active' && (
            <div
              class={[
                `${classPrefix.value}-mask`,
                { [`${classPrefix.value}-${status.value}`]: status.value !== 'loading' },
              ]}
            >
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
            <QRCodeCanvas {...QRCodeProps} size={size.value} />
          ) : (
            <QRCodeSVG {...QRCodeProps} size={size.value} />
          )}
        </div>
      );
    };
  },
});
