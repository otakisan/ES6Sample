function* generator1() {
	// yieldで区切りを指定
	yield 1;
	yield 2;
	return 3;
}

function generatorSample1() {
	// イテレータの生成
	var g = generator1();

	// 1つ目のyieldまで実行
	console.log(g.next());
	// 2つ目のyieldまで実行
	console.log(g.next());
	// 最後のyieldまで実行
	console.log(g.next());

	// for/ofとの組み合わせ
	// FF39はlet未サポート
	for (var n of generator1()) {
		console.log(n);
	}
}

function msg(str) {
	console.log("msg:", str);
	return str;
}

function* generator2() {
	console.log("start");
	
	var ret1 = yield msg("yield 1");
	console.log("ret1:", ret1);
	
	var ret2 = yield msg("yield 2");
	console.log("ret2:", ret2);
	
	return "end";
}

function generatorSample2() {
	var g = generator2();
	
	var next1 = g.next();
	console.log(next1);
	
	// yieldに値を渡す
	var next2 = g.next("next 1");
	console.log(next2);
	
	var next3 = g.next("next 2");
	console.log(next3);
}

// フロー制御関数
function asyncflow(generator) {
	var g = generator();
	var next = value => {
		// Promiseを受け取る
		var result = g.next(value);
		if(!result.done) {
			var promise = result.value;
			promise.then(value => {
				// Promiseが完了したら、next関数に結果を渡す
				next(value);
			});
		}
	};
	next();
}

function generatorSample3() {
	asyncflow(function* () {
		// yieldにPromiseを渡す
		var items = yield getUrl("/~takashi/es6/items.json");
		var itemObjs = JSON.parse(items);
		var id = itemObjs[0].id;
		var item = yield getUrl(`/~takashi/es6/views/item${id}.html`);
		console.log(item);
	})
}

var execGeneratorSample = () => {
	//generatorSample1();
	//generatorSample2();
	generatorSample3();
}
