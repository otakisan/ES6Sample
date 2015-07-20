function getUrl(url) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = () => {
			if(xhr.status === 200) {
				resolve(xhr.responseText);
			}
			else{
				reject(new Error(xhr.statusText));
			}
		};
		xhr.onerror = () => {
			reject(new Error(xhr.statusText));
		};
		xhr.send();
	});
}

function promiseAllSample() {
	Promise.all([
		getUrl("/~takashi/es6/views/foo.html"), getUrl("/~takashi/es6/views/bar.html")
	]).then(res => {
		// fooのレスポンス
		console.log(res[0]);
		
		// barのレスポンス
		console.log(res[1]);
	}).catch(e => {
		console.error(e);
	})
}

function getUrlSample() {
	getUrl("/~takashi/es6/items.json")
	.then(res => {
		var items = JSON.parse(res);
		console.log(items.map(item => item.name));
	}).catch(e => {
		console.error(e);
	})	
}

var execPromiseSample = function() {
	//alert("test!");
	getUrlSample();
	
	//promiseAllSample();
}

