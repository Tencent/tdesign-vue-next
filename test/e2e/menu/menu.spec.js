describe('测试Menu组件', () => {
  beforeEach(() => {
    cy.visit('/#/components/menu');
  });
  it('测试head-menu', () => {
    cy.get('.tdesign-menu-head-menu')
      .find('div')
      .first()
      .should((ele) => {
        expect(ele).to.have.class('t-head-menu');
      });
  });
});
