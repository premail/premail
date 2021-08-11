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

var _reverse = _interopRequireDefault(require('lodash/reverse'))

var _mjmlCore = require('mjml-core')

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

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

var MjSignoff = /*#__PURE__*/ (function (_BodyComponent) {
  _inherits(MjSignoff, _BodyComponent)

  var _super = _createSuper(MjSignoff)

  function MjSignoff () {
    _classCallCheck(this, MjSignoff)

    return _super.apply(this, arguments)
  }

  _createClass(MjSignoff, [
    {
      key: 'renderImage',
      value: function renderImage () {
        return '\n      <mj-column\n        css-class="column signoff__image"\n        '
          .concat(
            this.htmlAttributes({
              width: this.getAttribute('image-width'),
              'background-color': this.getAttribute('background-color'),
            }),
            '\n      >\n        <mj-image\n          '
          )
          .concat(
            this.htmlAttributes({
              padding: this.getAttribute('image-padding'),
              src: this.getAttribute('image-src'),
              width: this.getAttribute('image-width'),
              height: this.getAttribute('image-height'),
              alt: this.getAttribute('image-alt'),
            }),
            '\n        >\n        </mj-image>\n    </mj-column>\n    '
          )
      },
    },
    {
      key: 'renderText',
      value: function renderText () {
        return '\n      <mj-column\n        css-class="column signoff__text"\n        '
          .concat(
            this.htmlAttributes({
              'background-color': this.getAttribute('background-color'),
            }),
            '\n      >\n        <mj-text\n          '
          )
          .concat(
            this.htmlAttributes({
              padding: this.getAttribute('text-column-padding'),
            }),
            '\n        >\n          '
          )
          .concat(
            this.getContent(),
            '\n        </mj-text>\n      </mj-column>\n    '
          )
      },
    },
    {
      key: 'render',
      value: function render () {
        var content = [this.renderText(), this.renderImage()]
        var orderedContent =
          this.getAttribute('image-position') === 'right'
            ? content
            : (0, _reverse['default'])(content)
        return this.renderMJML(
          '\n      <mj-section\n        css-class="signoff"\n        '
            .concat(
              this.htmlAttributes({
                padding: this.getAttribute('section-padding'),
                'background-color': this.getAttribute('background-color'),
                'text-align': this.getAttribute('section-align'),
              }),
              '\n      >\n        '
            )
            .concat(orderedContent, '\n      </mj-section>\n    ')
        )
      },
    },
  ])

  return MjSignoff
})(_mjmlCore.BodyComponent)

exports['default'] = MjSignoff

_defineProperty(MjSignoff, 'endingTag', true)

_defineProperty(MjSignoff, 'dependencies', {
  'mj-signoff': [],
  'mj-body': ['mj-signoff'],
  'mj-wrapper': ['mj-signoff'],
})

_defineProperty(MjSignoff, 'allowedAttributes', {
  'section-padding': 'unit(px){4}',
  'section-align': 'enum(left,center,right)',
  'background-color': 'color',
  'image-position': 'enum(left,right)',
  'image-padding': 'unit(px){4}',
  'image-src': 'string',
  'image-width': 'unit(px,%)',
  'image-height': 'unit(px,%)',
  'image-alt': 'string',
  'text-column-padding': 'unit(px){4}',
})

_defineProperty(MjSignoff, 'defaultAttributes', {
  'section-padding': '10px 0',
  'section-align': 'left',
  'background-color': 'transparent',
  'image-position': 'left',
  'image-padding': 0,
  'image-src': null,
  'image-width': null,
  'image-height': null,
  'image-alt': null,
  'text-column-padding': '0 10px',
})
