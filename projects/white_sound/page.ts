import {type Tasks, type Argument} from 'types/event';
import type {NavPage, Page} from 'types/page';
import {edge, hctColor} from 'types/util';

const playSymbol = 'play.circle.fill';
const pauseSymbol = 'pause.circle.fill';
const background = hctColor(360 * Math.random(), 20, 90);

export function onTap(argument: Argument): Tasks {
  const playing = argument.stateInfo['playing'] as boolean;
  return {
    type: 'state',
    state: {
      playing: !playing,
    },
  };
}

export function onPlaying(argument: Argument): Tasks {
  const rate = (argument.systemInfo as any).rate as number;
  return [
    {
      type: 'view',
      view: {
        playButton: {
          symbol: {
            name: rate === 0 ? playSymbol : pauseSymbol,
          },
        },
      },
    },
    {
      type: 'state',
      state: {
        playing: rate !== 0,
      },
    },
  ];
}

export function onChange(argument: Argument): Tasks {
  const playing = argument.stateInfo['playing'] as boolean;
  return {
    type: 'view',
    view: {
      audio: {
        action: {
          play: playing ? 'current' : 'pause',
        },
      },
      playButton: {
        symbol: {
          name: playing ? pauseSymbol : playSymbol,
        },
      },
    },
  };
}

export const PageSound: Page = {
  eventMap: {
    onTap: 'onTap',
    onChange: 'onChange',
    onPlaying: 'onPlaying',
  },
  stateMap: {
    playing: {
      type: 'state',
      value: false,
      onChange: 'onChange',
    },
  },
  subviews: [
    {
      id: 'audio',
      type: 'audio',
      onPlaying: 'onPlaying',
      audio: {
        url: 'sound.caf',
      },
    }, {
      dimension: edge,
      style: {
        background,
      },
      subviews: {
        type: 'stack',
        stack: {
          alignment: 'fill',
        },
        dimension: {
          topSafe: 0,
          bottomSafe: 0,
          left: 0,
          right: 0,
        },
        subviews: [
          {
            type: 'image',
            image: {
              url: 'mesh.pdf',
              mode: 'center',
            },
            dimension: {
              ratio: '100%',
            },
          },
          {
            subviews: {
              type: 'touch',
              onTap: 'onTap',
              dimension: {
                width: 80,
                height: 80,
                centerX: 0,
                centerY: 0,
              },
              subviews: {
                type: 'symbol',
                id: 'playButton',
                symbol: {
                  name: playSymbol,
                  weight: '500',
                  size: 48,
                },
                dimension: {
                  centerX: 0,
                  centerY: 0,
                },
              },
            },
          },
        ],
      },
    },
  ],
};

export const PageSoundInNav: NavPage = {
  direction: 'vertical',
  type: 'nav',
  eventMap: {
    dismiss: {
      type: 'navigation',
      navigation: 'dismiss',
    },
  },
  subpages: ['PageSound'],
  subviews: {
    type: 'touch',
    onTap: 'dismiss',
    dimension: {
      topSafe: 10,
      width: 60,
      height: 60,
      leftSafe: 10,
      unsafeAt: 'top',
    },
    subviews: {
      type: 'symbol',
      symbol: {
        name: 'arrowtriangle.down.fill',
        weight: '500',
      },
      dimension: edge,
    },
  },
};
