var execArrowFunctionSampole = function() {
	var john = {
		name: "John",
		helloLater: function() {
			// アロー関数を使うと、
			setTimeout(() => {
				// ここでのthisはjohn
				console.log(`Hello, I'm ${this.name}`);
			}, 1000);
			
			// ES5では一旦代入して保持
			var self = this;
			setTimeout(function(){
				console.log(`Hello 2, I'm ${self.name}`);
			}, 1000)
		}
	}
	
	john.helloLater();
}