import {type Argument, type Tasks} from 'types/event';
import type {NavPage, Page} from 'types/page';
import {edge} from 'types/util';
import {makePageNav} from './page-nav';

function makePage(flag: boolean): Page {
  return {
    stateMap: {
      info: {
        type: 'state',
        value: flag ? 'yellow' : 'purple',
        onChange: 'infoDidChange',
      },
      infoFromParent: {
        type: 'bind',
        onChange: 'infoFromParentDidChange',
      },
    },
    eventMap: {
      infoDidChange: 'infoDidChange',
      infoFromParentDidChange: 'infoFromParentDidChange',
      worldTimeTest: 'worldTimeTest',
      changeNavInfo: 'changeNavInfo',
    },
    subviews: {
      dimension: edge,
      style: {
        background: flag ? '#ffc' : '#ccf',
      },
      subviews: [
        {
          id: 'infoLabel',
          type: 'label',
          text: {
            content: 'infoLabel',
          },
          dimension: {
            height: 20,
            centerX: 0,
            topSafe: 0,
          },
        },
        {
          id: 'infoFromParentLabel',
          type: 'label',
          text: {
            content: 'infoFromParentLabel',
          },
          dimension: {
            height: 20,
            centerX: 0,
            topSafe: 20,
          },
        },
        {
          type: 'touchFade',
          onTap: flag ? 'pushPage2' : 'pushPage1',
          dimension: {
            height: 200,
            width: 100,
            centerX: 0,
            centerYSafe: 0,
          },
          style: {
            background: flag ? '#fff' : '#000',
          },
        },
        {
          type: 'touchFade',
          onTap: ['worldTimeTest', 'changeNavInfo'],
          dimension: {
            height: 100,
            width: 100,
            centerX: 0,
            bottomSafe: 0,
          },
          style: {
            background: '#f55',
          },
        },
      ],
    },
  };
}

export const PagePushPop1: Page = makePage(true);

export const PagePushPop2: Page = makePage(false);

export const PagePushPopInNav: NavPage = (() => {
  const nav = makePageNav(['PagePushPop1']);
  nav.eventMap = {
    ...nav.eventMap,
    pushPage2: {
      type: 'navigation',
      navigation: 'push',
      pageName: 'PagePushPop2',
    },
    pushPage1: {
      type: 'navigation',
      navigation: 'push',
      pageName: 'PagePushPop1',
    },
  };
  nav.stateMap = {
    ...nav.stateMap,
    infoFromParent: {
      type: 'state',
      value: 'PagePushPop1',
    },
  };
  return nav;
})();

export function changeNavInfo(_: Argument): Tasks {
  return {
    type: 'state',
    state: {
      infoFromParent: 'PagePushPop1' + Math.random(),
    },
  };
}

export function infoDidChange(argument: Argument): Tasks {
  const info = argument.stateInfo['info'] as string;
  return {
    type: 'view',
    view: {
      infoLabel: {
        text: {
          content: `page is ${info}`,
        },
      },
    },
  };
}

export function infoFromParentDidChange(argument: Argument): Tasks {
  const infoFromParent = argument.stateInfo['infoFromParent'] as string;
  return {
    type: 'view',
    view: {
      infoFromParentLabel: {
        text: {
          content: `parent is ${infoFromParent}`,
        },
      },
    },
  };
}
