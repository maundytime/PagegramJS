import type {Page} from 'types/page';

export const PageTest: Page = {
  subviews: {
    type: 'touchFade',
    dimension: {
      width: 200,
      height: 60,
      centerX: 0,
      centerY: 0,
    },
    onTap: 'changeLabel',
    subviews: {
      id: 'label',
      type: 'label',
      text: {
        content: '点击我',
      },
      dimension: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  },
  eventMap: {
    changeLabel: {
      type: 'view',
      view: {
        label: {
          text: {
            content: '你好',
          },
        },
      },
    },
  },
};
