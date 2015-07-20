"use strict";

// class構文は、現在（20150719）は、chromeのstrict modeのみ
// MDNサンプル
class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(length) {
    super(length, length);
    this.name = 'Square';
  }
}

// 自分の適当なサンプル
// 組み込みクラスを継承する
class CustomDate extends Date {
  constructor(year) {
    super();
    super.setFullYear(year);
  }

  customYear(condition) {
    // letはブロックスコープ
    let plus = 0;
    if (condition) {
      let plus = 1;
    }
    return super.getFullYear() + plus;
  }

  blockScopeSample() {
    console.log("block scope ...");

    console.log("ES5 ...");
    // ES5でよくある間違い
    // 5が5回表示されてしまう
    for (var i = 0; i < 5; i++) {
      setTimeout(function () { console.log(i) }, i * 100);
    }
    // 正しくはこちら
    for (var i = 0; i < 5; i++) {
      (function (x) {
        // iを関数スコープに、xとして保存する
        setTimeout(function () { console.log(x) }, x * 100);
      })(i);
    }
    
    console.log("ES6 ...");
    // ES6
    for (let i = 0; i < 5; i++) {
      setTimeout(function () { console.log(i) }, i * 100);
    }
    
  }
}

// WEB+DB
class Person {
  constructor(name) {
    this.name = name;
  }
  
  // インスタンスメソッド
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  // スタティックメソッド
  static create(name) {
    return new Person(name);
  }
}

class Author extends Person {
  constructor(name, book) {
    // 親のコンストラクタは必ず呼ぶ必要があるらしい
    super(name);
    this.book = book;
  }
  
  // インスタンスメソッドのオーバーライド
  greet() {
    // 親のメソッド呼び出し
    super.greet();
    console.log(`I wrote ${this.book}`);
  }
  
  // スタティックメソッドのオーバーライド
  static create(name) {
    return new Author(name, "default book");
  }
  // 引数の数を変えてもできるけど、VS上はエラーが出る
  // オーバーロードはできないので、双方定義することはできない
  // static create(name, book) {
  //   return new Author(name, book);
  // }
}

class MyArray extends Array {
  
}

function execClassSample() {
  console.log("class ...");

  var sq = new Square(3);
  console.log(sq.height);

  var cusDate = new CustomDate(2020);
  console.log(cusDate.customYear(true));
  cusDate.blockScopeSample();

  var bob = new Person("bob");
  bob.greet();

  var john = Person.create("john");
  john.greet();

  var author = new Author("Gillian Flynn", "Gone Girl");
  author.greet();
  
  //  var author2 = Author.create("Someone", "Some Book");
  var author2 = Author.create("Someone");
  author2.greet();
  
  // var arr = MyArray.from("foo");
  // console.log(arr);
}