var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQlite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name	= 	(url[6] || null);
var user	=	(url[2] || null);
var pwd		=	(url[3] || null);
var protocol	=	(url[1] || null);
var dialect	=	(url[1] || null);
var port	=	(url[5] || null);
var host	=	(url[4] || null);
var storage	=	process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQlite O Postgres

var sequelize = new Sequelize(DB_name, user, pwd,
		{dialect: 	protocol,
		protocol: 	protocol,
		port:		port,
		host:		host,
		storage:	storage, //solo SQlite(.env)
		omitNull:	true	// solo postgres	
				
		}
		);

// importar la definición de la tabla Quiz en quiz.js
//var quiz_path = path.join(__dirname, 'quiz')
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz.

//sequelize.sync() crea e inicializa tabla de preguntas de DB
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
	 if(count === 0){ // la tabla se inicializa solo si esta vacia
	Quiz.create({ pregunta: 	'Capital de Italia',
			respuesta: 	'Roma',
			tema:		'Humanidades',
			});
	Quiz.create({   pregunta: 	'Capital de Portugal',
			respuesta: 	'Lisboa',
			tema:		'Humanidades',
			})
	.then(function(){console.log('Base de datos inicializada')});
	 };
	});
});
