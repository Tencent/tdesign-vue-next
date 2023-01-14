export function simulateInputChange(dom, text) {
  dom.value = text;
  dom.dispatchEvent(new Event('input'));
}

export function mockDelay(timeout = 300) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout);
  });
}

export function simulateKeydownEvent(dom, type) {
  let event;
  switch (type) {
    case 'ArrowDown':
      event = new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 });
      break;
    case 'ArrowUp':
      event = new KeyboardEvent('keydown', { key: 'ArrowUp', code: 'ArrowUp', charCode: 38 });
      break;
    case 'ArrowLeft':
      event = new KeyboardEvent('keydown', { key: 'ArrowLeft', code: 'ArrowLeft', charCode: 37 });
      break;
    case 'ArrowRight':
      event = new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', charCode: 36 });
      break;
    case 'Escape':
      event = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', charCode: 27 });
      break;
    case 'Enter':
      event = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', charCode: 13 });
      break;
    default:
      console.warn('Event Type is Error');
      break;
  }
  dom.dispatchEvent(event);
}
