class Payload {
	constructor(base) {

		// the actual data stuff
		this.data = {};

		
		// promise proxy data
		this.__promiseProxy = {

			self: null,

			// data stores
			stores: {
				data: [],
				promise: []
			}
			
		};


		// the main return proxy
		let stuff = new Proxy(

			// the promise returned originally
			Promise.resolve(new Proxy(this.data, {

				
				// detects mostly when the promise is awaited
				get: (...args) => {
                    let stores = this.__promiseProxy.stores
					stores.data = args;

					const { data, promise } = stores;
					const [ target, prop ] = args;

					if (data.length > 0 && promise.length > 0) {
                        Object.assign(target, base);
                    }

					return target[prop];
				}
			})), {


			// detector for when something is called from the promise
			get: (...args) => {
                let stores = this.__promiseProxy.stores
				stores.promise = args;

				const [ target, prop ] = args;

				// if the promise is awaited (then is called for await and .then )
                if (prop == "then") {
                    return target[prop].bind(base);
                }
                
                return target[prop].bind(target);
			}
		});

		
		this.__promiseProxy.self = stuff;

		return stuff;
	}
};


// inspect stuff
try { 
	const util = require('util');
	
	Payload.prototype[util.inspect.custom] = function () {
		return `Payload \x1b[33m\x1b[3m[pending]\x1b[0m`;
	};

} catch(e) { }


module.exports = Payload;
