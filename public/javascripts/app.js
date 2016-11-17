document.addEventListener("DOMContentLoaded", function() {
    //connect to server
    var socket = io()
    var circles = document.getElementById('circles');
    var initials = '';
    
    socket.on('add-circle', function(data){
        addCircle(data)
        })
    
    socket.on('clear-page', function(){
        circles.innerHTML = ''
    })
    

  circles.addEventListener('click', function(evt) {
//    addCircle(evt.clientX, evt.clientY, randomBetween(10,125), getRandomRGBA());
    //emitting code to server below
    //'add-circle' is just name of message
      socket.emit('add-circle', {
        initials: initials, 
        x: evt.clientX,
        y: evt.clientY,
        dia: randomBetween(10, 125),
        rgba: getRandomRGBA()
    })  
  });

    
  var button = document.getElementsByTagName('button')[0]
  
  button.addEventListener('click', function() {
      socket.emit('clear-page')
  });

  do {
    initials = getInitials();
  } while (initials.length < 2 || initials.length > 3);

  function getInitials() {
    var input = prompt("Please enter your initials");
    return input ? input.toUpperCase() : '';
  }

  function addCircle(data) {
    var el = document.createElement('div');
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = data.dia + 'px';
    el.style.backgroundColor = data.rgba;
    el.style.fontSize = Math.floor(data.dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    el.style.lineHeight = data.dia + 'px';
    el.innerHTML = data.initials;
    circles.appendChild(el);
    el.innerHTML = data.initials;
    circles.appendChild(el);
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), 
            ',', randomBetween(0, 255),
            ',',
      randomBetween(0, 255),',',
            randomBetween(2, 10) / 10, ')'].join('');
  }

});
