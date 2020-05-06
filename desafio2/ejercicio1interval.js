// Ejercicio 1

// No me quedó claro si la restricción de usar setInterval y no setTimeout era para el ejercicio 2 únicamente o para este también,
// por lo que lo resolví de las dos maneras.

// Resolución con setInterval

function saludar(i){
	return new Promise(resolve => {
        const interval = setInterval(() => {
			console.log('Hola mundo luego de ' + i + 's');			
			clearInterval(interval);
			resolve();
		}, i*1000);
    });
}

async function asyncSaludar(i){
    await saludar(i);
    asyncSaludar(i+1);
}

asyncSaludar(1);


// Facundo Tzoymaher Ruano