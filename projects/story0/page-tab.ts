import {type EventMap} from 'types/event';
import type {Page} from 'types/page';
import {type StackView} from 'types/view';
import {edge} from 'types/util';

const subpages = [
  // 'PageRssBarInNav',
  // 'PageRssInNav',
  'PagePushPopInNav',
  'PagePresentInNav',
  'PageMatrixHInNav',
  'PageMatrixInNav',
  'PageStackInNav',
  'PageStack1InNav',
];

export const Tab: Page = {
  type: 'tab',
  subpages,
  subviews: [
    {
      style: {
        background: '#fff',
        zPosition: -1000,
        interactive: false,
      },
      dimension: edge,
    },
    {
      type: 'blur',
      dimension: {
        bottom: 0,
        left: 0,
        right: 0,
        unsafeAt: 'bottom',
      },
      style: {
        background: '#00f3',
      },
      subviews: makeTabs(),
    },
  ],
  eventMap: makeEventsMap(),
};

function makeEventsMap() {
  const eventMap: EventMap = {};
  for (const key of subpages) {
    eventMap[key] = {
      type: 'navigation',
      pageName: key,
      navigation: 'select',
    };
  }
  return eventMap;
}

function makeTabs(): StackView {
  return {
    type: 'stack',
    stack: {
      direction: 'horizontal',
      distribution: 'fillProportionally',
    },
    dimension: {
      left: 0,
      right: 0,
      top: 0,
      bottomSafe: 0,
    },
    style: {
      background: '#00f3',
    },
    subviews: Array.from(subpages, (v, i) => (
      {
        type: 'touchFade',
        onTap: v,
        style: {
          background: '#0003',
        },
        dimension: {
          horizontal: 1,
          height: i === 2 ? 60 : 60,
        },
        subviews: {
          type: 'symbol',
          symbol: {
            name: 'moon',
            size: 20,
            color: '#000',
          },
          dimension: edge,
        },
      }
    )),
  };
}
