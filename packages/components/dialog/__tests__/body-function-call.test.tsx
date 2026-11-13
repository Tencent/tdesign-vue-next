import { nextTick } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { DialogPlugin } from '../plugin';

const flush = async () => {
  await nextTick();
  await new Promise((r) => setTimeout(r, 20));
  await nextTick();
};

describe('DialogPlugin body as function (issue #6797)', () => {
  it('does not re-invoke the body function on update / setConfirmLoading / hide', async () => {
    const bodyFn = vi.fn(() => 'content');
    const dialog = DialogPlugin({
      body: bodyFn,
      header: 'title',
    });
    dialog.show();
    await flush();

    // 首次渲染必须调用一次 body
    const afterMount = bodyFn.mock.calls.length;
    expect(afterMount).toBeGreaterThan(0);

    dialog.update({ header: 'new title' });
    await flush();
    const afterUpdate = bodyFn.mock.calls.length;

    dialog.setConfirmLoading(true);
    await flush();
    const afterLoading = bodyFn.mock.calls.length;

    dialog.hide();
    await flush();
    const afterHide = bodyFn.mock.calls.length;

    // eslint-disable-next-line no-console
    console.log('BODY-CALLS mount/update/loading/hide:', afterMount, afterUpdate, afterLoading, afterHide);

    // update / setConfirmLoading / hide 都不应该重新执行 body
    expect(afterUpdate).toBe(afterMount);
    expect(afterLoading).toBe(afterMount);
    expect(afterHide).toBe(afterMount);

    dialog.destroy();
  });
});
