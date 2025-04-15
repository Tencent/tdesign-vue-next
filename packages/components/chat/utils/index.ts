import { MessagePlugin } from '../../plugins';

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
