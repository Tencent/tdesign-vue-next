import { h, SetupContext } from 'vue';

const RenderComponent = (props: { render: Function }, context: SetupContext) => props.render(h, context.attrs);

RenderComponent.props = ['render'];

export default RenderComponent;
