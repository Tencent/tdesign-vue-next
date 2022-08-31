import base from '@/example/button/base.vue';
import block from '@/example/button/block.vue';

describe('<button />', () => {
  it('renders base', () => {
    cy.mount(base);
    cy.screenshot({
      overwrite: true,
    });
  });

  it('renders block', () => {
    cy.mount(block);
    cy.screenshot({
      overwrite: true,
    });
  });
});
