let ValorA=0;
let ValorB=0; 
let Operador="";

function Numero(valor) {
	let ValorScreen = document.getElementById("screen").innerHTML;
	let ValorScreenValor = ValorScreen + valor;
	
	if (ValorScreen.length < 12)
	{	
		//Si hay más de un punto, al segundo lo cambie por un vacío
		if (ValorScreenValor.split(".").length>2)
			valor = "";

		//Si existe un cero a la izquierda
		if (ValorScreen[0]=='0')
			ValorScreen = ValorScreen.slice(2);	//Asigna a la cadena a partir de la posición 2
		
	  	document.getElementById("screen").innerHTML = ValorScreen + valor;
	}
  
}

function BorraCalculo (){
	ValorA=0;
	ValorB=0; 

	document.getElementById("screen").innerHTML=0;
}

function BotonCE (){

	document.getElementById("screen").innerHTML=0;	//Borra solo el valor actual de la pantalla

}

function GuardaA(ValorOperador){
	ValorA = parseFloat(document.getElementById("screen").innerHTML);	//Convierte el valor a flotante
	
	document.getElementById("screen").innerHTML = "0";
	Operador = ValorOperador;
}

function Resultado(){
	let ResultadoOperacion;	//Guarda el valor de la operación artimética
	let SeparacionCantidad;	//Guarda los dígitos de la izquierda y derecha del punto
	let CantidadSinPunto;	//Guarda todos los dígitos sin el punto decimal
	let NotacionCientifica;	//Guarda la notación científica
	let NumeroDigitos;		//Guarda el número de digitos que hay en pantalla
	let DesplazaPunto;		//Guarda el número de posiciones que desplaza el punto

	ValorB = parseFloat(document.getElementById("screen").innerHTML);
	
	switch (Operador)
	{
		case '+':
			ResultadoOperacion = ValorA + ValorB;
		break;
		case '-':
			ResultadoOperacion = ValorA - ValorB;
		break;
		case 'x':
		case '*':
			ResultadoOperacion = ValorA * ValorB;
		break;
		case '/':
			ResultadoOperacion = ValorA / ValorB;
		break;

	}
	
	NumeroDigitos = ResultadoOperacion.toString();		//Convierte el número de la operación aritmética a cadena

	//alert(ValorA + '\n' + ValorB + '\n' + NumeroDigitos.length);

	//Si el número de dígitos es mayor a 12 se crea la notación científica
	if (NumeroDigitos.length > 12)	
	{
		DesplazaPunto = NumeroDigitos.indexOf (".");	//Identifica la posición del punto decimal dentro de la cadena

		if (DesplazaPunto < 0)	//Si la cantidad en pantalla no tiene punto decimal
			DesplazaPunto = NumeroDigitos.length - 1;	//El desplazamiento es el tamaño de la cadena menos una posición
		else
			DesplazaPunto = DesplazaPunto - 1;			//El desplazamiento es la posición del punto decimal menos 1

		//Divide la cantidad de la pantalla en dos subcadenas a partir del punto decimal
		SeparacionCantidad = NumeroDigitos.split (".");		
		
		//Une las cadenas izquierda y derecha a partir de punto decimal
		CantidadSinPunto = SeparacionCantidad[0] + SeparacionCantidad[1];	

		//Una la notación científica
		NotacionCientifica = CantidadSinPunto[0] + "." + CantidadSinPunto.slice(1,4) + "x10^" + DesplazaPunto;

		document.getElementById("screen").innerHTML = NotacionCientifica;
	}
	else
		document.getElementById("screen").innerHTML = ResultadoOperacion;
}


function PulsarTecla(e)
{   
    var e = e || event;				//Guarda el valor del evento de teclado
    var TeclaKeyCode =  e.keyCode;	//Guarda el valor ASCII de la tecla
    var TeclaKey =  e.key;			//Guarda el caracter del código ASCII de la tecla
   
   	//alert(TeclaKeyCode);		//Muestra el valor de la tecla pulsada

   	//Teclas de números y tecla de Punto
 	if ((TeclaKeyCode >=48 && TeclaKeyCode<=57 || TeclaKeyCode >=96 && TeclaKeyCode<=105) || TeclaKeyCode == 190 || TeclaKeyCode == 110)
       //alert(tecla);
       Numero (TeclaKey);

    //Tecla +, -, * y /
    if (TeclaKeyCode == 107 || TeclaKeyCode == 109 || TeclaKeyCode == 106 || TeclaKeyCode == 111)
    	GuardaA (TeclaKey);
 	
 	if (TeclaKeyCode == 13)	//Tecla Enter
 		Resultado();
 	
 	if (TeclaKeyCode == 67)	//Tecla C
 		BorraCalculo();
 	
 	if (TeclaKeyCode == 69)	//Tecla E
 		BotonCE();

   
}
 
 //Cuando se oprime una tecla en la página Web
 document.onkeydown = PulsarTecla;
 