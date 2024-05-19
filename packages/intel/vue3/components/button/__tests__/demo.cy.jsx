import base from '../_example/base.vue';
import block from '../_example/block.vue';

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
