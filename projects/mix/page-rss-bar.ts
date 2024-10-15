import type {NavPage, Page} from 'types/page';
import {type Argument, type Tasks} from 'types/event';
import {makePageNav} from './page-nav';

export const PageRssBarInNav: NavPage = (() => {
  const nav = makePageNav(['PageRssBar']);
  return nav;
})();

export const PageRssBar: Page = {
  stateMap: {
    slideSpace: {type: 'state', value: 0},
    playingProgress: {type: 'state', value: 0, onChange: '#onPlayingProgressChange'},
  },
  subviews: [
    {
      id: 'audio1',
      type: 'audio',
      audio: [
        {
          url: 'https://r.typlog.com/eyJzIjo5OTAsImUiOjUzMjA2LCJ0IjoxfQ.qx04nTcOXMme9ZMJbLaB5zvkTfo/uxcoffee/8355695624_569198.mp3',
          image: 'https://i.typlog.com/uxcoffee/8355695599_037928.png?x-oss-process=style/sl',
          title: '永不停止的列车1',
          channelTitle: '设计咖',
          author: 'UXCoffee',
        },
        {
          url: 'https://r.typlog.com/eyJzIjo5OTAsImUiOjQ5NDU3LCJ0IjoxfQ.EWALlS08FNGbzZ2ceQ84M_e8aXw/uxcoffee/8364249593_966076.mp3',
          image: 'https://i0.hdslb.com/bfs/face/8695e4f04ce6edc56ad53b09c78e63d4b8f289f6.jpg',
          title: '产品人的妄念2',
          channelTitle: '设计咖',
          author: 'UXCoffee',
        },
        {
          url: 'https://r.typlog.com/eyJzIjo5OTAsImUiOjQ5NDU3LCJ0IjoxfQ.EWALlS08FNGbzZ2ceQ84M_e8aXw/uxcoffee/8364249593_966076.mp3',
          image: 'https://i0.hdslb.com/bfs/face/8695e4f04ce6edc56ad53b09c78e63d4b8f289f6.jpg',
          title: '产品人的妄念3',
          channelTitle: '设计咖',
          author: 'UXCoffee',
        },
      ],
      command: {
        play: 'current',
      },
      // loop: 'random',
      onPlaying: '#onPlaying',
      onPlayingStart: '#onPlayingStart',
      systemControl: {
        // skipBackward: 15,
        // skipForward: 60,
        previousTrack: true,
        nextTrack: true,
      },
    },
    {
      type: 'touchFade',
      onTap: {
        type: 'view',
        view: {
          audio1: {
            command: {
              play: 'current',
            },
          },
        },
      },
      dimension: {
        left: 0,
        width: 60,
        height: 60,
        centerY: 0,
      },
      style: {
        background: 'aaf',
      },
    },
    {
      type: 'touchFade',
      onTap: {
        type: 'view',
        view: {
          audio1: {
            command: {
              play: 'pause',
            },
          },
        },
      },
      dimension: {
        left: 0,
        width: 60,
        height: 60,
        centerY: 120,
      },
      style: {
        background: 'faa',
      },
    },
    {
      type: 'measure',
      onMeasure: '#onMeasure',
      dimension: {
        left: 60,
        right: 60,
        height: 60,
        topSafe: 120,
      },
      style: {
        background: 'f004',
      },
      subviews: {
        id: 'dragView',
        type: 'touch',
        onMove: '#onMove',
        onMoveEnd: '#onMoveEnd',
        dimension: {
          left: 0,
          centerY: 0,
          height: 40,
          width: 40,
        },
        style: {
          background: 'f004',
        },
      },
    },
  ],
};

export function onMove(argument: Argument): Tasks {
  const prevProgress = argument.stateInfo['playingProgress'] as number;
  const space = argument.stateInfo['slideSpace'] as number;
  const prevLength = prevProgress * space;
  const dx = (argument.systemInfo as any).dx as number;
  const nextLength = prevLength + dx;
  const safeLength = Math.min(Math.max(nextLength, 0), space);
  const nextProgress = safeLength / space;
  return [
    {
      type: 'state',
      state: {
        playingProgress: nextProgress,
      },
    },
    {
      type: 'view',
      view: {
        audio1: {
          onPlayingEnable: false,
        },
      },
    },
  ];
}

export function onPlaying(argument: Argument): Tasks {
  const systemInfo = argument.systemInfo as Record<string, unknown>;
  const time = systemInfo['time'] as number;
  const duration = systemInfo['duration'] as number;
  let nextProgress = time / duration;
  if (Number.isNaN(nextProgress)) {
    nextProgress = 0;
  }
  return {
    type: 'state',
    state: {
      playingProgress: nextProgress,
    },
  };
}

export function onPlayingProgressChange(argument: Argument): Tasks {
  const progress = argument.stateInfo['playingProgress'] as number;
  const space = argument.stateInfo['slideSpace'] as number;
  const offset = progress * space;
  return {
    type: 'view',
    view: {
      dragView: {
        dimension: {
          left: offset,
        },
      },
    },
  };
}

export function onMoveEnd(argument: Argument): Tasks {
  const progress = argument.stateInfo['playingProgress'] as number;
  return {
    type: 'view',
    view: {
      audio1: {
        onPlayingEnable: true,
        command: {
          time: progress.toString(),
        },
      },
    },
  };
}

/// view - eventname - event - functionname - function - state - state bind - eventname - event - functionname - function - view/command
/// view - event - function - state - state bind - event - function - view/command
/// - eventname - event - functionname - function -
/// - event - functionname - function
/// functionname可以直接写function

export function onMeasure(argument: Argument): Tasks {
  const slideSpace = Math.max(0, (argument.systemInfo as any).width as number - 40);
  return {
    type: 'state',
    state: {
      slideSpace,
    },
  };
}

export function onPlayingStart(argument: Argument): Tasks {
  console.log(JSON.stringify(argument));
  return [];
}
