var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS({
  "node_modules/fast-xml-parser/src/util.js"(exports) {
    "use strict";
    var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    var regexName = new RegExp("^" + nameRegexp + "$");
    var getAllMatches = function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    };
    var isName = function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    };
    exports.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports.getValue = function(v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  }
});

// node_modules/fast-xml-parser/src/validator.js
var require_validator = __commonJS({
  "node_modules/fast-xml-parser/src/validator.js"(exports) {
    "use strict";
    var util = require_util();
    var defaultOptions = {
      allowBooleanAttributes: false,
      //A tag can have attributes without any value
      unpairedTags: []
    };
    exports.validate = function(xmlData, options) {
      options = Object.assign({}, defaultOptions, options);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err) return i;
        } else if (xmlData[i] === "<") {
          let tagStartPos = i;
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "Invalid space after '<'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              const attrStrStart = i - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid = validateAttributeString(attrStr, options);
              if (isValid === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
              } else if (tags.length === 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
              } else {
                const otg = tags.pop();
                if (tagName !== otg.tagName) {
                  let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                  return getErrorObject(
                    "InvalidTag",
                    "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                    getLineNumberForPosition(xmlData, tagStartPos)
                  );
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid = validateAttributeString(attrStr, options);
              if (isValid !== true) {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else if (options.unpairedTags.indexOf(tagName) !== -1) {
              } else {
                tags.push({ tagName, tagStartPos });
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err) return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              } else {
                if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                  return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
                }
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (isWhiteSpace(xmlData[i])) {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length == 1) {
        return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
      }
      return true;
    };
    function isWhiteSpace(char) {
      return char === " " || char === "	" || char === "\n" || char === "\r";
    }
    function readPI(xmlData, i) {
      const start = i;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {
          const tagname = xmlData.substr(start, i - start);
          if (i > 5 && tagname === "xml") {
            return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
          } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
            i++;
            break;
          } else {
            continue;
          }
        }
      }
      return i;
    }
    function readCommentAndCDATA(xmlData, i) {
      if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
        for (i += 3; i < xmlData.length; i++) {
          if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
        let angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            angleBracketsCount++;
          } else if (xmlData[i] === ">") {
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          }
        }
      } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      }
      return i;
    }
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, i) {
      let attrStr = "";
      let startChar = "";
      let tagClosed = false;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
          if (startChar === "") {
            startChar = xmlData[i];
          } else if (startChar !== xmlData[i]) {
          } else {
            startChar = "";
          }
        } else if (xmlData[i] === ">") {
          if (startChar === "") {
            tagClosed = true;
            break;
          }
        }
        attrStr += xmlData[i];
      }
      if (startChar !== "") {
        return false;
      }
      return {
        value: attrStr,
        index: i,
        tagClosed
      };
    }
    var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function validateAttributeString(attrStr, options) {
      const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      const attrNames = {};
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1].length === 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
      }
      return true;
    }
    function validateNumberAmpersand(xmlData, i) {
      let re = /\d/;
      if (xmlData[i] === "x") {
        i++;
        re = /[\da-fA-F]/;
      }
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === ";")
          return i;
        if (!xmlData[i].match(re))
          break;
      }
      return -1;
    }
    function validateAmpersand(xmlData, i) {
      i++;
      if (xmlData[i] === ";")
        return -1;
      if (xmlData[i] === "#") {
        i++;
        return validateNumberAmpersand(xmlData, i);
      }
      let count = 0;
      for (; i < xmlData.length; i++, count++) {
        if (xmlData[i].match(/\w/) && count < 20)
          continue;
        if (xmlData[i] === ";")
          break;
        return -1;
      }
      return i;
    }
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code,
          msg: message,
          line: lineNumber.line || lineNumber,
          col: lineNumber.col
        }
      };
    }
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    function validateTagName(tagname) {
      return util.isName(tagname);
    }
    function getLineNumberForPosition(xmlData, index) {
      const lines = xmlData.substring(0, index).split(/\r?\n/);
      return {
        line: lines.length,
        // column number is last line's length + 1, because column numbering starts at 1:
        col: lines[lines.length - 1].length + 1
      };
    }
    function getPositionFromMatch(match) {
      return match.startIndex + match[1].length;
    }
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var require_OptionsBuilder = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js"(exports) {
    var defaultOptions = {
      preserveOrder: false,
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      removeNSPrefix: false,
      // remove NS from tag name or attribute name if true
      allowBooleanAttributes: false,
      //a tag can have attributes without any value
      //ignoreRootElement : false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      //Trim string values of tag and attributes
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
      },
      tagValueProcessor: function(tagName, val2) {
        return val2;
      },
      attributeValueProcessor: function(attrName, val2) {
        return val2;
      },
      stopNodes: [],
      //nested tags will not be parsed even for errors
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false,
      transformTagName: false,
      transformAttributeName: false,
      updateTag: function(tagName, jPath, attrs) {
        return tagName;
      }
      // skipEmptyListItem: false
    };
    var buildOptions = function(options) {
      return Object.assign({}, defaultOptions, options);
    };
    exports.buildOptions = buildOptions;
    exports.defaultOptions = defaultOptions;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var require_xmlNode = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/xmlNode.js"(exports, module) {
    "use strict";
    var XmlNode = class {
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[":@"] = {};
      }
      add(key, val2) {
        if (key === "__proto__") key = "#__proto__";
        this.child.push({ [key]: val2 });
      }
      addChild(node) {
        if (node.tagname === "__proto__") node.tagname = "#__proto__";
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
          this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
        } else {
          this.child.push({ [node.tagname]: node.child });
        }
      }
    };
    module.exports = XmlNode;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var require_DocTypeReader = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js"(exports, module) {
    var util = require_util();
    function readDocType(xmlData, i) {
      const entities = {};
      if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for (; i < xmlData.length; i++) {
          if (xmlData[i] === "<" && !comment) {
            if (hasBody && isEntity(xmlData, i)) {
              i += 7;
              [entityName, val, i] = readEntityExp(xmlData, i + 1);
              if (val.indexOf("&") === -1)
                entities[validateEntityName(entityName)] = {
                  regx: RegExp(`&${entityName};`, "g"),
                  val
                };
            } else if (hasBody && isElement(xmlData, i)) i += 8;
            else if (hasBody && isAttlist(xmlData, i)) i += 8;
            else if (hasBody && isNotation(xmlData, i)) i += 9;
            else if (isComment) comment = true;
            else throw new Error("Invalid DOCTYPE");
            angleBracketsCount++;
            exp = "";
          } else if (xmlData[i] === ">") {
            if (comment) {
              if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                comment = false;
                angleBracketsCount--;
              }
            } else {
              angleBracketsCount--;
            }
            if (angleBracketsCount === 0) {
              break;
            }
          } else if (xmlData[i] === "[") {
            hasBody = true;
          } else {
            exp += xmlData[i];
          }
        }
        if (angleBracketsCount !== 0) {
          throw new Error(`Unclosed DOCTYPE`);
        }
      } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return { entities, i };
    }
    function readEntityExp(xmlData, i) {
      let entityName2 = "";
      for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"'); i++) {
        entityName2 += xmlData[i];
      }
      entityName2 = entityName2.trim();
      if (entityName2.indexOf(" ") !== -1) throw new Error("External entites are not supported");
      const startChar = xmlData[i++];
      let val2 = "";
      for (; i < xmlData.length && xmlData[i] !== startChar; i++) {
        val2 += xmlData[i];
      }
      return [entityName2, val2, i];
    }
    function isComment(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-") return true;
      return false;
    }
    function isEntity(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y") return true;
      return false;
    }
    function isElement(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T") return true;
      return false;
    }
    function isAttlist(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T") return true;
      return false;
    }
    function isNotation(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N") return true;
      return false;
    }
    function validateEntityName(name) {
      if (util.isName(name))
        return name;
      else
        throw new Error(`Invalid entity name ${name}`);
    }
    module.exports = readDocType;
  }
});

// node_modules/strnum/strnum.js
var require_strnum = __commonJS({
  "node_modules/strnum/strnum.js"(exports, module) {
    var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
    var numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    if (!Number.parseInt && window.parseInt) {
      Number.parseInt = window.parseInt;
    }
    if (!Number.parseFloat && window.parseFloat) {
      Number.parseFloat = window.parseFloat;
    }
    var consider = {
      hex: true,
      leadingZeros: true,
      decimalPoint: ".",
      eNotation: true
      //skipLike: /regex/
    };
    function toNumber(str, options = {}) {
      options = Object.assign({}, consider, options);
      if (!str || typeof str !== "string") return str;
      let trimmedStr = str.trim();
      if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
      else if (options.hex && hexRegex.test(trimmedStr)) {
        return Number.parseInt(trimmedStr, 16);
      } else {
        const match = numRegex.exec(trimmedStr);
        if (match) {
          const sign = match[1];
          const leadingZeros = match[2];
          let numTrimmedByZeros = trimZeros(match[3]);
          const eNotation = match[4] || match[6];
          if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".") return str;
          else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".") return str;
          else {
            const num = Number(trimmedStr);
            const numStr = "" + num;
            if (numStr.search(/[eE]/) !== -1) {
              if (options.eNotation) return num;
              else return str;
            } else if (eNotation) {
              if (options.eNotation) return num;
              else return str;
            } else if (trimmedStr.indexOf(".") !== -1) {
              if (numStr === "0" && numTrimmedByZeros === "") return num;
              else if (numStr === numTrimmedByZeros) return num;
              else if (sign && numStr === "-" + numTrimmedByZeros) return num;
              else return str;
            }
            if (leadingZeros) {
              if (numTrimmedByZeros === numStr) return num;
              else if (sign + numTrimmedByZeros === numStr) return num;
              else return str;
            }
            if (trimmedStr === numStr) return num;
            else if (trimmedStr === sign + numStr) return num;
            return str;
          }
        } else {
          return str;
        }
      }
    }
    function trimZeros(numStr) {
      if (numStr && numStr.indexOf(".") !== -1) {
        numStr = numStr.replace(/0+$/, "");
        if (numStr === ".") numStr = "0";
        else if (numStr[0] === ".") numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".") numStr = numStr.substr(0, numStr.length - 1);
        return numStr;
      }
      return numStr;
    }
    module.exports = toNumber;
  }
});

// node_modules/fast-xml-parser/src/ignoreAttributes.js
var require_ignoreAttributes = __commonJS({
  "node_modules/fast-xml-parser/src/ignoreAttributes.js"(exports, module) {
    function getIgnoreAttributesFn(ignoreAttributes) {
      if (typeof ignoreAttributes === "function") {
        return ignoreAttributes;
      }
      if (Array.isArray(ignoreAttributes)) {
        return (attrName) => {
          for (const pattern of ignoreAttributes) {
            if (typeof pattern === "string" && attrName === pattern) {
              return true;
            }
            if (pattern instanceof RegExp && pattern.test(attrName)) {
              return true;
            }
          }
        };
      }
      return () => false;
    }
    module.exports = getIgnoreAttributesFn;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
var require_OrderedObjParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js"(exports, module) {
    "use strict";
    var util = require_util();
    var xmlNode = require_xmlNode();
    var readDocType = require_DocTypeReader();
    var toNumber = require_strnum();
    var getIgnoreAttributesFn = require_ignoreAttributes();
    var OrderedObjParser = class {
      constructor(options) {
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
          "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
          "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
          "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
          "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
        };
        this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
        this.htmlEntities = {
          "space": { regex: /&(nbsp|#160);/g, val: " " },
          // "lt" : { regex: /&(lt|#60);/g, val: "<" },
          // "gt" : { regex: /&(gt|#62);/g, val: ">" },
          // "amp" : { regex: /&(amp|#38);/g, val: "&" },
          // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
          // "apos" : { regex: /&(apos|#39);/g, val: "'" },
          "cent": { regex: /&(cent|#162);/g, val: "\xA2" },
          "pound": { regex: /&(pound|#163);/g, val: "\xA3" },
          "yen": { regex: /&(yen|#165);/g, val: "\xA5" },
          "euro": { regex: /&(euro|#8364);/g, val: "\u20AC" },
          "copyright": { regex: /&(copy|#169);/g, val: "\xA9" },
          "reg": { regex: /&(reg|#174);/g, val: "\xAE" },
          "inr": { regex: /&(inr|#8377);/g, val: "\u20B9" },
          "num_dec": { regex: /&#([0-9]{1,7});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 10)) },
          "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 16)) }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
        this.addChild = addChild;
        this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
      }
    };
    function addExternalEntities(externalEntities) {
      const entKeys = Object.keys(externalEntities);
      for (let i = 0; i < entKeys.length; i++) {
        const ent = entKeys[i];
        this.lastEntities[ent] = {
          regex: new RegExp("&" + ent + ";", "g"),
          val: externalEntities[ent]
        };
      }
    }
    function parseTextData(val2, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
      if (val2 !== void 0) {
        if (this.options.trimValues && !dontTrim) {
          val2 = val2.trim();
        }
        if (val2.length > 0) {
          if (!escapeEntities) val2 = this.replaceEntitiesValue(val2);
          const newval = this.options.tagValueProcessor(tagName, val2, jPath, hasAttributes, isLeafNode);
          if (newval === null || newval === void 0) {
            return val2;
          } else if (typeof newval !== typeof val2 || newval !== val2) {
            return newval;
          } else if (this.options.trimValues) {
            return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
          } else {
            const trimmedVal = val2.trim();
            if (trimmedVal === val2) {
              return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
            } else {
              return val2;
            }
          }
        }
      }
    }
    function resolveNameSpace(tagname) {
      if (this.options.removeNSPrefix) {
        const tags = tagname.split(":");
        const prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
          return "";
        }
        if (tags.length === 2) {
          tagname = prefix + tags[1];
        }
      }
      return tagname;
    }
    var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    function buildAttributesMap(attrStr, jPath, tagName) {
      if (this.options.ignoreAttributes !== true && typeof attrStr === "string") {
        const matches = util.getAllMatches(attrStr, attrsRegx);
        const len = matches.length;
        const attrs = {};
        for (let i = 0; i < len; i++) {
          const attrName = this.resolveNameSpace(matches[i][1]);
          if (this.ignoreAttributesFn(attrName, jPath)) {
            continue;
          }
          let oldVal = matches[i][4];
          let aName = this.options.attributeNamePrefix + attrName;
          if (attrName.length) {
            if (this.options.transformAttributeName) {
              aName = this.options.transformAttributeName(aName);
            }
            if (aName === "__proto__") aName = "#__proto__";
            if (oldVal !== void 0) {
              if (this.options.trimValues) {
                oldVal = oldVal.trim();
              }
              oldVal = this.replaceEntitiesValue(oldVal);
              const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
              if (newVal === null || newVal === void 0) {
                attrs[aName] = oldVal;
              } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
                attrs[aName] = newVal;
              } else {
                attrs[aName] = parseValue(
                  oldVal,
                  this.options.parseAttributeValue,
                  this.options.numberParseOptions
                );
              }
            } else if (this.options.allowBooleanAttributes) {
              attrs[aName] = true;
            }
          }
        }
        if (!Object.keys(attrs).length) {
          return;
        }
        if (this.options.attributesGroupName) {
          const attrCollection = {};
          attrCollection[this.options.attributesGroupName] = attrs;
          return attrCollection;
        }
        return attrs;
      }
    }
    var parseXml = function(xmlData) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      let jPath = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (this.options.removeNSPrefix) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode) {
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
            }
            const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
            if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
              throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
            }
            let propIndex = 0;
            if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
              propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
              this.tagsNodeStack.pop();
            } else {
              propIndex = jPath.lastIndexOf(".");
            }
            jPath = jPath.substring(0, propIndex);
            currentNode = this.tagsNodeStack.pop();
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            let tagData = readTagExp(xmlData, i, false, "?>");
            if (!tagData) throw new Error("Pi Tag is not closed.");
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {
            } else {
              const childNode = new xmlNode(tagData.tagName);
              childNode.add(this.options.textNodeName, "");
              if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
              }
              this.addChild(currentNode, childNode, jPath);
            }
            i = tagData.closeIndex + 1;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const comment = xmlData.substring(i + 4, endIndex - 2);
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
              currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
            }
            i = endIndex;
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const result = readDocType(xmlData, i);
            this.docTypeEntities = result.entities;
            i = result.i;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            let val2 = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
            if (val2 == void 0) val2 = "";
            if (this.options.cdataPropName) {
              currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
            } else {
              currentNode.add(this.options.textNodeName, val2);
            }
            i = closeIndex + 2;
          } else {
            let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
            let tagName = result.tagName;
            const rawTagName = result.rawTagName;
            let tagExp = result.tagExp;
            let attrExpPresent = result.attrExpPresent;
            let closeIndex = result.closeIndex;
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
              }
            }
            const lastTag = currentNode;
            if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
              currentNode = this.tagsNodeStack.pop();
              jPath = jPath.substring(0, jPath.lastIndexOf("."));
            }
            if (tagName !== xmlObj.tagname) {
              jPath += jPath ? "." + tagName : tagName;
            }
            if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
              let tagContent = "";
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  jPath = jPath.substr(0, jPath.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                i = result.closeIndex;
              } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                i = result.closeIndex;
              } else {
                const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
                if (!result2) throw new Error(`Unexpected end of ${rawTagName}`);
                i = result2.i;
                tagContent = result2.tagContent;
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              if (tagContent) {
                tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
              }
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
              childNode.add(this.options.textNodeName, tagContent);
              this.addChild(currentNode, childNode, jPath);
            } else {
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  jPath = jPath.substr(0, jPath.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                if (this.options.transformTagName) {
                  tagName = this.options.transformTagName(tagName);
                }
                const childNode = new xmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                jPath = jPath.substr(0, jPath.lastIndexOf("."));
              } else {
                const childNode = new xmlNode(tagName);
                this.tagsNodeStack.push(currentNode);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                currentNode = childNode;
              }
              textData = "";
              i = closeIndex;
            }
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj.child;
    };
    function addChild(currentNode, childNode, jPath) {
      const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
      if (result === false) {
      } else if (typeof result === "string") {
        childNode.tagname = result;
        currentNode.addChild(childNode);
      } else {
        currentNode.addChild(childNode);
      }
    }
    var replaceEntitiesValue = function(val2) {
      if (this.options.processEntities) {
        for (let entityName2 in this.docTypeEntities) {
          const entity = this.docTypeEntities[entityName2];
          val2 = val2.replace(entity.regx, entity.val);
        }
        for (let entityName2 in this.lastEntities) {
          const entity = this.lastEntities[entityName2];
          val2 = val2.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
          for (let entityName2 in this.htmlEntities) {
            const entity = this.htmlEntities[entityName2];
            val2 = val2.replace(entity.regex, entity.val);
          }
        }
        val2 = val2.replace(this.ampEntity.regex, this.ampEntity.val);
      }
      return val2;
    };
    function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
      if (textData) {
        if (isLeafNode === void 0) isLeafNode = Object.keys(currentNode.child).length === 0;
        textData = this.parseTextData(
          textData,
          currentNode.tagname,
          jPath,
          false,
          currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
          isLeafNode
        );
        if (textData !== void 0 && textData !== "")
          currentNode.add(this.options.textNodeName, textData);
        textData = "";
      }
      return textData;
    }
    function isItStopNode(stopNodes, jPath, currentTagName) {
      const allNodesExp = "*." + currentTagName;
      for (const stopNodePath in stopNodes) {
        const stopNodeExp = stopNodes[stopNodePath];
        if (allNodesExp === stopNodeExp || jPath === stopNodeExp) return true;
      }
      return false;
    }
    function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
      let attrBoundary;
      let tagExp = "";
      for (let index = i; index < xmlData.length; index++) {
        let ch = xmlData[index];
        if (attrBoundary) {
          if (ch === attrBoundary) attrBoundary = "";
        } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
        } else if (ch === closingChar[0]) {
          if (closingChar[1]) {
            if (xmlData[index + 1] === closingChar[1]) {
              return {
                data: tagExp,
                index
              };
            }
          } else {
            return {
              data: tagExp,
              index
            };
          }
        } else if (ch === "	") {
          ch = " ";
        }
        tagExp += ch;
      }
    }
    function findClosingIndex(xmlData, str, i, errMsg) {
      const closingIndex = xmlData.indexOf(str, i);
      if (closingIndex === -1) {
        throw new Error(errMsg);
      } else {
        return closingIndex + str.length - 1;
      }
    }
    function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
      const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
      if (!result) return;
      let tagExp = result.data;
      const closeIndex = result.index;
      const separatorIndex = tagExp.search(/\s/);
      let tagName = tagExp;
      let attrExpPresent = true;
      if (separatorIndex !== -1) {
        tagName = tagExp.substring(0, separatorIndex);
        tagExp = tagExp.substring(separatorIndex + 1).trimStart();
      }
      const rawTagName = tagName;
      if (removeNSPrefix) {
        const colonIndex = tagName.indexOf(":");
        if (colonIndex !== -1) {
          tagName = tagName.substr(colonIndex + 1);
          attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
        }
      }
      return {
        tagName,
        tagExp,
        closeIndex,
        attrExpPresent,
        rawTagName
      };
    }
    function readStopNodeData(xmlData, tagName, i) {
      const startIndex = i;
      let openTagCount = 1;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
            let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
            if (closeTagName === tagName) {
              openTagCount--;
              if (openTagCount === 0) {
                return {
                  tagContent: xmlData.substring(startIndex, i),
                  i: closeIndex
                };
              }
            }
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
            i = closeIndex;
          } else {
            const tagData = readTagExp(xmlData, i, ">");
            if (tagData) {
              const openTagName = tagData && tagData.tagName;
              if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
                openTagCount++;
              }
              i = tagData.closeIndex;
            }
          }
        }
      }
    }
    function parseValue(val2, shouldParse, options) {
      if (shouldParse && typeof val2 === "string") {
        const newval = val2.trim();
        if (newval === "true") return true;
        else if (newval === "false") return false;
        else return toNumber(val2, options);
      } else {
        if (util.isExist(val2)) {
          return val2;
        } else {
          return "";
        }
      }
    }
    module.exports = OrderedObjParser;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/node2json.js
var require_node2json = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/node2json.js"(exports) {
    "use strict";
    function prettify(node, options) {
      return compress(node, options);
    }
    function compress(arr, options, jPath) {
      let text;
      const compressedObj = {};
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const property = propName(tagObj);
        let newJpath = "";
        if (jPath === void 0) newJpath = property;
        else newJpath = jPath + "." + property;
        if (property === options.textNodeName) {
          if (text === void 0) text = tagObj[property];
          else text += "" + tagObj[property];
        } else if (property === void 0) {
          continue;
        } else if (tagObj[property]) {
          let val2 = compress(tagObj[property], options, newJpath);
          const isLeaf = isLeafTag(val2, options);
          if (tagObj[":@"]) {
            assignAttributes(val2, tagObj[":@"], newJpath, options);
          } else if (Object.keys(val2).length === 1 && val2[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
            val2 = val2[options.textNodeName];
          } else if (Object.keys(val2).length === 0) {
            if (options.alwaysCreateTextNode) val2[options.textNodeName] = "";
            else val2 = "";
          }
          if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
            if (!Array.isArray(compressedObj[property])) {
              compressedObj[property] = [compressedObj[property]];
            }
            compressedObj[property].push(val2);
          } else {
            if (options.isArray(property, newJpath, isLeaf)) {
              compressedObj[property] = [val2];
            } else {
              compressedObj[property] = val2;
            }
          }
        }
      }
      if (typeof text === "string") {
        if (text.length > 0) compressedObj[options.textNodeName] = text;
      } else if (text !== void 0) compressedObj[options.textNodeName] = text;
      return compressedObj;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@") return key;
      }
    }
    function assignAttributes(obj, attrMap, jpath, options) {
      if (attrMap) {
        const keys = Object.keys(attrMap);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          const atrrName = keys[i];
          if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
            obj[atrrName] = [attrMap[atrrName]];
          } else {
            obj[atrrName] = attrMap[atrrName];
          }
        }
      }
    }
    function isLeafTag(obj, options) {
      const { textNodeName } = options;
      const propCount = Object.keys(obj).length;
      if (propCount === 0) {
        return true;
      }
      if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
        return true;
      }
      return false;
    }
    exports.prettify = prettify;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var require_XMLParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/XMLParser.js"(exports, module) {
    var { buildOptions } = require_OptionsBuilder();
    var OrderedObjParser = require_OrderedObjParser();
    var { prettify } = require_node2json();
    var validator = require_validator();
    var XMLParser2 = class {
      constructor(options) {
        this.externalEntities = {};
        this.options = buildOptions(options);
      }
      /**
       * Parse XML dats to JS object 
       * @param {string|Buffer} xmlData 
       * @param {boolean|Object} validationOption 
       */
      parse(xmlData, validationOption) {
        if (typeof xmlData === "string") {
        } else if (xmlData.toString) {
          xmlData = xmlData.toString();
        } else {
          throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
          if (validationOption === true) validationOption = {};
          const result = validator.validate(xmlData, validationOption);
          if (result !== true) {
            throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
          }
        }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
        else return prettify(orderedResult, this.options);
      }
      /**
       * Add Entity which is not by default supported by this library
       * @param {string} key 
       * @param {string} value 
       */
      addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
          throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else if (value === "&") {
          throw new Error("An entity with value '&' is not permitted");
        } else {
          this.externalEntities[key] = value;
        }
      }
    };
    module.exports = XMLParser2;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js
var require_orderedJs2Xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js"(exports, module) {
    var EOL = "\n";
    function toXml(jArray, options) {
      let indentation = "";
      if (options.format && options.indentBy.length > 0) {
        indentation = EOL;
      }
      return arrToStr(jArray, options, "", indentation);
    }
    function arrToStr(arr, options, jPath, indentation) {
      let xmlStr = "";
      let isPreviousElementTag = false;
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const tagName = propName(tagObj);
        if (tagName === void 0) continue;
        let newJPath = "";
        if (jPath.length === 0) newJPath = tagName;
        else newJPath = `${jPath}.${tagName}`;
        if (tagName === options.textNodeName) {
          let tagText = tagObj[tagName];
          if (!isStopNode(newJPath, options)) {
            tagText = options.tagValueProcessor(tagName, tagText);
            tagText = replaceEntitiesValue(tagText, options);
          }
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += tagText;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.cdataPropName) {
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.commentPropName) {
          xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
          isPreviousElementTag = true;
          continue;
        } else if (tagName[0] === "?") {
          const attStr2 = attr_to_str(tagObj[":@"], options);
          const tempInd = tagName === "?xml" ? "" : indentation;
          let piTextNodeName = tagObj[tagName][0][options.textNodeName];
          piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
          xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
          isPreviousElementTag = true;
          continue;
        }
        let newIdentation = indentation;
        if (newIdentation !== "") {
          newIdentation += options.indentBy;
        }
        const attStr = attr_to_str(tagObj[":@"], options);
        const tagStart = indentation + `<${tagName}${attStr}`;
        const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
        if (options.unpairedTags.indexOf(tagName) !== -1) {
          if (options.suppressUnpairedNode) xmlStr += tagStart + ">";
          else xmlStr += tagStart + "/>";
        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
          xmlStr += tagStart + "/>";
        } else if (tagValue && tagValue.endsWith(">")) {
          xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
        } else {
          xmlStr += tagStart + ">";
          if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
            xmlStr += indentation + options.indentBy + tagValue + indentation;
          } else {
            xmlStr += tagValue;
          }
          xmlStr += `</${tagName}>`;
        }
        isPreviousElementTag = true;
      }
      return xmlStr;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!obj.hasOwnProperty(key)) continue;
        if (key !== ":@") return key;
      }
    }
    function attr_to_str(attrMap, options) {
      let attrStr = "";
      if (attrMap && !options.ignoreAttributes) {
        for (let attr in attrMap) {
          if (!attrMap.hasOwnProperty(attr)) continue;
          let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
          attrVal = replaceEntitiesValue(attrVal, options);
          if (attrVal === true && options.suppressBooleanAttributes) {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
          } else {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
          }
        }
      }
      return attrStr;
    }
    function isStopNode(jPath, options) {
      jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
      let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
      for (let index in options.stopNodes) {
        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName) return true;
      }
      return false;
    }
    function replaceEntitiesValue(textValue, options) {
      if (textValue && textValue.length > 0 && options.processEntities) {
        for (let i = 0; i < options.entities.length; i++) {
          const entity = options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    }
    module.exports = toXml;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
var require_json2xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js"(exports, module) {
    "use strict";
    var buildFromOrderedJs = require_orderedJs2Xml();
    var getIgnoreAttributesFn = require_ignoreAttributes();
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataPropName: false,
      format: false,
      indentBy: "  ",
      suppressEmptyNode: false,
      suppressUnpairedNode: true,
      suppressBooleanAttributes: true,
      tagValueProcessor: function(key, a) {
        return a;
      },
      attributeValueProcessor: function(attrName, a) {
        return a;
      },
      preserveOrder: false,
      commentPropName: false,
      unpairedTags: [],
      entities: [
        { regex: new RegExp("&", "g"), val: "&amp;" },
        //it must be on top
        { regex: new RegExp(">", "g"), val: "&gt;" },
        { regex: new RegExp("<", "g"), val: "&lt;" },
        { regex: new RegExp("'", "g"), val: "&apos;" },
        { regex: new RegExp('"', "g"), val: "&quot;" }
      ],
      processEntities: true,
      stopNodes: [],
      // transformTagName: false,
      // transformAttributeName: false,
      oneListGroup: false
    };
    function Builder(options) {
      this.options = Object.assign({}, defaultOptions, options);
      if (this.options.ignoreAttributes === true || this.options.attributesGroupName) {
        this.isAttribute = function() {
          return false;
        };
      } else {
        this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
      }
      this.processTextOrObjNode = processTextOrObjNode;
      if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
      } else {
        this.indentate = function() {
          return "";
        };
        this.tagEndChar = ">";
        this.newLine = "";
      }
    }
    Builder.prototype.build = function(jObj) {
      if (this.options.preserveOrder) {
        return buildFromOrderedJs(jObj, this.options);
      } else {
        if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
          jObj = {
            [this.options.arrayNodeName]: jObj
          };
        }
        return this.j2x(jObj, 0, []).val;
      }
    };
    Builder.prototype.j2x = function(jObj, level, ajPath) {
      let attrStr = "";
      let val2 = "";
      const jPath = ajPath.join(".");
      for (let key in jObj) {
        if (!Object.prototype.hasOwnProperty.call(jObj, key)) continue;
        if (typeof jObj[key] === "undefined") {
          if (this.isAttribute(key)) {
            val2 += "";
          }
        } else if (jObj[key] === null) {
          if (this.isAttribute(key)) {
            val2 += "";
          } else if (key[0] === "?") {
            val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          } else {
            val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          }
        } else if (jObj[key] instanceof Date) {
          val2 += this.buildTextValNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr && !this.ignoreAttributesFn(attr, jPath)) {
            attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
          } else if (!attr) {
            if (key === this.options.textNodeName) {
              let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
              val2 += this.replaceEntitiesValue(newval);
            } else {
              val2 += this.buildTextValNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          const arrLen = jObj[key].length;
          let listTagVal = "";
          let listTagAttr = "";
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined") {
            } else if (item === null) {
              if (key[0] === "?") val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
              else val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              if (this.options.oneListGroup) {
                const result = this.j2x(item, level + 1, ajPath.concat(key));
                listTagVal += result.val;
                if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
                  listTagAttr += result.attrStr;
                }
              } else {
                listTagVal += this.processTextOrObjNode(item, key, level, ajPath);
              }
            } else {
              if (this.options.oneListGroup) {
                let textValue = this.options.tagValueProcessor(key, item);
                textValue = this.replaceEntitiesValue(textValue);
                listTagVal += textValue;
              } else {
                listTagVal += this.buildTextValNode(item, key, "", level);
              }
            }
          }
          if (this.options.oneListGroup) {
            listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
          }
          val2 += listTagVal;
        } else {
          if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
            }
          } else {
            val2 += this.processTextOrObjNode(jObj[key], key, level, ajPath);
          }
        }
      }
      return { attrStr, val: val2 };
    };
    Builder.prototype.buildAttrPairStr = function(attrName, val2) {
      val2 = this.options.attributeValueProcessor(attrName, "" + val2);
      val2 = this.replaceEntitiesValue(val2);
      if (this.options.suppressBooleanAttributes && val2 === "true") {
        return " " + attrName;
      } else return " " + attrName + '="' + val2 + '"';
    };
    function processTextOrObjNode(object, key, level, ajPath) {
      const result = this.j2x(object, level + 1, ajPath.concat(key));
      if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
        return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
      } else {
        return this.buildObjectNode(result.val, key, result.attrStr, level);
      }
    }
    Builder.prototype.buildObjectNode = function(val2, key, attrStr, level) {
      if (val2 === "") {
        if (key[0] === "?") return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        }
      } else {
        let tagEndExp = "</" + key + this.tagEndChar;
        let piClosingChar = "";
        if (key[0] === "?") {
          piClosingChar = "?";
          tagEndExp = "";
        }
        if ((attrStr || attrStr === "") && val2.indexOf("<") === -1) {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val2 + tagEndExp;
        } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
          return this.indentate(level) + `<!--${val2}-->` + this.newLine;
        } else {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val2 + this.indentate(level) + tagEndExp;
        }
      }
    };
    Builder.prototype.closeTag = function(key) {
      let closeTag = "";
      if (this.options.unpairedTags.indexOf(key) !== -1) {
        if (!this.options.suppressUnpairedNode) closeTag = "/";
      } else if (this.options.suppressEmptyNode) {
        closeTag = "/";
      } else {
        closeTag = `></${key}`;
      }
      return closeTag;
    };
    Builder.prototype.buildTextValNode = function(val2, key, attrStr, level) {
      if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
        return this.indentate(level) + `<![CDATA[${val2}]]>` + this.newLine;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
        return this.indentate(level) + `<!--${val2}-->` + this.newLine;
      } else if (key[0] === "?") {
        return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      } else {
        let textValue = this.options.tagValueProcessor(key, val2);
        textValue = this.replaceEntitiesValue(textValue);
        if (textValue === "") {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        } else {
          return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
        }
      }
    };
    Builder.prototype.replaceEntitiesValue = function(textValue) {
      if (textValue && textValue.length > 0 && this.options.processEntities) {
        for (let i = 0; i < this.options.entities.length; i++) {
          const entity = this.options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    };
    function indentate(level) {
      return this.options.indentBy.repeat(level);
    }
    function isAttribute(name) {
      if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
        return name.substr(this.attrPrefixLen);
      } else {
        return false;
      }
    }
    module.exports = Builder;
  }
});

// node_modules/fast-xml-parser/src/fxp.js
var require_fxp = __commonJS({
  "node_modules/fast-xml-parser/src/fxp.js"(exports, module) {
    "use strict";
    var validator = require_validator();
    var XMLParser2 = require_XMLParser();
    var XMLBuilder = require_json2xml();
    module.exports = {
      XMLParser: XMLParser2,
      XMLValidator: validator,
      XMLBuilder
    };
  }
});

// projects/story0/index.ts
var story0_exports = {};
__export(story0_exports, {
  PageAnimation: () => PageAnimation,
  PageAnimationInNav: () => PageAnimationInNav,
  PageMatrix: () => PageMatrix,
  PageMatrixH: () => PageMatrixH,
  PageMatrixHInNav: () => PageMatrixHInNav,
  PageMatrixInNav: () => PageMatrixInNav,
  PagePresent: () => PagePresent,
  PagePresentInNav: () => PagePresentInNav,
  PagePushPop1: () => PagePushPop1,
  PagePushPop2: () => PagePushPop2,
  PagePushPopInNav: () => PagePushPopInNav,
  PageRss: () => PageRss,
  PageRssBar: () => PageRssBar,
  PageRssBarInNav: () => PageRssBarInNav,
  PageRssDetail: () => PageRssDetail,
  PageRssInNav: () => PageRssInNav,
  PageStack: () => PageStack,
  PageStack1: () => PageStack1,
  PageStack1InNav: () => PageStack1InNav,
  PageStackInNav: () => PageStackInNav,
  PageTest: () => PageTest,
  PageTest1: () => PageTest1,
  PageTestInNav: () => PageTestInNav,
  Tab: () => Tab,
  asyncFunctionError: () => asyncFunctionError,
  changeNavInfo: () => changeNavInfo,
  decreaseStackCountFunction: () => decreaseStackCountFunction,
  fetchRss: () => fetchRss,
  focusedRssItemDidChange: () => focusedRssItemDidChange,
  greet: () => greet,
  increaseStackCountFunction: () => increaseStackCountFunction,
  infoDidChange: () => infoDidChange,
  infoFromParentDidChange: () => infoFromParentDidChange,
  makePageNav: () => makePageNav,
  onMeasure: () => onMeasure,
  onMove: () => onMove,
  onMoveEnd: () => onMoveEnd,
  onPlaying: () => onPlaying,
  onPlayingProgressChange: () => onPlayingProgressChange,
  onPlayingStart: () => onPlayingStart,
  onTapRssItem: () => onTapRssItem,
  openaiTest: () => openaiTest,
  root: () => Tab,
  rssDidChange: () => rssDidChange,
  stackCountDidChange: () => stackCountDidChange,
  timeoutTest: () => timeoutTest,
  worldTimeTest: () => worldTimeTest
});

// types/event.ts
var br = {
  type: "break"
};

// types/util.ts
var edge = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var back = {
  style: {
    background: "#666"
  },
  dimension: edge
};
var back1 = {
  style: {
    background: "#999"
  },
  dimension: edge
};
var spacer = {
  type: "spacer"
};
var numbers = [
  "0 0 0 0 0",
  "1 1 1 1 1",
  "2 2 2 2 2",
  "3 3 3 3 3",
  "4 4 4 4 4"
];
var texts = [
  "[0] - The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[1] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[2] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[3] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[4] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[5] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[6] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[7] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[8] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[9] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[10] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[11] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[12] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[13] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[14] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[15] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[16] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[17] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[18] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[19] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[20] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[21] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[22] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[23] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[24] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[25] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[26] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[27] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[28] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[29] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[30] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[31] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[32] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[33] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[34] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[35] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[36] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[37] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[38] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[39] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[40] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[41] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[42] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[43] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[44] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[45] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[46] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[47] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[48] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[49] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[50] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[51] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[52] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[53] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[54] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[55] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[56] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[57] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[58] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[59] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[60] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[61] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[62] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[63] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[64] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[65] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[66] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[67] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[68] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[69] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[70] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[71] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[72] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[73] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[74] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[75] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[76] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[77] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[78] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[79] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[80] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[81] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[82] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[83] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[84] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[85] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[86] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[87] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[88] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[89] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[90] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[91] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[92] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[93] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[94] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[95] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[96] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[97] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[98] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[99] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[100] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[101] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[102] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[103] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[104] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[105] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[106] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[107] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[108] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[109] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[110] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[111] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[112] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[113] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[114] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[115] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[116] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[117] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[118] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[119] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[120] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[121] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[122] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[123] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[124] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[125] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[126] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[127] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[128] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.-"
];

// projects/story0/page-nav.ts
function makePageNav(subpages2) {
  const title = {
    text: {
      content: [
        {
          content: "123",
          size: 12
        },
        {
          content: "456"
        },
        {
          content: "\n789",
          size: 12,
          color: "#0fF3"
        }
      ],
      lineHeightMultiple: 1.5,
      size: 20,
      color: "#0fF",
      lines: 0
    },
    dimension: {
      centerX: 0,
      centerY: 0
    },
    style: {
      background: "#0003"
    }
  };
  const dismissButton = {
    type: "touchFade",
    onTap: "dismiss",
    dimension: {
      height: 60,
      width: 60,
      top: 0,
      right: 0
    },
    style: {
      background: "#0003"
    }
  };
  const popButton = {
    type: "touchFade",
    id: "popButton",
    onTap: "pop",
    dimension: {
      height: 60,
      width: 60,
      top: 0,
      left: 0
    },
    style: {
      opacity: 0,
      background: "#0003"
    }
  };
  const nav = {
    type: "nav",
    subpages: subpages2,
    subviews: {
      type: "blur",
      dimension: {
        top: 0,
        left: 0,
        right: 0,
        unsafeAt: "top"
      },
      style: {
        background: "#0003"
      },
      subviews: {
        dimension: {
          left: 0,
          right: 0,
          height: 60,
          bottom: 0,
          topSafe: 0
        },
        subviews: [
          popButton,
          { ...title, type: "label" },
          { ...title, type: "text" },
          dismissButton
        ]
      }
    },
    stateMap: {
      stackCount: {
        type: "state",
        value: 0,
        onChange: "stackCountDidChange"
      }
    },
    onPush: "onPush",
    onPop: "onPop",
    eventMap: {
      stackCountDidChange: "stackCountDidChange",
      dismiss: {
        type: "navigation",
        navigation: "dismiss"
      },
      pop: {
        type: "navigation",
        navigation: "pop"
      },
      onPush: "increaseStackCountFunction",
      onPop: "decreaseStackCountFunction"
    }
  };
  return nav;
}
function increaseStackCountFunction(argument) {
  return updateStackCountHelper(argument, 1);
}
function decreaseStackCountFunction(argument) {
  return updateStackCountHelper(argument, -1);
}
function stackCountDidChange(argument) {
  const value = argument.stateInfo["stackCount"];
  return {
    type: "view",
    view: {
      popButton: {
        style: {
          opacity: value === 0 ? 0 : 1
        }
      }
    },
    duration: 0.5
  };
}
function updateStackCountHelper(argument, diff) {
  const value = argument.stateInfo["stackCount"];
  return {
    type: "state",
    state: {
      stackCount: value + diff
    }
  };
}

// projects/story0/page-present.ts
var PageAnimation = {
  subviews: {
    dimension: edge,
    style: {
      background: "#fff"
    },
    subviews: {
      dimension: {
        topSafe: 0,
        bottomSafe: 0,
        left: 0,
        right: 0
      },
      style: {
        background: "#0003"
      },
      subviews: [
        {
          id: "symbol1",
          type: "symbol",
          symbol: {
            name: "square",
            size: 50,
            color: "#000"
          },
          style: {
            background: "#3333"
          },
          dimension: {
            centerX: 0,
            centerY: 0,
            width: 50,
            height: 50
          }
        },
        {
          id: "removeView",
          dimension: {
            height: 60,
            left: 0,
            right: 120,
            bottom: 0
          },
          subviews: {
            id: "text1",
            type: "label",
            text: { content: "text test" },
            dimension: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          style: {
            background: "#f00"
          }
        },
        {
          type: "touchFade",
          onTap: "sizeTo100",
          dimension: {
            height: 60,
            width: 60,
            right: 0,
            bottom: 0
          },
          style: {
            background: "#0003"
          }
        },
        {
          type: "touchFade",
          onTap: "sizeTo200",
          dimension: {
            height: 60,
            width: 60,
            right: 60,
            bottom: 0
          },
          style: {
            background: "#3333"
          }
        }
      ]
    }
  },
  eventMap: {
    dismissButtonDidTap: {
      type: "navigation",
      navigation: "dismiss"
    },
    sizeTo100: [
      {
        type: "view",
        duration: 0.5,
        view: {
          removeView: {
            style: { opacity: 0 }
          }
        }
      },
      br,
      {
        type: "view",
        duration: 2,
        view: {
          removeView: {
            style: { opacity: 1 }
          },
          text1: {
            id: "text1",
            type: "label",
            text: { content: "CHANGE" }
          },
          symbol1: {
            symbol: {
              name: "square",
              size: 100,
              color: "#000"
            },
            style: {
              transform: {
                rotate: 30
              }
            },
            dimension: {
              centerX: 0,
              centerY: 0,
              width: 100,
              height: 100
            }
          }
        }
      }
    ],
    sizeTo200: {
      type: "view",
      view: {
        symbol1: {
          symbol: {
            name: "square",
            size: 200,
            color: "#00f"
          },
          dimension: {
            centerX: 0,
            centerY: 0,
            width: 200,
            height: 200
          },
          style: {
            transform: {
              rotate: 0
            }
          }
        },
        text1: {
          text: { content: "text1" },
          style: {
            background: "#0003"
          }
        }
      },
      duration: 2
    }
  }
};
var PageAnimationInNav = makePageNav(["PageAnimation"]);
var PagePresentInNav = makePageNav(["PagePresent"]);
var PagePresent = {
  subviews: {
    dimension: edge,
    style: {
      background: "#fff"
    },
    subviews: {
      type: "touchFade",
      onTap: "present",
      dimension: {
        height: 100,
        width: 100,
        centerX: 0,
        centerY: 0
      },
      style: {
        background: "#0003"
      }
    }
  },
  eventMap: {
    present: {
      type: "navigation",
      navigation: "overlay",
      pageName: "PageAnimationInNav"
    }
  }
};

// projects/story0/page-matrix.ts
var PageMatrixInNav = makePageNav(["PageMatrix"]);
var PageMatrix = {
  subviews: {
    type: "scroll",
    dimension: edge,
    subviews: {
      type: "matrix",
      dimension: {
        widthSafe: "100%",
        top: 0,
        bottom: 0,
        leftSafe: 0,
        right: 0
      },
      style: {
        background: "#eee"
      },
      matrix: {
        content: Array.from(texts, (content) => ({
          type: "stack",
          dimension: edge,
          stack: {
            direction: "vertical"
          },
          subviews: [
            {
              type: "label",
              text: {
                content,
                design: "monospaced"
              },
              dimension: {
                left: 0,
                right: 0
              }
            },
            spacer
          ]
        })),
        itemSize: {
          width: "50%"
        },
        direction: "vertical"
      }
    }
  }
};

// projects/story0/page-matrix-h.ts
var PageMatrixHInNav = makePageNav(["PageMatrixH"]);
var PageMatrixH = {
  subviews: {
    type: "scroll",
    dimension: edge,
    subviews: {
      type: "matrix",
      dimension: {
        heightSafe: "100%",
        topSafe: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      style: {
        background: "#eee"
      },
      matrix: {
        content: Array.from(texts, (content) => ({
          type: "stack",
          dimension: edge,
          stack: {
            direction: "vertical"
          },
          subviews: [
            {
              type: "label",
              text: {
                content,
                design: "monospaced"
              },
              dimension: {
                left: 0,
                right: 0
              }
            },
            spacer
          ]
        })),
        itemSize: {
          height: "50%",
          width: 200
        },
        direction: "horizontal"
      }
    }
  }
};

// projects/story0/page-push.ts
function makePage(flag) {
  return {
    stateMap: {
      info: {
        type: "state",
        value: flag ? "yellow" : "purple",
        onChange: "infoDidChange"
      },
      infoFromParent: {
        type: "bind",
        onChange: "infoFromParentDidChange"
      }
    },
    eventMap: {
      infoDidChange: "infoDidChange",
      infoFromParentDidChange: "infoFromParentDidChange",
      worldTimeTest: "worldTimeTest",
      changeNavInfo: "changeNavInfo"
    },
    subviews: {
      dimension: edge,
      style: {
        background: flag ? "#ffc" : "#ccf"
      },
      subviews: [
        {
          id: "infoLabel",
          type: "label",
          text: {
            content: "infoLabel"
          },
          dimension: {
            height: 20,
            centerX: 0,
            topSafe: 0
          }
        },
        {
          id: "infoFromParentLabel",
          type: "label",
          text: {
            content: "infoFromParentLabel"
          },
          dimension: {
            height: 20,
            centerX: 0,
            topSafe: 20
          }
        },
        {
          type: "touchFade",
          onTap: flag ? "pushPage2" : "pushPage1",
          dimension: {
            height: 200,
            width: 100,
            centerX: 0,
            centerYSafe: 0
          },
          style: {
            background: flag ? "#fff" : "#000"
          }
        },
        {
          type: "touchFade",
          onTap: ["worldTimeTest", "changeNavInfo"],
          dimension: {
            height: 100,
            width: 100,
            centerX: 0,
            bottomSafe: 0
          },
          style: {
            background: "#f55"
          }
        }
      ]
    }
  };
}
var PagePushPop1 = makePage(true);
var PagePushPop2 = makePage(false);
var PagePushPopInNav = (() => {
  const nav = makePageNav(["PagePushPop1"]);
  nav.eventMap = {
    ...nav.eventMap,
    pushPage2: {
      type: "navigation",
      navigation: "push",
      pageName: "PagePushPop2"
    },
    pushPage1: {
      type: "navigation",
      navigation: "push",
      pageName: "PagePushPop1"
    }
  };
  nav.stateMap = {
    ...nav.stateMap,
    infoFromParent: {
      type: "state",
      value: "PagePushPop1"
    }
  };
  return nav;
})();
function changeNavInfo(_) {
  return {
    type: "state",
    state: {
      infoFromParent: "PagePushPop1" + Math.random()
    }
  };
}
function infoDidChange(argument) {
  const info = argument.stateInfo["info"];
  return {
    type: "view",
    view: {
      infoLabel: {
        text: {
          content: `page is ${info}`
        }
      }
    }
  };
}
function infoFromParentDidChange(argument) {
  const infoFromParent = argument.stateInfo["infoFromParent"];
  return {
    type: "view",
    view: {
      infoFromParentLabel: {
        text: {
          content: `parent is ${infoFromParent}`
        }
      }
    }
  };
}

// projects/story0/page-rss.ts
var import_fast_xml_parser = __toESM(require_fxp());

// types/native.ts
var NativeModule = NativeModuleManager;

// projects/story0/page-rss.ts
var PageRssInNav = (() => {
  const nav = makePageNav(["PageRss"]);
  nav.stateMap = {
    ...nav.stateMap,
    focusedRssItem: {
      type: "state",
      value: null
    }
  };
  nav.eventMap = {
    ...nav.eventMap,
    onTapRssItem: "onTapRssItem"
  };
  return nav;
})();
var PageRssDetail = {
  stateMap: {
    focusedRssItem: {
      type: "bind",
      onChange: "focusedRssItemDidChange"
    }
  },
  eventMap: {
    test: [
      {
        type: "view",
        view: {
          audioView: {
            action: {
              play: "pause"
            }
          }
        }
      }
    ],
    focusedRssItemDidChange: "focusedRssItemDidChange"
  },
  subviews: {
    type: "scroll",
    style: {
      background: "#fff"
    },
    dimension: edge,
    subviews: {
      type: "stack",
      stack: {
        alignment: "center"
      },
      dimension: {
        top: 0,
        leftSafe: 60,
        rightSafe: 60,
        bottom: 0
      },
      style: {
        background: "#fff"
      },
      subviews: [
        {
          id: "testLabel",
          type: "label",
          text: {
            content: "123"
          }
        },
        {
          type: "touchFade",
          dimension: {
            height: 60,
            width: 60
          },
          style: { background: "#f00" },
          onTap: "test"
        },
        {
          id: "imageView",
          type: "image",
          dimension: {
            height: 120,
            width: 120
          }
        },
        {
          id: "audioView",
          type: "audio",
          dimension: {
            height: 60,
            width: 60
          },
          style: {
            background: "#aaf3"
          },
          systemControl: {
            skipForward: 45,
            skipBackward: true
          }
        },
        {
          id: "titleView",
          type: "label",
          text: {
            // content: 'label',
            size: 24,
            weight: "semibold"
          },
          dimension: {
            left: 0,
            right: 0
          }
        },
        {
          id: "descriptionView",
          type: "label",
          text: {
            size: 18
            // content: 'label',
          },
          dimension: {
            left: 0,
            right: 0
          }
        }
      ]
    }
  }
};
var PageRss = {
  stateMap: {
    rss: {
      type: "state",
      value: null,
      onChange: "rssDidChange"
    }
  },
  onLoad: ["fetchRss", "onLoad"],
  onUnload: "onUnload",
  eventMap: {
    onLoad: [],
    onUnload: [],
    rssDidChange: "rssDidChange",
    fetchRss: "fetchRss"
  },
  subviews: {
    type: "scroll",
    dimension: edge,
    style: {
      background: "#fff"
    },
    subviews: {
      id: "rssList",
      type: "matrix",
      dimension: {
        widthSafe: "100%",
        top: 0,
        bottom: 0,
        leftSafe: 0,
        right: 0
      },
      style: {
        background: "#eee"
      },
      matrix: {
        content: [],
        itemSize: {
          width: "50%"
        },
        direction: "vertical"
      }
    }
  }
};
function onTapRssItem(argument) {
  return [
    {
      type: "state",
      state: {
        focusedRssItem: argument.userInfo
      }
    },
    {
      type: "navigation",
      navigation: "push",
      pageName: "PageRssDetail"
    }
  ];
}
function focusedRssItemDidChange(argument) {
  const value = argument.stateInfo["focusedRssItem"];
  const channelTitle = value["channelTitle"];
  const channelImage = value["channelImage"];
  const image = value["itunes:image"].href;
  const url = value["enclosure"].url;
  const description = value["description"];
  const title = value["title"];
  const author = value["itunes:author"];
  return {
    type: "view",
    view: {
      audioView: {
        audio: {
          url,
          image,
          title,
          author,
          channelTitle
        },
        action: {
          play: "current"
        }
      },
      titleView: {
        text: {
          content: title
        }
      },
      descriptionView: {
        text: {
          content: description
        }
      },
      imageView: {
        image: {
          url: channelImage
        }
      }
    }
  };
}
function rssDidChange(argument) {
  const value = argument.stateInfo["rss"];
  if (!value) {
    return;
  }
  const items = value["item"];
  const channelTitle = value["title"];
  const channelImage = value["itunes:image"].href;
  const rssList = {
    matrix: {
      content: Array.from(items, (item) => {
        const view = {
          type: "touch",
          dimension: edge,
          userInfo: { ...item, channelTitle, channelImage },
          onTap: "onTapRssItem",
          subviews: {
            type: "stack",
            dimension: edge,
            stack: {
              direction: "vertical"
            },
            subviews: [
              {
                type: "image",
                image: {
                  url: item["itunes:image"].href
                },
                dimension: {
                  left: 0,
                  right: 0,
                  height: 100
                }
              },
              {
                type: "label",
                text: {
                  content: item["title"],
                  design: "monospaced"
                },
                dimension: {
                  left: 0,
                  right: 0
                }
              },
              spacer
            ]
          }
        };
        return view;
      })
    }
  };
  return {
    type: "view",
    view: {
      rssList
    }
  };
}
async function fetchRss() {
  const list = [
    "https://feeds.feedburner.com/tedtalks_audio",
    "https://uxcoffee.typlog.io/episodes/feed.xml",
    "https://www.ximalaya.com/album/20230759.xml"
  ];
  return NativeModule.fetch(list[1]).then((text) => {
    const x = new import_fast_xml_parser.XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    });
    const channel = x.parse(text).rss.channel;
    return {
      type: "state",
      state: {
        rss: channel
      }
    };
  });
}

// projects/story0/page-rss-bar.ts
var PageRssBarInNav = (() => {
  const nav = makePageNav(["PageRssBar"]);
  return nav;
})();
var PageRssBar = {
  stateMap: {
    slideSpace: { type: "state", value: 0 },
    playingProgress: { type: "state", value: 0, onChange: "onPlayingProgressChange" }
  },
  eventMap: {
    onPlaying: "onPlaying",
    onPlayingStart: "onPlayingStart",
    onMove: "onMove",
    onPlayingProgressChange: "onPlayingProgressChange",
    onMoveEnd: "onMoveEnd",
    onMeasure: "onMeasure",
    playAudio1: {
      type: "view",
      view: {
        audio1: {
          action: {
            play: "current"
          }
        }
      }
    },
    pauseAudio1: {
      type: "view",
      view: {
        audio1: {
          action: {
            play: "pause"
          }
        }
      }
    }
  },
  subviews: [
    {
      id: "audio1",
      type: "audio",
      audio: [
        {
          url: "https://r.typlog.com/eyJzIjo5OTAsImUiOjUzMjA2LCJ0IjoxfQ.qx04nTcOXMme9ZMJbLaB5zvkTfo/uxcoffee/8355695624_569198.mp3",
          image: "https://i.typlog.com/uxcoffee/8355695599_037928.png?x-oss-process=style/sl",
          title: "\u6C38\u4E0D\u505C\u6B62\u7684\u5217\u8F661",
          channelTitle: "\u8BBE\u8BA1\u5496",
          author: "UXCoffee"
        },
        {
          url: "https://r.typlog.com/eyJzIjo5OTAsImUiOjQ5NDU3LCJ0IjoxfQ.EWALlS08FNGbzZ2ceQ84M_e8aXw/uxcoffee/8364249593_966076.mp3",
          image: "https://i0.hdslb.com/bfs/face/8695e4f04ce6edc56ad53b09c78e63d4b8f289f6.jpg",
          title: "\u4EA7\u54C1\u4EBA\u7684\u5984\u5FF52",
          channelTitle: "\u8BBE\u8BA1\u5496",
          author: "UXCoffee"
        },
        {
          url: "https://r.typlog.com/eyJzIjo5OTAsImUiOjQ5NDU3LCJ0IjoxfQ.EWALlS08FNGbzZ2ceQ84M_e8aXw/uxcoffee/8364249593_966076.mp3",
          image: "https://i0.hdslb.com/bfs/face/8695e4f04ce6edc56ad53b09c78e63d4b8f289f6.jpg",
          title: "\u4EA7\u54C1\u4EBA\u7684\u5984\u5FF53",
          channelTitle: "\u8BBE\u8BA1\u5496",
          author: "UXCoffee"
        }
      ],
      action: {
        play: "current"
      },
      // loop: 'random',
      onPlaying: "onPlaying",
      onPlayingStart: "onPlayingStart",
      systemControl: {
        // skipBackward: 15,
        // skipForward: 60,
        previousTrack: true,
        nextTrack: true
      }
    },
    {
      type: "touchFade",
      onTap: "playAudio1",
      dimension: {
        left: 0,
        width: 60,
        height: 60,
        centerY: 0
      },
      style: {
        background: "#aaf"
      }
    },
    {
      type: "touchFade",
      onTap: "pauseAudio1",
      dimension: {
        left: 0,
        width: 60,
        height: 60,
        centerY: 120
      },
      style: {
        background: "#faa"
      }
    },
    {
      type: "measure",
      onMeasure: "onMeasure",
      dimension: {
        left: 60,
        right: 60,
        height: 60,
        topSafe: 120
      },
      style: {
        background: "#f004"
      },
      subviews: {
        id: "dragView",
        type: "touch",
        onMove: "onMove",
        onMoveEnd: "onMoveEnd",
        dimension: {
          left: 0,
          centerY: 0,
          height: 40,
          width: 40
        },
        style: {
          background: "#f004"
        }
      }
    }
  ]
};
function onMove(argument) {
  const prevProgress = argument.stateInfo["playingProgress"];
  const space = argument.stateInfo["slideSpace"];
  const prevLength = prevProgress * space;
  const dx = argument.systemInfo.dx;
  const nextLength = prevLength + dx;
  const safeLength = Math.min(Math.max(nextLength, 0), space);
  const nextProgress = safeLength / space;
  return [
    {
      type: "state",
      state: {
        playingProgress: nextProgress
      }
    },
    {
      type: "view",
      view: {
        audio1: {
          onPlayingEnable: false
        }
      }
    }
  ];
}
function onPlaying(argument) {
  const systemInfo = argument.systemInfo;
  const time = systemInfo["time"];
  const duration = systemInfo["duration"];
  let nextProgress = time / duration;
  if (Number.isNaN(nextProgress)) {
    nextProgress = 0;
  }
  return {
    type: "state",
    state: {
      playingProgress: nextProgress
    }
  };
}
function onPlayingProgressChange(argument) {
  const progress = argument.stateInfo["playingProgress"];
  const space = argument.stateInfo["slideSpace"];
  const offset = progress * space;
  return {
    type: "view",
    view: {
      dragView: {
        dimension: {
          left: offset
        }
      }
    }
  };
}
function onMoveEnd(argument) {
  const progress = argument.stateInfo["playingProgress"];
  return {
    type: "view",
    view: {
      audio1: {
        onPlayingEnable: true,
        action: {
          time: progress.toString()
        }
      }
    }
  };
}
function onMeasure(argument) {
  const slideSpace = Math.max(0, argument.systemInfo.width - 40);
  return {
    type: "state",
    state: {
      slideSpace
    }
  };
}
function onPlayingStart(argument) {
  console.log(JSON.stringify(argument));
  return [];
}

// projects/story0/page-stack.ts
var PageStackInNav = makePageNav(["PageStack"]);
var PageStack1InNav = makePageNav(["PageStack1"]);
var PageStack = {
  subviews: {
    type: "scroll",
    dimension: edge,
    style: { background: "#f003" },
    subviews: {
      type: "stack",
      dimension: {
        top: 0,
        leftSafe: 0,
        rightSafe: 0,
        bottom: 0
      },
      style: { background: "#f00", opacity: 1 },
      stack: {
        direction: "vertical",
        distribution: "fill"
      },
      subviews: [
        {
          style: { background: "#f003" },
          type: "label",
          text: {
            content: texts[0],
            design: "monospaced"
          },
          dimension: {
            width: "100%"
          }
        },
        {
          type: "stack",
          style: { background: "#0002" },
          stack: {
            direction: "horizontal",
            distribution: "fillEqually",
            alignment: "leading"
          },
          dimension: {
            // width: 150,
          },
          subviews: [
            {
              type: "label",
              text: {
                content: texts[1],
                design: "monospaced"
              },
              style: { background: "#00f3" }
            },
            {
              type: "label",
              text: {
                content: texts[2],
                design: "monospaced"
              },
              style: { background: "#0f03" }
            }
          ]
        },
        {
          type: "label",
          text: {
            content: texts[3],
            design: "monospaced"
          },
          style: { background: "#0f03" }
        }
        // spacer,
      ]
    }
  }
};
var PageStack1 = {
  subviews: [
    {
      type: "stack",
      dimension: {
        top: 200,
        left: 0,
        width: 300,
        height: 200
      },
      style: { background: "#0008", opacity: 1 },
      stack: {
        distribution: "fill",
        direction: "vertical"
      },
      subviews: [
        {
          type: "label",
          text: {
            content: numbers[0],
            design: "monospaced"
          },
          style: { background: "#00f3" }
        },
        {
          type: "stack",
          style: { background: "#f003" },
          stack: {
            direction: "horizontal",
            distribution: "fill"
          },
          subviews: [
            {
              type: "label",
              text: {
                content: numbers[1],
                design: "monospaced"
              },
              style: { background: "#00f3" }
            },
            {
              type: "label",
              text: {
                content: numbers[2],
                design: "monospaced"
              },
              style: { background: "#0f03" }
            }
          ]
        },
        {
          type: "label",
          text: {
            content: numbers[3],
            design: "monospaced"
          },
          style: { background: "#0f03" }
        }
      ]
    },
    {
      dimension: {
        top: 500,
        left: 0,
        width: 300
      },
      type: "stack",
      style: { background: "#0008", opacity: 1 },
      stack: {
        direction: "horizontal",
        distribution: "fill"
      },
      subviews: [
        {
          type: "label",
          text: {
            content: numbers[1],
            design: "monospaced"
          },
          style: { background: "#00f3" }
        },
        {
          type: "label",
          text: {
            content: numbers[2],
            design: "monospaced"
          },
          style: { background: "#0f03" }
        }
      ]
    }
  ]
};

// projects/story0/page-test.ts
var PageTestInNav = (() => {
  const nav = makePageNav(["PageTest"]);
  nav.eventMap = {
    ...nav.eventMap,
    push: {
      type: "navigation",
      navigation: "push",
      pageName: "PageTest1"
    }
  };
  return nav;
})();
var PageTest = {
  subviews: [
    back,
    {
      type: "touchFade",
      dimension: {
        width: 200,
        height: 200
      },
      style: {
        background: "#00f"
      },
      onTap: "push"
    }
  ]
};
var PageTest1 = {
  subviews: [
    back1,
    {
      dimension: {
        leftSafe: 0,
        rightSafe: 0,
        topSafe: 0,
        bottomSafe: 0
      },
      subviews: {
        type: "label",
        text: {
          content: "hello world"
        },
        dimension: {
          left: 0,
          right: 0,
          height: 100,
          width: 102
        }
      }
    },
    {
      type: "touchFade",
      dimension: {
        width: 200,
        height: 200
      },
      onTap: "push"
    }
  ]
};

// projects/story0/functions-test.ts
async function worldTimeTest() {
  return NativeModule.fetch("https://worldtimeapi.org/api/timezone/Etc/UTC").then((text) => {
    console.log(text);
  });
}
async function openaiTest() {
  return NativeModule.fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ""
    },
    body: JSON.stringify({
      messages: [
        {
          content: "\u4ECA\u5929",
          role: "user"
        }
      ],
      model: "gpt-3.5-turbo"
    })
  }).then((data) => JSON.parse(data));
}
async function timeoutTest() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve("Hello from JS async");
    }, 500);
  });
}
async function asyncFunctionError() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      try {
        throw new Error("Something went wrong!");
      } catch (error) {
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error("Non-error object thrown"));
        }
      }
    }, 500);
  });
}
function greet(argument) {
  const a = argument.stateInfo["a"];
  const b = argument.stateInfo["b"];
  return "Hello, " + a + b + "!";
}

// projects/story0/page-tab.ts
var subpages = [
  "PageRssBarInNav",
  "PageRssInNav",
  "PagePushPopInNav",
  "PagePresentInNav",
  "PageMatrixHInNav",
  "PageMatrixInNav",
  "PageStackInNav",
  "PageStack1InNav"
];
var Tab = {
  type: "tab",
  subpages,
  subviews: [
    {
      style: {
        background: "#fff",
        zPosition: -1e3,
        interactive: false
      },
      dimension: edge
    },
    {
      type: "blur",
      dimension: {
        bottom: 0,
        left: 0,
        right: 0,
        unsafeAt: "bottom"
      },
      style: {
        background: "#00f3"
      },
      subviews: makeTabs()
    }
  ],
  eventMap: makeEventsMap()
};
function makeEventsMap() {
  const eventMap = {};
  for (const key of subpages) {
    eventMap[key] = {
      type: "navigation",
      pageName: key,
      navigation: "select"
    };
  }
  return eventMap;
}
function makeTabs() {
  return {
    type: "stack",
    stack: {
      direction: "horizontal",
      distribution: "fillProportionally"
    },
    dimension: {
      left: 0,
      right: 0,
      top: 0,
      bottomSafe: 0
    },
    style: {
      background: "#00f3"
    },
    subviews: Array.from(subpages, (v, i) => ({
      type: "touchFade",
      onTap: v,
      style: {
        background: "#0003"
      },
      dimension: {
        horizontal: 1,
        height: i === 2 ? 60 : 60
      },
      subviews: {
        type: "symbol",
        symbol: {
          name: "moon",
          size: 20,
          color: "#000"
        },
        dimension: edge
      }
    }))
  };
}
var pagegram=story0_exports;
