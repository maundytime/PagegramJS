import {Pagegram} from 'types/pagegram';
import type {Page} from 'types/page';
import {edge} from 'types/util';

export function PageTest(): Page {
  return {
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
}

Pagegram.present(PageTest);
