'use strict'

function _typeof (obj) {
  '@babel/helpers - typeof'
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof (obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof (obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0

var _mjmlCore = require('mjml-core')

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties (target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass (Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf (o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf (o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

function _createSuper (Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal () {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}

function _possibleConstructorReturn (self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized (self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _isNativeReflectConstruct () {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    )
    return true
  } catch (e) {
    return false
  }
}

function _getPrototypeOf (o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf (o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _defineProperty (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

var MjLi = /*#__PURE__*/ (function (_BodyComponent) {
  _inherits(MjLi, _BodyComponent)

  var _super = _createSuper(MjLi)

  function MjLi () {
    _classCallCheck(this, MjLi)

    return _super.apply(this, arguments)
  }

  _createClass(MjLi, [
    {
      key: 'getStyles',
      value: function getStyles () {
        var textColor =
          this.getAttribute('text-color') || this.getAttribute('color')
        return {
          ulStyle: {
            'background-color': this.getAttribute('background-color'),
            color: this.getAttribute('color'),
            'font-family': this.getAttribute('font-family'),
            'font-size': this.getAttribute('font-size'),
            'font-style': this.getAttribute('font-style'),
            'font-weight': this.getAttribute('font-weight'),
            'letter-spacing': this.getAttribute('letter-spacing'),
            'line-height': this.getAttribute('line-height'),
            'margin-top': '0',
            'margin-left': this.getAttribute('padding-left'),
            'margin-right': this.getAttribute('padding-right'),
            'margin-bottom': '0',
            padding: '0',
            'text-decoration': this.getAttribute('text-decoration'),
            'text-transform': this.getAttribute('text-transform'),
            'text-align': this.getAttribute('align'),
          },
          liStyle: {
            color: this.getAttribute('bullet-color'),
            margin: '0',
            padding: '0',
            'padding-left': this.getAttribute('gutter'),
            'text-decoration': this.getAttribute('text-decoration'),
            'text-transform': this.getAttribute('text-transform'),
            'text-align': this.getAttribute('align'),
          },
          textWrap: {
            color: textColor,
            'letter-spacing': this.getAttribute('letter-spacing'),
            'text-decoration': this.getAttribute('text-decoration'),
            'text-transform': this.getAttribute('text-transform'),
            'text-align': this.getAttribute('text-align'),
          },
        }
      },
    },
    {
      key: 'render',
      value: function render () {
        var itemClass = 'list-item'

        if (this.getAttribute('css-class')) {
          itemClass += ' '.concat(this.getAttribute('css-class'))
        }

        return '\n      <ul\n        '
          .concat(
            this.htmlAttributes({
              class: 'list-item-wrap',
              align: this.getAttribute('text-align'),
              type: 'disc',
              style: 'ulStyle',
            }),
            '\n      >\n        <li\n          '
          )
          .concat(
            this.htmlAttributes({
              class: ''.concat(itemClass),
              style: 'liStyle',
            }),
            '\n        >\n          <span\n            '
          )
          .concat(
            this.htmlAttributes({
              class: 'list-item--text',
              style: 'textWrap',
            }),
            '\n          >\n            '
          )
          .concat(
            this.getContent(),
            '\n          </span>\n        </li>\n      </ul>\n      '
          )
      },
    },
  ])

  return MjLi
})(_mjmlCore.BodyComponent)

exports['default'] = MjLi

_defineProperty(MjLi, 'componentName', 'mj-li')

_defineProperty(MjLi, 'endingTag', true)

_defineProperty(MjLi, 'dependencies', {
  'mj-li': [],
  'mj-list': ['mj-li'],
})

_defineProperty(MjLi, 'allowedAttributes', {
  'background-color': 'color',
  bullet: 'string',
  'bullet-color': 'color',
  color: 'color',
  'font-family': 'string',
  'font-size': 'unit(px)',
  'font-style': 'string',
  'font-weight': 'string',
  gutter: 'unit(px)',
  'letter-spacing': 'unitWithNegative(px,em)',
  'line-height': 'unit(px,%,)',
  'padding-left': 'unit(px,%)',
  'padding-right': 'unit(px,%)',
  'text-align': 'enum(left,right,center,justify)',
  'text-color': 'color',
  'text-decoration': 'string',
  'text-transform': 'string',
  'vertical-align': 'enum(top,bottom,middle)',
})

_defineProperty(MjLi, 'defaultAttributes', {
  bullet: '&#8226;',
  'bullet-color': '',
  color: '',
  'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
  'font-size': '13px',
  gutter: '5px',
  'line-height': '',
  'text-align': 'left',
  'vertical-align': 'top',
})
