'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactSyntaxHighlighter = require('react-syntax-highlighter');

var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

var _prism = require('react-syntax-highlighter/prism');

var _prism2 = _interopRequireDefault(_prism);

var _createElement = require('react-syntax-highlighter/create-element');

var _hljs = require('react-syntax-highlighter/styles/hljs');

var _prism3 = require('react-syntax-highlighter/styles/prism');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styleCache = new Map();

var topLevelPropertiesToRemove = ["color", "textShadow", "textAlign", "whiteSpace", "wordSpacing", "wordBreak", "wordWrap", "lineHeight", "MozTabSize", "OTabSize", "tabSize", "WebkitHyphens", "MozHyphens", "msHyphens", "hyphens", "fontFamily"];

function generateNewStylesheet(_ref) {
  var stylesheet = _ref.stylesheet,
      highlighter = _ref.highlighter;

  if (styleCache.has(stylesheet)) {
    return styleCache.get(stylesheet);
  }
  // I don't know why, but sometimes 'stylesheet' comes as an Array
  // like this [{ stylesheet }, { opacity: 0.85 }], instead of an Object,
  // so this throws an error referenced at issue #17
  // So, this is a workaround, if the  stylesheet is an Array,
  // returns the first element, wich is the actual style object.
  stylesheet = Array.isArray(stylesheet) ? stylesheet[0] : stylesheet;
  var transformedStyle = Object.entries(stylesheet).reduce(function (newStylesheet, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        className = _ref3[0],
        style = _ref3[1];

    newStylesheet[className] = Object.entries(style).reduce(function (newStyle, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

      if (key === 'overflowX' || key === "overflow") {
        newStyle.overflow = value === 'auto' ? 'scroll' : value;
      } else if (value.includes('em')) {
        var _value$split = value.split('em'),
            _value$split2 = _slicedToArray(_value$split, 1),
            num = _value$split2[0];

        newStyle[key] = Number(num) * 16;
      } else if (key === 'background') {
        newStyle.backgroundColor = value;
      } else if (key === 'display') {
        return newStyle;
      } else {
        newStyle[key] = value;
      }
      return newStyle;
    }, {});
    return newStylesheet;
  }, {});
  var topLevel = highlighter === "prism" ? transformedStyle['pre[class*=\"language-\"]'] : transformedStyle.hljs;
  var defaultColor = topLevel && topLevel.color || "#000";
  topLevelPropertiesToRemove.forEach(function (property) {
    if (topLevel[property]) {
      delete topLevel[property];
    }
  });
  if (topLevel.backgroundColor === "none") {
    delete topLevel.backgroundColor;
  }
  var codeLevel = transformedStyle['code[class*=\"language-\"]'];
  if (highlighter === "prism" && !!codeLevel) {
    topLevelPropertiesToRemove.forEach(function (property) {
      if (codeLevel[property]) {
        delete codeLevel[property];
      }
    });
    if (codeLevel.backgroundColor === "none") {
      delete codeLevel.backgroundColor;
    }
  }
  styleCache.set(stylesheet, { transformedStyle: transformedStyle, defaultColor: defaultColor });
  return { transformedStyle: transformedStyle, defaultColor: defaultColor };
}

function createChildren(_ref6) {
  var stylesheet = _ref6.stylesheet,
      fontSize = _ref6.fontSize,
      fontFamily = _ref6.fontFamily;

  var childrenCount = 0;
  return function (children, defaultColor) {
    childrenCount += 1;
    return children.map(function (child, i) {
      return createNativeElement({
        node: child,
        stylesheet: stylesheet,
        key: 'code-segment-' + childrenCount + '-' + i,
        defaultColor: defaultColor,
        fontSize: fontSize,
        fontFamily: fontFamily
      });
    });
  };
}

function createNativeElement(_ref7) {
  var node = _ref7.node,
      stylesheet = _ref7.stylesheet,
      key = _ref7.key,
      defaultColor = _ref7.defaultColor,
      fontFamily = _ref7.fontFamily,
      _ref7$fontSize = _ref7.fontSize,
      fontSize = _ref7$fontSize === undefined ? 12 : _ref7$fontSize;
  var properties = node.properties,
      type = node.type,
      TagName = node.tagName,
      value = node.value;

  var startingStyle = { fontFamily: fontFamily, fontSize: fontSize, height: fontSize + 5 };
  if (type === 'text') {
    return _react2.default.createElement(
      _reactNative.Text,
      {
        key: key,
        style: Object.assign({ color: defaultColor }, startingStyle)
      },
      value
    );
  } else if (TagName) {
    var childrenCreator = createChildren({ stylesheet: stylesheet, fontSize: fontSize, fontFamily: fontFamily });
    var style = (0, _createElement.createStyleObject)(properties.className, Object.assign({ color: defaultColor }, properties.style, startingStyle), stylesheet);
    var children = childrenCreator(node.children, style.color || defaultColor);
    return _react2.default.createElement(
      _reactNative.Text,
      { key: key, style: style },
      children
    );
  }
}

function nativeRenderer(_ref8) {
  var defaultColor = _ref8.defaultColor,
      fontFamily = _ref8.fontFamily,
      fontSize = _ref8.fontSize;

  return function (_ref9) {
    var rows = _ref9.rows,
        stylesheet = _ref9.stylesheet;
    return rows.map(function (node, i) {
      return createNativeElement({
        node: node,
        stylesheet: stylesheet,
        key: 'code-segment-' + i,
        defaultColor: defaultColor,
        fontFamily: fontFamily,
        fontSize: fontSize
      });
    });
  };
}

function NativeSyntaxHighlighter(_ref10) {
  var fontFamily = _ref10.fontFamily,
      fontSize = _ref10.fontSize,
      children = _ref10.children,
      _ref10$highlighter = _ref10.highlighter,
      highlighter = _ref10$highlighter === undefined ? "highlightjs" : _ref10$highlighter,
      _ref10$style = _ref10.style,
      style = _ref10$style === undefined ? highlighter === "prism" ? _prism3.prism : _hljs.defaultStyle : _ref10$style,
      rest = _objectWithoutProperties(_ref10, ['fontFamily', 'fontSize', 'children', 'highlighter', 'style']);

  var _generateNewStyleshee = generateNewStylesheet({
    stylesheet: style,
    highlighter: highlighter
  }),
      transformedStyle = _generateNewStyleshee.transformedStyle,
      defaultColor = _generateNewStyleshee.defaultColor;

  var Highlighter = highlighter === "prism" ? _prism2.default : _reactSyntaxHighlighter2.default;
  return _react2.default.createElement(
    Highlighter,
    _extends({}, rest, {
      style: transformedStyle,
      horizontal: true,
      renderer: nativeRenderer({
        defaultColor: defaultColor,
        fontFamily: fontFamily,
        fontSize: fontSize
      })
    }),
    children
  );
}

NativeSyntaxHighlighter.defaultProps = {
  fontFamily: _reactNative.Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
  fontSize: 12,
  PreTag: _reactNative.ScrollView,
  CodeTag: _reactNative.ScrollView
};

exports.default = NativeSyntaxHighlighter;