const proyectos = [
{
	nombre: "CWE",
	desc: "CWE (coding with engineers), es una pagina web dedicada a proporcionar cursos gratuitos de programacion para principiantes, con el objetivo de incentivar a las personas a involucarse en las tecnologias modernas.",
	imagenes: 5,
	folder: "cwe",
	link: "" 
},{
	nombre: "Typewise",
	desc: "Typewise, es un interprete que permite la ejecucion de codigo typewise, un lenguaje derivado de javascript, puede ser utilizado desde la pagina web dedicada alojada en git hub pages.",
	imagenes: 5,
	folder: "tw",
	link: "https://dave965.github.io/Proyecto2_compi1_202113378/"
},{
	nombre: "Animatools",
	desc: "Pagina web que permite agregar notas a un pizarrón para ayudar al animador a calcular la velocidad de cada parte animada con un sofware 3D.",
	imagenes: 3,
	folder: "at",
	link: "https://dave965.github.io/Animatools/"
},{
	nombre: "Babi adventure",
	desc: "Videojuego hecho con python en el que controlas a una protagonista en un mundo magico lleno de criaturas, puedes combatir con distintos tipos de armas y lanzar hechizos que te ayudaran a explorar y acabar con tus enemigos.",
	imagenes: 4,
	folder : "ba",
	link: ""
},{
	nombre: "Tic Tac Toe AI",
	desc: "Videojuego de Tic tac toe en el que puedes competir contra un humano o contra una inteligencia artificial.",
	imagenes: 3,
	folder : "ttt",
	link: ""
},{
	nombre: "Buscaminas AI",
	desc: "Clasico juego de buscaminas en el que tienes a una inteligencia artificial para ayudarte a hacer movimientos cuando te quedas atorado.",
	imagenes: 3,
	folder : "ms",
	link: ""
}]

const obs = new IntersectionObserver((es) => {
	es.forEach((e)=>{
		if(e.isIntersecting){
			e.target.classList.add("muestra");
		}else{
			e.target.classList.remove("muestra");
		}
	});
});


const elementos_ocultos = document.querySelectorAll('.oculto');
elementos_ocultos.forEach((e)=> obs.observe(e));

const separar = id =>{
	const e = document.getElementById(id),
		texto = e.innerText.split("");
	e.innerText = "";
	
	texto.forEach(l =>{
		const span = document.createElement("span");
		span.className = "letra";
		span.innerText = l;
		e.appendChild(span);
	});
}

function permahover(e,nombre){
	e.classList.contains('perma-'+nombre) ? null : e.classList.add('perma-'+nombre);
}

function cambiar_seccion(inicio,final){
	ini = document.getElementById(inicio);

	if(final == "main"){
		ini.ontransitionend = () => {
		ini.ontransitionend = () => {};
		ini.classList.add("hidden");
		ini.classList.remove("saliendo");
		document.getElementById(final).classList.remove("hidden");
		}
		ini.classList.add("saliendo");
	}else{
		ini.classList.add("hidden");
		document.getElementById(final).classList.remove("hidden");
	}
	

}

function cerrar_panel(e){
	x = document.getElementById('contenedor-trabajos')
	x.classList.remove("hidden");
	e.parentElement.classList.remove("panel_abierto");
	window.setTimeout(()=>{
		e.parentElement.classList.add("panel_cerrado");
	},50);
	e.parentElement.onanimationend = () => {
      e.parentElement.classList.add("hidden");
	};
}

function abrir_panel(num){
	cargar(num);
	e = document.getElementsByClassName('panel')[0];
	x = document.getElementById('contenedor-trabajos')
	x.classList.add("hidden");
	if(e.classList.contains("panel_cerrado")){
	 e.classList.remove("panel_cerrado");
	 e.classList.remove("hidden");
	 e.onanimationend = () =>{};
	 e.classList.add("panel_abierto");
	}
}

function cargar(indice){
	document.getElementById("titulo_panel").innerHTML = proyectos[indice].nombre;
	document.getElementById("contenido_panel").innerText = proyectos[indice].desc;
	let html = "";
	for(let i = 0; i< proyectos[indice].imagenes;i++){
		html += '<img class ="showcase" src="src/'+proyectos[indice].folder+'/'+proyectos[indice].folder+'-'+(i+1)+'.png" onclick="zoom(this)" />'
	}
	document.getElementById("l-side").innerHTML = html;
	boton = document.getElementById("boton_visita");
	if(proyectos[indice].link != ""){
		if(boton.classList.contains("hidden")){
			boton.classList.remove("hidden");
		}
		boton.onclick = () =>{
			cargar_pagina(proyectos[indice].link);
		}
	}else{
		boton.classList.add("hidden");
	}
}


function cargar_pagina(link){
	window.open(link, '_blank');
}

function zoom(e){
	var modal = document.getElementById("myModal");
	var modalImg = document.getElementById("img01");
	modal.style.display = "flex";
  	modalImg.src = e.src;
}

function cerrar_modal(){
	document.getElementById("myModal").style.display = "none";
}

function llenar_works(){
	html = '<div class = "linea">';
	for(let i =0;i<proyectos.length;i++){
		if(i%3==0){
			html += '</div>\n<div class = "linea">'
		}
		html += '<div class= "trabajo" onclick = "abrir_panel('+i+')">'
          +'<div class="fondo_trabajo"></div>'
          +'<img class ="icono" src="src/'+proyectos[i].folder+'/'+proyectos[i].folder+'-icon.png" />'
          +'<h1 class="card-title">'+proyectos[i].nombre+'</h1>'
        +'</div>';
	}
	html+="</div>";
	document.getElementById("contenedor-trabajos").innerHTML = html;
}

function letras_random(container,texto, interval = null){  
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  container.onmouseenter = event => { 

  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    texto.innerText = texto.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return texto.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= texto.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 10);
  }
}

separar("p-skills");
separar("p-works");
separar("p-refs");
separar("p-contact");
llenar_works();
letras_random(document.getElementsByClassName("linea-2")[0], document.getElementById("telefono"));
letras_random(document.getElementsByClassName("linea-2")[1], document.getElementById("correo"));