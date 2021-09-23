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

var MjList = /*#__PURE__*/ (function (_BodyComponent) {
  _inherits(MjList, _BodyComponent)

  var _super = _createSuper(MjList)

  function MjList () {
    _classCallCheck(this, MjList)

    return _super.apply(this, arguments)
  }

  _createClass(MjList, [
    {
      key: 'getStyles',
      value: function getStyles () {
        return {
          text: {
            color: this.getAttribute('color'),
            'font-family': this.getAttribute('font-family'),
            'font-size': this.getAttribute('font-size'),
            'font-style': this.getAttribute('font-style'),
            'font-weight': this.getAttribute('font-weight'),
            'letter-spacing': this.getAttribute('letter-spacing'),
            'line-height': this.getAttribute('line-height'),
            'text-align': this.getAttribute('align'),
            'text-decoration': this.getAttribute('text-decoration'),
            'text-transform': this.getAttribute('text-transform'),
          },
        }
      },
    },
    {
      key: 'render',
      value: function render () {
        return this.renderMJML(
          '\n        <mj-column\n          '
            .concat(
              this.htmlAttributes({
                'mj-class': 'list',
                class: 'list '.concat(this.getAttribute('css-class')),
                style: 'text',
              }),
              '\n        >\n          '
            )
            .concat(
              this.renderChildren(this.props.children, {
                rawXML: true,
                renderer: function renderer (component) {
                  return component.render
                },
              }),
              '\n        </mj-column>\n    '
            )
        )
      },
    },
  ])

  return MjList
})(_mjmlCore.BodyComponent)

exports['default'] = MjList

_defineProperty(MjList, 'componentName', 'mj-list')

_defineProperty(MjList, 'dependencies', {
  'mj-list': ['mj-li'],
  'mj-column': ['mj-list'],
})

_defineProperty(MjList, 'allowedAttributes', {
  align: 'enum(left,right,center,justify)',
  'background-color': 'color',
  color: 'color',
  'container-background-color': 'color',
  'font-family': 'string',
  'font-size': 'unit(px)',
  'font-style': 'string',
  'font-weight': 'string',
  'letter-spacing': 'unitWithNegative(px,em)',
  'line-height': 'unit(px,%,)',
  'padding-bottom': 'unit(px,%)',
  'padding-left': 'unit(px,%)',
  'padding-right': 'unit(px,%)',
  'padding-top': 'unit(px,%)',
  padding: 'unit(px,%){1,4}',
  'text-decoration': 'string',
  'text-transform': 'string',
  'vertical-align': 'enum(top,bottom,middle)',
})

_defineProperty(MjList, 'defaultAttributes', {
  align: 'left',
  color: '#000000',
  'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
  'font-size': '13px',
  'line-height': '1',
  padding: '10px 25px',
})
