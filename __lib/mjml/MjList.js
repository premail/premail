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
      key: 'render',
      value: function render () {
        return this.renderMJML(
          '\n      <mj-column\n        css-class="list"\n        '
            .concat(
              this.htmlAttributes({
                'background-color': this.getAttribute('background-color'),
                border: this.getAttribute('border'),
                'border-bottom': this.getAttribute('border-bottom'),
                'border-left': this.getAttribute('border-left'),
                'border-radius': this.getAttribute('border-radius'),
                'border-right': this.getAttribute('border-right'),
                'border-top': this.getAttribute('border-top'),
                direction: this.getAttribute('direction'),
                'inner-background-color': this.getAttribute(
                  'inner-background-color'
                ),
                'padding-bottom': this.getAttribute('padding-bottom'),
                'padding-left': this.getAttribute('padding-left'),
                'padding-right': this.getAttribute('padding-right'),
                'padding-top': this.getAttribute('padding-top'),
                padding: this.getAttribute('padding'),
                'vertical-align': this.getAttribute('vertical-align'),
                width: this.getAttribute('width'),
              }),
              '\n      >\n        '
            )
            .concat(
              this.renderChildren(this.props.children, {
                rawXML: true,
                renderer: function renderer (component) {
                  return component.render
                },
              }),
              '\n      </mj-column>\n      '
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
  'background-color': 'color',
  border: 'string',
  'border-bottom': 'string',
  'border-left': 'string',
  'border-radius': 'unit(px,%){1,4}',
  'border-right': 'string',
  'border-top': 'string',
  direction: 'enum(ltr,rtl)',
  'inner-background-color': 'color',
  'padding-bottom': 'unit(px,%)',
  'padding-left': 'unit(px,%)',
  'padding-right': 'unit(px,%)',
  'padding-top': 'unit(px,%)',
  padding: 'unit(px,%){1,4}',
  'vertical-align': 'enum(top,bottom,middle)',
  width: 'unit(px,%)',
})

_defineProperty(MjList, 'defaultAttributes', {
  direction: 'ltr',
  'vertical-align': 'top',
})
