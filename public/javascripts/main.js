let socket = io.connect("http://localhost:3000", { "forceNew": true });

socket.on('update-ofers', data => {
    renderOfers(data.ofers, data.receivingOffers);
  });


function login() {
    window.oferer = {
        nit: document.getElementById("nit").value,
        razonsocial: document.getElementById("razonsocial").value
    }
    document.getElementById("loginBtn").disabled = true;
    document.getElementById("nit").disabled  = true;
    document.getElementById("razonsocial").disabled  = true;
    if(window.receivingOffers){
    document.getElementById("oferBtn").disabled = false;
    }

}

function renderOfers(ofers, receivingOffers) {
    let html = ofers.map((ofer, i) => {
        return (`
            <p>${ofer.razonsocial} ${ofer.accepted? `[<strong>Oferta aceptada. Valor: $${ofer.value}</strong>]` : '[Oferta no aceptada]'}</p>
        `);
    }).join(' ');
    window.receivingOffers = receivingOffers;
    if(!receivingOffers){
        document.getElementById("oferBtn").disabled = true;
    }

    document.getElementById("ofers").innerHTML = html;
}


function sendOfer() {
    socket.emit('new-ofer', window.oferer);
    document.getElementById("oferBtn").disabled = true;
    setTimeout(function () {
        document.getElementById("oferBtn").disabled = false;
    }, 30000);
}

