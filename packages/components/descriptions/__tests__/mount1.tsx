import { mount } from '@vue/test-utils';
import Descriptions, { DescriptionsItem } from '@tdesign/components/descriptions';

export function getDescriptionsMount({ props = {}, slots = {}, firstItemProps = {} }) {
  return mount({
    render() {
      return (
        <Descriptions title="Shipping address" {...props} v-slots={slots}>
          <DescriptionsItem label="Name" {...firstItemProps}>
            TDesign
          </DescriptionsItem>
          <DescriptionsItem label="Telephone Number">139****0609</DescriptionsItem>
          <DescriptionsItem label="Area">China Tencent Headquarters</DescriptionsItem>
          <DescriptionsItem label="Address">Shenzhen Penguin Island D1 4A Mail Center</DescriptionsItem>
        </Descriptions>
      );
    },
  });
}

export default {};
