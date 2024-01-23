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


				// if it's being awaited then run the promise
                if (prop == "then") {
                    return target[prop].bind( (base instanceof Function) ? base.bind(base) (...baseArgs) : base );
                }
                
                return target[prop].bind(target);
			}
		});


		// inspect stuff
		try {
			stuff[require('util').inspect.custom] = function() {
				return `\x1b[3mPayload \x1b[33m<pending>\x1b[0m`;
			}

		} catch(e) { }


		return stuff;
	}
};


module.exports = Payload;
