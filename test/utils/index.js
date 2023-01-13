export function simulateInputChange(dom, text) {
  dom.value = text;
  dom.dispatchEvent(new Event('input'));
}

export function mockDelay(timeout = 300) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout);
  });
}
