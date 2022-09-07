
/* BedelBot compara lista de cumpleaños que esta en Array de Objetos con Fecha actual.
Luego publica un comentario en Whatsapp si hay o no cumpleaños con Web-Whatsapp desde NodeJs.
Lo hacemos funcional solo con Backend por simplicidad. Asi solo ingresamos a la carpeta de proyecto con cd directorio,
luego ejecutamos con Node server.js. Me despreocupo de buscar archivo con lista de cumpleaños. */

const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
//const frases = require('./frases.js')//Pretendía agregar frases Filosofos Estoicos pero es mucho tal vez.

//Fechas de cumpleaños usuarios. Hay usuarios pendientes.
var birthdays = [
    { name: "Alvaro Torres R.(Rey)", birthmonth: 0, birthdate: 8 },
    { name: "Alvaro Gatica B.(OH)", birthmonth: 0, birthdate: 15 },
    { name: "Pablo Romero S.(Pelukraister)", birthmonth: 0, birthdate: 24 },
    { name: "Ricardo R. Boskamp (Yiashuu)", birthmonth: 0, birthdate: 27 },
    { name: "Guillermo T. Santibañez. (Tuli)", birthmonth: 1, birthdate: 15 },
    { name: "Marcelo Aray (Rojo)", birthmonth: 1, birthdate: 23 },
    { name: "Miguel Angel Pacheco (Chico)", birthmonth: 2, birthdate: 6 },
    { name: "Luis Muñoz (Gato)", birthmonth: 3, birthdate: 9 },
    { name: "Manuel Maragaño (Cabecita)", birthmonth: 3, birthdate: 12 },
    { name: "Camilo Rozas (Guajole)", birthmonth: 3, birthdate: 15 },
    { name: "Luis Montaña (Mr. Delegado)", birthmonth: 3, birthdate: 19 },
    { name: "Mauricio García", birthmonth: 3, birthdate: 23 },
    { name: "Escualo", birthmonth: 3, birthdate: 25 },
    { name: "Juan Alvarado (Corchete), Marcelo Cardenas (Chelius) y Alexis Schwarzenberg", birthmonth: 3, birthdate: 27 },
    { name: "Patricio Martínez (Pato)", birthmonth: 4, birthdate: 4 },
    { name: "Alex Cea (Cabezón)", birthmonth: 4, birthdate: 7 },
    { name: "Eduardo Romero (Lalo)", birthmonth: 4, birthdate: 29 },
    { name: "JC Henríquez (Vampiro)", birthmonth: 4, birthdate: 31 },
    { name: "Osvaldo (Flash)", birthmonth: 5, birthdate: 2 },
    { name: "JP (Chiri)", birthmonth: 5, birthdate: 6 },
    { name: "Rodrigo Hugo Rivera (Trulu)", birthmonth: 5, birthdate: 8 },
    { name: "Hermanos Vílches (Mikun y Rurouni)", birthmonth: 5, birthdate: 9 },
    { name: "Robinson Soto (Lobinzon)", birthmonth: 5, birthdate: 21 },
    { name: "Marcelo Kramm (Marciano)", birthmonth: 5, birthdate: 26 },
    { name: "Roberto A. Jaramillo (Weicof)", birthmonth: 5, birthdate: 28 },
    { name: "Carlos Aedo (Beodo Misilero)", birthmonth: 6, birthdate: 13 },
    { name: "Claudio Sanchez (Potón)", birthmonth: 6, birthdate: 14 },
    { name: "Patricio Molina (Pato)", birthmonth: 6, birthdate: 20 },
    { name: "Mauricio Matus (Careweo)", birthmonth: 6, birthdate: 22 },
    { name: "Iván Navarro (Dios nuestro)", birthmonth: 6, birthdate: 24 },
    { name: "Rodrigo Webar (Asume)", birthmonth: 7, birthdate: 14 },
    { name: "Christian Rudolph (Manchao) y Daniel Riveros", birthmonth: 7, birthdate: 21 },
    { name: "Esteban La Regla (Patelana)", birthmonth: 8, birthdate: 6 },
    { name: "Ronnie Reyes (Diri)", birthmonth: 8, birthdate: 15 },
    { name: "Edo Parada Y Javier (Pilaos)", birthmonth: 8, birthdate: 21 },
    { name: "Gonzalo Rocha (Camarada)", birthmonth: 8, birthdate: 27 },
    { name: "Francisco Triviño (Monin)", birthmonth: 8, birthdate: 29 },
    { name: "Daniel Anuch (Turco)", birthmonth: 9, birthdate: 18 },
    { name: "Christian Escobar Cid (Tevito)", birthmonth: 9, birthdate: 30 },
    { name: "Marcos Apablaza (Blablabla)", birthmonth: 10, birthdate: 1 },
    { name: "Wilo", birthmonth: 10, birthdate: 7 },
    { name: "JP. Triviño Juanito (Dick)", birthmonth: 10, birthdate: 8 },
    { name: "Omar (Tomar)", birthmonth: 10, birthdate: 24 },
    { name: "Rodrigo Angulo Burgos", birthmonth: 10, birthdate: 27 },
    { name: "Rodrigo Neira (Gordi Wawi)", birthmonth: 10, birthdate: 30 },
    { name: "Fco. Triviño (Chihuío)", birthmonth: 11, birthdate: 2 },
    { name: "José L. Alvarez Coronado (Infiltrado :) ", birthmonth: 11, birthdate: 14 },
    { name: "Nicolás Bahamondes (Nico)", birthmonth: 11, birthdate: 31 },
];

//Ejecuta QR virtual en terminal para crear instancias de ElectronJS - Whatsapp Desktop 
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


//Función compara fechas con lista de usuarios y envía mensaje a watsapp desktop si encuentra coincidencia, sino mensaje de saludo o null.
client.on('ready', () => {
    
    console.log('Client is ready!'); 
    // Número al que enviar mensaje. El segundo es el id en whatsapp del Grupo Osorno
    //const number = "+56994641425";//Usuario de pruebas local
    const number = '56998378065-1424583910@g.us'//Este es numero de Alvaro quien creo grupo y extiende para crear grupo.

    // Obteniendo ChatId desde mensajes
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    //const chatId = number.substring(1) + "@c.us";
    const chatId = number;


    //ternario toma un valor u otro dependiende de que tenga dentro.
    //var cumple= (cumple !== undefined) ? cumple : "BedelBot: Nadie de cumpleaños hoy. Fuerza Cabecita y compañeros. Buen día!!!";//Ternario para funcion
    var cumple='';//Esta opción de variable solo saluda si hay coincidencia de cumpleaños dentro del día.
    var cumpleMan='';
    
    //Aqui la logica que compara fechas cumpleaños del día 
    var today = new Date();
    console.log("Fecha de hoy")
    console.log(today)
      
        birthdays.find((it) => {

            if(it.birthdate === today.getDate() && it.birthmonth === today.getMonth()) {
                cumple= `BedelBot: Hoy esta de cumpleaños ${it.name}. Salud y vigor!!!`;     
            } else {
                console.log("Usuario no esta de cumpleaños")   
            };

    });

    //Aqui la logica que compara fechas cumpleaños de mañana 
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    console.log(tomorrow)
      
        birthdays.find((it) => {

            if(it.birthdate === tomorrow.getDate() && it.birthmonth === tomorrow.getMonth()) {
                cumpleMan= `BedelBot: Recuerden que mañana esta de cumpleaños ${it.name}!!!`;     
            } else {
                console.log("Usuario no esta de cumpleaños")   
            };

    });  
    var cumples= `${cumple} ${cumpleMan}`;
    // Sending message.
    client.sendMessage(chatId, cumples);
});

//Fin.








