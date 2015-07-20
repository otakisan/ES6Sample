var execProxySample = function () {
	// ハンドラオブジェクト
	var handler = {
		// プロパティの取得をトラップ
		get(target, key, receiver) {
			console.log("proxy GET:", key);
			
			// ここで返した値がプロパティの値になる
			return target[key];
		},
		set(target, key, val, receiver) {
			console.log("proxy SET:", key, val);
			target[key] = val;
		}
	};
	
	// 対象オブジェクト
	var obj = {foo: 1};
	// Proxyオブジェクトの生成
	var proxy = new Proxy(obj, handler);
	console.log(proxy.foo);
	console.log(proxy.bar);
	console.log(proxy.foo = "new value...");
	
	// Reflectは、現在Edgeのみサポート
	// var handler2 = {
	// 	get(target, key, receiver) {
	// 		console.log("proxy GET:", key);
			
	// 		// 元の挙動で返す
	// 		return Reflect.get(target, key, receiver);
	// 	}
	// };
	// var proxy2 = new Proxy(obj, handler2);
	// console.log(proxy2.foo);
	// console.log(proxy2.bar);
	
	
	var person = {
		name: "Bob",
		age: 20
	};
	person = createTypeSafeObject(person);
	person.name = "John"; // Ok
	person.age = true; // Error
}

function createTypeSafeObject(obj) {
	return new Proxy(obj, {
		set(target, key, value, receiver) {
			var currentType = typeof target[key];
			var newType = typeof value;
			if(key in target && currentType !== newType) {
				throw new Error(`${key} requires a ${currentType}`);
			}else {
				return target[key];
			}
		}
	});
}