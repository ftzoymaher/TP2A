const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://crud_user:TepSmATBHI2CpVV3@ftzoymaher-lwcen.mongodb.net/test?retryWrites=true&w=majority"
const client = new mongoclient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

function getCollection() {
	return new Promise((resolve) => {
		resolve(client.connect()
			.then(result => {
				console.log(chalk.blue("Conectado"));
				collection = result.db("ORT").collection("Alumnos");
			})
			.catch(error => {
				console.log(chalk.red("Conexión fallida: ", error));				
			})
	})
}

function create(alumno){
    return new Promise((resolve) => {
        resolve(collection.insertOne(alumno, function(error, result) => {
            if(error){
				console.log(chalk.red("Create fallido"));				
            }
			else{
				console.log(chalk.green("Create exitoso:"));
			}			
        }))
	})
}

function read(dni){
	return new Promise((resolve) => {
		resolve(collection.findOne({"dni" : dni }, function(error, result) {
			if (error) {
				console.log(chalk.red("Read fallido"));				
			} else {
				console.log(result);
			}
		}));
	})
}

function update(dni){
	return new Promise ((resolve) => {
		const query = { "dni": dni };
		const newData = { $set: {nombre: "nombre_updated", apellido: "apellido_updated" } };
		resolve(collection.updateOne(query, newData, function(err, result) {
				if (err) {
					console.log(chalk.red("Update fallido"));
				} else {	
					console.log(chalk.green("Update exitoso:"));
				}
			})
		)		
	})
}

function ddelete(dni){
	return new Promise ((resolve) => {
		const query = { "dni": dni };
		resolve(collection.deleteOne(query, function(err, result) {
				if (err) {
					console.log(chalk.red("Delete fallido"));
				} else {
					console.log(chalk.green("Delete exitoso (si muestra null es porque efectivamente lo borró):"));					
				}			
		}));
	});
}

let collection;
const alumno = {
	"nombre" : "Guillermo",
	"apellido" : "Rojas",
	"dni" : 45895654
}
getCollection();
	.then( () => {
		create(alumno);
	})
	.then( () => {
		read(alumno.dni);
	})
	.then( () => {
		update(alumno.dni);
	})
	.then( () => {
		read(alumno.dni);
	})
	.then( () => {
		ddelete(alumno.dni);
	})
	.then( () => {
		read(alumno.dni);
	})
	.catch(error => {
		console.log(error);
	});
client.close(); 
