const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://crud_user:TepSmATBHI2CpVV3@ftzoymaher-lwcen.mongodb.net/test?retryWrites=true&w=majority"
const client = new mongoclient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

function getCollection() {
  return client.connect()
    .then(result => {
      console.log(chalk.blue("Conectado"));
	  return result.db("ORT").collection("Alumnos");
    })
    .catch(error => {
      console.log(chalk.red("Conexión fallida: ", error));
      return null;
    });
}

function create(alumno){
    return new Promise((resolve) => {
        resolve(collection.insertOne(alumno, (error, result) => {
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
	new Promise((resolve) => {
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
	new Promise ((resolve) => {
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
	new Promise ((resolve) => {
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
async function init(){
	collection = await getCollection();
	create(alumno);
	read(alumno.dni);
	update(alumno.dni);
	read(alumno.dni);
	ddelete(alumno.dni);
	read(alumno.dni);
}

const alumno = {
	"nombre" : "Guillermo",
	"apellido" : "Rojas",
	"dni" : 45895654
}

init();

