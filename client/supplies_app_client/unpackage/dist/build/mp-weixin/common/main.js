(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0c6a":function(t,e,o){"use strict";o.r(e);var n=o("92b3"),a=o.n(n);for(var r in n)"default"!==r&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},6346:function(t,e,o){"use strict";(function(t,e){o("0152"),o("921b");var n=r(o("66fd")),a=r(o("d7ff"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function c(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?i(Object(o),!0).forEach((function(e){l(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function l(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var u=function(){o.e("colorui/components/cu-custom").then(function(){return resolve(o("dc71"))}.bind(null,o)).catch(o.oe)};n.default.component("cu-custom",u),n.default.config.productionTip=!1,n.default.prototype.showToast=function(e){t.showToast({title:e,icon:"none"})},n.default.prototype.request=function(e,o,n,a,r){t.request({url:getApp().globalData.domain_port+e,method:"POST",dataType:"json",header:{"Content-Type":"application/x-www-form-urlencoded"},data:o,success:function(t){console.log("api:"+e+" request success."),"function"===typeof n&&n(t)},fail:function(t){console.log("api:"+e+" request failed:",t),"function"===typeof a&&a(t)},complete:function(t){console.log("api:"+e+" request complete."),"function"===typeof r&&r(t)}})},n.default.prototype.requestWithMethod=function(e,o,n,a,r,i){t.request({url:getApp().globalData.domain_port+e,method:o,dataType:"json",header:{"Content-Type":"application/x-www-form-urlencoded"},data:n,success:function(t){console.log("api:"+e+" request success."),"function"===typeof a&&a(t)},fail:function(t){console.log("api:"+e+" request failed:",t),"function"===typeof r&&r(t)},complete:function(t){console.log("api:"+e+" request complete."),"function"===typeof i&&i(t)}})},n.default.prototype.containsStr=function(t,e){if(void 0!=t&&void 0!=e)return-1!=t.indexOf(e)},n.default.prototype.getParamsUrl=function(t){var e=t.start_index+"/"+t.num;return void 0!==t.start_time&&(e+="/"+t.start_time),void 0!==t.end_time&&(e+="/"+t.end_time),e},Array.prototype.indexOf=function(t){for(var e=0;e<this.length;e++)if(this[e]==t)return e;return-1},Array.prototype.remove=function(t){var e=this.indexOf(t);e>-1&&this.splice(e,1)},n.default.prototype.isEmpty=function(t){return"undefined"==typeof t||null==t||""==t},a.default.mpType="app";var f=new n.default(c({},a.default));e(f).$mount()}).call(this,o("543d")["default"],o("543d")["createApp"])},"7b28":function(t,e,o){"use strict";var n=o("8471"),a=o.n(n);a.a},8471:function(t,e,o){},"92b3":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("66fd"));function a(t){return t&&t.__esModule?t:{default:t}}var r={globalData:{user_id:"",domain_port:"https://brilliantlife.com.cn/",domain:"https://brilliantlife.com.cn",api_login:"weixin_sns/",api_asset:"asset/",api_claim_asset:"claim_asset/",api_category:"commoditycategory/",api_approve:"approval/",api_getWXInfo:"weixin_gusi/",api_get_approval_list:"get_approval_list/",api_change_approval_status:"change_approval_status/",cart_list_info:[]},onLaunch:function(){t.getSystemInfo({success:function(t){n.default.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();n.default.prototype.Custom=e,n.default.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight}}),n.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=r}).call(this,o("543d")["default"])},d7ff:function(t,e,o){"use strict";o.r(e);var n=o("0c6a");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("7b28");var r,i,c,l,u=o("f0c5"),f=Object(u["a"])(n["default"],r,i,!1,null,null,null,!1,c,l);e["default"]=f.exports}},[["6346","common/runtime","common/vendor"]]]);