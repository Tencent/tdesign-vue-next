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
      const QRCodeProps = {
        value: value.value,
        size: size.value,
        // 关于fgColor为什么要undefined兜底：
        // 如果当前环境（单测环境）获取不到当前主题色的情况，背景色有透明兜底，而前景色没有值。此处前景色设置undefined后，二维码颜色则由底层渲染组件的默认颜色决定。
        // 即：自定义颜色>主题颜色>默认颜色
        // TODO：其实这里直接可以用默认颜色兜底？
        bgColor: finalBgColor.value,
        fgColor: color.value || themeColor.value || undefined,
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
            <QRCodeCanvas {...QRCodeProps} size={size.value} />
          ) : (
            <QRCodeSVG {...QRCodeProps} size={size.value} />
          )}
        </div>
      );
    };
  },
});
