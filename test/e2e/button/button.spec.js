describe('测试按钮组件', () => {
  beforeEach(() => {
    cy.visit('/#/components/button');
  });
  it('测试三种按钮类型，内容，渲染正确的类型跟内容', () => {
    cy.get('.tdesign-demo-item--button')
      .find('button')
      .first()
      .should(ele => {
        expect(ele).to.have.class('t-button--primary');
      })
  });
  it('测试按钮尺寸，渲染正确的大小', () => {
  });
  it('测试带图标按钮，按钮内容里的图标位置', () => {
  });
  it('测试loading状态的按钮', () => {
  });
});
