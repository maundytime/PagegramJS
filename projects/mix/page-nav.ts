import {type Tasks, type Argument} from 'types/event';
import type {NavPage} from 'types/page';
import {type TextView} from 'types/view';

export function makePageNav(subpages: string[]): NavPage {
  const title1: TextView = {
    text: [
      {
        content: '123',
        color: 'f00',
        size: 12,
      },
      {
        content: '456',
        color: 'f00',
        size: 20,
      },
      {
        content: '\n789',
        size: 12,
        color: 'f00',
      },
    ],
    lineHeightMultiple: 1.5,
    lines: 0,
    dimension: {
      centerX: 0,
      centerY: 0,
    },
    style: {
      background: '0003',
    },
  };
  const title2: TextView = {
    text: [
      {
        content: '123',
        color: '0f0',
        size: 12,
      },
      {
        content: '456',
        color: '0f0',
        size: 20,
      },
      {
        content: '\n789',
        size: 12,
        color: '0f0',
      },
    ],
    lineHeightMultiple: 1.5,
    lines: 0,
    dimension: {
      centerX: 0,
      centerY: 0,
    },
    style: {
      background: '0003',
    },
  };
  const dismissButton = {
    type: 'touchFade',
    onTap: {
      type: 'navigation',
      navigation: 'dismiss',
    },
    dimension: {
      height: 60,
      width: 60,
      top: 0,
      right: 0,
    },
    style: {
      background: '0003',
    },
  };
  const popButton = {
    type: 'touchFade',
    id: 'popButton',
    onTap: {
      type: 'navigation',
      navigation: 'pop',
    },
    dimension: {
      height: 60,
      width: 60,
      top: 0,
      left: 0,
    },
    style: {
      opacity: 0,
      background: '0003',
    },
  };
  const nav: NavPage = {
    type: 'nav',
    subpages,
    subviews: {
      type: 'blur',
      dimension: {
        top: 0,
        left: 0,
        right: 0,
        unsafeAt: 'top',
      },
      style: {
        background: '0003',
      },
      subviews: {
        dimension: {
          left: 0,
          right: 0,
          height: 60,
          bottom: 0,
          topSafe: 0,
        },
        subviews: [
          popButton,
          {...title1, type: 'label'},
          {...title2, type: 'text'},
          dismissButton,
        ],
      },
    },
    stateMap: {
      stackCount: {
        type: 'state',
        value: 0,
        onChange: '#stackCountDidChange',
      },
    },
    onPush: '#increaseStackCountFunction',
    onPop: '#decreaseStackCountFunction',
  };
  return nav;
}

export function increaseStackCountFunction(argument: Argument): Tasks {
  return updateStackCountHelper(argument, 1);
}

export function decreaseStackCountFunction(argument: Argument): Tasks {
  return updateStackCountHelper(argument, -1);
}

export function stackCountDidChange(argument: Argument): Tasks {
  const value = argument.stateInfo['stackCount'] as number;
  return {
    type: 'animation',
    animation: {
      view: {
        popButton: {
          style: {
            opacity: value === 0 ? 0 : 1,
          },
        },
      },
      duration: 0.5,
    },
  };
}

function updateStackCountHelper(argument: Argument, offset: number): Tasks {
  const value = argument.stateInfo['stackCount'] as number;
  return {
    type: 'state',
    state: {
      stackCount: value + offset,
    },
  };
}
