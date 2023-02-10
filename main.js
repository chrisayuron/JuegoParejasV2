checkeds=document.querySelectorAll('.cantidad')
let juego=null
let cant=null
const aceptar=document.querySelector('#aceptar')
const tablero=document.querySelector('#tablero')
const reset=document.querySelector('#reiniciar')
let tarjetasDestapadas=0
let tarjeta1=null
let tarjeta2=null
let resultado1=''   
let resultado2=''
let aciertos=0
let movimientos=0
let temporizador=false
let tiempo=null
let maxTime=null
let mostrarAciertos= document.getElementById('aciertos')
let mostrarMovimientos= document.getElementById('movimientos')
let mostraTiempo=document.getElementById('tiempo')


function contarTiempo(){
    mitempo=setInterval(()=>{
        if (tiempo==0){
            clearInterval(mitempo)
            voltearTodas()
        }
        else {
            tiempo--
            mostraTiempo.innerHTML=`${tiempo} s 😏`    
        }
        
    },1000 )
}

function voltearTodas(){
    mostraTiempo.innerHTML=`Time Over 😭`  
    for (let i=0;i<=cant*2;i++){
        document.getElementById(`${i}`).innerHTML=numeros[i]
        document.getElementById(`${i}`).disabled=true
    }
}

reset.addEventListener('click',()=>{
    location.reload()
})


aceptar.addEventListener("click",()=>{ //Boton aceptar para crear el tablero
    if (checkeds[0].checked==true){
        juego=checkeds[0].value
        aceptar.disabled=true
        crearTablero()
        contarTiempo() 
    
    } else if(checkeds[1].checked==true){
        juego=checkeds[1].value
        aceptar.disabled=true
        crearTablero()
        contarTiempo()
    }
        else{alert('No has seleccionado la cantidad')}
    });
    


  function crearTablero(){
    let tarjetas=''
        for(i=0;i<juego;i++){
        tarjetas+=`<button id=${i} onclick="destapar(${i})" value="" class="tarjeta"></button>`
        if(juego==16){
            tablero.className='tablero1'
            cant=8
            tiempo=45
            maxTime=45
        }else if (juego==32){
            tablero.className='tablero2'
            cant=16
            tiempo=180
            maxTime=180
        }
        tablero.innerHTML=tarjetas
        }
        ordenarNumeros(cant)
  }

  function generar(cant){
    console.log(cant)
    let numeros=[]
    for(i=1;i<=cant;i++){
        numeros.push(1*i)
        numeros.push(1*i)
    }
    console.log(numeros)
    return(numeros)
  }

  function ordenarNumeros(cant){
    numeros=generar(cant)
    numeros=numeros.sort(()=>Math.random()-0.5)
    for(i=0;i<cant;i++){
        document.getElementById(i).value=numeros[i]
        
    } 
 
  }


function destapar(indice){

    tarjetasDestapadas++
   
    if(tarjetasDestapadas==1){
        tarjeta1=document.getElementById(indice)
        tarjeta1.innerHTML=numeros[indice]
        tarjeta1.disabled=true
        resultado1=numeros[indice]
    } 
    else if (tarjetasDestapadas==2){
        tarjeta2=document.getElementById(indice)
        tarjeta2.innerHTML=numeros[indice]
        tarjeta2.disabled=true
        resultado2=numeros[indice]

        if(resultado1==resultado2){
            tarjetasDestapadas=0
            aciertos++
            movimientos++            
        } else{
            movimientos++
            setTimeout(()=>{
            tarjetasDestapadas=0
            tarjeta1.disabled=false
            tarjeta2.disabled=false
            tarjeta1.innerHTML=''
            tarjeta2.innerHTML=''
            },500) 
        }
        mostrarAciertos.innerHTML=`${aciertos} 😃`
        mostrarMovimientos.innerHTML=`${movimientos} 😛`
       
    }
    if(aciertos==cant){
        clearInterval(mitempo)
        mostraTiempo.style.fontSize='15px'
        mostraTiempo.innerHTML=`Logrado: 🎉${maxTime-tiempo} seg🎉`    
    }
    
    
    
    
}
