import setStyle from '../utils/set-style';
import { getIEVersion } from '../utils/helper';

export default function circleAdapter(circleElem: HTMLElement) {
  let basicStyle = {};

  if (!circleElem || typeof window === 'undefined') {
    return;
  }

  const { color, fontSize } = window?.getComputedStyle?.(circleElem);

  // to fix the browser compat of foreignObject in Safari,
  // https://bugs.webkit.org/show_bug.cgi?id=23113
  const ua = window?.navigator?.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
  // 判断是否为 iOS 下的微信和企业微信
  const isIosWechat = /(?=.*iPhone)[?=.*MicroMessenger]/.test(ua) && !/Chrome/.test(ua);

  // 注意：chrome上调试mobile/ipad端时，loading出现异常，属于正常现象，不需要修改。
  if (isSafari || isIosWechat) {
    basicStyle = {
      transformOrigin: '0px 0px',
      transform: `scale(${parseInt(fontSize, 10) / 12})`,
    };
  }
  // 添加：判断是否为IE浏览器
  if (color && getIEVersion() > 11) {
    const matched = color.match(/[\d.]+/g);
    const endColor = matched ? `rgba(${matched[0]}, ${matched[1]}, ${matched[2]}, 0)` : '';
    setStyle(circleElem, {
      ...basicStyle,
      background: `conic-gradient(from 90deg at 50% 50%,${endColor} 0deg, ${color} 360deg)`,
    });
  } else {
    setStyle(circleElem, {
      ...basicStyle,
      background: '',
    });
  }
}
