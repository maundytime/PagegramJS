import {type Argument, type Tasks} from 'types/event';
import {Pagegram} from 'types/pagegram';
import type {NavPage, Page} from 'types/page';
import {type PageTextComponent} from 'types/property';
import {edge} from 'types/util';

const allCards = [
  '愚者', // Fool
  '魔术师', // Magician
  '女教皇', // High Priestess
  '女皇', // Empress
  '皇帝', // Emperor
  '教皇', // Hierophant
  '恋人', // Lovers
  '战车', // Chariot
  '力量', // Strength
  '隐者', // Hermit
  '命运之轮', // Wheel of Fortune
  '正义', // Justice
  '倒吊人', // Hanged Man
  '死亡', // Death
  '节制', // Temperance
  '恶魔', // Devil
  '塔', // Tower
  '星星', // Star
  '月亮', // Moon
  '太阳', // Sun
  '审判', // Judgement
  '世界', // World
];

function makeCard(card: unknown) {
  return {
    subviews: [
      {
        dimension: edge,
        style: {
          background: '0001',
          radius: 8,
        },
      },
      {
        type: 'label',
        text: {
          content: ((card as any).name as string).toUpperCase(),
          weight: 500,
        },
        dimension: {
          centerX: 0,
          centerY: -8,
        },
      },
      {
        type: 'label',
        text: {
          content: (card as any).orientation === '逆位' ? '↓' : '↑',
          weight: 500,
        },
        dimension: {
          centerX: 0,
          bottom: 24,
        },
      },
    ],
  };
}

const cardSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      enum: allCards,
    },
    orientation: {
      type: 'string',
      enum: ['正位', '逆位'],
    },
    explain: {
      type: 'string',
    },
  },
  required: ['name', 'orientation', 'explain'],
  additionalProperties: false,
};

const cardsSchema = {
  type: 'object',
  properties: {
    card1: cardSchema,
    card2: cardSchema,
    card3: cardSchema,
    answer: {
      type: 'string',
    },
  },
  required: ['card1', 'card2', 'card3', 'answer'],
  additionalProperties: false,
};

export function onTap(_: Argument): Tasks {
  const result = [];
  const deck = [...allCards];
  deck.splice(0, 1);

  while (result.length < 3) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const orientation = Math.random() < 0.5 ? '正位' : '逆位';
    const card = {
      name: deck[randomIndex],
      orientation,
    };
    deck.splice(randomIndex, 1);
    result.push(card);
  }

  return {
    type: 'state',
    state: {
      cards: result,
    },
  };
}

export function onCards(argument: Argument): Tasks {
  const cards = argument.stateInfo['cards'] as any[];
  if (cards.length === 0) {
    return;
  }
  return {
    type: 'view',
    view: {
      cards: {
        subviews: Array.from(cards, card => makeCard(card)),
      },
      answer: {
        text: {
          content: '',
        },
      },
      loading: {
        style: {
          opacity: 1,
        },
      },
    },
  };
}

export async function onCardsReading(argument: Argument): Promise<Tasks> {
  const cards = argument.stateInfo['cards'] as any[];
  if (cards.length === 0) {
    return;
  }
  return Pagegram.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(globalThis as any).OPENAI_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          content: `
          基于塔罗牌组json内容生成解读。
          - explain基于每张牌的name和orientation，不使用markdown格式，大约90字中文。
          - answer基于整个塔罗牌组，不使用markdown格式，大约180字中文。
          你需要解读的塔罗牌组的json内容是：
          ${JSON.stringify(cards)}
          `,
          role: 'user',
        },
      ],
      model: 'gpt-4o-mini',
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'tarot_response',
          strict: true,
          schema: cardsSchema,
        },
      },
    }),
  })
    .then(data => {
      const string = JSON.parse(data).choices[0].message.content as string;
      const obj = JSON.parse(string) as Record<string, unknown>;

      function makeCardReading(card: any): PageTextComponent[] {
        const name = card.name as string;
        const orientation = card.orientation === '逆位' ? '↓' : '↑';
        const explain = card.explain as string;
        return [
          {
            content: `${name} ${orientation}\n`,
            weight: 500,
          },
          {
            content: `${explain}\n\n`,
          },
        ];
      }
      return {
        type: 'view',
        view: {
          answer: {
            text: [
              ...makeCardReading(obj['card1']),
              ...makeCardReading(obj['card2']),
              ...makeCardReading(obj['card3']),
              {
                content: obj['answer'] as string,
              },
            ],
          },
          loading: {
            style: {
              opacity: 0,
            },
          },
        },
      };
    });
}

export function PageTarot(): Page {
  return {
    stateMap: {
      cards: {
        type: 'bind',
        onChange: ['#onCards', '#onCardsReading'],
      },
    },
    subviews: {
      style: {
        background: 'f',
      },
      dimension: edge,
      subviews: {
        type: 'stack',
        dimension: {
          left: 16,
          right: 16,
          topSafe: 8,
          bottomSafe: 0,
        },
        stack: {
          spacing: 16,
          alignment: 'fill',
        },
        subviews: [
          {
            type: 'stack',
            id: 'cards',
            dimension: {
              left: 0,
              right: 0,
              height: 160,
            },
            stack: {
              direction: 'horizontal',
              distribution: 'fillEqually',
              alignment: 'fill',
              spacing: 16,
            },
          },
          {
            subviews: [
              {
                type: 'text',
                id: 'answer',
                dimension: edge,
                scrollable: true,
              },
              {
                type: 'symbol',
                id: 'loading',
                dimension: {
                  centerX: 0,
                  centerY: 0,
                },
                symbol: {
                  name: 'progress.indicator',
                  color: '9',
                },
                style: {
                  opacity: 0,
                },
              },
            ],
          },
        ],
      },
    },
  };
}

export function PageTarotInNav(): NavPage {
  return {
    type: 'nav',
    stateMap: {
      cards: {
        type: 'state',
        value: [],
      },
    },
    subpages: ['PageTarot'],
    subviews: [
      {
        type: 'blur',
        dimension: {
          top: 0,
          left: 0,
          right: 0,
          unsafeAt: 'top',
        },
        style: {
          background: 'fffe',
        },
        subviews: {
          dimension: {
            left: 0,
            right: 0,
            height: 44,
            bottom: 0,
            topSafe: 0,
          },
          subviews: [
            {
              type: 'touchFade',
              onTap: {
                type: 'navigation',
                navigation: 'dismiss',
              },
              dimension: {
                bottom: 0,
                width: 44,
                top: 0,
                leftSafe: 16,
              },
              subviews: {
                type: 'symbol',
                symbol: {
                  name: 'xmark',
                  weight: 500,
                },
                dimension: edge,
              },
            },
            {
              type: 'label',
              text: {
                content: '塔罗牌',
                weight: 600,
              },
              dimension: {
                centerX: 0,
                centerY: 0,
              },
            },
          ],
        },
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
          background: 'fffe',
        },
        subviews: {
          dimension: {
            left: 0,
            right: 0,
            height: 60,
            top: 0,
            bottomSafe: 0,
          },
          subviews: [
            {
              type: 'touchFade',
              onTap: '#onTap',
              style: {
                background: '0002',
                radius: 8,
              },
              dimension: {
                left: 16,
                right: 16,
                top: 8,
                bottom: 8,
              },
              subviews: {
                type: 'label',
                text: {
                  content: '抽取塔罗牌',
                  weight: 500,
                },
                dimension: {
                  centerX: 0,
                  centerY: 0,
                },
              },
            },
          ],
        },
      },
    ],
  };
}

Pagegram.present(PageTarotInNav);
