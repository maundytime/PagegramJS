import type {Page} from 'types/page';
import {edge} from 'types/util';

export const PageTest: Page = {
  subviews: {
    type: 'touch',
    dimension: edge,
    style: {
      background: 'fff',
    },
    onTap: {
      type: 'view',
      view: {
        label: {
          text: {
            content: '你好',
          },
        },
      },
    },
    subviews: {
      id: 'label',
      type: 'label',
      text: {
        content: '点击我',
        alignment: 'center',
      },
      dimension: edge,
    },
  },
};
