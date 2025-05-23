export class MockSSEResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();
  private stream: ReadableStream<Uint8Array>;
  private error: boolean;
  private currentPhase: 'reasoning' | 'content' = 'reasoning';

  constructor(
    private data: {
      reasoning: string; // 推理内容
      content: string; // 正式内容
    },
    private delay: number = 100,
    error = false,
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
    try {
      if (this.currentPhase === 'reasoning') {
        // 推送推理内容
        if (this.data.reasoning.length > 0) {
          const chunk = JSON.stringify({
            delta: {
              reasoning_content: this.data.reasoning.slice(0, 1),
              content: '',
            },
            finished: false,
          });
          this.controller.enqueue(this.encoder.encode(chunk));
          this.data.reasoning = this.data.reasoning.slice(1);
          // 设置下次推送
          setTimeout(() => this.pushData(), this.delay);
        } else {
          // 推理内容推送完成，切换到正式内容
          this.currentPhase = 'content';
          setTimeout(() => this.pushData(), this.delay); // 立即开始推送正式内容
          return;
        }
      }

      if (this.currentPhase === 'content') {
        // 推送正式内容
        if (this.data.content.length > 0) {
          const chunk = JSON.stringify({
            delta: {
              reasoning_content: '',
              content: this.data.content.slice(0, 1),
            },
            finished: this.data.content.length === 1, // 最后一个字符时标记完成
          });
          this.controller.enqueue(this.encoder.encode(chunk));
          this.data.content = this.data.content.slice(1);

          // 设置下次推送
          setTimeout(() => this.pushData(), this.delay);
        } else {
          // const finalPayload = JSON.stringify({
          //   delta: {
          //     reasoning_content: '',
          //     content: '',
          //   },
          //   finished: true,
          // });
          // this.controller.enqueue(this.encoder.encode(`${finalPayload}`));
          // 全部内容推送完成
          setTimeout(() => this.controller.close(), this.delay);
          return;
        }
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
