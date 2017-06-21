!function(){var e,t,n;!function(i){function o(e,t){return M.call(e,t)}function r(e,t){var n,i,o,r,l,c,s,a,u,d,f,h=t&&t.split("/"),g=y.map,p=g&&g["*"]||{};if(e&&"."===e.charAt(0))if(t){for(e=e.split("/"),l=e.length-1,y.nodeIdCompat&&k.test(e[l])&&(e[l]=e[l].replace(k,"")),e=h.slice(0,h.length-1).concat(e),u=0;u<e.length;u+=1)if(f=e[u],"."===f)e.splice(u,1),u-=1;else if(".."===f){if(1===u&&(".."===e[2]||".."===e[0]))break;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((h||p)&&g){for(n=e.split("/"),u=n.length;u>0;u-=1){if(i=n.slice(0,u).join("/"),h)for(d=h.length;d>0;d-=1)if(o=g[h.slice(0,d).join("/")],o&&(o=o[i])){r=o,c=u;break}if(r)break;!s&&p&&p[i]&&(s=p[i],a=u)}!r&&s&&(r=s,c=a),r&&(n.splice(0,c,r),e=n.join("/"))}return e}function l(e,t){return function(){var n=b.call(arguments,0);return"string"!=typeof n[0]&&1===n.length&&n.push(null),h.apply(i,n.concat([e,t]))}}function c(e){return function(t){return r(t,e)}}function s(e){return function(t){v[e]=t}}function a(e){if(o(m,e)){var t=m[e];delete m[e],w[e]=!0,f.apply(i,t)}if(!o(v,e)&&!o(w,e))throw new Error("No "+e);return v[e]}function u(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function d(e){return function(){return y&&y.config&&y.config[e]||{}}}var f,h,g,p,v={},m={},y={},w={},M=Object.prototype.hasOwnProperty,b=[].slice,k=/\.js$/;g=function(e,t){var n,i=u(e),o=i[0];return e=i[1],o&&(o=r(o,t),n=a(o)),o?e=n&&n.normalize?n.normalize(e,c(t)):r(e,t):(e=r(e,t),i=u(e),o=i[0],e=i[1],o&&(n=a(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:n}},p={require:function(e){return l(e)},exports:function(e){var t=v[e];return"undefined"!=typeof t?t:v[e]={}},module:function(e){return{id:e,uri:"",exports:v[e],config:d(e)}}},f=function(e,t,n,r){var c,u,d,f,h,y,M=[],b=typeof n;if(r=r||e,"undefined"===b||"function"===b){for(t=!t.length&&n.length?["require","exports","module"]:t,h=0;h<t.length;h+=1)if(f=g(t[h],r),u=f.f,"require"===u)M[h]=p.require(e);else if("exports"===u)M[h]=p.exports(e),y=!0;else if("module"===u)c=M[h]=p.module(e);else if(o(v,u)||o(m,u)||o(w,u))M[h]=a(u);else{if(!f.p)throw new Error(e+" missing "+u);f.p.load(f.n,l(r,!0),s(u),{}),M[h]=v[u]}d=n?n.apply(v[e],M):void 0,e&&(c&&c.exports!==i&&c.exports!==v[e]?v[e]=c.exports:d===i&&y||(v[e]=d))}else e&&(v[e]=n)},e=t=h=function(e,t,n,o,r){if("string"==typeof e)return p[e]?p[e](t):a(g(e,t).f);if(!e.splice){if(y=e,y.deps&&h(y.deps,y.callback),!t)return;t.splice?(e=t,t=n,n=null):e=i}return t=t||function(){},"function"==typeof n&&(n=o,o=r),o?f(i,e,t,n):setTimeout(function(){f(i,e,t,n)},4),h},h.config=function(e){return h(e)},e._defined=v,n=function(e,t,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),o(v,e)||o(m,e)||(m[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("../lib/almond",function(){}),n("models/whenModel",[],function(){var e=Backbone.Model.extend({initialize:function(e,t){if(this.get("key")&&this.get("comparator"))if("calc"==this.get("type")){var n=i.channel("form-"+this.collection.options.condition.collection.formModel.get("id")).request("get:calc",this.get("key"));this.listenTo(n,"change:value",this.updateCalcCompare)}else{var o=i.channel("form-"+t.condition.collection.formModel.get("id")).request("get:fieldByKey",this.get("key"));if("undefined"==typeof o)return;o.on("change:value",this.updateFieldCompare,this),this.listenTo(i.channel("field-"+o.get("id")),"keyup:field",this.maybeupdateFieldCompare),this.updateFieldCompare(o),o.on("change:visible",this.updateFieldCompare,this)}},updateCalcCompare:function(e){this.updateCompare(e.get("value"))},maybeupdateFieldCompare:function(e,t,n){if("checkbox"==t.get("type"))var i="checked"==jQuery(e).attr("checked")?1:0;else if("listcheckbox"==t.get("type"))var i=t.get("value").join();else var i=jQuery(e).val();this.updateFieldCompare(t,null,i)},updateCompare:function(e){var t=this.compareValues[this.get("comparator")](e,this.get("value"));this.set("status",t)},updateFieldCompare:function(e,t,n){_.isEmpty(n)&&(n=e.get("value")),this.updateCompare(n),e.get("visible")||this.set("status",!1)},compareValues:{equal:function(e,t){return e==t},notequal:function(e,t){return e!=t},contains:function(e,t){return jQuery.isArray(e)?e.indexOf(t)>=0:t.indexOf('"')>=0?(t=t.replace(/['"]+/g,""),new RegExp("\\b"+t+"\\b").test(e)):e.toLowerCase().indexOf(t.toLowerCase())>=0},notcontains:function(e,t){return!this.contains(e,t)},greater:function(e,t){return jQuery.isNumeric(t)?parseFloat(e)>parseFloat(t):"string"==typeof e?0<e.length:void 0},less:function(e,t){return jQuery.isNumeric(t)?parseFloat(e)<parseFloat(t):"string"==typeof e?0>=e.length:void 0},greaterequal:function(e,t){return parseFloat(e)>parseFloat(t)||parseFloat(e)==parseFloat(t)},lessequal:function(e,t){return parseFloat(e)<parseFloat(t)||parseFloat(e)==parseFloat(t)}}});return e}),n("models/whenCollection",["models/whenModel"],function(e){var t=Backbone.Collection.extend({model:e,initialize:function(e,t){this.options=t}});return t}),n("models/conditionModel",["models/whenCollection"],function(e){var t=Backbone.Model.extend({initialize:function(t){this.set("when",new e(this.get("when"),{condition:this})),this.get("when").on("change:status",this.checkWhen,this),this.checkWhen()},checkWhen:function(){var e=this.get("when").pluck("status"),t=this.get("when").pluck("connector"),n=_.every(_.values(t),function(e){return"AND"==e},this);if(n)var o=_.every(_.values(e),function(e){return e},this);else var o=_.some(_.values(e),function(e){return e},this);o?_.each(this.get("then"),function(e,t){i.channel("condition:trigger").request(e.trigger,this,e)},this):_.each(this.get("else"),function(e,t){i.channel("condition:trigger").request(e.trigger,this,e)},this)}});return t}),n("models/conditionCollection",["models/conditionModel"],function(e){var t=Backbone.Collection.extend({model:e,initialize:function(e,t){this.formModel=t.formModel}});return t}),n("controllers/initCollection",["models/conditionCollection"],function(e){var t=Marionette.Object.extend({initialize:function(t){this.collection=new e(t.get("conditions"),{formModel:t}),this.listenTo(i.channel("fields"),"reset:collection",this.resetCollection)},resetCollection:function(t){var n=t.options.formModel;this.collection=new e(n.get("conditions"),{formModel:n})}});return t}),n("controllers/showHide",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("condition:trigger").reply("hide_field",this.hideField,this),i.channel("condition:trigger").reply("show_field",this.showField,this)},hideField:function(e,t){var n=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",t.key);"undefined"!=typeof n&&(n.set("visible",!1),n.get("clean")||n.trigger("change:value",n),i.channel("fields").request("remove:error",n.get("id"),"required-error"))},showField:function(e,t){var n=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",t.key);n.set("visible",!0),n.get("clean")||n.trigger("change:value",n);var o={el:i.channel("form-"+e.collection.formModel.get("id")).request("get:el")};i.channel("form").request("init:help",o)}});return e}),n("controllers/showHideOption",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("condition:trigger").reply("show_option",this.showOption,this),i.channel("condition:trigger").reply("hide_option",this.hideOption,this)},showOption:function(e,t){var n=this.getOption(e,t);n.visible=!0,this.updateFieldModel(e,t)},hideOption:function(e,t){var n=this.getOption(e,t);n.visible=!1,this.updateFieldModel(e,t)},getFieldModel:function(e,t){return i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",t.key)},getOption:function(e,t){var n=this.getFieldModel(e,t),i=n.get("options");return _.find(i,function(e){return e.value==t.value})},updateFieldModel:function(e,t){var n=this.getFieldModel(e,t),i=n.get("options");n.set("options",i),n.trigger("reRender")}});return e}),n("controllers/changeValue",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("condition:trigger").reply("change_value",this.changeValue,this)},changeValue:function(e,t){var n=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",t.key);n.set("value",t.value),n.trigger("reRender",n)}});return e}),n("controllers/selectDeselect",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("condition:trigger").reply("select_option",this.selectOption,this),i.channel("condition:trigger").reply("deselect_option",this.deselectOption,this)},selectOption:function(e,t){var n=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",t.key);_.contains(["listselect","listcountry","liststate"],n.get("type"))&&n.set("clean",!1);var o=n.get("options"),r=_.find(o,{value:t.value});if(r.selected=1,n.set("options",o),_.contains(["listselect","listcountry","liststate"],n.get("type")))n.set("value",r.value);else{var l=n.get("value");_.isArray(l)?l.push(r.value):l=r.value,n.set("value",l)}n.trigger("reRender",n)},deselectOption:function(e,t){var n=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",t.key),o=n.get("options"),r=_.find(o,{value:t.value});r.selected=0,n.set("options",o);var l=n.get("value");l=_.isArray(l)?_.without(l,t.value):"",n.set("value",l),n.trigger("reRender",n)}});return e}),n("controllers/actions",[],function(){var e=Marionette.Object.extend({actions:{},initialize:function(){i.channel("condition:trigger").reply("activate_action",this.activateAction,this),i.channel("condition:trigger").reply("deactivate_action",this.deactivateAction,this),i.channel("actions").reply("get:status",this.getStatus,this)},activateAction:function(e,t){this.actions[t.key]=!0,console.log("activate action")},deactivateAction:function(e,t){console.log("deactivate action"),this.actions[t.key]=!1},getStatus:function(e){return this.actions[e]}});return e});var i=Backbone.Radio;t(["controllers/initCollection","controllers/showHide","controllers/showHideOption","controllers/changeValue","controllers/selectDeselect","controllers/actions"],function(e,t,n,o,r,l){var c=Marionette.Application.extend({initialize:function(e){this.listenTo(i.channel("form"),"after:loaded",this.loadControllers)},loadControllers:function(i){new t,new n,new o,new r,new l,new e(i)},onStart:function(){}}),s=new c;s.start()}),n("main",function(){})}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=front-end.js.map
