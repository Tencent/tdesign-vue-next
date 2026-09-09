import { mount } from '@vue/test-utils';
import { surfaceStateManager, type A2UIMessage } from '@tdesign/web-components-chat/chat-engine';
import { defineComponent, watch } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useA2UISurface, type A2UISurfaceController } from '../a2ui';

const createSurface = (surfaceId: string): A2UIMessage => ({
  createSurface: { surfaceId, catalogId: 'test-catalog' },
});

const updateComponents = (surfaceId: string, ids: string[]): A2UIMessage => ({
  updateComponents: {
    surfaceId,
    components: ids.map((id) => ({ id, component: 'Text', text: id })),
  },
});

const deleteSurface = (surfaceId: string): A2UIMessage => ({ deleteSurface: { surfaceId } });

const mountController = () => {
  let controller: A2UISurfaceController | undefined;
  const wrapper = mount(
    defineComponent({
      setup() {
        controller = useA2UISurface();
        return () => null;
      },
    }),
  );
  if (!controller) throw new Error('useA2UISurface controller was not initialized');
  return { controller, wrapper };
};

describe('useA2UISurface incremental lifecycle', () => {
  beforeEach(() => surfaceStateManager.clearAll());
  afterEach(() => surfaceStateManager.clearAll());

  it('keeps a pending createSurface until root arrives in a later call', () => {
    const { controller, wrapper } = mountController();

    controller.processMessages([createSurface('split')]);
    expect(controller.hasSurface('split')).toBe(false);

    controller.processMessages([updateComponents('split', ['root'])]);

    expect(controller.hasSurface('split')).toBe(true);
    expect(controller.surfaceIds.value).toEqual(['split']);
    wrapper.unmount();
  });

  it('accumulates components and data across multiple calls before root', () => {
    const { controller, wrapper } = mountController();

    controller.processMessages([createSurface('stream')]);
    controller.processMessages([updateComponents('stream', ['child'])]);
    controller.processMessages([
      { updateDataModel: { surfaceId: 'stream', path: '/', op: 'replace', value: { title: 'ready' } } },
    ]);
    controller.processMessages([updateComponents('stream', ['root'])]);

    const schema = surfaceStateManager.getSchema('stream');
    expect(Object.keys(schema?.elements || {})).toEqual(expect.arrayContaining(['child', 'root']));
    expect(schema?.data).toEqual({ title: 'ready' });
    wrapper.unmount();
  });

  it('does not revive a deleted surface from a late update', () => {
    const { controller, wrapper } = mountController();

    controller.processMessages([createSurface('deleted'), updateComponents('deleted', ['root'])]);
    controller.processMessages([deleteSurface('deleted')]);
    controller.processMessages([updateComponents('deleted', ['root'])]);

    expect(controller.hasSurface('deleted')).toBe(false);
    expect(controller.surfaceIds.value).toEqual([]);
    wrapper.unmount();
  });

  it('recreates a deleted surface only after a new createSurface', () => {
    const { controller, wrapper } = mountController();

    controller.processMessages([createSurface('recreate'), updateComponents('recreate', ['root'])]);
    controller.processMessages([deleteSurface('recreate')]);
    controller.processMessages([createSurface('recreate')]);
    controller.processMessages([updateComponents('recreate', ['root'])]);

    expect(controller.hasSurface('recreate')).toBe(true);
    expect(controller.surfaceIds.value).toEqual(['recreate']);
    wrapper.unmount();
  });

  it('preserves delete-create-update ordering within one call', () => {
    const { controller, wrapper } = mountController();

    controller.processMessages([createSurface('same-batch'), updateComponents('same-batch', ['root'])]);
    controller.processMessages([
      deleteSurface('same-batch'),
      createSurface('same-batch'),
      updateComponents('same-batch', ['root']),
    ]);

    expect(controller.hasSurface('same-batch')).toBe(true);
    expect(controller.surfaceIds.value).toEqual(['same-batch']);
    wrapper.unmount();
  });

  it('does not expose a transient removal for delete-create-update in one call', () => {
    const { controller, wrapper } = mountController();
    controller.processMessages([createSurface('stable'), updateComponents('stable', ['root'])]);
    const onSurfaceIdsChange = vi.fn();
    const stop = watch(controller.surfaceIds, onSurfaceIdsChange, { flush: 'sync' });

    controller.processMessages([
      deleteSurface('stable'),
      createSurface('stable'),
      updateComponents('stable', ['root']),
    ]);

    expect(controller.surfaceIds.value).toEqual(['stable']);
    expect(onSurfaceIdsChange).not.toHaveBeenCalled();
    stop();
    wrapper.unmount();
  });

  it('keeps interleaved surfaces independent', () => {
    const { controller, wrapper } = mountController();

    controller.processMessages([
      createSurface('first'),
      createSurface('second'),
      updateComponents('first', ['root']),
      updateComponents('second', ['root']),
    ]);

    expect(controller.hasSurface('first')).toBe(true);
    expect(controller.hasSurface('second')).toBe(true);
    expect(controller.surfaceIds.value).toEqual(['first', 'second']);
    wrapper.unmount();
  });
});
