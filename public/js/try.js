    var url = "http://localhost:4000"
    var socket = io();
     socket = io.connect(url)
    var me = document.getElementById("me");
    var myButton = document.getElementById("myButton");

     socket.on('news', function(msg){
     me.innerHTML = "Hello there";
     myButton.addEventListener('click', function(){
        myButton.innerHTML = me.innerHTML;
     });
       console.log(msg)
    });