import {type Tasks, type Argument} from 'types/event';
import type {Page} from 'types/page';
import {edge} from 'types/util';
import {type View} from 'types/view';

const allSounds = [
  'bowls',
  'night',
];

export function onTap(argument: Argument): Tasks {
  return {
    type: 'state',
    state: {
      sound: argument.userInfo,
    },
  };
}

export function onChange(argument: Argument): Tasks {
  const sound = argument.stateInfo['sound'];
  console.log('onChange', sound);
  return {
    type: 'view',
    view: {
      audio: {
        audio: {
          url: '本地目录',
        },
        action: {
          play: 'current',
        },
      },
    },
  };
}

const buttons: View[] = Array.from(allSounds, sound => (
  {
    type: 'touchFade',
    onTap: 'onTap',
    userInfo: sound,
    style: {
      background: 'f00',
    },
    subviews: {
      type: 'label',
      text: {
        content: sound,
      },
      dimension: {
        centerX: 0,
        centerY: 0,
      },
    },
  }
));

export const PageSound: Page = {
  eventMap: {
    onTap: 'onTap',
    onChange: 'onChange',
  },
  stateMap: {
    sound: {
      type: 'state',
      value: null,
      onChange: 'onChange',
    },
  },
  subviews: {
    dimension: edge,
    style: {
      background: 'fff',
    },
    subviews: [
      {
        type: 'stack',
        stack: {
          alignment: 'fill',
          distribution: 'fillEqually',
        },
        style: {
          background: 'fff',
        },
        dimension: {
          topSafe: 0,
          bottomSafe: 0,
          left: 0,
          right: 0,
        },
        subviews: buttons,
      },
      {
        id: 'audio',
        type: 'audio',
        onPlaying: 'onPlaying',
      },
    ],
  },
};
