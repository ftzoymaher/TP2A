// Ejercicio 1

// No me quedó claro si la restricción de usar setInterval y no setTimeout era para el ejercicio 2 únicamente o para este también,
// por lo que lo resolví de las dos maneras.

// Resolución con setTimeout

function saludar(i){
	setTimeout(() => {
		console.log('Hola mundo luego de ' + i + 's');
		saludar(i+1);
	}, i*1000);
}

saludar(1);


// Facundo Tzoymaher Ruano