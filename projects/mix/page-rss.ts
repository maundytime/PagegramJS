import {XMLParser} from 'fast-xml-parser';
import type {NavPage, Page} from 'types/page';
import {type Tasks, type Argument} from 'types/event';
import {type View, type MatrixView} from 'types/view';
import {Pagegram} from 'types/pagegram';
import {edge, spacer} from 'types/util';
import {makePageNav} from './page-nav';

export function PageRssInNav(): NavPage {
  const nav = makePageNav(['PageRss']);
  nav.stateMap = {
    ...nav.stateMap,
    focusedRssItem: {
      type: 'state',
      value: null,
    },
  };
  nav.eventMap = {
    onTapRssItem: '#onTapRssItem',
  };
  return nav;
}

export function PageRssDetail(): Page {
  return {
    stateMap: {
      focusedRssItem: {
        type: 'bind',
        onChange: '#focusedRssItemDidChange',
      },
    },
    subviews: {
      type: 'scroll',
      style: {
        background: 'f',
      },
      dimension: edge,
      subviews: {
        type: 'stack',
        stack: {
          alignment: 'center',
        },
        dimension: {
          top: 0,
          leftSafe: 60,
          rightSafe: 60,
          bottom: 0,
        },
        style: {
          background: 'f',
        },
        subviews: [
          {
            id: 'testLabel',
            type: 'label',
            text: {
              content: '123',
            },
          },
          {
            type: 'touchFade',
            dimension: {
              height: 60,
              width: 60,
            },
            style: {background: 'f00'},
            onTap: {
              type: 'view',
              view: {
                audioView: {
                  command: {
                    play: 'pause',
                  },
                },
              },
            },
          },
          {
            id: 'imageView',
            type: 'image',
            dimension: {
              height: 120,
              width: 120,
            },
          },
          {
            id: 'audioView',
            type: 'audio',
            dimension: {
              height: 60,
              width: 60,
            },
            style: {
              background: 'aaf3',
            },
            systemControl: {
              skipForward: 45,
              skipBackward: true,
            },
          },
          {
            id: 'titleView',
            type: 'label',
            text: {
            // content: 'label',
              size: 24,
              weight: 'semibold',
            },
            dimension: {
              left: 0,
              right: 0,
            },
          },
          {
            id: 'descriptionView',
            type: 'label',
            text: {
              size: 18,
            // content: 'label',
            },
            dimension: {
              left: 0,
              right: 0,
            },
          },
        ],
      },
    },
  };
}

export function PageRss(): Page {
  return {
    stateMap: {
      rss: {
        type: 'state',
        value: null,
        onChange: '#rssDidChange',
      },
    },
    onLoad: '#fetchRss',
    subviews: {
      type: 'scroll',
      dimension: edge,
      style: {
        background: 'f',
      },
      subviews: {
        id: 'rssList',
        type: 'matrix',
        dimension: {
          top: 0,
          bottom: 0,
          leftSafe: 0,
          rightSafe: 0,
        },
        style: {
          background: 'e',
        },
        matrix: {
          content: [],
          itemSize: {
            width: '50%',
          },
        },
      },
    },
  };
}

export function onTapRssItem(argument: Argument): Tasks {
  return [
    {
      type: 'state',
      state: {
        focusedRssItem: argument.userInfo,
      },
    },
    {
      type: 'navigation',
      navigation: 'push',
      pageName: 'PageRssDetail',
    },
  ];
}

export function focusedRssItemDidChange(argument: Argument): Tasks {
  const value = argument.stateInfo['focusedRssItem'] as Record<string, unknown>;
  const channelTitle = value['channelTitle'] as string;
  const channelImage = value['channelImage'] as string;
  const image = (value['itunes:image'] as any).href as string;
  const url = (value['enclosure'] as any).url as string;
  const description = value['description'] as string;
  const title = value['title'] as string;
  const author = value['itunes:author'] as string;
  return {
    type: 'view',
    view: {
      audioView: {
        audio: {
          url,
          image,
          title,
          author,
          channelTitle,
        },
        command: {
          play: 'current',
        },
      },
      titleView: {
        text: {
          content: title,
        },
      },
      descriptionView: {
        text: {
          content: description,
        },
      },
      imageView: {
        image: {
          url: channelImage,
        },
      },
    },
  };
}

export function rssDidChange(argument: Argument): Tasks {
  const value = argument.stateInfo['rss'] as Record<string, unknown>;
  if (!value) {
    return;
  }

  const items = value['item'] as Array<Record<string, unknown>>;
  const channelTitle = value['title'] as string;
  const channelImage = (value['itunes:image'] as any).href as string;
  const rssList: MatrixView = {
    matrix: {
      content: Array.from(items, item => {
        const view: View = {
          type: 'touch',
          dimension: edge,
          userInfo: {...item, channelTitle, channelImage},
          onTap: '@onTapRssItem',
          subviews: {
            type: 'stack',
            dimension: edge,
            stack: {
              direction: 'vertical',
            },
            subviews: [
              {
                type: 'image',
                image: {
                  url: (item['itunes:image'] as any).href as string,
                },
                dimension: {
                  left: 0,
                  right: 0,
                  height: 100,
                },
              },
              {
                type: 'label',
                text: {
                  content: item['title'] as string,
                  design: 'monospaced',
                },
                dimension: {
                  left: 0,
                  right: 0,
                },
              },
              spacer,
            ],
          },
        };
        return view;
      }),
    },
  };
  return {
    type: 'view',
    view: {
      rssList,
    },
  };
}

export async function fetchRss(): Promise<Tasks> {
  const list = [
    'https://zhuchangsile.xyz/episodes/feed.xml',
    'https://uxcoffee.typlog.io/episodes/feed.xml',
  ];
  return Pagegram.fetch(list[0]!)
    .then(text => {
      const x = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
      });
      const channel = x.parse(text).rss.channel as unknown;
      return {
        type: 'state',
        state: {
          rss: channel,
        },
      };
    });
}
