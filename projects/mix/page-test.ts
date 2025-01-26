import type {Page, NavPage} from 'types/page';
import {type View} from 'types/view';
import {edge} from 'types/util';
import {makePageNav} from './page-nav';

export const PageTestInNav: NavPage = (() => {
  const nav = makePageNav(['PageTest']);
  nav.eventMap = {
    ...nav.eventMap,
    push: {
      type: 'navigation',
      navigation: 'push',
      pageName: 'PageTest1',
    },
  };
  return nav;
})();

export const back: View = {
  style: {
    background: '#666',
  },
  dimension: edge,
};

export const back1: View = {
  style: {
    background: '#999',
  },
  dimension: edge,
};

export const PageTest: Page = {
  subviews: [
    back,
    {
      type: 'touchFade',
      dimension: {
        width: 200,
        height: 200,
      },
      style: {
        background: '#00f',
      },
      onTap: '@push',
    },
  ],
};

export const PageTest1: Page = {
  subviews: [
    back1,
    {
      dimension: {
        leftSafe: 0,
        rightSafe: 0,
        topSafe: 0,
        bottomSafe: 0,
      },
      subviews: [
        {
          type: 'text',
          text: {
            content: 'hello world',
          },
          dimension: {
            left: 0,
            right: 0,
            height: 100,
            width: 102,
          },
        },
      ],
    },
    {
      type: 'touchFade',
      dimension: {
        width: 200,
        height: 200,
      },
      // onTap: '@push',
    },
  ],
};

