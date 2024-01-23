class ahold {
	constructor(base) {

		this.data = {};

		this.__promiseProxy = {

			self: null,

			stores: {
				data: [],
				promise: []
			}
			
		};


		let stuff = new Proxy(
			Promise.resolve(new Proxy(this.data, {
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

			get: (...args) => {
                let stores = this.__promiseProxy.stores
				stores.promise = args;

				const [ target, prop ] = args;

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


module.exports = ahold;
