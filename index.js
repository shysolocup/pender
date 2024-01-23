function pend(callback) {
    let pending = true;


	// the main return proxy
	let stuff = new Proxy(


		// the promise returned originally
		Promise.resolve( {} ), {


		// detector for when something is called from the promise
		get(target, prop) {

			// if it's being awaited then run the promise
			if (prop == "then" || prop == "finally") {
                pending = false;

				let f = callback();
				f = ((f instanceof Promise) ? f : Promise.resolve(f))
				return f.then.bind(f);
			}
			
			return target[prop].bind(target);
		}
	});


	// inspect stuff
	try {
		
		stuff[require('util').inspect.custom] = function() {
			return `\x1b[3mPender Promise \x1b[33m<${ (pending) ? "pending" : "fulfilled" }>\x1b[0m`;
		}

	} catch(e) { }


	return stuff;
}



module.exports = pend;
