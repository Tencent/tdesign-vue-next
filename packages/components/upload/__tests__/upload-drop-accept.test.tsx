import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Upload from '../upload';
import type { UploadFile } from '../type';

function dropFiles(zone: Element, files: File[]) {
  const event = new Event('drop', { bubbles: true, cancelable: true }) as DragEvent;
  Object.defineProperty(event, 'dataTransfer', { value: { files, items: [], types: ['Files'] } });
  zone.dispatchEvent(event);
  return event;
}

describe('Upload drop with rejected file types', () => {
  it('still fires onDrop when every dropped file is filtered out by accept', async () => {
    const onDrop = vi.fn();
    const wrapper = mount(
      <Upload theme="file" draggable accept="image/png" action="https://tdesign.test.com/upload" onDrop={onDrop} />,
    );

    const zone = wrapper.find('.t-upload__dragger');
    expect(zone.exists()).toBe(true);

    const rejected = new File(['x'], 'note.txt', { type: 'text/plain' });
    dropFiles(zone.element, [rejected]);
    await wrapper.vm.$nextTick();

    // 文件全被 accept 过滤，onDrop 仍需派发，调用方才能给出「格式不支持」提示
    expect(onDrop).toHaveBeenCalledTimes(1);
  });

  it('reports an empty selection so the caller can tell nothing was accepted', async () => {
    const onSelectChange = vi.fn();
    const wrapper = mount(
      <Upload
        theme="file"
        draggable
        accept="image/png"
        action="https://tdesign.test.com/upload"
        onSelectChange={onSelectChange}
      />,
    );

    const zone = wrapper.find('.t-upload__dragger');
    const rejected = new File(['x'], 'note.txt', { type: 'text/plain' });
    dropFiles(zone.element, [rejected]);
    await wrapper.vm.$nextTick();

    expect(onSelectChange).toHaveBeenCalledTimes(1);
    const [files, context] = onSelectChange.mock.calls[0] as [UploadFile[], { currentSelectedFiles: File[] }];
    expect(files).toEqual([]);
    expect(context.currentSelectedFiles).toEqual([]);
  });

  it('keeps accepting files that match accept', async () => {
    const onSelectChange = vi.fn();
    const wrapper = mount(
      <Upload
        theme="file"
        draggable
        accept="image/png"
        action="https://tdesign.test.com/upload"
        onSelectChange={onSelectChange}
      />,
    );

    const zone = wrapper.find('.t-upload__dragger');
    const ok = new File(['x'], 'pic.png', { type: 'image/png' });
    dropFiles(zone.element, [ok]);
    await wrapper.vm.$nextTick();

    expect(onSelectChange).toHaveBeenCalledTimes(1);
    const [, context] = onSelectChange.mock.calls[0] as [UploadFile[], { currentSelectedFiles: File[] }];
    expect(context.currentSelectedFiles).toHaveLength(1);
    expect(context.currentSelectedFiles[0].name).toBe('pic.png');
  });
});

describe('Upload drop while disabled', () => {
  it('does not report a selection when the upload is disabled', async () => {
    const onSelectChange = vi.fn();
    const wrapper = mount(
      <Upload
        theme="file"
        draggable
        disabled
        accept="image/png"
        action="https://tdesign.test.com/upload"
        onSelectChange={onSelectChange}
      />,
    );

    const zone = wrapper.find('.t-upload__dragger');
    const rejected = new File(['x'], 'note.txt', { type: 'text/plain' });
    dropFiles(zone.element, [rejected]);
    await wrapper.vm.$nextTick();

    expect(onSelectChange).not.toHaveBeenCalled();
  });
});
