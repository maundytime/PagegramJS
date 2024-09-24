var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// projects/example/index.ts
var example_exports = {};
__export(example_exports, {
  PageTest: () => PageTest,
  root: () => PageTest
});

// projects/example/page.ts
var PageTest = {
  subviews: {
    type: "label",
    text: {
      content: "\u4F60\u597D"
    },
    dimension: {
      centerX: 0,
      centerY: 0
    }
  }
};
var pagegram=example_exports;
