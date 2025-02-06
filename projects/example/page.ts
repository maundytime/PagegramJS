import type {Page} from 'types/page';
import {edge} from 'types/util';

export const PageTest: Page = {
  subviews: {
    type: 'label',
    text: {
      content: '你好',
    },
    dimension: edge,
    style: {
      background: 'f',
    },
    alignment: 'center',
  },
};
