import { MessagePlugin } from 'tdesign-vue-next';

// 根据model获取url
export function getUrl(model: string) {
  let url;
  switch (model) {
    case 'hunyuan':
    case 'hunyuan-13B':
    case 'hunyuan-lite':
    case 'hunyuan-vision':
      url = 'http://hunyuanapi.woa.com/openapi/v1/chat/completions';
      break;
    case 'chatgpt':
      url = 'url2';
      break;
    default:
      url = '';
  }
  return url;
}
export function getMofaUrl() {
  let url = '';
  // 本地调试走代理
  if (process.env.NODE_ENV === 'development') {
    url = `/completions`;
  } else {
    // 提供线上环境需宿主业务支持跨域
    url = `https://mofa.woa.com/api/v1/chat/completions`;
  }
  return url;
}

/**
 * 根据指定规则格式化日期
 * @param {*} date 日期
 * @param {*} rule yyyy-MM-dd hh:mm:ss
 * @returns
 */

export const formatDateByRule = function (date: Date, ruleStr: string) {
  const o = {
    'y+': date.getFullYear(), // 年
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
  };
  let rule = ruleStr;
  if (/(y+)/.test(rule)) {
    rule = rule.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    if (new RegExp(`(${k})`).test(rule)) {
      // eslint-disable-next-line no-param-reassign
      rule = rule.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  }
  return rule;
};
// 单例模式解决复制成功提示只显示一次
export class MessagePluginSingleton {
  private static instance: MessagePluginSingleton;
  private messagePlugin: any;

  private constructor() {
    this.messagePlugin = null;
  }

  public static getInstance(): MessagePluginSingleton {
    if (!MessagePluginSingleton.instance) {
      MessagePluginSingleton.instance = new MessagePluginSingleton();
    }
    return MessagePluginSingleton.instance;
  }

  public showSuccess(copyTextSuccess: string): void {
    if (this.messagePlugin) {
      MessagePlugin.closeAll();
    }
    this.messagePlugin = MessagePlugin.success(copyTextSuccess, 1000);
  }
  public showError(copyTextFail: string): void {
    if (this.messagePlugin) {
      MessagePlugin.closeAll();
    }
    this.messagePlugin = MessagePlugin.error(copyTextFail, 1000);
  }
}
// abort无法被catch捕获 todo
export class SSEResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();
  private stream: ReadableStream<Uint8Array>;
  private error: boolean;

  constructor(
    private data: string,
    private delay: number = 300,
    error = false, // 新增参数，默认为false
  ) {
    this.error = error;

    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        if (!this.error) {
          // 如果不是错误情况，则开始推送数据
          this.pushData();
        }
      },
      cancel(reason) {
        // console.log('Stream canceled', reason);
      },
    });
  }

  private pushData() {
    if (this.data.length === 0) {
      this.controller.close();
      return;
    }
    try {
      const chunk = this.data.slice(0, 1);
      this.data = this.data.slice(1);

      this.controller.enqueue(this.encoder.encode(chunk));

      if (this.data.length > 0) {
        this.pushData();
      } else {
        // 数据全部发送完毕后关闭流
        this.controller.close();
      }
    } catch {}
  }

  getResponse(): Promise<Response> {
    return new Promise((resolve) => {
      resolve(new Response(this.stream));
    });
  }
}
