//============= FUNÇÕES DA LÓGICA DO JOGO ========

// Explicações do json
// ---- acceptedItems ----
// Lista de itens que podem ser combinados com o objeto.
// "acceptedItems": ["objGeloBalde","objCopoCheio"],
// Código de COMBINACAO_MESSAGES (script.js) que cria uma máscara para combinar itens
// {2} objeto que recebe o item e {1} item que está sendo combinado. Ex: {1} gelo {2} geladeira.
// "messageAccepted": 3,
// Se o objeto for ObjectState, é possível estabelecer em qual estado ele precisa estar para receber itens. O estado zero (inicial) é true e o estado 1 (segundo estado) é false. 
// "stateAccepted": false,
// jumpAfterAccepted: ... salta para essa função somente quando foi aceito um objeto.


// Lógica do Quintal
// quando chegar a cinco, mostra o machado
//let numeroPlantas = 0;
//let genesioForaQuintal = 0;
//0 ainda está lá 
//1 já foi chamado pela CarolinaLAR 
//2 já está no banheiro consertando (vira 2 quando Zanko vai para o quintal pela 1a vez após Carolina chamar Genesio)
//let estadoCoruja = 0;
//0 está na árvore
//1 está presa na gaiola

// Lógica do Banheiro 
//let papeisNoVasoSanitario = false;
//false = nao coloquei nada 
//true = coloquei papéis
//let vasoEntupido = false;

// Lógica do Meirelles 
//let MeirellesNaSalaJantar = false 
//fica true quando é tocado o sino

// funções do jump (hotspot, boolean)... boolean = true se vier de uma animação e false caso contrário

// === Quem são culpados ===
function quemSaoCulpados(hs){
	show2Modal("Quem deve ser preso?", hs);
}

function goFalaFinal(hs){
	hideModal();
	fadeToScene("cenaFalaFinal.json");
}



function mostrarCulpados(hs){
	let x = 0;
	if ( gameState.mostrarCadaCulpado == 0 ){
		if ( gameState.meirellesCulpado ) {
			setHotspotState("cenaFalaFinal.json", "objAEMeirelles", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAEMeirelles", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}
	if ( gameState.mostrarCadaCulpado == 1 ){
		if ( ! gameState.gertrudesCulpada ) {
			setHotspotState("cenaFalaFinal.json", "objAEGertrudes", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAEGertrudes", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}
	if ( gameState.mostrarCadaCulpado == 2 ){
		if ( ! gameState.carolinaCulpada ) {
			setHotspotState("cenaFalaFinal.json", "objAECarolina", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAECarolina", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}
	if ( gameState.mostrarCadaCulpado == 3 ){
		if ( gameState.generalCulpado ){
			setHotspotState("cenaFalaFinal.json", "objAEGeneral", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAEGeneral", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}
	if ( gameState.mostrarCadaCulpado == 4 ){
		if ( gameState.marcosCulpado ) {
			setHotspotState("cenaFalaFinal.json", "objAEMarcos", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAEMarcos", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}
	if ( gameState.mostrarCadaCulpado == 5 ){
		if ( !gameState.genesioCulpado ) {
			setHotspotState("cenaFalaFinal.json", "objAEGenesio", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAEGenesio", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}	
	if ( gameState.mostrarCadaCulpado == 6 ){
		if ( gameState.luciaCulpada ) {
			setHotspotState("cenaFalaFinal.json", "objAELucia", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
			console.log("lucia culpada");
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAELucia", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}
	if ( gameState.mostrarCadaCulpado == 7 ){
		if ( !gameState.sandraCulpada ){
			setHotspotState("cenaFalaFinal.json", "objAESandra", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAESandra", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}	
	if ( gameState.mostrarCadaCulpado == 8 ){
		if ( gameState.maryCulpada ){
			setHotspotState("cenaFalaFinal.json", "objAEMary", {
				"visible": "visible"
				}, true);
			gameState.acertosCulpados++;
		}
		else 
			setHotspotState("cenaFalaFinal.json", "objAEMary", {
				"img": "assets/errou.png",
				"visible": "visible"
				}, true)
	}		
	gameState.mostrarCadaCulpado++;
	console.log("gameState.acertosCulpados = "+gameState.acertosCulpados);
}

function setarCulpado(hs){
	if ( hs._state.showingImg01 ) {
		setHotspotState("cenaCulpados.json", hs.id, {
		"audio": "Lock"
		}, true);
		culpadoOuNao(hs);
	}
	else {
		setHotspotState("cenaCulpados.json", hs.id, {
		"audio": "Unlock"
		}, true);
		culpadoOuNao(hs);
	}
}

function culpadoOuNao(hs){
  console.log("hs.name = "+hs.name);
  if ( hs.name == "Meirelles" )
	  gameState.meirellesCulpado = !gameState.meirellesCulpado;
  if ( hs.name == "Carolina" )
	  gameState.carolinaCulpada = !gameState.carolinaCulpada;
  if ( hs.name == "Marcos" )
	  gameState.marcosCulpado = !gameState.marcosCulpado;
  if ( hs.name == "Mary" )
	  gameState.maryCulpada = !gameState.maryCulpada;
  if ( hs.name == "General" )
	  gameState.generalCulpado = !gameState.generalCulpado;
  if ( hs.name == "Genésio" )
	  gameState.genesioCulpado = !gameState.genesioCulpado;
  if ( hs.name == "Lucia" )
	  gameState.luciaCulpada = !gameState.luciaCulpada;
  if ( hs.name == "Gertrudes" )
	  gameState.gertrudesCulpada = !gameState.gertrudesCulpada;
  if ( hs.name == "Sandra" )
	  gameState.sandraCulpada = !gameState.sandraCulpada;

}

// === Hall ===
//jump: objPRHalltoCR01 (após fala Carolina)
function goHalltoCR01(hs, animacao) {
  // Vai para o Corredor 
  fadeToScene("cenaCorredor01.json");
}

//jump: objPRSalaEstar (após fala Carolina)
function goHalltoSalaEstar(hs, animacao) {
	fadeToScene("cenaSalaEstar.json");
}


// jump: objFlorMurcha
function florViva(hs, animacao) {
  // Pegou a flor viva no Hall
  gameState.cenaHallFlor = true;
  
  setHotspotState("cenaHall01.json", "objFlorMurcha", {
	visible: "hidden",
	active: false 
	}, false);
  setHotspotState("cenaHall01.json", "objFlorViva", {
	visible: "visible",
	active: true 
	}, false);
}

// jump pós diálogo: Carolina
function ativaCenaHall01(hs, animacao) {
  // Libera todos os objetos da Cena Hall 01 após
  // falar com Carolina pela primeira vez.
  setHotspotsActive(["objPRExterna", "objPRSalaEstar", "objPREscritorio","objPRHalltoCR01"], true);
}


// jump: PortaCorredor
// --- Hall Carregar Após 1a Cena --- 
function goEscritoriotoHall(hs, animacao) {
  // Vai para o Hall após o início do Jogo 
  if ( debug ) console.log("goEscritoriotoHall");
  
  setHotspotState("cenaHall01.json", "objPRHalltoCR01", {
	type: "Action",
	description: "Corredor",
	jump: "goHalltoCR01",
	active: true 
	}, false);
	
  setHotspotState("cenaHall01.json", "objPRSalaEstar", {
	description: "",
	jump: "goHalltoSalaEstar"
	}, false);


  // Se não tiver colhido a flor do Hall 
  if ( gameState.cenaHallFlor == false ) {
    if ( debug ) console.log("gameState.cenaHallFlor = " + gameState.cenaHallFlor);	  
	setHotspotState("cenaHall01.json", "objFlorMurcha", {
	  acceptedItems : ["objCopoA_Agua"],
	  messageAccepted: 0,
	  jump: "florViva",
	  active: true 
	  }, false);	  
  }
  fadeToScene("cenaHall01.json");

}

//jump: objPRCR01toHall
function goCR01toHall(hs, animacao){
// Se não tiver colhido a flor do Hall 
  if ( gameState.cenaHallFlor == false )	
	setHotspotState("cenaHall01.json", "objFlorMurcha", {
	  acceptedItems : ["objCopoCheio"],
	  messageAccepted: 0,
	  jump: "florViva",
	  active: true 
	  }, false);	 
  if (debug) console.log("carregar 	cenaHall01.json");  
  fadeToScene("cenaHall01.json");	
}

// === cenaCorredor02 ===
//jump: goCR02toDespensa
function goCR02toDespensa(hs,animacao){
	fadeToScene("cenaDespensa.json");
}

//jump: objPRCR02toCR01
function goCR02toCR01(hs, animacao){
	fadeToScene("cenaCorredor01.json");
}

//jump: objPRCozinha
function goCR02toCozinha(hs,animacao){
	fadeToScene("cenaCozinha01.json");
}

//jump: objEscCR02toCR02And
function goEscCR02toCR02And(hs,animacao){
	fadeToScene("cenaCorredor2Andar02.json");
}

// === cena Sala de Estar ===
//jump: objPRSalaEstarINT
function goSalaEstartoHall(hs,animacao){
	fadeToScene("cenaHall01.json");
}

function ativarSalaEstar(hs,animacao){
	setHotspotsActive(["objPRSalaEstarINT","objQuadro01SE","objQuadro02SE","objQuadro03SE","objBancadaSE","objSofaSE","objFoto01SE","objFoto02SE","objPlantaSE"],true);
}

function bloodyMaryParaMary(hs,animacao){
	setHotspotState("cenaSalaEstar.json", "Mary", {
	  img: "assets/maryCOM.png",
	  defaultDialogue: {
			messages: [
			{ text: "Lembra-se de mais alguma coisa, senhorita?", response: "Não, querido." }
			]
	}}, true);
	unlockState("MaryComBloodyMary");
}

function pularGato(){
	setHotspotState("cenaSalaEstar.json", "GatoIdle",{
		visible: "hidden",
		active: false
	},true);
	
	setHotspotState("cenaSalaEstar.json", "GatoJump",{
		visible: "visible",
		active: true
	},true);
	let hsGato = findHotspotById("GatoJump"); 
    showAudioLabel(hsGato,"Miau?!");
	animarAgora(hsGato, "hsGato");
	gameState.gatoLiberado = true;
}


// === cenaCorredor01  === 
//jump: objPRCR01toCR02
function goCR01toCR02(hs, animacao){
	fadeToScene("cenaCorredor02.json");
}

//jump: objPRSalaMusica
function goCR01toSalaMusica(hs, animacao){
	fadeToScene("cenaSalaMusica.json");
}

//jump: objPRSalaJantar
function goCR01toSalaJantar(hs, animacao){
	console.log("goCR01toSalaJantar");
	fadeToScene("cenaSalaJantar.json");
}

//jump: objPRSalaJogos
function goCR01toSalaJogos(hs, animacao){
	fadeToScene("cenaSalaJogos.json");
}

//=== Sala de Jogos === 
//jump: objPRSalaJogosINT
function goSalaJogostoCR01(hs,animacao){
	fadeToScene("cenaCorredor01.json");
}
//jump: General 
function ativarCenaSalaJogos(hs,animaca){
	setHotspotsActive(["objPRSalaJogosINT", "objPoltronaAzul", "objMesaBilharSJ", "objMesaXadrez", "objCavaloBR", "objReiBR",
	"objPeaoBR","objPeaoPR","objTorrePR","objJogoDardos","objCopoUisque","objCharutoCubano","objDardo"], true);
}

//jumpAfterAccepted: general - objMedalhaTampinha
function generalComMedalha(hs,animacao){
	// Altera a fala padrão e img do General
	setHotspotState("cenaSalaJogos.json","General",{
		"img": "assets/generalCOM.png",
		defaultDialogue: {
			messages: [
			{ text: "Lembra-se de mais alguma coisa?", response: "Acho que não, Inspetor." }
			],
		jump: ""}
		}, true);
	// Habilita conversa com General 
	unlockState("generalComMedalha");
}

//jumpAfterAccepted: objMesaXadrez
function reiPretoNaMesa(hs,animacao){
	showAudioLabel(hs,"Click","low");
	setHotspotState("cenaSalaJogos.json", "objReiPR",{
		visible: "visible",
		active: true
	},true);
	setHotspotState("cenaSalaJogos.json", "objPortinholaMesaXadrez",{
		visible: "visible"
	},true);
	setHotspotState("cenaSalaJogos.json", "objChaveAzul",{
		visible: "visible",
		active: true
	},true);
}

//=== Sala de Música ===
//jump: objPRSalaMusicaINT
function goSalaMusicatoCR01(hs,animacao){
	fadeToScene("cenaCorredor01.json");
}

function corteiCordaGuitarra(hs, animacao){
	showAudioLabel(hs,"Cut-Cut");
	setHotspotState("cenaSalaMusica.json","objCordaGuitarra",{
		"visible": "visible",
		"active": true
	}, true);
}

//=== Sala de Jantar ===
//jump: objPRSalaJantarINT
function goSalaJantartoCR01(hs,animacao){
	fadeToScene("cenaCorredor01.json");	
}

function garrafaVinhoAberta(hs,animacao){
	setHotspotState("cenaSalaJantar.json", "objVinho", {
	  "img": "assets/vinhoAberto.png",
	  "type": "Collectible",
	  "imgInventory": "assets/itemVinho.png",
	  "description": "Uma garrafa de vinho aberta.",
	  "name": "vinho",
	  "removeHotspot":true
	  }, true);
}

function vinhoNaTaca(hs,animacao){
	setHotspotState("cenaSalaJantar.json", "objTacaSJESQ", {
	  "img": "assets/tacaSalaJantarCheia.png"
	  }, true);	
	unlockState("tacaVinhoCheia");
}

//jump: objTomate
function colhiTomate(hs,animacao){
	//já colhi o tomate, não preciso mais colher
	setHotspotState("cenaSalaJantar.json", "objQuadroTomate", {
	  "img": "assets/quadroNMSemTomate.png"
	  }, true);
}

//jump: objIsqueiro
function isqueiroColetado(hs,animacao){
	//evita tentar mostrar o isqueiro novamente
	setHotspotState("cenaSalaJantar.json", "objPortaMesaCanto", {
		jump: ""
		}, false);
	//se colecionei o isqueiro, só desligo (não destruo completamente)
	setHotspotState("cenaSalaJantar.json", "objIsqueiro", {
		"visible": "hidden",
		active: false 
		}, false);		
}


//jump: objPortaMesaCanto
function estadoPortaMesaCanto(hs, animacao){
	// dependendo do estado da porta, mostra ou não mostra o refrigerante (se ele existir)
	// se porta aberta
	if ( ! hs._state.firstClick ){
		setHotspotState("cenaSalaJantar.json", "objIsqueiro", {
			visible: "visible",
			active: true
			}, false);
	}
	else 
	{
		setHotspotState("cenaSalaJantar.json", "objIsqueiro", {
			visible: "hidden",
			active: false
			}, false);	
	}
}

//jumpAfterAccepted: objMesaSalaJantar
function frangoNaSalaJantar(hs,animacao){
	setHotspotState("cenaSalaJantar.json","objFrangoProntoSalaJantar", {
		visible: "visible",
		active: true
	}, true);
	//prepara para a possibilidade de receber a sineta 
	unlockState("frangoServido");
	setHotspotState("cenaSalaJantar.json","objMesaSalaJantar", {
		messageAccepted: false,
		acceptedItems: ["objSino"],
		jumpAfterAccepted: "mesaTocarSino"
	}, true);
	
}

function mesaTocarSino(hs, animacao){
	if ( possoTocarSino() ) {
	    
		console.log("posso tocar o sino!");	
		removeFromInventory("objSino");
		
		//apresenta a animação
		setHotspotState("cenaSalaJantar.json", "objSinoTocando", {
			"description":"xxx",
			"visible": "visible",
			"active": true
			}, true);
		const hsSino = findHotspotById("objSinoTocando");
		showAudioLabel(hsSino,"Blém-Blém","lowest",2500);
		animarAgora(hsSino, "hsSino");		
		}
	else {
		showCharacterMessage("Zanko","Preciso fazer mais alguma coisa antes de chamar o Dr. Meirelles \npara o jantar.");
		}
}

function possoTocarSino(){
	return true;
	console.log("servirJantar = " + gameState.statesFound.includes("servirJantar") + " frangoServido = " + gameState.statesFound.includes("frangoServido") + " candelabroAcesso = " + gameState.statesFound.includes("candelabroAcesso") + "taçavinho" + gameState.statesFound.includes("tacaVinhoCheia") );
	if ( gameState.statesFound.includes("servirJantar") && gameState.statesFound.includes("frangoServido") && gameState.statesFound.includes("candelabroAcesso") && gameState.statesFound.includes("tacaVinhoCheia") ) 
		return true;
	else return false;
}

//jumpAfterAccepted:
function isqueiroNoCandelabro(hs,animacao){
	setHotspotState("cenaSalaJantar.json","objCandelabro", {
		description: "Um candelabro acesso.",
		img: "assets/candelabroACE.png",
		active: true
	}, true);
	unlockState("candelabroAcesso");
}

// === Porão ===

//jump: objPRPor01toPor02
function goPor01toPor02(hs, animacao){
	fadeToScene("cenaPorao02.json");
}

//jump: objPRPor02toPor01
function goPor02toPor01(hs, animacao){
	fadeToScene("cenaPorao01.json");
} 

//jump: objESCPorao
function goPoraotoQuintal (hs,animacao){
	fadeToScene("cenaQuintal.json");
	
}

//jump:objChaveVermelha
function lataAtumNoBuracoRato(hs,animacao){
	setHotspotState("cenaPorao01.json", "objChaveVermelha", {
		active: false
	}, true);
	setHotspotState("cenaPorao01.json", "objLataSalmaoAbertaPorao", {
		visible: "visible"
	}, true);
	setHotspotState("cenaPorao01.json", "GatoRunPorao", {
		visible: "visible"
	}, true);
	
	let hsGatoPorao = findHotspotById("GatoRunPorao"); 
	animarAgora(hsGatoPorao, "hsGatoPorao");
}

//jump: objChaveBuracoBaixo - após rato fugir e coletar a chave
function removerChaveVermelha(hs,animacao){
	setHotspotState("cenaPorao01.json", "objChaveBuracoBaixo", {
		img: "assets/buracoRatoSemChave.png"
	}, true);
	
}

//jump: objTampaCaixa
function abriTampaCaixa(hs, animacao){
	//desliga a tampa e abre e mostra a gaiola 
	setHotspotState("cenaPorao01.json", "objTampaCaixa", {
		"visible": "hidden",
		"active": false
	}, true);
	setHotspotState("cenaPorao01.json", "objTampaAberta", {
		"visible": "visible",
		"active": true
	}, true);
	setHotspotState("cenaPorao01.json", "objGaiola", {
		"visible": "visible",
		"active": true
	}, true);	
}

//jump: objTorno
function tornoFuncionando(hs, animacao){
  console.log("tornoFuncionando");
  
  const animDiv = document.getElementById(hs.id);
  if (!animDiv) return false; // se não encontrou o hotspot, retorna falso

  // garante que sempre exista a lista de itens
  animDiv.collectedItems = animDiv.collectedItems || [];
  
  // coloquei a tampinha no torno 
  if ((animDiv.collectedItems.includes("objTampinhaGR")) && (animacao == false)) {
	 //tornar a tampinha no torno visível   
     setHotspotState("cenaPorao01.json", "objTampinhaGRTorno", {
	  visible: "visible",
	  active: true
	  }, false);
	 
     }
  else 
  // vou comprimir a tampinha (animacao)
  if ((animDiv.collectedItems.includes("objTampinhaGR")) && (animacao )){
     setHotspotState("cenaPorao01.json", "objTampinhaGRPrensada", {
	  visible: "visible",
	  active: true
	  }, false);
     setHotspotState("cenaPorao01.json", "objTampinhaGRTorno", {
	  visible: "hidden",
	  active: false
	  }, false);
     }
   
}

//jumpAfterAccepted: objEstilingue
function cordaGuitarraNoEstilingue(hs,animacao){
	showAudioLabel(hs,"Zoing");
	setHotspotState("cenaPorao02.json","objEstilingue",{
		"img": "assets/estilingueCorda.png",
		"description": "Um diapasão de estilingue.",
		"name": "diapasão de estilingue",
		"type": "Collectible"
	},true);
}

// jump: objCoroa
function coletouCoroaBicicleta(hs, animacao){
	if (debug) console.log("coletouCoroaBicicleta");
	showAudioLabel(hs,"Rat-Rat");
	setHotspotState("cenaPorao02.json", "objBicicleta", {
		img:"assets/garagemBicicletaSE.png"
		}, true);
}

//jumpAfterAccepted: objTroncoMadeira
function corteiMaeira(hs, animacao){
	if ( debug ) console.log("corteiMaeira");
	showAudioLabel(hs,"Cut-Cut");
	//remove o tronco
	removeHotspot("objTroncoMadeira", "cenaPorao02.json");
	//liga imagem da lenha
	setHotspotState("cenaPorao02.json", "objLenha", {
		"visible": "visible",
		"active": true
		}, true);		
}

//jump: objLenha
function coleteiLenha(hs, animacao){
	//altera imagem da lenha e deixa inativo
	setHotspotState("cenaPorao02.json", "objLenha", {
		"img": "assets/poraoPedacosMadeira02.png",
		"active": false
		}, true);		
}

function desligarLampada(hs, animacao){
	setHotspotState("cenaPorao01.json", "objLampadaColorida", {
		"visible": "hidden",
		"active": false
		}, true);
}

//jumpAfterAccepted: objMaquinaGelo
function coloqueiAgua(hs,animacao){
	//desliga a maquina vazia
	setHotspotState("cenaPorao02.json", 
	"objMaquinaGelo", {
		"visible": "hidden",
		"active": false
	}, true);
	showAudioLabel(hs,"Glub-Glub");
	//ligaPossibilidadeAnimacao
	setHotspotState("cenaPorao02.json", 
	"objMaquinaGeloFun", {
		"visible": "visible",
		"active": true
	}, true);
	//liga balde de metal vazio de novo 
	setHotspotState("cenaPorao02.json", 
	"objBaldeParaGelo", {
		"visible": "visible",
		"active": true
	}, true);	
}

//jump: objMaquinaGeloFun
function geloPronto(hs, animacao){
	//liga a máquina pronta com gelo
	setHotspotState("cenaPorao02.json", 
	"objMaquinaGelo", {
		"img":"assets/maquinaGeloFINAL.png",
		"visible": "visible",
		"active": true,
		"description": "Uma máquina de gelo.",
		"acceptedItems" : ["objBaldeParaGelo","objTaca"],
		"messageAccepted": 13,
		"jumpAfterAccepted": "enchiGelo"
	}, true);
	//desliga nova animação e começa a aceitar o balde novamente... 
	setHotspotState("cenaPorao02.json", 
	"objMaquinaGeloFun", {
		"active": false,
		"visible": "hidden"
	}, true);

}

//jumpAfterAccepted: objMaquinaGelo
function enchiGelo(hs,animacao, itemColetado){
	if ( itemColetado == "objBaldeParaGelo")
		//liga balde de metal com gelo
		setHotspotState("cenaPorao02.json", 
		"objBaldeComGelo", {
			"visible": "visible",
			"active": true
			}, true);
	if ( itemColetado == "objTaca")
		//liga balde de metal com gelo
		setHotspotState("cenaPorao02.json", 
		"objTacaGelo", {
			"visible": "visible",
			"active": true
			}, true);			
}

function dardoVaraPescar(hs, animacao){
	showAudioLabel(hs,"Fio-Fio");
	setHotspotState("cenaPorao02.json","objVaraPescar", {
		"img": "assets/varaPescarDardo.png",
		"type": "Collectible",
		"imgInventory": "assets/itemVaraPescarDardo.png",
		"description": "Uma vara de pescar com um dardo na ponta.",
		"name": "vara de pescar com dardo",
		"removeHotspot": true
	}, true);
	
}

// === Sala de Música === 

//jump: Sandra
function ativarCenaSalaMusica(hs,animacao){
  setHotspotsActive(["objPRSalaMusicaINT", "objCordaCortina", "objJanelaSM", "objLpSet", "objLPPlayer", "objGuitarra"], true);}


function liberaPistaSandraFotografia(hs, animacao){
	unlockClue("PistaSAN.FOT");
}

//jump: objCordaCortina
function retireiCordaCortina(hs,animacao){
	setHotspotState("cenaSalaMusica.json", "objCordaCortina", {
	img: "assets/SMPontaVazia.png",
	active: false
	}, true);
}

// acessorio da function verificarLP() 
function lpMontado() {
 //Lp completo: desligo o lpPlayer e ligo a animação 
 setHotspotState("cenaSalaMusica.json", "objLPPlayer", {
	visible: "hidden",
	active: false
	}, false);
 const cabo = findHotspotById("objTomadaLPCF");
 if ( cabo.visible == "hidden") 
	// liga o cabo elétrico. 
	setHotspotState("cenaSalaMusica.json", "objTomadaLPCF", {
		visible: "visible",
		active: false
		}, true);
 setHotspotState("cenaSalaMusica.json", "objLPPlayerAnim", {
	visible: "visible",
	active: true
	}, true);
  // Habilita conversa com Sandra 
  unlockState("vitrolaFuncionando");
  // Altera a fala padrão de Sandra
  setHotspotState("cenaSalaMusica.json", "Sandra", {
    defaultDialogue: {
      messages: [
        { text: "Lembra-se de mais alguma coisa?", response: "Acho que não, Inspetor." }
        ],
      jump: ""
      }}, false);
 }			

// jumpAfterAccepted: objLPPlayer
function verificarLP(hs, animacao) {
  const lpPlayer = document.getElementById(hs.id);
  // se instalei o cabo, mas não a agulha
  if ( lpPlayer.collectedItems.includes("objFioGeladeiraCL") && !lpPlayer.collectedItems.includes("objCarretelLinha")) {
      // liga o cabo elétrico. 
	  setHotspotState("cenaSalaMusica.json", "objTomadaLPCF", {
		visible: "visible",
		active: false
		}, true);
	  setHotspotState("cenaSalaMusica.json", "objLPPlayer", {
		img:"assets/salaMusicalLPlayerCF.png",
		visible: "visible",
		active: true,
		description: "A agulha dessa vitrola desapareceu."
		}, true);		
      return;
	  }
  // se instalei a agulha, mas não o cabo
  else
  if ( lpPlayer.collectedItems.includes("objCarretelLinha") && !lpPlayer.collectedItems.includes("objFioGeladeiraCL")) {
      // liga a agulha 
	  setHotspotState("cenaSalaMusica.json", "objLPPlayer", {
		img: "assets/salaMusicalLPlayerCA.png",
		visible: "visible",
		active: true,
		description: "Essa vitrola está com o cabo elétrico arrancado."
		}, true);
	  return;
      }
   // caso contrário, a única possibilidade é que os dois itens tenham sido instalados
   else lpMontado();	  
}

// === Escritório ===

//jump: objPREscritorio
function goHalltoEscritorio(hs, animacao) {
	//verifica se precisa trazer meirelles para cá...
	
	if ( gameState.MeirellesNaSalaJantar ) {
		setHotspotState("cenaEscritorio01.json",	"Meirelles",{
		"visible": "hidden",
		"active": false
		}, false);
		setHotspotState("cenaSalaJantar.json",	"Meirelles",{
		"visible": "visible",
		"active": true
		}, false);
		setHotspotState("cenaEscritorio01.json",		"objGavetaEscrivaninha",{
			"active": true
		}, true);		
	}
	
  //verifica se há 03 chaves 
  if ( gameState.collectiblesFound.includes("objChaveAmarela") && gameState.collectiblesFound.includes("objChaveVermelha") && gameState.collectiblesFound.includes("objChaveAzul")){
	  console.log("Tenho as 03 chaves.");
	  //unlockState("tresChaves");
	  setHotspotState("cenaEscritorio01.json",		"objCofre",{
			"acceptedItems": ["objChaveVermelha","objChaveAmarela","objChaveAzul"]
		}, true);
  }    
  // Vai para o Escritório 
  fadeToScene("cenaEscritorio01.json");
}

function useiChaveCofre(hs,animacao){
	console.log("vermelha", gameState.collectiblesFound.includes("objChaveVermelha"));
	console.log("objChaveAmarela", gameState.collectiblesFound.includes("objChaveAmarela"));
	console.log("objChaveAzul", gameState.collectiblesFound.includes("objChaveAzul"));
	if ( !gameState.collectiblesFound.includes("objChaveVermelha") ){
		if ( !gameState.collectiblesFound.includes("objChaveAmarela") ) {
			if ( !gameState.collectiblesFound.includes("objChaveAzul") ) {
				setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL111.png" }, true);
			    }
			else
				{
  			    setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL110.png" }, true);
				}
	 	   }
		else 
		   {
			if ( !gameState.collectiblesFound.includes("objChaveAzul") ) {
				setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL101.png" }, true);
			    }
			else
				{
  			    setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL100.png" }, true);
				}
		   } 
	}
	else 
	{
		if ( !gameState.collectiblesFound.includes("objChaveAmarela") ) {
			if ( !gameState.collectiblesFound.includes("objChaveAzul") ) {
				setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL011.png" }, true);
			    }
			else
				{
  			    setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL010.png" }, true);
				}
	 	   }
		else 
		   {
			if ( !gameState.collectiblesFound.includes("objChaveAzul") ) {
				setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL001.png" }, true);
			    }
			else
				{
  			    setHotspotState("cenaEscritorio01.json", "objCofre", {
					"img": "assets/escritorioCofreCL000.png" }, true);
				}
		   }		
	}
	//se já usei todas as chaves...
	if ( !gameState.collectiblesFound.includes("objChaveAmarela") && !gameState.collectiblesFound.includes("objChaveVermelha") && !gameState.collectiblesFound.includes("objChaveAzul")){
	console.log("já usei as 3 chaves");
	setHotspotState("cenaEscritorio01.json",		"objCofre",{
			"description": "",
			"audio": "Crank",
			"jump": "abriCofre"
		}, true);
	}
}

function abriCofre(hs, animacao){
	setHotspotState("cenaEscritorio01.json",		"objCofre",{
			"img": "assets/escritorioCofreOP.png",
			"active": false
			}, true);
	setHotspotState("cenaEscritorio01.json",		"objPapeisCofre",{
			"visible": "visible",
			"active": true
			}, true);			
			
}

// jump pós diálogo: Meirelles
function ativaCenaEscritorio01(hs, animacao) {
  // Libera todos os objetos da Cena Escritorio 01 após
  // falar com Meirelles pela primeira vez.
  setHotspotsActive(["objQuadroBP", "objQuadroNE", "objCofre", "objFakeLuminaria", "talkTelefone", "objPREscritorioINT"], true);
}

function abrirGavetaEscritorio(hs, animacao){
  setHotspotState("cenaEscritorio01.json",	"objGavetaEscrivaninha",{
		"img": "assets/gavetaAberta.png",
		"active": false
		}, true);
  setHotspotState("cenaEscritorio01.json",	"objDocumentosAcidente",{
		"visible": "visible",
		"active": true
		}, true);		
}

function coletarDocumentosAcidente(hs, animacao){
	////	
}

//jump: objFakeLuminaria
//quando clicar no objeto Fake invisivel que controla a luminária
function luminariaEscritorio(hs,animacao){
  const hsLum = findHotspotById("objLuminaria");
  const el = hsLum.element || document.getElementById(hsLum.id);
  //envia para o ToggleStateFake para tratar de ligar e desligar
  ToggleStateFake(hsLum, el);
}

// jump: talkTelefone
function desligarTelefone(hs, animacao) {
  showAudioLabel(hs, "Thump");
}

function irCulpados(hs, animacao) {
	console.log("desligar...");
    fadeToScene("cenaCulpados.json");
}

function irFinal() {
	console.log("irFinal");
    sessionStorage.setItem("acertosCulpados", gameState.acertosCulpados);
	fadeToScene("nada.json");
	location.href = "final.html";
}

function liberaPistaAcidente(hs, animacao) {
  unlockClue("PistaESC.ACI");
}

function abrirEscrivaninha(hs, animacao){
	showCharacterMessage("Sr. Meirelles","Por favor, não mexa nas minhas coisas.");	
}
// === Cozinha ===

// === Cozinhas01.Portas === 

//jump: objPRCoz01toCoz02
function goCoz01toCoz02(){
	fadeToScene("cenaCozinha02.json");
}

//jump: objPRCozinhaINT
function goCozinhatoCR02(){
	fadeToScene("cenaCorredor02.json");
}

// === Cozinhas02.Portas === 

//jump: objPRCoz02toCoz01
function goCoz02toCoz01(){
	// não pode sair com o botijão de gás 
	if ( gameState.collectiblesFound.includes("objGasCozinha") ) {
		showCharacterMessage("Zanko","O botijão de gás é muito pesado para eu andar carregando por aí.");
	}
	else fadeToScene("cenaCozinha01.json");
}

//jump: objPRQuintal
function goCozinhatoQuintal(){
	// Carolina chamou Genésio para consertar o vaso entúpido
	if ( gameState.genesioForaQuintal == 1 ) {
	    //Genesio surge no Banheiro
		setHotspotState("cenaBanheiro.json", "GenesioConsertando", {
		  active: true,
		  visible: "visible"
		  }, false);
		setHotspotState("cenaBanheiro.json", "objVasoSanitarioEntupidoFinal", {
		  active: false,
		  visible: "hidden"
		  }, false);
		//Carolina desaparece do Quarto Laranja
		setHotspotState("cenaQuartoLaranja02.json", "CarolinaLAR", {
		  active: false,
		  visible: "hidden"
		  }, false);
		
		//Genésio no Banheiro consertando.
		gameState.genesioForaQuintal = 2;
	   }
	// não pode sair com o botijão de gás 
	if ( gameState.collectiblesFound.includes("objGasCozinha") ) {
		showCharacterMessage("Zanko","O botijão de gás é muito pesado para eu andar carregando por aí.");
	}
	else fadeToScene("cenaQuintal.json");	
}

function retirarFrangoForno(hs,animacao){
	setHotspotState("cenaCozinha02.json", "objFrangoPronto", {
		visible: "visible",
		active: true
	}, true);
	setHotspotState("cenaCozinha02.json", "objFogaoFrangoPronto", {
		img: "assets/cozinhaFogaoSEMFrangoPronto.png"
	}, true);
}

//jump: objAbridorLatas
function abriLataSalmao(hs,animacao){
	setHotspotState("cenaCozinha01.json", "objLataSalmaoAberta", {
		visible: "visible",
		active: true
		}, true);
}

//jump: objLiquidificador
function ingredientesLiquidificador(hs, animacao, itemColetado){
	//coletei tudo e vou ligar o liquidificador
	if ( itemColetado == "objTomate" ) {
		showAudioLabel(hs,"Ploft");
		//não tem nada 
		if ( gameState.estadoLiquidificador == LiquidificadorState.N ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorT.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.T;
			return;
		}
		else 
		//tem vodcca
		if ( gameState.estadoLiquidificador == LiquidificadorState.V ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorTV.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.TV;
			return;
		}
		else 
		//tem gelo
		if ( gameState.estadoLiquidificador == LiquidificadorState.G ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorTG.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.TG;
			return;
		}	
		else 
		//tem gelo e vodca
		if ( gameState.estadoLiquidificador == LiquidificadorState.GV ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				"visible":"hidden",
				"active": false
				}, true);
			setHotspotState("cenaCozinha02.json", "objLiquidificadorFUN", {
				"visible":"visible",
				"active": true
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.A;
			
			return;
		}			
	}
	if ( itemColetado == "objVodca" ) {
		showAudioLabel(hs,"Shhhh");
		//não tem nada 
		if ( gameState.estadoLiquidificador == LiquidificadorState.N ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorV.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.V;
			return;
		}
		else 
		//tem tomate
		if ( gameState.estadoLiquidificador == LiquidificadorState.T ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorTV.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.TV;
			return;
		}
		else 
		//tem gelo
		if ( gameState.estadoLiquidificador == LiquidificadorState.G ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorGV.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.GV;
			return;
		}	
		else 
		//tem gelo e tomate
		if ( gameState.estadoLiquidificador == LiquidificadorState.TG ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				"visible":"hidden",
				"active": false
				}, true);
			setHotspotState("cenaCozinha02.json", "objLiquidificadorFUN", {
				"visible":"visible",
				"active": true
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.A;
			return;
		}			
	}
	if ( itemColetado == "objTacaGelo" ) {
		showAudioLabel(hs,"Plink");
		//liga a taça (já servi o gelo)
		setHotspotState("cenaCozinha02.json", 		"objTacaParaDrinque", {
		"visible":"visible",
		"active": true
		}, true);
		//não tem nada 
		if ( gameState.estadoLiquidificador == LiquidificadorState.N ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorG.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.G;
			return;
		}
		else 
		//tem tomate
		if ( gameState.estadoLiquidificador == LiquidificadorState.T ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorTG.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.TG;
			return;
		}
		else 
		//tem vodca
		if ( gameState.estadoLiquidificador == LiquidificadorState.V ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				img: "assets/liquidificadorGV.png",
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.GV;
			return;
		}	
		else 
		//tem vodca e tomate
		if ( gameState.estadoLiquidificador == LiquidificadorState.TV ) {
			setHotspotState("cenaCozinha02.json", "objLiquidificador", {
				"visible":"hidden",
				"active": false
				}, true);
			setHotspotState("cenaCozinha02.json", "objLiquidificadorFUN", {
				"visible":"visible",
				"active": true
				}, true);
			gameState.estadoLiquidificador = LiquidificadorState.A;
			return;
		}			
	}	
}

// jumpAfterAccepted: objFogao
function coloqueiLenhaFogao(hs,animacao){
  showCharacterMessage("Zanko","Coloquei a lenha no fogão, mas ainda preciso dar um jeito de acendê-la.");
  showAudioLabel(hs,"Ploft","low");
  setHotspotState("cenaCozinha02.json", "objFogao", {
		img: "assets/cozinhaFogaoComLenha.png",
		active: true,
		acceptedItems: ["objIsqueiro"],
		jumpAfterAccepted: "fornoAcesso",
		"messageAccepted":9
		}, true);
}

function termineiDrinque(hs,animacao){
	setHotspotState("cenaCozinha02.json", "objLiquidificador", {
		"img": "assets/liquidificadorFIM.png",
		"visible":"visible",
		"acceptedItems": ["objTacaParaDrinque"],
		"messageAccepted": 14,
		"jumpAfterAccepted":"serviDrinque",
		"active": true
		}, true);
	setHotspotState("cenaCozinha02.json", "objLiquidificadorFUN", {
		"visible":"hidden",
		"active": false
		}, true);		
}

function serviDrinque(hs,animacao){
	showAudioLabel(hs,"Shhhh");
	setHotspotState("cenaCozinha02.json", "objTacaDrinque", {
		"visible":"visible",
		"active": true
		}, true);		
}

function coloqueiSalsao(hs,animacao){
	showAudioLabel(hs,"Plop");
	setHotspotState("cenaCozinha02.json", "objTacaDrinque", {
		"type": "Collectible",
		"name": "Bloody Mary",
		"description": "Um Bloody Mary.",
		"imgInventory": "assets/itemBloodyMary.png",
		"img":"assets/tacaDrinqueCOM.png"
		}, true);	
}


function aposAnimacaoAssado(hs, animacao){
  const el = hotspot.element || document.getElementById(hotspot.id);
  handleClick(hs, el);
}

//jumpAfterAccepted: fornoAcesso
function fornoAcesso(hs, animacao){
   	
  removeHotspot("objFogao", "cenaCozinha02.json");
  removeHotspot("objFogaoTemporizadorAnim", "cenaCozinha02.json");
  
  if ( debug ) console.log("fornoAcesso");
  showAudioLabel(hs,"Crept-Crept","low");
  setHotspotState("cenaCozinha02.json", "objFogaoAcesso", {
		visible: "visible",
		}, false);
  //anima o fogão 
  let hsFogao = findHotspotById("objFogaoAcesso"); 
  animarAgora(hsFogao, "hsFogao");
  //libera o botijão de gás
  setHotspotState("cenaCozinha02.json", "objGasCozinha", {
		"type": "Collectible",
		"description": "Um botijão de gás."
		}, false);
  }
  


//jump: objPortaBancadaCozinha
function estadoPortaBancaCozinha(hs, animacao){
	// dependendo do estado da porta, mostra ou não mostra o refrigerante (se ele existir)
	// se porta aberta
	if ( ! hs._state.firstClick ){
		setHotspotState("cenaCozinha01.json", "objGarrafaRefrigerante", {
			visible: "visible",
			active: true
			}, false);
	}
	else 
	{
		setHotspotState("cenaCozinha01.json", "objGarrafaRefrigerante", {
			visible: "hidden",
			active: false
			}, false);	
	}
}

//jump: objGarrafaRefrigerante
function coleteiGarrafaRefrigerante(hs, animacao){
	//após coletar a garrafa de refrigerante, não pode mais aparecer a garrafa dentro da bancada
	setHotspotState("cenaCozinha01.json", "objPortaBancadaCozinha", {
		jump: ""
		}, false);
}

//jump: objTorneiraCozinha
//clicou após o copo estar cheio de água
function coletarCopoAguaCheio(hs,animacao){
	const cA = findHotspotById("objCopoA_Agua");
	gameState.collectiblesFound.push(cA.id);
    addToInventory(cA);

	setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
		"img": "assets/cozinhaTorneira.png",
		"jumpAlways":"",
		"visible": "visible",
		"active": true
		}, true);
	showCharacterMessage("Zanko","Um copo cheio de água.");	
}

//jump: objTorneiraCozinha
//clicou após o balde estar cheio de água
function coletarBaldeAguaCheio(hs,animacao){
	const cB = findHotspotById("objBaldeMetalAgua");
	gameState.collectiblesFound.push(cB.id);
    addToInventory(cB);

	setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
		"img": "assets/cozinhaTorneira.png",
		"jumpAlways":"",
		"visible": "visible",
		"active": true
		}, true);
	showCharacterMessage("Zanko","Um balde cheio de água.");	
}

//jump: objTorneiraCozinha
//clicou na torneira para encher o copo de água
function enchiAguaCopo(hs,animacao){
	//quando for religado, pula para coletar copo agua
	setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
		"jumpAlways": "coletarCopoAguaCheio",
		"visible": "hidden",
		"active": false
		}, true);
	showAudioLabel(hs,"Glub-Glub","center",1000);
	//apresenta a animação
	setHotspotState("cenaCozinha01.json", "objTorneiraAguaCopo", {
		"description":"Enchi o copo com água.",
		"visible": "visible",
		"active": true
		}, true);
	const hsTorneira = findHotspotById("objTorneiraAguaCopo");
	animarAgora(hsTorneira, "hsTorneira");
}

//jump: objTorneiraCozinha
//clicou na torneira para encher o balde de água
function enchiAguaBalde(hs,animacao){
	//quando for religado, pula para coletar balde de agua
	setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
		"jumpAlways": "coletarBaldeAguaCheio",
		"visible": "hidden",
		"active": false
		}, true);
	//apresenta a animação
	showAudioLabel(hs,"Chuá-Chuá","center",1000);
	setHotspotState("cenaCozinha01.json", "objTorneiraAguaBalde", {
		"description":"Enchi o balde com água.",
		"visible": "visible",
		"active": true
		}, true);
	const hsBalde = findHotspotById("objTorneiraAguaBalde");
	animarAgora(hsBalde, "hsBalde");
}

//jumpAfterAccepted: objTorneiraCozinha
function objetoNaTorneira(hs, animacao, itemColetado){
  // mostra o copo ou o balde cheio de água em cima da bancada 
  if ( itemColetado === "objCopoA" ) {
	//mostra o copo de água na torneira
	setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
		"img": "assets/cozinhaTorneiraCOPO.png",
		"jumpAlways": "enchiAguaCopo"
		}, true);
    
	}
  else if ( itemColetado === "objBaldeMetal" )
    {
    //mostra o balde na torneira
	setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
		"img": "assets/cozinhaTorneiraBALDE.png",
		"jumpAlways": "enchiAguaBalde"
		}, true);
    
	}
}

// jumpAfterAccepted: objAbridorGarrafa 
function abriGarrafaRefrigerante(hs, animacao) {
  // mostra a tampinha de garrafa e a garrafa sem tampinha 
  showAudioLabel(hs,"Tsssss");
  setHotspotState("cenaCozinha01.json", "objTampinhaGR", {
	visible: "visible",
	active: true
	}, false);
  
  setHotspotState("cenaCozinha01.json", "objGarrafaRefrigeranteST", {
	visible: "visible",
	active: true
	}, false);
	
}

//jump: objGeladeira
function abriGeladeira(hs, animacao){
	//ao abrir a geladeira, precisa mostrar o salsão
	if ( !hs._state.firstClick )
		setHotspotState("cenaCozinha01.json", "objSalsao", {
			visible: "visible",
			active: true
			}, false);
	//ao fechar a geladeira, desliga o salsão
	else 
		setHotspotState("cenaCozinha01.json", "objSalsao", {
			visible: "hidden",
			active: false
			}, false);
}

//jump: objSalsao
function coleteiSalsao(hs, animacao){
	//depois que coletou o salsão, não coleta mais...
	setHotspotState("cenaCozinha01.json", "objGeladeira", 	{
	  jump: ""
	}, false);
}

// jump: objFioGeladeira
function arrancarFioGeladeira(hs, animacao) {
  // reclama que não pode arrancar o cabo.
  // só é chamada enquanto o objeto objFioGeladeira existir; quando troca o cabo, o objeto é removido
  showCharacterMessage("Zanko","Não posso desligar a geladeira. \nAs comidas vão estragar.");

}

// jump: objFioGeladeiraCL
function arranqueiCaboEletricoGeladeira(hs, animacao) {
  // ao pegar o cabo, troca a imagem da geladeira e o objeto objFioGeladeiraCL é removido automaticamente
  showAudioLabel(hs, "Zupt");
  setHotspotState("cenaCozinha01.json", "objGeladeiraSF", {
	visible: "visible",
	active: true
	}, false);	
}

// jumpAfterAccepted: objGeladeira
function verificarGeladeira(hs, animacao){
  // como a geladeira só pode receber um único item, se entrar aqui, é porque recebeu o item correto.
  // troca o objeto cabo para poder ser coletado
  showAudioLabel(hs,"Ploft");
  setHotspotState("cenaCozinha01.json", "objFioGeladeiraCL", {
	  visible: "visible",
	  active: true
	}, false);
  setHotspotState("cenaCozinha01.json", "objFioGeladeira", {
	  visible: "hidden",
	  active: false
	}, false);
  // e também troca a imagem da geladeira para representar o gelo 
  setHotspotState("cenaCozinha01.json", "objGeladeira", {
	  img02: "assets/geladeiraAbertaCG.png",
	  visible: "visible",
	  active: true
	}, true);
}

// jumpAfterAccepted: objElevadorCoz
function gasNoElevadorCozinha (hs, animacao){
  showAudioLabel(hs,"Tummmm");
  setHotspotState("cenaCozinha02.json", "objElevadorCoz", {
	  img02: "assets/cozinhaElevadorABEGAS.png",
	  visible: "visible"
	}, true);
  //botijao depositado no elevador
  gameState.botijaoNoElevador = true;
}

// jump: objBotaoElevadorCoz
function verificarElevadorCozinha(hs, animacao) {
	const elevador = findHotspotById("objElevadorCoz");
	console.log("verificarElevadorCozinha\n"+"gameState.botijaoColetado2Andar: "+gameState.botijaoColetado2Andar+"\ngameState.botijaoNoElevador: "+gameState.botijaoNoElevador+"\nelevador._state.firstClick: "+elevador._state.firstClick+ "\ngameState.botijaoGas2Andar: "+gameState.botijaoGas2Andar+"\ncollectiblesFound.includes objGasCozinha: "+gameState.collectiblesFound.includes("objGasCozinha"));
    //se já coletou botijão no 2Andar, retorna 
	if ( gameState.botijaoColetado2Andar ) return;
	
	// se o botijão está no elevador, mas o elevador está aberto 
	if ( (! elevador._state.firstClick) && (gameState.botijaoNoElevador) ){
		showCharacterMessage("Zanko","Segurança em primeiro lugar.");
	    return;
		}	
	
	// se o botijão está no elevador e o elevador está fechado 
	if ( elevador._state.firstClick && gameState.botijaoNoElevador == true ){
		gameState.botijaoGas2Andar = true;
		gameState.botijaoNoElevador = false;
		setHotspotState("cenaCozinha02.json", 	"objElevadorCoz", {
			img02: "assets/cozinhaElevadorABE.png",
			description: "Um elevador de cozinha."
		}, false);
	    return;
		}	
}

// === Quarto Rosa no 2o Andar === 

//jump: ObjSino 
function sinoColetado(hs,animacao){
	//se colecionei o sino, só desligo (não destruo completamente)
	setHotspotState("cenaQuartoRosa.json", "objSino", {
		"visible": "hidden",
		active: false 
		}, false);	
}

//jump Sra. Meirelles 
function liberouPistaMaryGelo(hs, animacao){
	unlockClue("PistaMAR.GEL");
	}

//jump: objCookies
function pegueiCookies(hs, animacao){
	//depois que peguei os cookies, deixa o prato vazio e desativa
	setHotspotState("cenaQuartoRosa.json", "objCookies", {
		"active":false,
		"img":"assets/pratoSemCookies.png",
	}, true);
}

//jump: objCarretelLinha
function retireiAgulha(hs, animacao){
	setHotspotState("cenaQuartoRosa.json", "objCarretelLinha", {
	  "img": "assets/carretelSEMAgulha.png",
	  "type": "Object",
	  "active": false
	}, true);
}

//jump: objPRQtoRosato2And
function goQtoRosatoCR02And(hs, animacao){
	fadeToScene("cenaCorredor2Andar02.json");
}

//jumpAfterAccepted: objAquecedor
function instalouGasQuartoRosa(){
	//ligar a img do gas
	setHotspotState("cenaQuartoRosa.json", "objGasCozinhaQtoRosaAquecedor", {
	  "visible": "visible",
	  "active": false
	}, true);
	//permite ligar o aquecedor
	setHotspotState("cenaQuartoRosa.json", "objAquecedor", {
	  "jump": "ligouAquecedor",
	  "description": ""
	}, true);
}

//jump: objAquecedor
function ligouAquecedor(hs, animacao){
	setHotspotState("cenaQuartoRosa.json", "objAquecedor", {
		"img": "assets/qtoRosaAquecedorLIG.png",
		}, true);
	//desliga a Velhinha Gelada
    setHotspotState("cenaQuartoRosa.json", "objVelhinha", {
		visible: "hidden",
		}, true);
	//liga a Velhinha Animada 
	setHotspotState("cenaQuartoRosa.json", "objVelhinhaTremendo", {
		visible: "visible",
		}, true);
	//anima a velhinha 
	let hsVelhinha = findHotspotById("objVelhinhaTremendo");
	animarAgora(hsVelhinha, "hsVelhinha");
}


// jump: objBotaoElevadorQtoRosa
function apertouBotaoElevadorQtoRosa (hs, animacao) {
	const elevador = findHotspotById("objElevadorQtoRosa");
	// se o elevador está aberto
	if ( ! elevador._state.firstClick && gameState.botijaoGas2Andar == false ){
		showCharacterMessage("Zanko","Segurança em primeiro lugar.");
	    }
	else 
	// se o elevador está fechado e o botijão não foi colocado na cozinha 
    if ( elevador._state.firstClick && gameState.botijaoNoElevador == false ) {
		showCharacterMessage("Zanko","Não tem nada no elevador para subir.");
	}
	else 
	// se o elevador está fechado e o botijão foi colocado na cozinha  
	if ( elevador._state.firstClick && gameState.botijaoNoElevador == true && gameState.botijaoGas2Andar == false) {
		gameState.botijaoGas2Andar = true;
		gameState.botijaoNoElevador = false;
		console.log("botijão de gas subiu");
		// botijão desaparece do elevador da cozinha
		setHotspotState("cenaCozinha02.json", 	"objElevadorCoz", {
			img02: "assets/cozinhaElevadorABE.png",
			description: "Um elevador de cozinha."
		}, true);
	}
}

// jumpAfterAccepted: objElevadorQtoRosa
function verificarElevadorQtoRosa (hs, animacao) {
  const elevador = document.getElementById(hs.id);
  // se instalou a corda da cortina e não instalou a coroa 
  if ( debug ) {
	  console.log("--- verificarElevadorQtoRosa ---");
	  console.log("já coletou Corda? "+elevador.collectedItems.includes("objCordaCortina") );
	  console.log("já coletou Coroa? "+elevador.collectedItems.includes("objCoroa") );
  }
  if ( elevador.collectedItems.includes("objCordaCortina") && !elevador.collectedItems.includes("objCoroa") ) {
	// atualiza a imagem do elevador
	setHotspotState("cenaQuartoRosa.json", "objElevadorQtoRosa", {
	  img02: "assets/qtoRosaElevadorABECorda.png",
	  description: "Um elevador de cozinha. \nAinda preciso de uma roldana."
	}, true);
    return;
	}
  else 
  //se instalou a coroa e não instalou a corda da cortina 
  if ( elevador.collectedItems.includes("objCoroa") && !elevador.collectedItems.includes("objCordaCortina") ) {
	// atualiza a imagem do elevador
	setHotspotState("cenaQuartoRosa.json", "objElevadorQtoRosa", {
	  img02: "assets/qtoRosaElevadorABEEngrenagem.png",
	  description: "Um elevador de cozinha. \nPreciso encontrar algum cabo para instalar aqui."
	}, true);
    return;
	}
   else
	{ 	
      // instalou os dois (objCordaCortina e objCoroa) - trocar imagem
 	  //atualiza a imagem do elevador
	  setHotspotState("cenaQuartoRosa.json", "objElevadorQtoRosa", {
	    img02: "assets/qtoRosaElevadorABECompleto.png", description: "Um elevador de cozinha."
	    }, true);
	  //atualiza o botão do elevador no qtoRosa
	  setHotspotState("cenaQuartoRosa.json", "objBotaoElevadorQtoRosa", {
	    img: "assets/cozinhaBotaoElevadorON.png",description: "",
	    jump: "apertouBotaoElevadorQtoRosa"
	    }, true);
	  //atualiza o botão do elevador na Cozinha
	  setHotspotState("cenaCozinha02.json", "objBotaoElevadorCoz", {
	    img: "assets/cozinhaBotaoElevadorON.png",description: "",
	    jump: "verificarElevadorCozinha"
	    }, true);		
    }
}
// jump: objGasCozinhaQtoRosa
function coletouGasQtoRosa(hs, animacao){
	// coletou o botijão
	gameState.botijaoColetado2Andar = true;
	setHotspotState("cenaQuartoRosa.json", "objBotaoElevadorQtoRosa", {
		"active":false
		}, false);
}


// jump: objElevadorQtoRosa
// Quando abre e fecha o elevador do qtoRosa
function verificarElevadorQtoRosaState(hs, animacao){
	// se já coletou o botijão, não precisa verificar nada...
	if (gameState.botijaoColetado2Andar) return;
	
	const elevador = findHotspotById("objElevadorQtoRosa");
	
	// se o elevador está aberto
	if ( gameState.botijaoGas2Andar && ! elevador._state.firstClick )
		setHotspotState("cenaQuartoRosa.json", "objGasCozinhaQtoRosa", {
			"visible": "visible",
			"active": true
			}, true);
	else 
	//se o elevador está fechado
	if ( gameState.botijaoGas2Andar && elevador._state.firstClick )		
		setHotspotState("cenaQuartoRosa.json", "objGasCozinhaQtoRosa", {
			"visible": "hidden",
			"active": false
			}, true);
}

// === Quintal ===

//jump:CorujaIdle
function chamarCoruja(hs,animacao){
	if (gameState.estadoCoruja == 1){
		//coruja ainda está na árvore
		//desliga coruja na árvore
		setHotspotState("cenaQuintal.json", "CorujaIdle", {
			"visible":"hidden",
			"active":false
		}, true);
		setHotspotState("cenaQuintal.json", "CorujaVoandoQuintal", {
			"visible":"visible",
			"active": true
		}, true);
		//anima coruja para gaiola 
		document.getElementById("CorujaVoandoQuintal").click();
		gameState.estadoCoruja = 2;
	}
}

//jump:CorujaVoandoQuintal
function corujaNaGaiola(){
	//corujaChegou na Gaiola
	setHotspotState("cenaQuintal.json", "CorujaVoandoQuintal", {
			"visible":"hidden",
			"active": false
		}, true);
	//coruja Idle na gaiola 
	setHotspotState("cenaQuintal.json", "CorujaIdle", {
			"visible":"visible",
			"active": true,
			"x": 202,
			"y": 197
		}, true);
	setHotspotState("cenaQuintal.json",
	"objGaiolaQuintal", {
		"img":"assets/gaiolaQuintal.png",
		"description": "É uma gaiola com uma coruja.",
		"jump":"coleteiCorujaEGaiola"
	}, true);
	gameState.estadoCoruja = 3;
}

//jump: objGaiolaQuintal
function coleteiCorujaEGaiola(hs,animacao){
	//somente é chamada após a coruja estar na gaiola 
	removeHotspot("objGaiolaQuintal", "cenaQuintal.json");
	removeHotspot("CorujaIdle", "cenaQuintal.json");
    const cG = findHotspotById("objCorujaGaiola");
	gameState.collectiblesFound.push(cG.id);
    addToInventory(cG);
}

//jumpAfterAccepted: objBanqueta
function gaiolaNaBanqueta(hs,animacao){
	//coloquei a gaiola na banqueta
	//liga a gaiola
	setHotspotState("cenaQuintal.json", "objGaiolaQuintal", {
		"visible":"visible",
		"active": true
	}, true);
}

//jumpAfterAccepted: objGaiolaQuintal
function cookiesNaGaiola(hs,animacao){
	//coloquei cookies na gaiola
	//liga a gaiola com cookies
	setHotspotState("cenaQuintal.json", "objGaiolaQuintal", {
		"img": "assets/gaiolaQuintalCookies.png"
	}, true);
	//coruja vai ser chamada 
	setHotspotState("cenaQuintal.json", "CorujaIdle", {
		"jump": "chamarCoruja",
		"description": ""
	}, true);
	
	gameState.estadoCoruja = 1;
}

function liberaMachado(){
	gameState.numeroPlantas++;
	//movimentei as cinco plantas
	if ( gameState.numeroPlantas == 5 ){
	setHotspotState("cenaQuintal.json", "objMachado", {
		"visible":"visible",
		"active": true
		}, true);		
	}
}

//jump: objPlanta01
function movePlanta01(hs,animacao){
	if (debug) console.log("movePlanta01");
	// movimenta a planta para o lado e impede de ser chamado novamente
	setHotspotState("cenaQuintal.json", "objPlanta01", {
		"img": "assets/quintalPlanta01.png",
		"x":101,
		"jump":"",
		"active":false
		}, true);
	liberaMachado();
}

//jump: objPlanta02
function movePlanta02(hs,animacao){
	if (debug) console.log("movePlanta02");
	// movimenta a planta para o lado e impede de ser chamado novamente
	setHotspotState("cenaQuintal.json", "objPlanta02", {
		"img": "assets/quintalPlanta02.png",
		"x":-60,
		"jump":"",
		"active":false
		}, true);
	liberaMachado();
}

//jump: objPlanta03
function movePlanta03(hs,animacao){
	if (debug) console.log("movePlanta03");
	// movimenta a planta para o lado e impede de ser chamado novamente
	setHotspotState("cenaQuintal.json", "objPlanta03", {
		"img": "assets/quintalPlanta03.png",
		"x":129,
		"jump":"",
		"active":false
		}, true);
	liberaMachado();
}

//jump: objPlanta04
function movePlanta04(hs,animacao){
	if (debug) console.log("movePlanta04");
	// movimenta a planta para o lado e impede de ser chamado novamente
	setHotspotState("cenaQuintal.json", "objPlanta04", {
		"img": "assets/quintalPlanta04.png",
		"x":-25,
		"jump":"",
		"active":false
		}, true);
	liberaMachado();
}

//jump: objPlanta04
function movePlanta04(hs,animacao){
	if (debug) console.log("movePlanta04");
	// movimenta a planta para o lado e impede de ser chamado novamente
	setHotspotState("cenaQuintal.json", "objPlanta04", {
		"img": "assets/quintalPlanta04.png",
		"x":-50,
		"jump":"",
		"active":false
		}, true);
	liberaMachado();
}

//jump: objPlanta05
function movePlanta05(hs,animacao){
	if (debug) console.log("movePlanta05");
	// movimenta a planta para o lado e impede de ser chamado novamente
	setHotspotState("cenaQuintal.json", "objPlanta05", {
		"img": "assets/quintalPlanta05.png",
		"x":112,
		"jump":"",
		"active":false
		}, true);
	liberaMachado();
}

//jump: objPRPorao
function goQuintalToPorao(hs, animacao){
	fadeToScene("cenaPorao01.json");
}

//jump: objPRPorao
function poraoTrancado(hs, animacao){
	showCharacterMessage("Genésio","Você não pode entrar aí. É proibido.");
}

//jump: Character Genesio 
function ativaQuintal(hs,animacao){
	setHotspotsActive(["objPRPorao", "objPRQuintalINT", "objMachado", "objPlanta04", "objPlanta05", "objPlanta02", "objPlanta01", "objPlanta03","objEsfregao","CorujaIdle","objBanqueta"],true);
}

//jump:objPRQuintalINT
function goQuintaltoCozinha(hs, animacao){
	fadeToScene("cenaCozinha02.json");
}

// === Sala de Estar ===

// jumpAfterAccepted: objCordaCortina
function cordaCortina(hs, animacao){
	setHotspotState("teste2.json", "objCordaCortina", {
		img: "assets/salaEstarSemCordaCortina.png",
		visible: "visible",
		active: false,
		}, true);	
}

function liberarPistaMaryCozinha(hs, animacao){
	unlockClue("PistaMAR.COZ");
}

// === Sala de Artes ===

// jumpAfterAccepted: objCestaFitas
function cestaFitas(hs, animacao){
	setHotspotState("cenaQuartoRosa.json", "objMedalhaTampinha", {
	  visible: "visible",
	  active: true
	  }, false);	  
}

//playAnimation("game-container","assets/oficinaPrensaAnimacao.png",69,37,3,1000,100,100,"FF");

// === Corredor 2a Andar ===

//jump: objEscCR02AndtoCR02
function goEscCR02AndtoCR02(hs, animacao){
	fadeToScene("cenaCorredor02.json");
}

//jump: objPRCR02AndtoQrtRosa
function goPRCR02AndtoQtoRosa(hs, animacao){
	fadeToScene("cenaQuartoRosa.json");
}

//jump: objPRCR02AndtoCR01And
function goPRCR02AndtoCR01And(hs, animacao){
	fadeToScene("cenaCorredor2Andar01.json");
}

//jump: objPRCR01AndtoCR02And
function goPRCR01AndtoCR02And(hs, animacao){
	fadeToScene("cenaCorredor2Andar02.json");
}

//jump: objPRQtoAzul
function goCR02AndtoQtoAzul(hs, animacao){
	fadeToScene("cenaQuartoAzul.json");
}

//jump: objPRQtoLaranja
function goCR02AndtoQtoLaranja(hs, animacao){
	fadeToScene("cenaQuartoLaranja.json");
}

//jump: objPRLaboratorio 
function goCR02AndtoLaboratorio(hs, animacao){
	fadeToScene("cenaLaboratorio01.json");
}

// === Laboratorio ===

//jump: objPRLab01toLab02
function goPRLab01toLab02(hs, animacao){
	fadeToScene("cenaLaboratorio02.json");
}

//jump: objPRLab02toLab01
function goPRLab02toLab01(hs, animacao){
	fadeToScene("cenaLaboratorio01.json");
}

//jump: objPRLaboratorioINT
function goLabtoCor02And01(hs, animacao){
	fadeToScene("cenaCorredor2Andar01.json");
}

//jump: objLivro01Lab, objLivro02Lab e objLivro03Lab 
function afastarLivrosLab(hs,animacao){
	//se ainda não descobri a pista da xícara, não faz nada 
	if ( !gameState.chaFalso )
		return;
	//se não afastei nenhum livro, posso mudar somente o 1o
	if ( ( gameState.livrosLab == 0 ) && ( hs.id == "objLivro01Lab") ) {
		setHotspotState("cenaLaboratorio02.json", "objLivro01Lab", {
			x: 112,
			y: 335,
			active: false
			}, true);
		gameState.livrosLab = 1;
		return;
	}
	//se afastei o livro 1, posso mudar somente o 2o
	if ( ( gameState.livrosLab == 1 ) && ( hs.id == "objLivro02Lab") ) {
		setHotspotState("cenaLaboratorio02.json", "objLivro02Lab", {
			x: 107,
			y: 323,
			active: false
			}, true);
		gameState.livrosLab = 2;
		return;
	}
	//se afastei o livro 2, posso mudar somente o 3o
	if ( ( gameState.livrosLab == 2 ) && ( hs.id == "objLivro03Lab") ) {
		setHotspotState("cenaLaboratorio02.json", "objLivro03Lab", {
			x: 112,
			y: 312,
			active: false
			}, true);
		gameState.livrosLab = 3;
		//liberaXicara
		setHotspotState("cenaLaboratorio02.json", "objXicaraLab", {
			active: true
			}, true);
		return;
	}	
}

//jump: objXicaraLab
function examinarXicara(hs,animacao){
	showCharacterMessage("Zanko","Engraçado. O chá já esfriou, mas o gelo ainda não derreteu.\nMas o que é isso?");
	setTimeout(() => {
		// código a ser executado após 1.5 segundos
		setHotspotState("cenaLaboratorio02.json", "objXicaraLab", {
		visible: "hidden",
		active: false
		}, true);
	setHotspotState("cenaLaboratorio02.json", "objXicaraLabDerramado", {
		visible: "visible"
		}, true);
	setHotspotState("cenaLaboratorio02.json", "objOlhoOdin", {
		visible: "visible",
		active: true
		}, true);
	showAudioLabel(hs,"Plinc");
	}, 1500);
	unlockClue("PistaLAB.OLHO");
}

function ativaLaboratorio(hs, animacao){
    //ativa a cena do laboratório após falar com Marcos
	setHotspotsActive(["objPRLab01toLab02", "objCofreLab", "objPRLaboratorioINT","objLampadaColorida","objPapeisLab","objSuporteLampada","objPapeisLixo"], true);
}

//jump: objPapeisLixo
function recolhiPapelNoLixo(hs,animacao){
	//remove a imagem do papel 
	setHotspotState("cenaLaboratorio01.json", "objPapeisLixoIMG", {
		visible: "hidden"
		}, true);
}

//função acessória para cada código encontrado para o cofre do laboratório
function codigoCofreLabEncontrado(){
	gameState.codigosCofreLabEncontrados++;
	if ( gameState.codigosCofreLabEncontrados == 3 ){
		//libera a abertura do cofre 
		setHotspotState("cenaLaboratorio01.json", "objCofreLab", {
			"jump":"abriuCofre"
			}, false);
	}
}

function MaryJaConheceLucia(){
  if (debug) console.log("f: MaryJaConheceLucia");
  //libera pista 
  unlockClue("PistaMAR.LUC");
}

//jump: objPlanosRefinaria
function coleteiPlanosRefinaria(){
  if (debug) console.log("f: coleteiPlanosRefinaria");
  //libera pista 
  unlockClue("PistaLAB.PLA1");
}
function liberaPistaCozinha(){
  if (debug) console.log("f: liberaPistaCozinha");
  //libera pista 
  unlockClue("PistaCAR.COZ");
}

function liberaPistaEscrivaninha(){
  if (debug) console.log("f: liberaPistaEscrivaninha");
  //libera pista 
  unlockClue("PistaCAR.ESC");
  //libera abertura da escrivaninha...
  setHotspotsActive(["objEscrivaninha"],true,"cenaEscritorio01.json");
  //libera servirJantar
  //a partir daqui, já é possível chamar o dr. meirelles para o jantar...
  unlockState("servirJantar");
}

function liberaPistaTerreno(){
  if (debug) console.log("f: liberaPistaTerreno");
  //libera pista 
  unlockClue("PistaESC.TER");
}

//jump: Marco - PistaLAB.OLHO
function liberaPistaCarolinaOlho(hs,animacao){
	unlockClue("PistaLAB.CAR");
}

//jump: Marco - PistaLAB.PLA1
function liberaPistaPlanos(){
	console.log("liberaPistaPlanos");
	unlockClue("PistaLAB.PLA2");
	//transforma os Objects Livro em Action 
	setHotspotState("cenaLaboratorio02.json", "objLivro03Lab", {
			active: true
			}, false);
	setHotspotState("cenaLaboratorio02.json", "objLivro02Lab", {
			active: true
			}, false);
	setHotspotState("cenaLaboratorio02.json", "objLivro01Lab", {
			active: true
			}, false);
	gameState.chaFalso = true;
}

//jump: fotografias
function acheiFotografiasRefinaria(){
	setHotspotState("cenaLaboratorio02.json", "objFotografias", {
			active: false,
			visible: "hidden"
			}, true);	
}

//jump: Marco - PistaLAB.GRG
function liberaPistaSuspeitos(){
	console.log("liberaPistaSuspeitos");
	unlockClue("PistaLAB.ESP");
    unlockClue("PistaSAN.REV");	
	
}

//jump: objCofreLab
function abriuCofre(hs, animacao){
  //se abriu o cofre, apresenta ele aberto, muda a descrição e não precisa mais dar o jump
  showAudioLabel(hs,"Crank");
  setHotspotState("cenaLaboratorio01.json", "objCofreLab", {
	"img": "assets/labCofreABE.png",
	"description": "O cofre está aberto.",
	"jump": ""
	}, true);
  setHotspotState("cenaLaboratorio01.json", "objPlanosRefinaria", {
	"visible": "visible",
	"active": true
	}, true);	
}

//kindJump: objLampadaColorida
//vai para kindJump quando é um type:Collectible e kind:Special
function lampadaNaLataTinta(onde, objeto, img, animacao){
	if (debug) console.log("kindJump: lampadaNaLataTinta onde.id = "+onde.id+ " objeto.id: " + objeto.id);
	
	// se a lâmpada foi instalada no suporte 
	if ( onde.id === "objSuporteLampada") {
	  //tratamento usual dos collectibles 
	  showAudioLabel(onde,"Rosc", "low");
	  if (!img.collectedItems.includes(objeto.id)) img.collectedItems.push(objeto.id);
	  removeFromInventory(objeto.id);
	  //envia para o tratamento da lampada no suporte
	  lampadaNoSuporteLab(onde, false);
	  }
	else 
	  { 
	  // caso contrário, a lâmpada foi colocada nas latas de tinta 
	  if ( onde.id === "objLataTintaAzul" ){
		 // lampada branca ou misturada com cor misturada = AZUL
		 showAudioLabel(onde,"Flush");
		 if ( (gameState.lampadaColorida === LampadaState.CIANO) || (gameState.lampadaColorida === LampadaState.ROSA) || (gameState.lampadaColorida === LampadaState.CHART) || (gameState.lampadaColorida === LampadaState.BRANCO) || (gameState.lampadaColorida === LampadaState.AZUL ) ) { 
		   if (debug) console.log("Lâmpada branca/colorida na lata azul == azul");
		   objeto.img = "assets/poraoLampadaAzul.png";
		   objeto.imgInventory = "assets/itemLampadaAzul.png";
		   objeto.name = "lâmpada azul";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.AZUL;
		   }
		 else 
		 //lampada é verde
		 if ( gameState.lampadaColorida === LampadaState.VERDE) {
		   if (debug) console.log("Lâmpada verde na lata azul == ciano");
		   objeto.img = "assets/poraoLampadaCiano.png";
		   objeto.imgInventory = "assets/itemLampadaCiano.png";
		   objeto.name = "lâmpada ciano";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.CIANO;
		   } 
		 else 
		 if ( gameState.lampadaColorida === LampadaState.AMARELO) {
		   if (debug) console.log("Lâmpada amarela na lata azul == Rosy Brown");
		   objeto.img = "assets/poraoLampadaRosybrown.png";
		   objeto.imgInventory = "assets/itemLampadaRosybrown.png";
		   objeto.name = "lâmpada rosy brown";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.ROSA;
		   }
	     }
	  else 
      if ( onde.id === "objLataTintaVerde" ){
		 // lampada branca ou misturada com cor misturada = VERDE
		 showAudioLabel(onde,"Flush");
		 if ( (gameState.lampadaColorida === LampadaState.CIANO) || (gameState.lampadaColorida === LampadaState.ROSA) || (gameState.lampadaColorida === LampadaState.CHART) || (gameState.lampadaColorida === LampadaState.BRANCO) || (gameState.lampadaColorida === LampadaState.VERDE ) )
		   {			 
		   if (debug) console.log("Lâmpada branca/colorida na lata VERDE == VERDE");
		   objeto.img = "assets/poraoLampadaVerde.png";
		   objeto.imgInventory = "assets/itemLampadaVerde.png";
		   objeto.name = "lâmpada verde";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.VERDE;
		   }
		 else 
		 if ( gameState.lampadaColorida === LampadaState.AZUL)  {
	       if (debug) console.log("Lâmpada Azul na lata verde = CIANO ");
		   objeto.img = "assets/poraoLampadaCiano.png";
		   objeto.imgInventory = "assets/itemLampadaCiano.png";
		   objeto.name = "lâmpada ciano";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.CIANO;
		   }
		 else 
	     if ( gameState.lampadaColorida === LampadaState.AMARELO) 
		   {
		   if (debug) console.log("Lâmpada Amarela na lata verde = Chartreuse ");
		   objeto.img = "assets/poraoLampadaChartreuse.png";
		   objeto.imgInventory = "assets/itemLampadaChartreuse.png";
		   objeto.name = "lâmpada verde esquisita";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.CHART;   
		   }
	     }
	  else 
      if ( onde.id === "objLataTintaAmarela" ){
		 // lampada branca ou misturada com cor misturada = AMARELA 
		 showAudioLabel(onde,"Flush");
		 if ( (gameState.lampadaColorida === LampadaState.CIANO) || (gameState.lampadaColorida === LampadaState.ROSA) || (gameState.lampadaColorida === LampadaState.CHART) || (gameState.lampadaColorida === LampadaState.BRANCO) || (gameState.lampadaColorida === LampadaState.AMARELO ) ) 
		   {
		   if (debug) console.log("Lâmpada branca/colorida na lata AMARELA == AMARELO");
		   objeto.img = "assets/poraoLampadaAmarelo.png";
		   objeto.imgInventory = "assets/itemLampadaAmarelo.png";
		   objeto.name = "lâmpada amarela";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.AMARELO;  
		   }
		else 
		if ( gameState.lampadaColorida === LampadaState.AZUL)   {
		   if (debug) console.log("Lâmpada Amarela na lata AZUL = ROSYBROWN ");
		   objeto.img = "assets/poraoLampadaRosybrown.png";
		   objeto.imgInventory = "assets/itemLampadaRosybrown.png";
		   objeto.name = "lâmpada rosa claro";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.ROSA;
	   	   }
		else
		if ( gameState.lampadaColorida === LampadaState.VERDE)   
		   {
		   if (debug) console.log("Lâmpada Amarela na lata VERDE = Chartreuse ");
		   objeto.img = "assets/poraoLampadaChartreuse.png";
		   objeto.imgInventory = "assets/itemLampadaChartreuse.png";
		   objeto.name = "lâmpada verde esquisito";
		   removeFromInventory("objLampadaColorida");
		   addToInventory(objeto);
		   gameState.collectiblesFound.push(objeto.id);
		   gameState.lampadaColorida = LampadaState.CHART;
	   	   }	
	    }		   
      }	   
}

//jumpAfterAccepted: objSuporteLampada 
function lampadaNoSuporteLab(hs, animacao){
	if (debug) console.log("function: lampadaNoSuporteLab");
	if (debug) console.log("-- gameState.lampadaColorida: "+gameState.lampadaColorida);
	//se instalou a lampada vermelha
	if ( hs.element.collectedItems.includes("objLampadaVermelha") ) {
		showAudioLabel(hs,"Rosc","low");
		//liga a luz vermelha
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabVermelhaON.png"
			}, true);
		//altera os papeis 
		setHotspotState("cenaLaboratorio01.json", "objPapeisLab", {
			"img":"assets/papeisVermelho.png"
			}, true);
		//diz a fala
		showCharacterMessage("Zanko","🔍 Descobri parte do código para abrir o cofre.");
		unlockClue("PistaLAB.VER");
		codigoCofreLabEncontrado();
		return;
	}
	else 
	if ( gameState.lampadaColorida === LampadaState.AZUL)
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabAzulON.png"
			}, true);
	else 
	if ( gameState.lampadaColorida === LampadaState.VERDE)
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabVerdeON.png"
			}, true);
	else 
	if ( gameState.lampadaColorida === LampadaState.ROSA)
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabRosaON.png"
			}, true);
	else 	 		
	if ( gameState.lampadaColorida === LampadaState.CHART)
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabChartON.png"
			}, true);
	else		
	if ( gameState.lampadaColorida === LampadaState.BRANCO)
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabBrancaON.png"
			}, true);
	else 
	if ( gameState.lampadaColorida === LampadaState.CIANO) {
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabCianoON.png"
			}, true);
		//altera os papeis 
		setHotspotState("cenaLaboratorio01.json", "objPapeisLab", {
			"img":"assets/papeisCiano.png"
			}, true);
		//diz a fala
		showCharacterMessage("Zanko","🔍 Descobri parte do código para abrir o cofre.");
		unlockClue("PistaLAB.CIA");
		codigoCofreLabEncontrado();
		return;	
		}
	else 
	if ( gameState.lampadaColorida === LampadaState.AMARELO) {
		setHotspotState("cenaLaboratorio01.json", "objSuporteLampada", {
			"img":"assets/luzLabAmarelaON.png"
			}, true);
		//altera os papeis 
		setHotspotState("cenaLaboratorio01.json", "objPapeisLab", {
			"img":"assets/papeisAmarelo.png"
			}, true);
		//diz a fala
		showCharacterMessage("Zanko","🔍 Descobri parte do código para abrir o cofre.");
		unlockClue("PistaLAB.AMA");
		codigoCofreLabEncontrado();
		return;	
		}
		
	setHotspotState("cenaLaboratorio01.json", "objLampadaColorida", {
		"visible": "hidden",
		active: false 
		}, false);		
}

//jump: objSuporteLampada
//cliquei para tirar a lampada do suporte
function lampadaForaSuporteLab(hs, animacao){
	//verificar se o suporte está "carregado" com luz vermelha
	console.log(hs.element.collectedItems);
	if ( hs.element.collectedItems.includes("objLampadaVermelha") ) {
		showAudioLabel(hs,"Rosc","low");
		//remove o objeto dos collectedItems
		dropItem(hs.element, "objLampadaVermelha");

		//troca a luz para apagada
		setHotspotState("cenaLaboratorio01.json",  "objSuporteLampada", {
		   "img":"assets/luzLabOFF.png"
		   }, true);
		
		//altera os papeis 
		setHotspotState("cenaLaboratorio01.json", "objPapeisLab", {
			"img":"assets/papeisBlur.png"
			}, true);   
		   
		//apresenta a luz vermelha no lixo (não precisa mais dela)
		setHotspotState("cenaLaboratorio01.json", 		 "objLataLixoLab", {
		  "img": "assets/lataLixoLampada.png"
		  }, true);
		}

	//verificar se o suporte está "carregado" com a lampada colorida 
	if ( hs.element.collectedItems.includes("objLampadaColorida") ) {
		showAudioLabel(hs,"Rosc","low");
		//remove o objeto dos collectedItems
		dropItem(hs.element, "objLampadaColorida");
		//troca a luz para apagada
		setHotspotState("cenaLaboratorio01.json", 	"objSuporteLampada", {
			"img":"assets/luzLabOFF.png"
			}, true);
		//apresenta a lampada novamente
		setHotspotState("cenaLaboratorio01.json", "objLampadaColorida", {
			"visible": "visible",
			"active": true
			}, true);
		//altera os papeis 
		setHotspotState("cenaLaboratorio01.json", "objPapeisLab", {
			"img":"assets/papeisBlur.png"
			}, true);  			
		}
}

//jump: objLampadaColorida
function desligaLampada(hs, animacao){
	//se colecionei essa lâmpada, só desligo (não destruo completamente)
	setHotspotState("cenaLaboratorio01.json", "objLampadaColorida", {
		"visible": "hidden",
		active: false 
		}, false);	
}

// === Quarto Laranja ===

//jump: objAbajurQtoLaranja
function ligaLuzAbajurQtoLaranja(hs,animacao){
	setHotspotState("cenaQuartoLaranja02.json","objLuzAbajurQtoLaranja",{
		"visible": "visible",
		"active": true 
	}, true)
}

function desligaLuzAbajurQtoLaranja(hs,animacao){
	showAudioLabel(hs,"Click","center");
	setHotspotState("cenaQuartoLaranja02.json","objLuzAbajurQtoLaranja",{
		"visible": "hidden",
		"active": false 
	}, true)
}

//jumpAfterAccepted: objCorujaArmario
function corujaNaCoruja(hs,animacao){
	setHotspotState("cenaQuartoLaranja.json","CorujaVoandoQuarto",{
		"visible": "visible",
		"active": true 
	}, true)
	let hsCorujaVoando = findHotspotById("CorujaVoandoQuarto");
	animarAgora(hsCorujaVoando,"hsCorujaVoando");
}

function removeAnimacaoChapeu(hs,animacao){
	removeHotspot("objChapeuAnimado", "cenaQuartoLaranja.json");
	setHotspotState("cenaQuartoLaranja.json", "objChapeuMulher", {
		"visible": "visible",
		"active": true
	}, true);
}

function coleteiSacaRolhas(hs, animacao){
	console.log("coleteiSacaRolhas");
	//desativa o ligar e desligar do saca-rolhas 
	setHotspotState("cenaQuartoLaranja.json", "objArmarioQuartoLaranja", {
		"jump": ""
			}, true);
}

function armarioAbertoQtoLaranja(hs,animacao){
	//state false = aberto 
	//state true = fechado 
	if ( hs._state.showingImg01 ){
		setHotspotState("cenaQuartoLaranja.json", "objSacaRolhas", {
		"visible": "hidden",
		"active": false
			}, true);
		}
	else 
		{
		setHotspotState("cenaQuartoLaranja.json", "objSacaRolhas", {
		"visible": "visible",
		"active": true
			}, true);	
		}
}

//jump: objPRQTLar01toQTLar02
function goQTLar01toQTLar02(){
	fadeToScene("cenaQuartoLaranja02.json");
}

//jump: objPRQTLar02toQTLar01
function goQTLar02toQTLar01(){
	fadeToScene("cenaQuartoLaranja.json");
}


//jump: objPRBanheiro
function goQtoLaranjatoBanheiro(){
	
	fadeToScene("cenaBanheiro.json");
}

//function objPRQtoLaranjaINT
function goQtoLaranjatoCR01And(){
	fadeToScene("cenaCorredor2Andar01.json");
}

// === BANHEIRO === 

//jump:objPRBanheiroINT
function goBanheirotoQtoLaranja(){
	//se já entupi o vaso mas a Carolina ainda não chamou o Genesio
	if (( gameState.vasoEntupido )&&( gameState.genesioForaQuintal == 0) ){
		//desliga tudo que houver no Quarto laranja e liga a Carolina
		setHotspotState("cenaQuartoLaranja02.json", "CarolinaLAR",    {
		"visible":"visible",
		"active": true
	    }, false);
		setHotspotsActive(["objPRBanheiro","objPRQTLar02toQTLar01","objPoltronaLaranja","objBanquetaQtoLaranja","objAbajurQtoLaranja","objEspelhoQtoLaranja","objEstatuaQtoLaranja","objManequimQtoLaranja","objLuzAbajurQtoLaranja"],false,"cenaQuartoLaranja02.json");
		/*
		setHotspotState("cenaQuartoLaranja02.json", "objPRBanheiro",    {
		"active": false
	    }, false);
		setHotspotState("cenaQuartoLaranja02.json", "objPRQTLar02toQTLar01",    {
		"active": false
	    }, false);		*/
	}   
    
	fadeToScene("cenaQuartoLaranja02.json");
}

//Character: CarolinaLAR 
function ativaCenaQtoLaranja(hs, animacao){
	setHotspotsActive(["objPRBanheiro","objPRQTLar02toQTLar01","objPoltronaLaranja","objBanquetaQtoLaranja","objAbajurQtoLaranja","objEspelhoQtoLaranja","objEstatuaQtoLaranja","objManequimQtoLaranja","objLuzAbajurQtoLaranja"],true);
	gameState.genesioForaQuintal = 1;
	//retiraGenesioQuintal e coloca no Banheiro
	setHotspotState("cenaQuintal.json", "Genesio",    {
		"visible":"hidden",
		"active": false
	    }, false);
	setHotspotState("cenaQuintal.json", "objPRPorao",    {
		"jump":"goQuintalToPorao"
	    }, false);
		
}

//jumpAfterAccepted: objVasoSanitario
function entupirVasoSanitario(hs, animacao){
   if (debug) console.log("f:entupirVasoSanitario");
   //estou colocando os papeis pela 1a vez
   if ( objVasoSanitario.collectedItems.includes("objPapeisLixo") && !gameState.papeisNoVasoSanitario ) {
	   //altera a img do vaso sanitário e aceita o esfregao
	   showAudioLabel(hs,"Ploft");
	   setHotspotState("cenaBanheiro.json", "objVasoSanitario", {
		"description": "Um vaso sanitário com papéis amassados dentro.",
		"img":"assets/vasoSanitarioPapeis.png",
		"acceptedItems":["objEsfregao"]
		}, true);
       gameState.papeisNoVasoSanitario = true;
	   return;	   
	   }
	// se já coloquei papeis e agora vou colocar o esfregao  
	if ( objVasoSanitario.collectedItems.includes("objEsfregao") && gameState.papeisNoVasoSanitario ) {
	   //desliga o vaso sanitário
	   setHotspotState("cenaBanheiro.json", "objVasoSanitario", {
		"visible":"hidden",
		"active":false
		}, true);	
	   //liga a animação
	   setHotspotState("cenaBanheiro.json", "objVasoSanitarioEntupido", {
		"visible":"visible",
		"active":true
		}, true);
      }
   }
   
//jump: objVasoSanitarioEntupido
function vasoSanitarioEntupido(){
   //após animar uma vez, impede de "entupir" de novo 
   //desliga o active
   setHotspotState("cenaBanheiro.json", "objVasoSanitarioEntupido", {
		"visible": "hidden",
		"active": false
	  }, true);
   setHotspotState("cenaBanheiro.json", "objVasoSanitarioEntupidoFinal", {
		"visible": "visible",
		"active": true
	  }, true);
	  
   //seta gameState.vasoEntupido para true para chamar a CarolinaLAR para o quarto laranja...
   gameState.vasoEntupido = true;
   }

//jump: GenesioConsertando
// quando a animacao estiver tocando e o jogador clicar em Genésio
function falarGenesioBanheiro(hs,animacao){
	//desligaAnimacao
	setHotspotState("cenaBanheiro.json", "GenesioConsertando", {
		"visible": "hidden",
		"active": false
	  }, true);
	  
	//liga vaso entupido
	setHotspotState("cenaBanheiro.json", "objVasoSanitarioEntupidoFinal", {
		"visible": "visible",
		"active": true
	  }, true);
	
	//liga Genesio 
	setHotspotState("cenaBanheiro.json", "GenesioBAN", {
		"visible": "visible",
		"active": true
	  }, true);
	
	ignoreNextClick = true;
	document.getElementById("GenesioBAN").click();
	ignoreNextClick = true;
}

//character: GenesioBAN
//depois que falar com Genésio, volta a animar...
function genesioDesentupindo(hs,animacao){
    //ligaAnimacao
	setHotspotState("cenaBanheiro.json", "GenesioConsertando", {
		"visible": "visible",
		"active": true
	  }, true);
	  
	//desliga vaso entupido
	setHotspotState("cenaBanheiro.json", "objVasoSanitarioEntupidoFinal", {
		"visible": "hidden",
		"active": false
	  }, true);
	
	//desliga Genesio 
	setHotspotState("cenaBanheiro.json", "GenesioBAN", {
		"visible": "hidden",
		"active": false
	  }, true);	
}

// === Despensa === 

function goDespensatoCR02(hs,animacao){
	fadeToScene("cenaCorredor02.json");
}

// === Quarto Azul ===

//jump: Character Lucia
function ativarQuartoAzul(hs,animacao){
	setHotspotsActive(["objPRQtoAzulINT","objQuadroQuartoAzul","objArmarioQuartoAzul","objTrenzinhoQuartoAzul","objSoldadinho01AQuartoAzul","objSoldadinho01BQuartoAzul","objDinossauroQuartoAzul","objPoteBolitasQuartoAzul","objLivrosQuartoAzul","objBolaQuartoAzul","objCriadoQuartoAzul","objVasoQuartoAzul","objCamaQuartoAzul","objTravesseiroQuartoAzul","objUrsinhoQuartoAzul","objQuadrinhoQuartoAzul","objPoteChave"],true);
	}

function conversa01Lucia(hs,animacao){
	//conversei com Lúcia pela primeira vez - após ela receber o chapéu
	unlockState("conheceuLucia");
	unlockClue("PistaLUC.EST");
}

//jumpAfterAccepted: character Lucia após receber chapéu	
function luciaComChapeu(hs,animacao){
    // Altera a fala padrão e img de Lucia
	setHotspotState("cenaQuartoAzul.json","Lucia",{
		icon: "assets/luciaPHChapeu.png",
		defaultDialogue: {
			messages: [
			{ text: "Lembra-se de mais alguma coisa?", response: "Acho que não, Inspetor." }
			],
		jump: ""}
		}, true);
	setHotspotState("cenaQuartoAzul.json","objChapeuLucia",{
		visible: "visible" 
		}, true);
	// Habilita conversa com Lúcia 
	unlockState("luciaComChapeu");	
}
	
//jump: objCriadoQuartoAzul
function abrirCriadoMudo(hs,animacao){
	setHotspotState("cenaQuartoAzul.json", "objCriadoQuartoAzul", {
		img: "assets/banquetaQuartoAzulABE.png",
		jump: "fecharCriadoMudo"
		}, true);
	setHotspotState("cenaQuartoAzul.json", "objSoldadinho02QuartoAzul", {
		visible: "visible",
		active: true
		}, true);
	setHotspotState("cenaQuartoAzul.json", "objRoboQuartoAzul", {
		visible: "visible",
		active: true
		}, true);
    if (!gameState.collectiblesFound.includes("objReiPreto"))		
		setHotspotState("cenaQuartoAzul.json", "objReiPreto", {
			visible: "visible",
			active: true
			}, true);		
}

function fecharCriadoMudo(hs,animacao){
	setHotspotState("cenaQuartoAzul.json", "objCriadoQuartoAzul", {
		img: "assets/banquetaQuartoAzulFEC.png",
		jump: "abrirCriadoMudo"
		}, true);
	setHotspotState("cenaQuartoAzul.json", "objSoldadinho02QuartoAzul", {
		visible: "hidden",
		active: false
		}, true);
	setHotspotState("cenaQuartoAzul.json", "objRoboQuartoAzul", {
		visible: "hidden",
		active: false
		}, true);	
	if (!gameState.collectiblesFound.includes("objReiPreto")) 		
		setHotspotState("cenaQuartoAzul.json", "objReiPreto", {
			visible: "hidden",
			active: false
			}, true);		
}

//jump: objPRQtoAzulINT
function goQtoAzultoCR01And(hs,animacao){
	fadeToScene("cenaCorredor2Andar01.json");
}

//jumpAfterAccepted: objPoteChave
function diapasaoPote(hs,animacao){
	//anima o diapasao
	setHotspotState("cenaQuartoAzul.json", "DiapasaoQuartoAzul", {
		"visible": "visible",
		"active": false
		}, true);
	let hsEstilingue = findHotspotById("DiapasaoQuartoAzul");
	showAudioLabel(hs,"Uóin-Uóin");
	animarAgora(hsEstilingue, "hsEstilingue");
	
}

//jump: objChaveAmarela
function recolhiChaveAmarela(hs,animacao){
	setHotspotState("cenaQuartoAzul.json", "objChaveAmarela", {
		"img":"assets/poteQuebradoSEM.png", 
		"description": "Um pote quebrado."
		}, true);
}

function liberaPistaAcidenteMeirelles(hs,animacao){
	unlockClue("PistaLUC.MOR");
}

// === GERAL ===

function animarAgora(hotspot, tipo){
	// só reage se ativo
	let animDiv = document.getElementById(hotspot.id);
	const s = animDiv._animState;
	if (!s) return; // segurança
	// reset para rodar do início
	if (s.interval) { clearInterval(s.interval); s.interval = null; }
	s.currentFrame = -1;
	animDiv.style.backgroundPosition = `0px 0px`;
	s.animating = true;
	s.interval = setInterval(() => {
		s.currentFrame++;
		// --- deslocamento só se houver parâmetros no hotspot ---
		if ( typeof s.xStart === "number" ) 
			{
			let newX = s.xStart + s.stepX;
			let newY = s.yStart + s.stepY;
			s.xStart = newX;
			s.yStart = newY;				
			animDiv.style.left = `${newX}px`;
			animDiv.style.top = `${newY}px`;
			
			//Um Anim em loop quer dizer que vai animar até achar a posição final, dai para a animação
			if ( s.stepX <= 0 && s.stepY <= 0 && newX <= s.xEnd && newY <= s.yEnd )
				s.loop = false;
			else 
			//seguindo para a direita/cima
			if ( s.stepX >= 0 && s.stepY <= 0 && newX >= s.xEnd && newY <= s.yEnd ) 
				s.loop = false;
			else 
			//seguindo para a direita/baixo
			if ( s.stepX >= 0 && s.stepY >= 0 && newX >= s.xEnd && newY >= s.yEnd )
				s.loop = false;
			else 
			//seguindo para a esquerda/cima
			if ( s.stepX <= 0 && s.stepY >= 0 && newX <= s.xEnd && newY >= s.yEnd )
				s.loop = false;			
			//console.log("newX = "+newX+" s.xStart = "+s.xStart + " newY = " + newY + " s.yStart = "+s.yStart + " s.stepX = " + s.stepX + " s.stepY = " + s.stepY + " s.xEnd = "+s.xEnd + " s.yEnd = "+s.yEnd);
			}
		
		if ( hotspot?.audio2 )
			if ( s.currentFrame == hotspot.frameAudio2 )
				showAudioLabel(hotspot,hotspot.audio2, hotspot.posAudio2, hotspot.timeAudio2); 		
		// só vai verificar o loop se oneShot for falso
		if ( s.oneShot == false )
			if ( s.loop == false )
				s.currentFrame = s.totalFrames;
		console.log("s.currentFrame=="+s.currentFrame);
		if (s.currentFrame == s.totalFrames) {
		   if ( s.loop == true ){
			   s.currentFrame = 0;
			   animDiv.style.backgroundPosition = `-${s.currentFrame * s.frameWidth}px 0px`;
			   return;
			   }
		   clearInterval(s.interval);
		   s.interval = null;
		   s.currentFrame = s.totalFrames - 1;
		   animDiv.style.backgroundPosition = `-${s.currentFrame * s.frameWidth}px 0px`;
		   s.animating = false;
		   // terminou a animação
		   if ( tipo == "hsVelhinha"){
			    console.log("removi Velhinha");
				unlockState("velhinhaAquecida");
				//liga a Velhinha Normal 
				setHotspotState("cenaQuartoRosa.json", "objVelhinha", {
					"img": "assets/velhinhaNormal.png",
					"visible": "visible",
					"active": true,
					"defaultDialogue": [{ text: "Lembra de mais alguma coisa?", response: "Acho que não..." }]
					}, true);
				removeHotspot("objVelhinhaTremendo", "cenaQuartoRosa.json");
			  }
		   if ( tipo == "hsFogao"){
			    showCharacterMessage("Zanko","O frango está pronto.");
				//deixar preparado para retirar o frango do fogão 
				setHotspotState("cenaCozinha02.json","objFogaoAcesso", {
					visible: "hidden",
					active: false
				}, true);
				setHotspotState("cenaCozinha02.json","objFogaoFrangoPronto", {
					visible: "visible",
					active: true
				}, true);
				
			  }	  
		   if ( tipo == "hsSino"){
			    removeHotspot("objSinoTocando", "cenaSalaJantar.json");
				//trazer Meirelles para a Sala de Jantar 
				gameState.MeirellesNaSalaJantar = true;
			  }
		   if ( tipo == "hsTorneira"){
			    removeHotspot("objTorneiraAguaCopo", "cenaCozinha01.json");
				setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
					"img": "assets/cozinhaTorneiraCOPOCHEIO.png",
					"visible": "visible",
					"active": true
					}, true);
			  }
		   if ( tipo == "hsBalde"){
			    if (debug) console.log("removi hsBalde");
				removeHotspot("objTorneiraAguaBalde", "cenaCozinha01.json");
				setHotspotState("cenaCozinha01.json", "objTorneiraCozinha", {
					"img": "assets/cozinhaTorneiraBALDECHEIO.png",
					"visible": "visible",
					"active": true
					}, true);
			  }
		   if ( tipo == "hsPote"){
			    removeHotspot("PoteRachando", "cenaQuartoAzul.json");
				removeHotspot("DiapasaoQuartoAzul", "cenaQuartoAzul.json");
				setHotspotState("cenaQuartoAzul.json", "objChaveAmarela", {
					"visible": "visible",
					"active": true
					}, true);
			  }
		   if ( tipo == "hsGatoPorao"){
				//gato para a animação
			    removeHotspot("GatoRunPorao", "cenaPorao01.json");
				//inicia animacao idle
				setHotspotState("cenaPorao01.json", "GatoIdlePorao", {
					"visible": "visible"
					}, true);
				//rato pode fugir 
				gameState.RatoFugir = true;
				//posso pegar a chave
				setHotspotState("cenaPorao01.json", "objChaveVermelha", {
					description: "🔍 Uma das chaves do cofre do Escritório.",
					type: "Collectible",
					active: true,
					acceptedItems: [],
					jump: "removerChaveVermelha",
					unlockClue: ["PistaESC.CV"]
					}, true);
			  }	
		   if ( tipo == "hsChapeu")
				removeAnimacaoChapeu();
           if ( tipo == "hsCorujaVoando") {
				setHotspotState("cenaQuartoLaranja.json","CorujaVoandoQuarto",{
					"visible": "hidden",
					"active": false 
					}, true);
				setHotspotState("cenaQuartoLaranja.json","CorujaIddleQuarto",{
					"visible": "visible",
					"active": true 
					}, true);
				setHotspotState("cenaQuartoLaranja.json","objChapeuArmario",{
					"visible": "hidden",
					"active": false 
					}, true);
				setHotspotState("cenaQuartoLaranja.json","objChapeuAnimado",{
					"visible": "visible",
					"active": true 
					}, true)
				setHotspotState("cenaQuartoLaranja.json","objCorujaArmario",{
					"x": 598,
					"img": "assets/corujaArmarioSemChapeu.png",
					"active": false 
					}, true);
				let hsChapeu = findHotspotById("objChapeuAnimado");
				animarAgora(hsChapeu,"hsChapeu");
			    }
		   } 
		else 	
		   {
		   // quadro intermediário
		   animDiv.style.backgroundPosition = `-${s.currentFrame * s.frameWidth}px 0px`;
		   
		   if ( tipo == "hsEstilingue" && s.currentFrame == 3 ){
			  //começa animar o pote rachando
			  setHotspotState("cenaQuartoAzul.json", "objPoteChave", {
				 "visible": "hidden",
				 "active": false
				 }, true);
			  setHotspotState("cenaQuartoAzul.json", "PoteRachando", {
				 "visible": "visible",
				 "active": true
				 }, true);
			  let hsPote = findHotspotById("PoteRachando");
			  showAudioLabel(hsPote,"Crack");
			  animarAgora(hsPote, "hsPote");
			  }
		   }
		}, s.frameDuration);	
}