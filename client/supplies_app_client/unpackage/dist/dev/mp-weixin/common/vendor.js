(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {return;}var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************************************************************!*\
  !*** /Users/victor/HBuilderProjects/supplies_app/claim/client/supplies_app_client/pages.json ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 49:
/*!*******************************************************************************************************!*\
  !*** /Users/victor/HBuilderProjects/supplies_app/claim/client/supplies_app_client/static/default.png ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200402001","_inBundle":false,"_integrity":"sha512-Mdhd/IRuUMHWPj3TtWrBb0kghRBA0YiO2L2THMFvhCTfQDSoSq1vwOdAx5n/8fIORAvG0uVQoYl73xeVFZML5A==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200402001.tgz","_shasum":"5f66f5dc252ac00c6064857dee8251ee51aa2391","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"bfdbb7b3000599679ef8cb29a969e6bd447b00c7","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200402001"};

/***/ }),

/***/ 7:
/*!****************************************************************************************************************!*\
  !*** /Users/victor/HBuilderProjects/supplies_app/claim/client/supplies_app_client/pages.json?{"type":"style"} ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/auth": { "navigationBarTitleText": "", "backgroundColor": "#EEEEEE" }, "pages/history/history": {}, "pages/item_choose/item_choose": {}, "pages/category/category": {}, "pages/cart/cart": {}, "pages/approve/approve": {}, "pages/approve/approve_detail": {}, "pages/me/me": {}, "pages/index/index": {}, "pages/category/category_detail_list": {} }, "globalStyle": { "navigationBarBackgroundColor": "#0b988f", "navigationBarTitleText": "用品申领", "navigationStyle": "custom", "navigationBarTextStyle": "white" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!***************************************************************************************************************!*\
  !*** /Users/victor/HBuilderProjects/supplies_app/claim/client/supplies_app_client/pages.json?{"type":"stat"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__8A56E3B" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map