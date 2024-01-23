function pend(callback, name="PenderPromise") {
    let pending = true;
    let failed = false;
    let catches = [];


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

                if (catches.length > 0) f.catch(e => {
                    catches.forEach( c => c(e) );
                });

                return f.then.bind(f);
			}


            if (prop == "catch") {
                return function(catcher) {
                    catches.push(catcher);
                }
            }
			

			return target[prop].bind(target);
		}
	});


	// inspect stuff
	try {
		
		stuff[require('util').inspect.custom] = function() {
			return `\x1b[3m${name} \x1b[33m<${ (pending) ? "pending" : (failed) ? "rejected" : "fulfilled" }>\x1b[0m`;
		}

	} catch(e) { }


	return stuff;
}



module.exports = pend;
