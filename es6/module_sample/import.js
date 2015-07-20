// importをサポートしているブラウザがまだ存在しない

// メンバごとにインポート
import {foo, bar /*, Baz*/} from "./module";
console.log(foo);
bar();
// new Baz();

// インポートする変数名の指定
import {foo as poo} from "./module";
console.log(poo);

// モジュールをまとめてインポート
import * as moduleAll from "./module";
console.log(moduleAll.foo);