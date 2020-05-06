// Ejercicio 2

function saludar(i){
	return new Promise(resolve => {
		let t = 0;
        const interval = setInterval(() => {
			console.log('Hola mundo luego de ' + (i*100) + 'ms, vez número ' + (t+1));			
			t++;
			if(t==5){
				clearInterval(interval);
				resolve();
			}
		}, i*100);
    });
}

async function asyncSaludar(i){
    await saludar(i);
    asyncSaludar(i+1);
}

asyncSaludar(1);


// Facundo Tzoymaher Ruano