(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{236:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"单例模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单例模式"}},[t._v("#")]),t._v(" 单例模式")]),t._v(" "),a("p",[t._v("在"),a("code",[t._v("javascript")]),t._v("中的单例模式就是，让一个类只有一个实例")]),t._v(" "),a("p",[t._v("首先我们知道可以通过一个类创建任意多个实例对象：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Single")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" s1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Single")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" s2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Single")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("s1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" s2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n")])])]),a("p",[t._v("两个实例之间没有任何关系，就是两个独立的对象，各占一块内存空间")]),t._v(" "),a("p",[t._v("单例模式想要做到的是，"),a("strong",[t._v("不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例")]),t._v("。")]),t._v(" "),a("p",[t._v("所以我们就要构造函数"),a("strong",[t._v("具备判断自己是否已经创建过一个实例")]),t._v("的能力")]),t._v(" "),a("p",[t._v("我们现在把这段判断逻辑写成一个静态方法(其实也可以直接写入构造函数的函数体里）：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Single")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInstance")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断是否已经new过1个实例")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("SingleDog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("instance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 若这个唯一的实例不存在，那么先创建它")]),t._v("\n      SingleDog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("instance "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SingleDog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果这个唯一的实例已经存在，则直接返回")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" SingleDog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("instance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" s1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Single"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInstance")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" s2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Single"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getInstance")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("s1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" s2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("p",[t._v("单例模式的典型应用 "),a("code",[t._v("Vuex")]),t._v(" => 一个"),a("code",[t._v("Vue")]),t._v("实例 只能对应一个"),a("code",[t._v("Store")])]),t._v(" "),a("p",[t._v("为什么这么做呢？")]),t._v(" "),a("p",[t._v("Vue 中的组件是相互独立的，组件间的通信也很简单，但是组件非常多且嵌套层级很深，逻辑较为复杂的时候，这时如果还用原有的通信方式就会变得非常难以维护，很容易发生那种牵一发动全身的问题。"),a("code",[t._v("Vuex")]),t._v("就是为了解决这种场景出现，它的出现也大大增强了"),a("code",[t._v("Vue")]),t._v("的健壮性，不再是那个只能构建轻量型的应用的框架了。而他的做法就是把可以共享的数据放在全局，供组件们使用。为了能够让"),a("code",[t._v("Store")]),t._v("中的数据以一种可预测的方式发生变化，那么必然要保证"),a("code",[t._v("Store")]),t._v("中的数据的唯一性 => 单例模式的应用")]),t._v(" "),a("h2",{attrs:{id:"单例模式相关面试题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单例模式相关面试题"}},[t._v("#")]),t._v(" 单例模式相关面试题")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("实现 "),a("code",[t._v("Storage")]),t._v("，使得该对象为单例，基于 "),a("code",[t._v("localStorage")]),t._v("进行封装。实现方法 "),a("code",[t._v("setItem(key,value)")]),t._v(" 和 "),a("code",[t._v("getItem(key)")]),t._v("。")])]),t._v(" "),a("li",[a("p",[t._v("实现一个全局唯一的 "),a("code",[t._v("Modal")]),t._v(" 弹框")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);