var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// projects/story1/index.ts
var story1_exports = {};
__export(story1_exports, {
  PageTest: () => PageTest,
  root: () => PageTest
});

// types/util.ts
var edge = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

// projects/story1/page.ts
var PageTest = {
  subviews: {
    type: "touch",
    dimension: edge,
    style: {
      background: "#fff"
    },
    onTap: "changeLabel",
    subviews: {
      id: "label",
      type: "label",
      text: {
        content: "\u70B9\u51FB\u6211",
        alignment: "center"
      },
      dimension: edge
    }
  },
  eventMap: {
    changeLabel: {
      type: "view",
      view: {
        label: {
          text: {
            content: "\u4F60\u597D"
          }
        }
      }
    }
  }
};
var pagegram=story1_exports;
