## 单元测试

为什么要用单元测试？

- 自测 可以保留测试用例在项目中 但是测试代码不会被混入到项目中

- 通过测试用例我们可以更好的理解代码的功能

Vue 内置的两种测试框架 分别是`mocha + chai`和`jest`，用法上大同小异，看个人喜好。这里用`mocha + chai`举例，写几个测试用例。

用于测试的方法：

```javascript
export let parser = (str) => {
  let obj = {};
  str.replace(/([^&=]*)=([^&=]*)/g, function() {
    obj[arguments[1]] = arguments[2];
  });
  return obj;
};
export let stringify = (obj) => {
  let arr = [];
  for (let key in obj) {
    arr.push(`${key}=${obj[key]}`);
  }
  return arr.join("&");
};
```

测试用例：

```javascript
import { parser, stringify } from "@/code/parser.js";
import { expect } from "chai";
// chai是一个断言库

// 通过describe进行分类 比如这里可以将测试parser的测试用例都放在同一个describe里面一个it就是一个测试用例

describe("专门测试parser", () => {
  it("测试parser是否靠谱", () => {
    // 一般都用 to.be  由于两个对象不可能完全相等 所以需要用deep.equal判断两个对象是否相等 这里的相等不包括引用空间
    expect(parser("name=mopecat&age=18")).to.be.deep.equal({
      name: "mopecat",
      age: "18",
    });
  });
});

describe("专门测试stringify", () => {
  it("测试stringify是否靠谱", () => {
    expect(stringify({ name: "mopecat", age: "18" })).to.be.equal(
      "name=mopecat&age=18"
    );
  });
});

describe("测试方法", () => {
  it("相等关系", () => {
    expect(1 + 1).to.be.equal(2);
    expect(true).to.be.true;
    expect([1, 2, 3]).to.be.lengthOf(3);
  });
  it("包含关系", () => {
    expect("mopecat").to.be.include("m");
    expect("mopecat").to.be.contain("m");
    expect("mopecat").to.be.match(/m/);
  });
  it("大于、小于", () => {
    expect(2).to.be.greaterThan(1);
    expect(2).to.be.lessThan(3);
    expect(3).to.be.not.greaterThan(6);
  });
});
```

一般情况下我们在创建 Vue 项目时需要将单元测试的选项 √ 上，就可以使用，`cli`可以直接处理内置了，剩下的还有一写测试组件的方法都集成在`Vue`的 `test-utils`仓库中了，也可以直接搜 Vue 的文档中查看相关`API`用法比较像`jq`比较容易上手