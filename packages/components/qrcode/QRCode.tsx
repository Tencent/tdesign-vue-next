import { computed, defineComponent } from 'vue';
import props from './props';
import { DEFAULT_FRONT_COLOR } from '@tdesign/common-js/qrcode/utils';
import { usePrefixClass, useConfig, useTNodeJSX, useVariables } from '@tdesign/shared-hooks';

import QRCodeCanvas from './components/QRCodeCanvas';
import QRCodeSVG from './components/QRCodeSVG';
import QRcodeStatus from './components/QRCodeStatus';

import type { ImageSettings } from '@tdesign/common-js/qrcode/types';
import { isNumber } from 'lodash-es';

export default defineComponent({
  name: 'TQrcode',
  props,
  setup(props) {
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const { globalConfig } = useConfig('qrcode');

    const { themeFgColor, themeBgColor } = useVariables({
      themeFgColor: '--td-text-color-primary',
      themeBgColor: '--td-bg-color-specialcomponent',
    });

    // bgColor：自定义颜色 > 主题色适配 > 透明[transparent]
    const finalBgColor = computed(() => props.bgColor || themeBgColor.value || 'transparent');
    // color[fgColor]：自定义颜色 > 主题色适配 > 默认颜色[#000000]
    const finalFgColor = computed(() => props.color || themeFgColor.value || DEFAULT_FRONT_COLOR);

    if (!props.value) {
      return null;
    }

    const imageSettings = computed<ImageSettings>(() => {
      return {
        src: props.icon,
        x: undefined,
        y: undefined,
        height: isNumber(props.iconSize) ? props.iconSize : props.iconSize?.height ?? 40,
        width: isNumber(props.iconSize) ? props.iconSize : props.iconSize?.width ?? 40,
        excavate: true,
        crossOrigin: 'anonymous',
      };
    });

    const classes = computed(() => {
      return [
        `${classPrefix.value}-qrcode`,
        {
          [`${classPrefix.value}-borderless`]: props.borderless,
          [`${classPrefix.value}-qrcode-svg`]: props.type === 'svg',
        },
      ];
    });

    const mergedStyle = computed(() => {
      return {
        backgroundColor: finalBgColor.value,
        width: `${props.size}px`,
        height: `${props.size}px`,
      };
    });

    return () => {
      const QRCodeProps = {
        value: props.value,
        size: props.size,
        bgColor: finalBgColor.value,
        fgColor: finalFgColor.value,
        imageSettings: props.icon ? imageSettings.value : undefined,
        level: props.level,
      };

      return (
        <div class={classes.value} style={mergedStyle.value} {...{ level: props.level }}>
          {props.status !== 'active' && (
            <div
              class={[
                `${classPrefix.value}-mask`,
                { [`${classPrefix.value}-${props.status}`]: props.status !== 'loading' },
              ]}
            >
              <QRcodeStatus
                locale={globalConfig.value}
                status={props.status}
                onRefresh={props.onRefresh}
                statusRender={renderTNodeJSX('statusRender', {
                  params: { status: props.status, onRefresh: props.onRefresh },
                })}
              />
            </div>
          )}
          {props.type === 'canvas' ? (
            <QRCodeCanvas {...QRCodeProps} size={props.size} />
          ) : (
            <QRCodeSVG {...QRCodeProps} size={props.size} />
          )}
        </div>
      );
    };
  },
});
