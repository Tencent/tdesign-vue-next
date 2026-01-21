export class MockSSEResponse {
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
          setTimeout(() => this.pushData(), this.delay); // 延迟开始推送数据
        }
      },
      cancel() {},
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
        setTimeout(() => this.pushData(), this.delay);
      } else {
        // 数据全部发送完毕后关闭流
        setTimeout(() => this.controller.close(), this.delay);
      }
    } catch {}
  }

  getResponse(): Promise<Response> {
    return new Promise((resolve) => {
      // 使用setTimeout来模拟网络延迟
      setTimeout(() => {
        if (this.error) {
          const errorResponseOptions = { status: 500, statusText: 'Internal Server Error' };

          // 返回模拟的网络错误响应，这里我们使用500状态码作为示例
          resolve(new Response(null, errorResponseOptions));
        } else {
          resolve(new Response(this.stream));
        }
      }, this.delay); // 使用构造函数中设置的delay值作为延迟时间
    });
  }
}
