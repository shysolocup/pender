class Payload {
	constructor(base, ...baseArgs) {

		// the actual data stuff
		this.data = {};


		// the main return proxy
		let stuff = new Proxy(


			// the promise returned originally
			Promise.resolve(new Proxy(this.data, {
			
				
				// detects mostly when the promise is awaited
				get: (...args) => {
					const [ target, prop ] = args;
					return target[prop];
				}
			})), {


			// detector for when something is called from the promise
			get: (...args) => {
				const [ target, prop ] = args;

                if (prop == "then") {
                    return target[prop].bind(base(...baseArgs));
                }
                
                return target[prop].bind(target);
			}
		});


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
