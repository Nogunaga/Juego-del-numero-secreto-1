let btnIntentar = document.getElementById('btn_intentar');
let btnReiniciar = document.getElementById('btn_reiniciar');
let inputUsuario = document.getElementById('container__input');
let numeroSecreto = GenNumeroAleatorio();
let intentos = 3;


// Comportamiento btn intentar
btnIntentar.addEventListener('click', (e) => { 
    return compararNumeros();    
});


// Comportamiento bnt Reiniciar
btnReiniciar.addEventListener('click', (e) => { 
    return  reiniciarJuego();
});

// Comportamiento bnt Reiniciar
inputUsuario.addEventListener('change', (e) => { 
    return this.value <= 1 ? this.value:
    this.value >= 5? 5: null
});


// Asigna textos a diferentes elementos
function asignarTextoElemento(HTMLelement = '', text='') {
    let element = document.querySelector(HTMLelement)
    return element.innerHTML = text;
}
asignarTextoElemento('.titulo','Juego del Numero Secreto');
asignarTextoElemento('.texto__parrafo','Ingresa un numero del 1 al 5');


// Genera un numero aleatorio entre un maximo y un minimo
function GenNumeroAleatorio(max=1,min=5) {
    let numero = Math.floor(Math.random()*(max-min)+min);
    return numero;
}


// Compara los valores de el usuario y el numero secreto
function compararNumeros() {
    let numeroUsuario = inputUsuario.value;

    return intentos <= 1 ? 
    (
        asignarTextoElemento('p',`Has agotado tus intetos, vuelve mas tarde`),
        enableOrDisable([inputUsuario,btnIntentar,btnReiniciar],[true,true,false])
    ): parseInt(numeroUsuario) === numeroSecreto ? 
    (
        asignarTextoElemento('p','Correcto!'),
        limpirInput(),
        enableOrDisable([btnReiniciar,btnIntentar,inputUsuario],[false,true,true])
    ):
        numeroUsuario < numeroSecreto ? 
        (
            intentos--,
            limpirInput(),
            asignarTextoElemento('p',`El numero secreto es mayor, te quedan ${intentos} intentos`)
        ) 
        :(  
            intentos--,
            limpirInput(),
            asignarTextoElemento('p',`El numero secreto es menor, te quedan ${intentos} intentos`)
        ); 
}


// Reinicia el juego
function reiniciarJuego() {
    numeroSecreto = GenNumeroAleatorio();  
    limpirInput(),
    enableOrDisable([btnIntentar,inputUsuario],[false,false])
    asignarTextoElemento('p','Ingresa un numero del 1 al 5');
    intentos=3;
    return;
}


// Limpiar Input
function limpirInput() {
    inputUsuario.value = ''
}


// Habilitar o deshabilitar elementos
function enableOrDisable(elements = [],status=[]) {
    for(element in elements)
    {
            let htmlElement = elements[element];
            htmlElement.disabled = status[element];
    }
    return
}