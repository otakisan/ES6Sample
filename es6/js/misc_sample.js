// 現在(20150719)は、FF39なら全て実行可能

// 関数の定義に、functionの記載が不要
var counter = {
  count: 0,
  increment() {
    this.count++;
  }
}

function addWithDefault(a = 1, b = 2) {
  // default parameters
  console.log("default parameters...");
  return a + b;
}

function destructuringSample() {
  console.log("destructuring...");

  // 分割代入
  // FF39サポート CH43未サポート
  var [year, month, day] = [2015, 7, 18];
  console.log(year, month, day);

  var [, month] = [2015, 7, 18];
  console.log(month);

  var [year, ...monthDay] = [2015, 7, 18];
  console.log(year, monthDay);

  var x = 1, y = 2;
  [x, y] = [y, x];
  console.log(x, y);

  var {name: a, age: b} = { name: "Bob", age: 20 };
  console.log(a, b);

  var {name, age} = { name: "Bob", age: 20 };
  console.log(name, age);
  
  // 未サポート
  // var {name, age = 18} = {name:"Bob"};
  // console.log(name, age);
  
  var {foo: {bar: [, x]}} = { foo: { bar: [1, 2, 3] } };
  console.log(x);
}

function spreadOperatorSample() {

  console.log("spread operator...");
  
  // スプレッドオペレータ
  var nums = [3, 1, 2];
  
  // ES5
  var es5ret = Math.max.apply(null, nums);
  console.log(es5ret);
  
  // ES6
  var es6ret = Math.max(...nums);
  console.log(es6ret);
}

function restParameterSample() {
  console.log("rest parameters...");

  var foo = (first, second, ...rest) => {
    console.log(first, second, rest);
  };
  ((first, second, ...rest) => {
    console.log(first, second, rest);
  })(123, 321, 123);

  foo(1, 2, 3, 4, 5);
}

function computedPropertySample() {
  console.log("Computed property names...");

  // Computed property names (ES6)
  var i = 0;
  var a = {
    ["foo" + ++i]: i,
    ["foo" + ++i]: i,
    ["foo" + ++i]: i
  };

  console.log(a.foo1); // 1
  console.log(a.foo2); // 2
  console.log(a.foo3); // 3

  var param = 'size';
  var config = {
    [param]: 12,
    ["mobile" + param.charAt(0).toUpperCase() + param.slice(1)]: 4
  };

  console.log(config); // { size: 12, mobileSize: 4 }

}

function shortHandPropertySample() {
  var a = "foo",
    b = 42,
    c = {};

  // Shorthand property names (ES6)
  var o = { a, b, c };
  console.log(o); // { a: "foo", b: 42, c: Object }
  console.log(o.a); // "foo"
}

// function taggedTemplateSample() {
//   var name = "Bob <script>";
//   el.innerHTML = html`<p>Hello, ${name}</p>`;
// }
// // タグ関数
// function html(templates, ...values){
  
//   var result = "";
//   for (let i = 0; i < templates.length; i++) {
//     result += templates[i];
//     if (i < values.length) {
//       result += escapeHtml(values[i]);
//     }
//   }
//   return result;
// }

function unicodeCodePointSample() {
  // 𩸽はサロゲートペアを使う
  var s = "𩸽を食べる";
  // lengthだと２文字分
  console.log("length", s.length);
  // 文字を取得できない
  console.log(s.charAt(0)); // \ud867
  // コードポイントを取得できない（上位サロゲートのみ）
  console.log(s.charCodeAt(0)); // \ud867
  
  // スプレッドオペレータで展開
  var s2 = [..."𩸽を食べる"];
  console.log("length by spread operator", s2.length)
  console.log(s2[0]);

  console.log("𩸽".codePointAt(0).toString(16));
  console.log(String.fromCodePoint(0x29e3d));
}

function stringSample() {
  console.log("abcde".startsWith("ab"));
  console.log("abcde".endsWith("ab"));
  // "abcde".includes("ab"); // まだ対応していない
  console.log("abc".repeat(5));
  
  // NFC変換など、Unicode正規化を行う
  // String.prototype.normalize
  
  // タグ付きテンプレートを組み合わせて生のエスケープシーケンスを文字列として取得
  // String.raw
}

function arraySample() {
  var arr1 = Array.from(arguments);
  var arr2 = Array.from("foo");
  console.log(arr1);
  console.log(arr2);
  
  // ES5までは下記
  var arr = Array.prototype.slice.call(arguments);
  console.log(arr);
  
  // Array.of
  var arr3 = Array.of(1, 2, 3);
  console.log(arr3);
  console.log(arr3.find((value, index, obj) => value === 2));
  console.log(arr3.findIndex(value => value === 2));
  arr3.fill(5, 1, 3);
  console.log(arr3);
  
  // MDN
  [1, 2, 3, 4, 5].copyWithin(0, 3);
  // [4, 5, 3, 4, 5]

  [1, 2, 3, 4, 5].copyWithin(0, 3, 4);
  // [4, 2, 3, 4, 5]

  [1, 2, 3, 4, 5].copyWithin(0, -2, -1);
  // [4, 2, 3, 4, 5]

  [].copyWithin.call({ length: 5, 3: 1 }, 0, 3);
  // {0: 1, 3: 1, length: 5}

  // ES6 Typed Arrays are subclasses of Array
  var i32a = new Int32Array([1, 2, 3, 4, 5]);

  i32a.copyWithin(0, 2);
  // Int32Array [3, 4, 5, 4, 5]

  // On platforms that are not yet ES6 compliant: 
  [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
  // Int32Array [4, 2, 3, 4, 5]
}

function objectSample(){
  // Object.assign
  console.log("Object.assign");
  var target = {a: 1, b: 2};
  var s1 = {b: 3, c: 4};
  var s2 = {c: 5, d: 6};
  var ret = Object.assign(target, s1, s2);
  // s1, s2の順なら、後続のs2で上書きされる
  console.log(target);
  console.log(ret === target); // true
  
  // オブジェクトのクローン
  var clone = Object.assign({}, s1);
  console.log(clone);
  clone.b = 10;
  console.log(s1); // s1.bは元の値のまま
  
  // sharrow copy（ネストしたオブジェクトに対しては、参照のコピーになる）
  var s3 = {x: {y: 1}};
  var clone3 = Object.assign({}, s3);
  clone3.x.y = 2;
  console.log(s3.x.y);
  
  // Object.is
  console.log("Object.is");
  // 通常の比較は===と同じ
  console.log(Object.is(1,1)); // true
  console.log(Object.is({},{})); // false
  var a = {};
  console.log(Object.is(a,a)); // true
  // NaN同士の比較はtrue
  console.log(Object.is(NaN,NaN)); // true
  console.log(NaN === NaN); // false
  // -0と+0の比較はfalse
  console.log(Object.is(-0,+0)); // false
  console.log(-0 === +0); // true
  
  // 利用例：NaNを探す
  var index = [0, NaN, 1].findIndex(n => Object.is(n, NaN));
  console.log(index);
}

function mathAndNumberSample() {
  console.log("Math And Number ...");
  console.log(0b10);
  console.log(0b100);
  
  console.log(0o10);
  console.log(0o100);

  console.log(0x10);
  console.log(0x100);
  
  // parseIntではパースできない
  console.log(parseInt("0b10", 2)); // 0
  console.log(Number("0b10"));
  
  // 浮動小数点は、IEEE 754準拠
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(Number.MIN_SAFE_INTEGER);
  console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
  console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); // true
  
  // isNaN
  console.log(isNaN("foo")); // 文字列なのにtrue
  console.log(Number.isNaN("foo")); // false
  console.log(Number.isNaN(NaN)); // true
  
  Number.isFinite('0'); // false
  Number.isFinite(0); // true
}

function symbolSample() {
  console.log("Symbol ...")
  
  // Symbolの生成
  var sym1 = Symbol();
  console.log(typeof sym1); // symbol
  // 説明をつけることもできる
  var sym2 = Symbol("foo");
  console.log(sym2.toString()); // "Symbol(foo)"
  // Symbolは必ずユニーク
  console.log(sym2 === Symbol("foo"));
  
}

function execMiscSample() {
  counter.increment();
  console.log(counter.count);

  let test1 = "testlet";
  console.log(test1);

  console.log(addWithDefault());

  destructuringSample();

  spreadOperatorSample();

  restParameterSample();

  computedPropertySample();

  shortHandPropertySample();
  
  // taggedTemplateSample();
  
  unicodeCodePointSample();

  stringSample();

  arraySample("arg1", "arg2");
  
  objectSample();
  
  mathAndNumberSample();
  
  symbolSample();
}
