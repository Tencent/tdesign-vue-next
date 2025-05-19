import 'tdesign-web-components/filecard';
import 'tdesign-web-components/space';

import { Component } from 'omi';

export default class Button extends Component {
  render() {
    return (
      <>
        <t-space>
          <t-filecard
            onRemove={() => {
              console.log('remove');
            }}
            item={{
              uid: '1',
              name: 'excel-file.xlsx',
              size: 111111,
            }}
          ></t-filecard>
        </t-space>
      </>
    );
  }
}
