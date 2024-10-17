import {type Tasks, type Argument, type Animation} from 'types/event';
import type {Page} from 'types/page';
import {edge} from 'types/util';
import {hctColor} from 'types/htc-color';
import {type View} from 'types/view';

const playSymbol = 'play.fill';
const pauseSymbol = 'pause.fill';
const hue = 360 * Math.random();
const background = hctColor(hue, 20, 90);
const color = hctColor(0, 0, 15);

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
  return {
    type: 'state',
    state: {
      playing: rate !== 0,
    },
  };
}

export function onChange(argument: Argument): Tasks {
  const playing = argument.stateInfo['playing'] as boolean;
  return {
    type: 'view',
    view: {
      audio: {
        command: {
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

export function onRotate(argument: Argument): Tasks {
  const playing = argument.stateInfo['playing'] as boolean;
  if (playing) {
    return {
      type: 'animation',
      animation: {
        view: {
          mesh: {
            style: {
              transform: {
                rotateOffset: 30,
              },
            },
          },
        },
        duration: 5,
        curve: 'linear',
      },
      loop: true,
      id: 'mesh',
    };
  }
  return {
    type: 'animation',
    animation: [],
    id: 'mesh',
  };
}

export function onColor(argument: Argument): Tasks {
  const playing = argument.stateInfo['playing'] as boolean;
  const animation: Animation[] = Array.from({length: 12}, _ => {
    const background = hctColor(360 * Math.random(), 20, 90);
    return {
      view: {
        background: {
          style: {
            background,
          },
        },
      },
      duration: 5,
      curve: 'linear',
    };
  });
  if (playing) {
    return {
      type: 'animation',
      animation,
      loop: true,
      id: 'color',
    };
  }
  return {
    type: 'animation',
    animation: [],
    id: 'color',
  };
}

const dismissButton: View = {
  dimension: {
    height: 64,
  },
  subviews: {
    type: 'touch',
    onTap: {
      type: 'navigation',
      navigation: 'dismiss',
    },
    dimension: {
      width: 64,
      height: 64,
      left: 16,
      centerY: 0,
    },
    subviews: {
      type: 'symbol',
      symbol: {
        name: 'arrowtriangle.down.fill',
        weight: 500,
        color,
      },
      dimension: edge,
    },
  },
};

const cover: View = {
  subviews: {
    type: 'image',
    id: 'mesh',
    image: {
      url: 'cover.png',
    },
    style: {
      radius: 160,
      overflow: 'hidden',
    },
    dimension: {
      centerX: 0,
      centerY: 0,
      width: 320,
      ratio: '100%',
    },
  },
};

const playButton: View = {
  dimension: {
    height: '30%',
  },
  subviews: {
    type: 'touch',
    onTap: '#onTap',
    dimension: {
      width: 64,
      height: 48,
      centerX: 0,
      centerY: 0,
    },
    style: {
      background: color,
      radius: 24,
    },
    subviews: {
      type: 'symbol',
      id: 'playButton',
      symbol: {
        name: playSymbol,
        color: 'f',
      },
      dimension: edge,
    },
  },
};

const content = [dismissButton, cover, playButton];

export const PageSound: Page = {
  direction: 'vertical',
  stateMap: {
    playing: {
      type: 'state',
      value: false,
      onChange: ['#onChange', '#onRotate', '#onColor'],
    },
  },
  subviews: [
    {
      id: 'audio',
      type: 'audio',
      onPlaying: '#onPlaying',
      audio: {
        url: 'sound.caf',
      },
    }, {
      dimension: edge,
      id: 'background',
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
        subviews: content,
      },
    },
  ],
};
