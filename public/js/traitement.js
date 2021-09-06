var url = "http://localhost:3000"
var socket = io();
socket = io.connect(url)

var counter = 0; // Nombre total des parties existantes
var delete_id_incrementer = 0;
var terminate_id_incrementer = 0;
var add = document.getElementById("add");
var element = document.getElementById("element")
var send_data = document.getElementById("send_data")
var incrementer = document.getElementById("incrementer")
var list_delete_id = [];
var list_terminate_id = [];


 send_data.addEventListener('click', function(event){

    socket.emit('message', element.value);
 })

 socket.on('message', function (message) {
    var add_div = document.getElementById("add");
    var content = document.createElement("p"); //Création des paragraphes pour les parties
    var created_paragraph = document.createTextNode('partie');
    add_div.appendChild(content);
    content.innerHTML = message;

    counter++;
    incrementer.value = counter;
    incrementer.innerHTML = counter;

    //Gestion du button supprimer
    var div_delete = document.getElementById("delete_div");
    var delete_button = document.createElement("button");
    var delete_button_text = document.createTextNode('Supprimer');
    delete_button.innerHTML = "Supprimer";
    delete_button.className = "btn btn-danger";
    div_delete.appendChild(delete_button);
    delete_button.id = "delete_"+delete_id_incrementer; //Pour que tous les boutons aient des ID differents
    content.id = "paragraphe_"+delete_id_incrementer; // chaque à sa propre id
    list_delete_id.push(delete_button.id)
    delete_id_incrementer++;



    // Gestion du button Terminer
    var div_terminate = document.getElementById("terminate_div");
    var terminate_button = document.createElement("button");
    var terminate_button_text = document.createTextNode('Terminer');
    terminate_button.innerHTML = "Terminer";
    terminate_button.className = "btn btn-secondary";
    div_terminate.appendChild(terminate_button);
    terminate_button.id = "terminate_"+terminate_id_incrementer; //Pour que tous les boutons aient des ID differents
    list_terminate_id.push(terminate_button.id)
    terminate_id_incrementer++

    //Supprission des parties
    delete_button.addEventListener('click',function(event){
        delete_button_element_to_delete = document.getElementById(delete_button.id);
        terminate_button_element_to_delete = document.getElementById(terminate_button.id);
        paragraph_to_delete = document.getElementById(content.id);
        if(delete_button_element_to_delete && terminate_button_element_to_delete){
            delete_button_element_to_delete.remove();
            terminate_button_element_to_delete.remove();
            paragraph_to_delete.remove();
            counter--;
            incrementer.value = counter;
            incrementer.innerHTML = counter;
        }
        else{
            console.log("Il n'y aucun element à supprimer")
            console.log(delete_button.id)
        }

    });

    // Terminer des parties

    terminate_button.addEventListener('click', function(event){
        delete_button_element_to_delete = document.getElementById(delete_button.id);
        terminate_button_element_to_delete = document.getElementById(terminate_button.id);
        if(delete_button_element_to_delete && terminate_button_element_to_delete){
            delete_button_element_to_delete.remove();
            terminate_button_element_to_delete.remove();
            content.className="lead";
            content.innerHTML+= " (Partie Terminée)";
            counter--;
            incrementer.value = counter;
            incrementer.innerHTML = counter;
        }
    })


 })// Fin de socket