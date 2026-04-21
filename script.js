
// ======== Lógica do jogo  ======
const debug = false;
let debugMode = false;
let currentTooltip = null; 
const LampadaState = {
  BRANCO: "branco",
  AZUL: "azul",
  VERDE: "verde",
  AMARELO: "amarelo",
  CIANO: "ciano",
  ROSA: "rosa",
  CHART: "chart"
};


const LiquidificadorState = {
  N: "nada",
  A: "all",
  T: "tomate",
  TG: "tomategelo",
  TV: "tomatevodca",
  G: "gelo",
  GV: "gelovodca",
  V: "vodca"
};
const zankoColor = "rgb(255,200,150)"; // laranja claro


let gameState = {
  // cenas
  sceneCache: new Map(),
  sceneCurrent: null,

  // diálogos e modais
  numberCluesFound: 0,
  cluesFound: [],
  collectiblesFound: [],
  statesFound: [], //armazena estados temporários. Exemplo: vitrola funcionando.
  modalIndex: 0,
  currentDialogue: null,
  selectedOption: null,
  availableOptions: [],
  dialogueMode: "linear",   // "linear" | "options"
  currentHotspot: null,
  modalOpen: false,
  singleClickModal: false,
  ignoreNextClick: false,

  mostrarCadaCulpado:0, 
  meirellesCulpado: false,
  carolinaCulpada: false,
  marcosCulpado: false,
  maryCulpada: false,
  generalCulpado: false,
  genesioCulpado: false,
  luciaCulpada: false,
  gertrudesCulpada: false,
  sandraCulpada: false,
  acertosCulpados: 0,
  
  // controle de execuções
  executedConditionals: new Set(),
  talkedTo: {},

  // opções já usadas por personagem
  usedOptionsByChar: {},

  // estado pendente
  pendingJump: null,
  pendingOptionId: null,

  // flags específicas da história
  MeirellesNaSalaJantar: false,
  cenaHallFlor: false,
  botijaoGas2Andar: false,
  botijaoNoElevador: false,
  botijaoColetado2Andar: false,
  estadoLiquidificador: LiquidificadorState.N,
  numeroPlantas: 0,
  genesioForaQuintal: 0,
  estadoCoruja: 0,
  lampadaColorida: LampadaState.BRANCO,
  codigosCofreLabEncontrados: 0,
  papeisNoVasoSanitario: false,
  vasoEntupido: false,
  chaFalso: false, // se torna True quando descobre que o chá não esfriou
  gatoLiberado: false, //gatoLiberado
  RatoFugir: false, //rato já pode fugir do porão
  livrosLab: 0, // 0 - nenhum mudou, 1 = o 1, 2 = o 2, 3 - os tres...
};


// Mensagens globais para uso quando o item arrastado não serve
const ERROR_MESSAGES = [
  "Não é bem isso...",
  "Acho que não vai funcionar.",
  "Não parece a combinação certa.",
  "Hmmm... não encaixa.",
  "Talvez outro item funcione melhor.",
  "Isso não ajuda aqui.",
  "Não combina com este lugar.",
  "Tente outra abordagem."
];

// Mensagem que deve aparecer quando o usuário tenta colocar um item certo em um objeto, mas no estado errado.
const erroMensagemObjectState = "Preciso fazer algo antes...";

// Mensagens globais para Combinação de Itens 
const COMBINACAO_MESSAGES = [
  "Coloquei {1} nas {2}.",
  "Encaixei a {1} no {2}.",
  "Usei o {2} na {1}.",
  "Coloquei o {1} na {2}.",
  "Instalei {1} na {2}.",
  "Carreguei o {1} no {2}.",
  "Encaixei {1} no {2}.",
  "Enchi o {1} na {2}.",
  "Mergulhei a {1} na {2}.",
  "Usei o {1} no {2}.",
  "Coloquei {1} no {2}.",
  "Coloquei {1} na {2}.",
  "Usei o {1} na {2}.",
  "Enchi {1} na {2}.",
  "Servi o drinque na taça.",
  "Amarrei o {1} na {2}.", //15
  "Liberei a {1} na {2}.",
  "Entreguei a {1} para o {2}.",
  "Servi o {1} para a {2}.",
  "Coloquei a {1} perto da {2}.",
  "Entreguei o {1} para a {2}.",
  "Usei a {1} para servir o {2}.",
  "Servi o {1} na {2}.",  
];


// banco de dados global de pistas
const allCluesData = [
  { id: "Pista.ALL", text: "Eu já encontrei todas as pistas. Está na hora de chamar Iago.", grupo: "Fim de Jogo" },
  { id: "PistaESC.3C", text: "O cofre funciona com três chaves.", grupo: "Escritório - Sr. Meirelles" },
  { id: "PistaESC.RB", text: "As chaves do cofre desapareceram entre 14:00 e 18:00.", grupo: "Escritório - Sr. Meirelles" },
  { id: "PistaESC.CA", text: "Encontrei uma chave do cofre do Escritório no Quarto Azul.", grupo: "Escritório - Sr. Meirelles" },
  { id: "PistaESC.CV", text: "Encontrei uma chave do cofre do Escritório no Porão.", grupo: "Escritório - Sr. Meirelles" },
  { id: "PistaESC.CZ", text: "Encontrei uma chave do cofre do Escritório no Salão de Jogos.", grupo: "Escritório - Sr. Meirelles" },
  { id: "PistaLAB.VER", text: "O código vermelho do cofre do laboratório é 29.", grupo: "Laboratório" },
  { id: "PistaLAB.AMA", text: "O código amarelo do cofre do laboratório é 58.", grupo: "Laboratório" },
  { id: "PistaLAB.CIA", text: "O código ciano do cofre do laboratório é 14.", grupo: "Laboratório" }, 
  { id: "PistaLAB.PLA1", text: "Os novos planos da refinaria.", grupo: "Refinaria" },
  { id: "PistaLAB.PLA2", text: "Está faltando a parte principal dos planos da refinaria, que estava com o Dr. Meirelles.", grupo: "Refinaria" },
  { id: "PistaLAB.ESP", text: "Há muitos interessados em desaparecer com os planos.", grupo: "Refinaria" },
  { id: "PistaLAB.OLHO", text: "O 'Olho de Odin' estava em uma xícara de chá.", grupo: "Laboratório" },
  { id: "PistaLAB.CAR", text: "Carolina serviu o chá com o 'Olho de Odin' na xícara.", grupo: "Laboratório" },
  { id: "PistaCAR.COZ", text: "Qualquer um poderia ter entrado na cozinha para esconder o 'Olho de Odin' na geladeira.", grupo: "Laboratório" },
  { id: "PistaLUC.EST", text: "Meirelles pagou pelos estudos de Lúcia.", grupo: "Família de Lúcia" },
  { id: "PistaMAR.LUC", text: "Qual o motivo de Meirelles ajudar Lúcia?", grupo: "Família de Lúcia" },
  { id: "PistaESC.ACI", text: "O pai de Lúcia morreu em um acidente.", grupo: "Família de Lúcia" },
  { id: "PistaCAR.ESC", text: "Os documentos sobre o acidente do pai de Lúcia estão no escritório do Dr. Meirelles.", grupo: "Família de Lúcia" },
  { id: "PistaESC.MOR", text: "O pai de Lúcia morreu em um acidente provocado pelo Dr. Meirelles.", grupo: "Família de Lúcia" },
  { id: "PistaLUC.MOR", text: "Alega não se importar com o fato do Dr. Meirelles não ter sido responsabilizado pela morte do pai.", grupo: "Família de Lúcia" },
  { id: "PistaESC.TER", text: "O terreno onde vai ser construída a refinaria pertence ao General.", grupo: "Refinaria" },
  { id: "PistaLAB.GRG", text: "Fotografias da área onde será construída a nova refinaria, em Rio Grande.", grupo: "Refinaria" },
  { id: "PistaREF.COF", text: "O terreno da nova refinaria foi escolhido pelo Dr. Marcos.", grupo: "Refinaria" },
  { id: "PistaMAR.BM", text: "Receita para um Bloody Mary: vodca, gelo, tomate e um talo de salsão.", grupo: "Mary" },
  { id: "PistaMAR.GEL", text: "Procurava por gelo durante a tarde.", grupo: "Mary" },
  { id: "PistaMAR.COZ", text: "Diz que pode ter ido até a cozinha.", grupo: "Mary" },
  { id: "PistaSAN.FOT", text: "Alega que revelou fotografias dos artistas que representa.", grupo: "Sandra" },
  { id: "PistaSAN.REV", text: "Revelou fotografias no laboratório.", grupo: "Sandra" },  
  
];

// =================== MENSAGENS ALEATÓRIAS ================

// Retorna uma mensagem aleatória do array ERROR_MESSAGES
function getRandomErrorMessage() {
  const i = Math.floor(Math.random() * ERROR_MESSAGES.length);
  return ERROR_MESSAGES[i];
}

//respostas de characteres à collectibles
function CharactersAndCollectibles(hotspot, itemId){
	console.log("hotspot.."+hotspot.name);
	switch (itemId) {
		case "objGarrafaRefrigerante":
		case "objCopoA_Agua":
			if ( hotspot.name == "Mary" )
				showCharacterMessage(hotspot.name, "Não bebo água, querido.");
			else 
				showCharacterMessage(hotspot.name, "Não estou com sede.");
			break;
		case "objBaldeMetalAgua":
			showCharacterMessage(hotspot.name, "O que vou fazer com isso? Tomar um banho?");
			break;
		case "objCarretelLinha":
			showCharacterMessage(hotspot.name, "Ai! Tire essa agulha daqui!");
			break;
		case "objDardo":
			showCharacterMessage(hotspot.name, "Onde você pretende colocar isso?");
			break;
		case "objFlorViva":
			showCharacterMessage(hotspot.name, "Linda, mas não preciso disso.");
			break;			
		case "objAlicate":
		case "objCoroa":
			showCharacterMessage(hotspot.name, "E faço o que com isso?");
			break;	
		case "objPapeisLixo":
			showCharacterMessage(hotspot.name, "Não quero lixo.");
			break;
		case "objMachado":
			showCharacterMessage(hotspot.name, "Ei! Cuidado com essa coisa!");
			break;		
		case "objEsfregao":
			showCharacterMessage(hotspot.name, "Não pretendo limpar nada agora.");
			break;		
		case "objVodca":
			showCharacterMessage(hotspot.name, "É muito cedo para isso, não?");
			break;	
		case "objCookies":
		case "objSalsao":
		case "objTomate":
			showCharacterMessage(hotspot.name, "Não estou com fome.");
			break;
		case "objLataSalmaoAberta":
			showCharacterMessage(hotspot.name, "Eca! Isso está cru!");
			break;			
		default:
			show2Modal(getRandomErrorMessage(), hotspot);
			document.addEventListener("click", advanceModal);
			break;
		}
}

// Retorna uma mensagem aleatória de Combinação de Itens
function getCombinacaoMessages(item01, item02, idMessage) {
  return COMBINACAO_MESSAGES[idMessage]
    .replace("{1}", item01)
    .replace("{2}", item02);
}


// ===================== CARREGAR CENA =====================
function loadScene(sceneName) {
  //salvar o estado dos collectedItems atuais
  saveSceneState(gameState.sceneCurrent);
  if (gameState.sceneCache.has(sceneName)) {
	console.log("carrega cena do cache");
    gameState.sceneCurrent = gameState.sceneCache.get(sceneName);
    renderScene(gameState.sceneCurrent);
	restoreSceneState(gameState.sceneCurrent);
  } else {
	console.log("carrega cena do arquivo");
    fetch(sceneName)
      .then(res => res.json())
      .then(data => {
        gameState.sceneCache.set(sceneName, data);
        gameState.sceneCurrent = data;
        renderScene(gameState.sceneCurrent);
      });
  }
}

function saveSceneState(scene) {
  if (!scene || !scene.hotspots) return;
  
  scene.hotspots.forEach(hotspot => {
    if (hotspot.element && hotspot.element.collectedItems) {
      hotspot.collectedItems = [...hotspot.element.collectedItems];
    }
  });
}

function restoreSceneState(scene) {
  if (!scene || !scene.hotspots) return;

  scene.hotspots.forEach(hotspot => {
    if (hotspot.element) {
      hotspot.element.collectedItems = hotspot.collectedItems
        ? [...hotspot.collectedItems]
        : [];
    }
  });
}

function fadeToScene(sceneName) {
  const overlay = document.getElementById("scene-transition");
  if (!overlay) return;

  // fade out
  overlay.style.pointerEvents = "auto"; 
  overlay.style.opacity = "1";

  // aguarda a transição antes de carregar a cena
  setTimeout(() => {
    // aqui você chama sua função de carregar cena
    loadScene(sceneName);

    // depois de carregar, faz fade in
    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.pointerEvents = "none";
      }, 800); // tempo da transição
    }, 300); // tempo para dar sensação de troca
  }, 800); // tempo do fade-out
}

function renderScene(scene) {
  if ( scene.sceneId == "cenaCulpados")
	{
		console.log("cenaCulpados");
	const cluesIcon = document.getElementById("clues-icon");
	if (cluesIcon) {
		cluesIcon.style.setProperty("display", "none", "important");
		}
	cluesIcon.style.pointerEvents = "none";
	cluesIcon.style.visibility = "hidden";
	}
  const sceneContainer = document.getElementById("scene");

  // aplica o background do JSON
  sceneContainer.style.backgroundImage = `url(${scene.background})`;

  // limpa os hotspots antigos
  sceneContainer.querySelectorAll(".hotspot").forEach(h => h.remove());

  // renderiza os hotspots da cena atual
  // renderiza os hotspots (pega de gameState.sceneCurrent direto)
  renderHotspots();
  
  //chama função inicial, se existir 
  if ( scene.jumpStart ) {
	  let hsZankoCulpado = findHotspotById("ZankoCulpado");
	  window[scene.jumpStart]?.(hsZankoCulpado);
  }
  
  // 🔹 adiciona links de debug 
  const debugLink = document.createElement("div");
  debugLink.className = "debug-link";
  debugLink.textContent = "Qto Rosa";
  debugLink.style.position = "absolute";
  debugLink.style.left = "20px";
  debugLink.style.top = "70px";
  debugLink.style.padding = "4px 8px";
  debugLink.style.background = "rgba(0,0,0,0.6)";
  debugLink.style.color = "white";
  debugLink.style.fontSize = "12px";
  debugLink.style.cursor = "pointer";
  debugLink.style.zIndex = "9999";

  debugLink.onclick = () => {
    loadScene("cenaQuartoRosa.json");
  };

  sceneContainer.appendChild(debugLink);
  debugLink.style.display = "none";
  
  const debugLink2 = document.createElement("div");
  debugLink2.className = "debug-link";
  debugLink2.textContent = "Quintal";
  debugLink2.style.position = "absolute";
  debugLink2.style.left = "90px";
  debugLink2.style.top = "70px";
  debugLink2.style.padding = "4px 8px";
  debugLink2.style.background = "rgba(0,0,0,0.6)";
  debugLink2.style.color = "white";
  debugLink2.style.fontSize = "12px";
  debugLink2.style.cursor = "pointer";
  debugLink2.style.zIndex = "9999";

  debugLink2.onclick = () => {
    loadScene("cenaQuintal.json");
  };
  sceneContainer.appendChild(debugLink2);
  debugLink2.style.display = "none";
  
  const debugLink3 = document.createElement("div");
  debugLink3.className = "debug-link";
  debugLink3.textContent = "Qto Laranja";
  debugLink3.style.position = "absolute";
  debugLink3.style.left = "153px";
  debugLink3.style.top = "70px";
  debugLink3.style.padding = "4px 8px";
  debugLink3.style.background = "rgba(0,0,0,0.6)";
  debugLink3.style.color = "white";
  debugLink3.style.fontSize = "12px";
  debugLink3.style.cursor = "pointer";
  debugLink3.style.zIndex = "9999";

  debugLink3.onclick = () => {
    loadScene("cenaQuartoLaranja.json");
  };
  sceneContainer.appendChild(debugLink3);
  debugLink3.style.display = "none";
  
  const debugLink4 = document.createElement("div");
  debugLink4.className = "debug-link";
  debugLink4.textContent = "Hall";
  debugLink4.style.position = "absolute";
  debugLink4.style.left = "242px";
  debugLink4.style.top = "70px";
  debugLink4.style.padding = "4px 8px";
  debugLink4.style.background = "rgba(0,0,0,0.6)";
  debugLink4.style.color = "white";
  debugLink4.style.fontSize = "12px";
  debugLink4.style.cursor = "pointer";
  debugLink4.style.zIndex = "9999";

  debugLink4.onclick = () => {
    loadScene("cenaHall01.json");
  };
  sceneContainer.appendChild(debugLink4);
  debugLink4.style.display = "none";
  
  const debugLink5 = document.createElement("div");
  debugLink5.className = "debug-link";
  debugLink5.textContent = "Jantar";
  debugLink5.style.position = "absolute";
  debugLink5.style.left = "285px";
  debugLink5.style.top = "70px";
  debugLink5.style.padding = "4px 8px";
  debugLink5.style.background = "rgba(0,0,0,0.6)";
  debugLink5.style.color = "white";
  debugLink5.style.fontSize = "12px";
  debugLink5.style.cursor = "pointer";
  debugLink5.style.zIndex = "9999";

  debugLink5.onclick = () => {
    loadScene("cenaSalaJantar.json");
  };
  debugLink5.style.display = "none";

  const debugLink6 = document.createElement("div");
  debugLink6.className = "debug-link";
  debugLink6.textContent = "Porao";
  debugLink6.style.position = "absolute";
  debugLink6.style.left = "285px";
  debugLink6.style.top = "70px";
  debugLink6.style.padding = "4px 8px";
  debugLink6.style.background = "rgba(0,0,0,0.6)";
  debugLink6.style.color = "white";
  debugLink6.style.fontSize = "12px";
  debugLink6.style.cursor = "pointer";
  debugLink6.style.zIndex = "9999";

  debugLink6.onclick = () => {
    loadScene("cenaPorao01.json");
  };
  sceneContainer.appendChild(debugLink6);
  debugLink6.style.display = "none";
  
  const debugLink7 = document.createElement("div");
  debugLink7.className = "debug-link";
  debugLink7.textContent = "Cozinha01";
  debugLink7.style.position = "absolute";
  debugLink7.style.left = "335px";
  debugLink7.style.top = "70px";
  debugLink7.style.padding = "4px 8px";
  debugLink7.style.background = "rgba(0,0,0,0.6)";
  debugLink7.style.color = "white";
  debugLink7.style.fontSize = "12px";
  debugLink7.style.cursor = "pointer";
  debugLink7.style.zIndex = "9999";

  debugLink7.onclick = () => {
    loadScene("cenaCozinha01.json");
  };
  sceneContainer.appendChild(debugLink7);
  debugLink7.style.display = "none";
  
  const debugLink8 = document.createElement("div");
  debugLink8.className = "debug-link";
  debugLink8.textContent = "Sala Música";
  debugLink8.style.position = "absolute";
  debugLink8.style.left = "410px";
  debugLink8.style.top = "70px";
  debugLink8.style.padding = "4px 8px";
  debugLink8.style.background = "rgba(0,0,0,0.6)";
  debugLink8.style.color = "white";
  debugLink8.style.fontSize = "12px";
  debugLink8.style.cursor = "pointer";
  debugLink8.style.zIndex = "9999";

  debugLink8.onclick = () => {
    loadScene("cenaSalaMusica.json");
  };
  sceneContainer.appendChild(debugLink8);
  debugLink8.style.display = "none";

  const debugLink9 = document.createElement("div");
  debugLink9.className = "debug-link";
  debugLink9.textContent = "Laboratório";
  debugLink9.style.position = "absolute";
  debugLink9.style.left = "500px";
  debugLink9.style.top = "70px";
  debugLink9.style.padding = "4px 8px";
  debugLink9.style.background = "rgba(0,0,0,0.6)";
  debugLink9.style.color = "white";
  debugLink9.style.fontSize = "12px";
  debugLink9.style.cursor = "pointer";
  debugLink9.style.zIndex = "9999";

  debugLink9.onclick = () => {
    loadScene("cenaLaboratorio01.json");
  };
  sceneContainer.appendChild(debugLink9);
  debugLink9.style.display = "none";

  const debugLink10 = document.createElement("div");
  debugLink10.className = "debug-link";
  debugLink10.textContent = "S. Estar";
  debugLink10.style.position = "absolute";
  debugLink10.style.left = "590px";
  debugLink10.style.top = "70px";
  debugLink10.style.padding = "4px 8px";
  debugLink10.style.background = "rgba(0,0,0,0.6)";
  debugLink10.style.color = "white";
  debugLink10.style.fontSize = "12px";
  debugLink10.style.cursor = "pointer";
  debugLink10.style.zIndex = "9999";

  debugLink10.onclick = () => {
    loadScene("cenaSalaEstar.json");
  };
  sceneContainer.appendChild(debugLink10);
  debugLink10.style.display = "none";  

  const debugLink11 = document.createElement("div");
  debugLink11.className = "debug-link";
  debugLink11.textContent = "S. Jogos";
  debugLink11.style.position = "absolute";
  debugLink11.style.left = "650px";
  debugLink11.style.top = "70px";
  debugLink11.style.padding = "4px 8px";
  debugLink11.style.background = "rgba(0,0,0,0.6)";
  debugLink11.style.color = "white";
  debugLink11.style.fontSize = "12px";
  debugLink11.style.cursor = "pointer";
  debugLink11.style.zIndex = "9999";

  debugLink11.onclick = () => {
    loadScene("cenaSalaJogos.json");
  };
  sceneContainer.appendChild(debugLink11);
  debugLink11.style.display = "none";

  const debugLink12 = document.createElement("div");
  debugLink12.className = "debug-link";
  debugLink12.textContent = "Jantar";
  debugLink12.style.position = "absolute";
  debugLink12.style.left = "700px";
  debugLink12.style.top = "70px";
  debugLink12.style.padding = "4px 8px";
  debugLink12.style.background = "rgba(0,0,0,0.6)";
  debugLink12.style.color = "white";
  debugLink12.style.fontSize = "12px";
  debugLink12.style.cursor = "pointer";
  debugLink12.style.zIndex = "9999";

  debugLink12.onclick = () => {
    loadScene("cenaSalaJantar.json");
  };
  sceneContainer.appendChild(debugLink12);
  debugLink12.style.display = "none";

  // 🔹 botão para liberar state
  const debugStateLink = document.createElement("div");
  debugStateLink.className = "debug-link";
  debugStateLink.textContent = "Add State";
  debugStateLink.style.position = "absolute";
  debugStateLink.style.left = "20px";
  debugStateLink.style.top = "100px";
  debugStateLink.style.padding = "4px 8px";
  debugStateLink.style.background = "rgba(0,0,0,0.6)";
  debugStateLink.style.color = "white";
  debugStateLink.style.fontSize = "12px";
  debugStateLink.style.cursor = "pointer";
  debugStateLink.style.zIndex = "9999";

  debugStateLink.onclick = () => {
    const stateId = prompt("Digite o stateId que deseja liberar:");
  if (stateId && stateId.trim() !== "") {
    unlockState(stateId.trim());
    console.log("State liberado:", stateId.trim());
    console.log("statesFound:", gameState.statesFound);
    }
  };
  sceneContainer.appendChild(debugStateLink);
  debugStateLink.style.display = "none";

  // 🔹 botão para liberar clue
  const debugClueLink = document.createElement("div");
  debugClueLink.className = "debug-link";
  debugClueLink.textContent = "Add Clue";
  debugClueLink.style.position = "absolute";
  debugClueLink.style.left = "20px";
  debugClueLink.style.top = "130px";
  debugClueLink.style.padding = "4px 8px";
  debugClueLink.style.background = "rgba(0,0,0,0.6)";
  debugClueLink.style.color = "white";
  debugClueLink.style.fontSize = "12px";
  debugClueLink.style.cursor = "pointer";
  debugClueLink.style.zIndex = "9999";

  debugClueLink.onclick = () => {
    const clueId = prompt("Digite o clueId que deseja liberar:");
    if (!clueId || clueId.trim() === "") return;
    const id = clueId.trim();
    const clueExists = allCluesData.some(clue => clue.id === id);
    if (!clueExists) {
      alert("Clue não encontrada: " + id);
      return;
    }
    unlockClue(id);
    console.log("Clue liberada:", id);
    console.log("cluesFound:", gameState.cluesFound);
   };
  sceneContainer.appendChild(debugClueLink);
  debugClueLink.style.display = "none";

  const debugLinkCulpados = document.createElement("div");
  debugLinkCulpados.className = "debug-link";
  debugLinkCulpados.textContent = "Culpados";
  debugLinkCulpados.style.position = "absolute";
  debugLinkCulpados.style.left = "700px";
  debugLinkCulpados.style.top = "100px";
  debugLinkCulpados.style.padding = "4px 8px";
  debugLinkCulpados.style.background = "rgba(0,0,0,0.6)";
  debugLinkCulpados.style.color = "white";
  debugLinkCulpados.style.fontSize = "Culpadospx";
  debugLinkCulpados.style.cursor = "pointer";
  debugLinkCulpados.style.zIndex = "9999";

  debugLinkCulpados.onclick = () => {
    loadScene("cenaCulpados.json");
  };
  sceneContainer.appendChild(debugLinkCulpados);
  debugLinkCulpados.style.display = "none";

  //console.log(scene.name);
  const oldForeground = sceneContainer.querySelector(".scene-foreground");
if (oldForeground) oldForeground.remove();

// adiciona foreground novo (se definido no JSON)
if (scene.foreground) {
  const fg = document.createElement("div");
  fg.className = "scene-foreground";
  fg.style.position = "absolute";
  fg.style.top = "0";
  fg.style.left = "0";
  fg.style.width = "100%";
  fg.style.height = "100%";
  fg.style.pointerEvents = "none"; // não bloqueia cliques nos hotspots
  fg.style.backgroundImage = `url(${scene.foreground})`;
  fg.style.backgroundRepeat = "no-repeat";
  fg.style.backgroundSize = "cover";
  fg.style.zIndex = "9999"; // fica sempre acima
  sceneContainer.appendChild(fg);
}
  }

function removeAllTooltips() {
  document.querySelectorAll(".tooltip").forEach(el => el.remove());
}

// ===================== RENDERIZA HOTSPOTS =====================

function renderHotspots() {
  const container = document.getElementById("scene");
  container.innerHTML = "";

  gameState.sceneCurrent.hotspots.forEach((hotspot, index) => {
	//se for uma animação NOW - só anima desde o início e era isso...
  if (hotspot.type === "ObjectAnimNow") {
    let animDiv = document.getElementById(hotspot.id);
    // não foi criado ainda...
    if (!animDiv) {
      animDiv = document.createElement("div");
      animDiv.id = hotspot.id;
	  animDiv.style.zIndex = hotspot.zindex ?? 1;
      animDiv.className = "hotspot object-anim";
      animDiv.style.position = "absolute";
      animDiv.style.left = `${hotspot.x}px`;
      animDiv.style.top = `${hotspot.y}px`;
      animDiv.style.width = `${hotspot.width}px`;   // largura = frameWidth
      animDiv.style.height = `${hotspot.height}px`; // altura do sprite
      animDiv.style.backgroundImage = `url(${hotspot.img})`;
      animDiv.style.backgroundPosition = `0px 0px`; // primeiro frame
      animDiv.style.backgroundRepeat = "no-repeat";
      animDiv.style.cursor = hotspot.active ? "pointer" : "default";
      animDiv.style.visibility = hotspot.visible; // ? "visible" : "hidden";
	  animDiv.onclick = () => {
         handleClick(hotspot, animDiv);
        };
      container.appendChild(animDiv);

      // carrega a imagem e configura estado
      const spriteImage = new Image();
      spriteImage.src = hotspot.img;

      spriteImage.onload = () => {
        const frameWidth = hotspot.width;
        const totalFrames = Math.max(1, Math.floor(spriteImage.width / frameWidth));
        const frameDuration = hotspot.frameDuration || 120; // ms, pode vir do JSON
		const finalFrame = hotspot.finalFrame || "first";
        // guarda estado no elemento
        animDiv._animState = {
          frameWidth,
          totalFrames,
          currentFrame: 0,
          animating: true,
          interval: null,
          frameDuration,
		  finalFrame,
		  xStart: hotspot.xStart ?? null,
		  yStart: hotspot.yStart ?? null,
		  xStartConst: hotspot.xStart ?? null,
		  yStartConst: hotspot.yStart ?? null,
		  xEnd: hotspot.xEnd ?? null,
		  yEnd: hotspot.yEnd ?? null,
		  stepX: hotspot.stepX ?? hotspot.width,
		  stepY: hotspot.stepY ?? hotspot.height,
		  loop: hotspot.loop ?? false,
		  oneShot: hotspot.oneShot ?? false
         };

        // garante que mostre o primeiro frame inicialmente
        animDiv.style.backgroundPosition = `0px 0px`;

        // inicia a animação automaticamente
        animDiv._animState.interval = setInterval(() => {
            const st = animDiv._animState;
			if (!st.animating) return;

            //deslocamento, só se tiver os parâmetros...
			if ( typeof st.xStart === "number" ) {
				//const meioFrame = st?.meioFrame ?? 1;
				//const progress = Math.min(st.currentFrame / st.totalFrames, 1);
				let newX = st.xStart + st.stepX;
				let newY = st.yStart + st.stepY;
				//console.log("newX = "+newX+" st.xStart = "+st.xStart + " newY = " + newY + " st.yStart = "+st.yStart + " st.stepX = " + st.stepX + " st.stepY = " + st.stepY + st.loop + " st.xEnd = "+st.xEnd + " st.yEnd = "+st.yEnd);
				//seguindo para a esquerda/baixo
				if ( st.stepX <= 0 && st.stepY <= 0 && newX <= st.xEnd && newY <= st.yEnd )
					{
					//reinicia 
					newX = st.xStartConst;
					newY = st.yStartConst;
					}
				else 
				//seguindo para a direita/baixo
				if ( st.stepX >= 0 && st.stepY <= 0 && newX >= st.xEnd && newY <= st.yEnd )
					{
					//reinicia 
					newX = st.xStartConst;
					newY = st.yStartConst;
					}
				else 
				//seguindo para a direita/cima
				if ( st.stepX >= 0 && st.stepY >= 0 && newX >= st.xEnd && newY >= st.yEnd )
					{
					//reinicia 
					newX = st.xStartConst;
					newY = st.yStartConst;
					}
				else 
				//seguindo para a esquerda/cima
				if ( st.stepX <= 0 && st.stepY >= 0 && newX <= st.xEnd && newY >= st.yEnd )
					{
					//reinicia 
					newX = st.xStartConst;
					newY = st.yStartConst;
					}
				st.xStart = newX;
				st.yStart = newY;
					
				//st.xStart + (st.xEnd - st.xStart)/meioFrame * progress;
				//const newY = st.yStart + (st.yEnd - st.yStart)/meioFrame * progress;
				animDiv.style.left = `${newX}px`;
				animDiv.style.top = `${newY}px`;
				}
			
			//na animação do rato, quando ela se aproxima do gato e já pode fugir, dá o fora!
			//console.log("st.xStart = "+st.xStart + " animDiv.id = " + animDiv.id);
			if ( animDiv.id == "RatoAndando" && gameState.RatoFugir && st.xStart < 140 )
				{
				clearInterval(st.interval);
				st.interval = null;
				setHotspotState("cenaPorao01.json", "RatoAndando", {
					"visible": "hidden"
					}, true);
				setHotspotState("cenaPorao01.json", "RatoFugindo", {
					"visible": "visible"
					}, true);
				let RatoFugindo = findHotspotById("RatoFugindo"); 
				animarAgora(RatoFugindo, "RatoFugindo");
				return;
				}
				
			
			st.currentFrame = (st.currentFrame + 1) % st.totalFrames;
            animDiv.style.backgroundPosition = `-${st. currentFrame * st.frameWidth}px 0px`; 
			}, frameDuration);

	    };
      }
	  hotspot.element = animDiv;
    }
	else 
	//se for uma animação
	if (hotspot.type === "ObjectAnim") {
	  let animDiv = document.getElementById(hotspot.id);
	  //não foi criado ainda...
	  if (!animDiv) {
		animDiv = document.createElement("div");
		animDiv.id = hotspot.id;
		animDiv.style.zIndex = hotspot.zindex ?? 1;
		animDiv.className = "hotspot object-anim";
		animDiv.style.position = "absolute";
		animDiv.style.left = `${hotspot.x}px`;
		animDiv.style.top = `${hotspot.y}px`;
		animDiv.style.width = `${hotspot.width}px`;   // largura = frameWidth
		animDiv.style.height = `${hotspot.height}px`; // altura do sprite
		animDiv.style.backgroundImage = `url(${hotspot.img})`;
		animDiv.style.backgroundRepeat = "no-repeat";
		animDiv.style.cursor = hotspot.active ? "pointer" : "default";
		
		animDiv.style.visibility = hotspot.visible;// ? "visible" : "hidden";
		container.appendChild(animDiv);

		// carrega a imagem e configura estado
		const spriteImage = new Image();
		spriteImage.src = hotspot.img;
					
		spriteImage.onload = () => {
			console.log("onload");
			const frameWidth = hotspot.width;
			const totalFrames = Math.max(1, Math.floor(spriteImage.width / frameWidth));
			const frameDuration = hotspot.frameDuration || 120; // ms, pode vir do JSON
			const finalFrame = hotspot.finalFrame || "first";
			// guarda estado no elemento
			animDiv._animState = {
				frameWidth,
				totalFrames,
				currentFrame: 0,
				animating: false,
				interval: null,
				frameDuration,
				finalFrame,
				xStart: hotspot.xStart ?? null,
				yStart: hotspot.yStart ?? null,
				xStartConst: hotspot.xStart ?? null,
				yStartConst: hotspot.yStart ?? null,
				xEnd: hotspot.xEnd ?? null,
				yEnd: hotspot.yEnd ?? null,
				stepX: hotspot.stepX ?? hotspot.width,
				stepY: hotspot.stepY ?? hotspot.height,
				loop: hotspot.loop ?? false,
				oneShot: hotspot.oneShot ?? false
				};

			// garante que mostre o primeiro frame inicialmente
			animDiv.style.backgroundPosition = `0px 0px`;

			// clique que (re)dispara a animação
			animDiv.addEventListener("click", () => {
				// só reage se ativo
				if (!hotspot.active) return;
				const s = animDiv._animState;
				if (!s) return; // segurança
				if (s.animating) { 
					return; // evita reclick enquanto animando
					}
				// reset para rodar do início
				if (s.interval) { clearInterval(s.interval); s.interval = null; }
				s.currentFrame = 0;
				animDiv.style.backgroundPosition = `0px 0px`;
				s.animating = true;
				
				if ( hotspot?.audio )
					showAudioLabel(hotspot);
				
				s.interval = setInterval(() => {
					s.currentFrame++;
					// tocar audio 2 se existir
					if ( hotspot?.audio2 )
						if ( s.currentFrame == hotspot.frameAudio2 )
							showAudioLabel(hotspot,hotspot.audio2, hotspot.posAudio2, hotspot.timeAudio2); 
					// --- deslocamento só se houver parâmetros no hotspot ---
					if ( typeof s.xStart === "number") {
							const meioFrame = s?.meioFrame ?? 1;
							const progress = Math.min(s.currentFrame / s.totalFrames, 1);
							const newX = s.xStart + (s.xEnd - s.xStart) * progress;
							const newY = s.yStart + (s.yEnd - s.yStart)/meioFrame * progress;
							
							animDiv.style.left = `${newX}px`;
							animDiv.style.top = `${newY}px`;
						}

					if (s.currentFrame >= s.totalFrames) {
						if (hotspot.loop) {
							// 🔁 reinicia a animação
							s.currentFrame = 0;
							animDiv.style.backgroundPosition = `0px 0px`;
							if ( typeof s.xStart === "number" &&
								typeof s.yStart === "number" ) 
								{
								animDiv.style.left = `${s.xStart}px`;
								animDiv.style.top = `${s.yStart}px`;
								}
							} 
						else 
							{
							clearInterval(s.interval);
							s.interval = null;
							s.currentFrame = s.totalFrames - 1;
							animDiv.style.backgroundPosition = `-${s.currentFrame * s.frameWidth}px 0px`;
							if ( typeof s.xEnd === "number" && typeof s.yEnd === "number") 
								{
								animDiv.style.left = `${s.xEnd}px`;
								animDiv.style.top = `${s.yEnd}px`;
								}
							s.animating = false;      
						
							// depois da animação: jump + modal 
							if (hotspot.jump) window[hotspot.jump]?.(hotspot, true);
							if (hotspot.description != "") {
								gameState.modalOpen = true;
								gameState.singleClickModal = true;
								show2Modal(hotspot.description, hotspot);
								document.addEventListener("click", advanceModal);
								}
							}
						} 
					else 
						{
						// quadro intermediário (sprite)
						animDiv.style.backgroundPosition = `-${s.currentFrame * s.frameWidth}px 0px`;
						}
					}, s.frameDuration);
				});
			};
		// em caso de falha no load, ainda deixe a div estática no 1º frame
		spriteImage.onerror = () => {
			console.log("onerror");
			animDiv._animState = {
				frameWidth: hotspot.width,
				totalFrames: 1,
				currentFrame: 0,
				animating: false,
				interval: null,
				frameDuration: hotspot.frameDuration || 120
				};
			animDiv.style.backgroundPosition = `0px 0px`;
			};
		} 
	else 
		{
		// se já existe, apenas atualiza estilos/posição/visibilidade/cursores
		console.log("else");
		animDiv.style.left = `${hotspot.x}px`;
		animDiv.style.top = `${hotspot.y}px`;
		animDiv.style.width = `${hotspot.width}px`;
		animDiv.style.height = `${hotspot.height}px`;
		animDiv.style.backgroundImage = `url(${hotspot.img})`;
		animDiv.style.visibility = hotspot.visible ? "visible" : "hidden";
		animDiv.style.cursor = hotspot.active ? "pointer" : "default";
		// se quiser reiniciar o primeiro frame ao re-renderizar:
		if (animDiv._animState) {
			animDiv._animState.currentFrame = 0;
			animDiv.style.backgroundPosition = `0px 0px`;
			}
		}
	
	
	//verifica os objetos que podem ser dropados nessa animação
	animDiv.collectedItems = [];
	animDiv.ondragover = (e) => { e.preventDefault(); }

	// Drop!
    animDiv.ondrop = (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("itemId");
        if (!itemId) return;

        const acceptedItems = hotspot.acceptedItems || [];
		
		// verifica se ele pode "receber" o item 
        if (acceptedItems.includes(itemId)) {
          //se ainda não existir nos itens colecionados
		  if (!animDiv.collectedItems.includes(itemId)) 
			  animDiv.collectedItems.push(itemId);
		  
		  //pega o nome do item antes de remover...
		  const itemName = getInventoryItemName(itemId);
		  
		  //remove do inventário 
          removeFromInventory(itemId);
		  
          gameState.modalOpen = true; 
		  gameState.singleClickModal = true; 
          const item = gameState.sceneCurrent.hotspots.find(h => h.id === itemId);
	 	
		  // Verifica se precisa tocar audio antes e depois vai para Show2Modal
		  if (hotspot?.audio) {
		  	showAudioLabel(hotspot).then(() => {
			   show2Modal(getCombinacaoMessages(itemName,hotspot.name, hotspot.messageAccepted), hotspot, false);
			   });
			} 
		  else {
			show2Modal(getCombinacaoMessages(itemName,hotspot.name, hotspot.messageAccepted), hotspot, false);
			}
          document.addEventListener("click", advanceModal);
		  window[hotspot.jump]?.(hotspot,false); 
		  } 
		else 
		  {
          gameState.modalOpen = true; 
		  gameState.singleClickModal = true; 
		  show2Modal(getRandomErrorMessage(), hotspot);
          document.addEventListener("click", advanceModal);
		  }
		};
    // continua o loop (return apenas do forEach callback)
    hotspot.element = animDiv;
	return; 
    }	
	else //não é animação...
	{ 
	// dados do hotSpot armazenados no img 
	const img = document.createElement("img");
	
	img.style.visibility = hotspot.visible;
    img.src = hotspot.img || hotspot.img01 || "default.png";
    img.alt = hotspot.name;
	img.id = hotspot.id;
	//Se for ObjectState, ele deve aparecer por cima dos demais objetos (iluminação, por exemplo)
	img.style.zIndex = hotspot.zindex ?? 1;
	if (hotspot.type === "Rain"){
		img.style.pointerEvents = "none";
		img.style.zIndex = 100;
	}
    img.classList.add("hotspot-img");
    img.style.position = "absolute";

    // posição e tamanho
    img.style.left = (hotspot.x || 100) + "px";
    img.style.top = (hotspot.y || 100) + "px";
    img.style.width = (hotspot.width || 80) + "px";
    img.style.height = (hotspot.height || 80) + "px";
	//se for do tipo special Kind == offLoadScene, desliga o collectible (para esconder ele quando carrega uma cena - usado para Collectibles que ficam dentro de outros objetos)
	if (hotspot?.kind === "offLoadScene") { 
	     img.style.visibility = "hidden";
		 if (debug) console.log("Collectible Kind = offLoadScene");
	  }
	  
	if ( hotspot.mouseCaption != null ) {
		img.addEventListener("mouseover", () => {
		if (currentTooltip) { 
			if (debug) console.log("currentTooltip: "+currentTooltip);
			currentTooltip.remove(); // limpa anterior
		}
		// cria o tooltip
		const tooltip = document.createElement("div");
		tooltip.innerText = hotspot.captionText;
		tooltip.classList.add("tooltip");
		tooltip.textContent = hotspot.mouseCaption;
		tooltip.style.position = 'absolute';
		tooltip.style.background = 'black';
		tooltip.style.color = 'white';
		tooltip.style.padding = '4px 8px';
		tooltip.style.borderRadius = '4px';
		tooltip.style.whiteSpace = 'nowrap';
		tooltip.style.zIndex = 9999;
		// pega posição da imagem
		const rect = img.getBoundingClientRect();

		// calcula posição absoluta na página
		const top = window.scrollY + rect.top + hotspot.captionY;
		const left = window.scrollX + rect.left + hotspot.captionX;
		//if (debug) console.log("window.scrollY: "+window.	scrollY+"\nrect.top: "+rect.top+"\nhotspot.captionY: " + hotspot.captionY + "\ntop:" + top +"\nwindow.scrollX: "+window.scrollX+"\nrect.left: "+rect.left+"\nhotspot.captionX: "+hotspot.captionX+"\nleft: "+left);

		tooltip.style.position = "absolute";
		tooltip.style.top = `${top}px`;
		tooltip.style.left = `${left}px`;
		currentTooltip = tooltip;
		document.body.appendChild(tooltip);
		
		// remove ao sair
		img.addEventListener("mouseout", () => {
			tooltip.remove();
			}, { once: true });
		 });
		}		
	let existeAreaRect = false;
	const map = document.createElement("map");
	const areaRect = document.createElement("area");
	
	// Se existir um mapa de área clicável para o objeto. 
	/*if (Array.isArray(hotspot.rectCoord) && hotspot.rectCoord.length === 4) {
		const [x1, y1, x2, y2] = hotspot.rectCoord;
		const divArea = document.createElement("div");
		divArea.style.position = "absolute";
		divArea.style.left = `${x1}px`;
		divArea.style.top = `${y1}px`;
		divArea.style.width = `${x2 - x1}px`;
		divArea.style.height = `${y2 - y1}px`;
		divArea.style.cursor = "pointer";
		divArea.style.background = "rgba(0,0,0,0)"; // invisível
		divArea.dataset.id = hotspot.id ?? "";

		divArea.addEventListener("click", (e) => {
			e.preventDefault();
			handleClick(hotspot, img);
		});

		// suporte a drop
		divArea.addEventListener("dragover", (e) => e.preventDefault());
		divArea.addEventListener("drop", (e) => {
			e.preventDefault();
			img.ondrop(e); // reaproveita sua lógica do ondrop do img
		});

		document.getElementById("scene").appendChild(divArea);
	}	  */
	
    // ------------------ DRAG & DROP ------------------
    if ( (hotspot.type === "Object") || (hotspot.type === "ObjectState") || (hotspot.type === "Character")) {
      img.collectedItems = [];
	  img.ondragover = (e) => { e.preventDefault(); }

	  // Drop!
      img.ondrop = (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("itemId");
		//pega o nome do item antes de remover...
		const itemName = getInventoryItemName(itemId);
        if (!itemId) return;
        
        //se for ObjectState, verificar se existe um "estado" em que ele pode receber itens. 
		if ((hotspot.type === "ObjectState")&&(hotspot.stateAccepted!=null)){
			if ( hotspot._state.firstClick != hotspot.stateAccepted ) {
				// Mensagem de Erro de estado errado.
                gameState.modalOpen = true; 
				gameState.singleClickModal = true; 
				show2Modal(erroMensagemObjectState, hotspot);
				document.addEventListener("click", advanceModal);
			   return;
			}
		}
		
        const acceptedItems = hotspot.acceptedItems || [];
		
		// verifica se ele pode "receber" o item 
        if (acceptedItems.includes(itemId)) {
          //se pode receber o item,mas o "estado" ainda não está correto, retorna...

		  if ( hotspot?.waitState && !gameState[hotspot?.waitState] ){
			  showCharacterMessage("Zanko","Preciso fazer algo antes...");
			  return;
		    } 
		  
		  
		  //verifica se o item a receber é do tipo CollectibleSpecial - nesse caso, ele não remove do iventário, apenas troca a imagem dele e seu estado 
		  //Tratamento para Collectibles especiais 
		  let objInvent = findHotspotById(itemId);
		  
		  
		  if (hotspot?.justOneItem){
		    //se já coletou algo, não deixa coletar outro
			if (debug) console.log("objeto do tipo justOneItem");
			if (img.collectedItems && img.collectedItems.length > 0) {
			  showCharacterMessage("Zanko","Não posso colocar duas lâmpadas no suporte ao mesmo tempo.");
			  return;
			  }
			}
	      
		  if (objInvent?.kind != null) {  
			if  (objInvent.kind === "Special" ) {
			  //Salta para kindJump. Envia o hotspot e objeto special.
			  if (debug) console.log("Collectible special.itemId = "+itemId);
			  window[objInvent.kindJump]?.(hotspot,objInvent,img, false);
			  }
		    }
		  else 
		    {
		    if (!img.collectedItems.includes(itemId)) img.collectedItems.push(itemId);
            if ( objInvent?.keepObject != null ){
				//nothing
				console.log("keepObject");
				}
			else 
				removeFromInventory(itemId);
            gameState.modalOpen = true; 
		    gameState.singleClickModal = true; 
		  
		    // ObjectState não toca áudio quando recebe item.
		    if (hotspot.type === "ObjectState")  {
			    show2Modal(getCombinacaoMessages(itemName,hotspot.name, hotspot.messageAccepted), hotspot, false);
		       }
		    else 
		       { 	  
		       // Verifica se precisa tocar audio antes e depois vai para Show2Modal
			   if (hotspot?.audio) {
				   showAudioLabel(hotspot);
				   //se for false, não apresenta a mensagem
				   if ( hotspot.messageAccepted != false )
						show2Modal( getCombinacaoMessages(itemName,hotspot.name, hotspot.messageAccepted), hotspot, false);
			      } 
		        else 
				  {
				  //se for false, não apresenta a mensagem
				  if ( hotspot.messageAccepted != false )
			           show2Modal(getCombinacaoMessages(itemName,hotspot.name, hotspot.messageAccepted), hotspot, false);
			      }
		        }
			document.addEventListener("click", advanceModal);
			// se foi setado o jumpAfterAccepted, então vai para lá
			if ( hotspot.jumpAfterAccepted ) {
				window[hotspot.jumpAfterAccepted]?.(hotspot,false,itemId); 
				}
			else // caso contrário, só jump.
				window[hotspot.jump]?.(hotspot,false);
			}
        } 
		else 
		{
          gameState.modalOpen = true; 
		  gameState.singleClickModal = true; 
		  
		  if ( hotspot?.waitAcceptedItems === itemId ){
			  showCharacterMessage("Zanko","Preciso fazer algo antes...");
		    } 
		  else 
		    {
			//se for character com tipos especíicos de itens, respostas...
			if ( hotspot.type == "Character") 
				CharactersAndCollectibles(hotspot, itemId);
			else
				{
				show2Modal(getRandomErrorMessage(), hotspot);
				document.addEventListener("click", advanceModal);
				}
		    }
		  
		}
      };
      // ------------------ OBJECTSTATE
	  if (hotspot.type === "ObjectState") {
          hotspot._state = {
          showingImg01: true,
          firstClick: true
          };
	  }     
	}  

	img.style.cursor = hotspot.active ? "pointer" : "default";
	
	// ------------------ CLIQUE ------------------
	
	// Se existir uma AreaRect, então só precisa colocar o img e o map e não precisa setar o clique (que já está no map)
	if ( existeAreaRect ) {
	    map.style.cursor = hotspot.active ? "pointer" : "default";
		container.appendChild(img);
		container.appendChild(map);
	   }
	else
	  { //caso contrário, é necessário setar o handleclick.
	  img.onclick = () => {
         handleClick(hotspot, img);
        };
      container.appendChild(img);
	  }

		
    hotspot.element = img; // referencia do DOM no hotspot
  }});
}

// ===================== HANDLE CLICK =====================
function handleClick(hotspot, imgElement) {
  removeAllTooltips();
  if (debug) console.log("Handle Click: enter");
  if (gameState.modalOpen) return;
  //if (debug) console.log("Handle Click: modal not open");
  gameState.currentHotspot = hotspot;
  if ((hotspot.type === "Character") || (hotspot.type === "ObjectTalkable")) {
	if (!hotspot.active) return;
    const result = determineCharacterDialogue(hotspot);
    gameState.currentHotspot = hotspot;
    gameState.modalIndex = 0;
    gameState.modalOpen = true;
    gameState.singleClickModal = false;
    gameState.ignoreNextClickl = true;
    if (result.mode === "linear") {
	    //if (result.messages && result.messages.length > 0) 
        gameState.currentDialogue = result.messages;
		if ( debug ) console.log("ULTIMA OPÇAO = dialogue "+ gameState.currentDialogue[gameState.modalIndex].text);
		gameState.pendingJump = result.jump || null;
		gameState.pendingOptionId = result.optionId || null;
		
		// se for uma option, precisa setar que foi executada
		if ( gameState.pendingOptionId != null ) {
			gameState.executedConditionals.add(gameState.pendingOptionId);
		}
		// Verifica se precisa tocar audio antes e depois vai para Show2Modal
		if (hotspot?.audio) {
			showAudioLabel(hotspot).then(() => {
				show2Modal(gameState.currentDialogue[gameState.modalIndex].text, hotspot, false);
				});
				document.addEventListener("click", advanceModal);
			} 
		else {
			show2Modal(gameState.currentDialogue[gameState.modalIndex].text, hotspot, false);
			document.addEventListener("click", advanceModal);
			}
		}	
	  else 
	  if (result.mode === "default") {
        // Todas as opções já foram usadas → mostrar defaultDialogue
        gameState.currentDialogue = hotspot.defaultDialogue;
		console.log("gameState.currentDialogue = "+gameState.currentDialogue);
		  //| [{ text: "Já conversamos sobre isso.", response: "Até mais." }];
        gameState.modalIndex = 0;
		gameState.pendingJump = result.jump || null;
		// Verifica se precisa tocar audio antes e depois vai para Show2Modal
		if (hotspot?.audio) {
			showAudioLabel(hotspot).then(() => {
				show2Modal(gameState.currentDialogue[0].text, hotspot, false);
				}, hotspot.waitAudio);
			} 
		else {
			show2Modal(gameState.currentDialogue[0].text, hotspot, false);
			}
        gameState.modalOpen = true;
        gameState.singleClickModal = false;
        document.addEventListener("click", advanceModal);
        }
	else if (result.mode === "options") {
      // mostra o menu de escolhas
      gameState.pendingJump = null;
      gameState.pendingOptionId = null;
      showDialogueOptions(result.options, hotspot);
      }
	
    if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
   } 
   else if (hotspot.type === "ObjectAnimNow") {
	  if (!hotspot.active) return;
	  // apresenta a descrição, se tiver
	  if ( hotspot.description ){
		  gameState.modalIndex = 0;
		  gameState.modalOpen = true;
		  gameState.singleClickModal = true;
		  gameState.ignoreNextClickl = true;
		  if (hotspot?.audio)
			  showAudioLabel(hotspot).then(() => {  
			  show2Modal(hotspot.description, hotspot, false)});
		  else 
			  show2Modal(hotspot.description, hotspot, false);
		  document.addEventListener("click", advanceModal);
	  }
	  window[hotspot.jump]?.(hotspot,false);
   }  
   else if (hotspot.type === "Action") {
	  if (!hotspot.active) return;
	  // verifica se tem som associado antes de executar a ação
	  if (hotspot?.audio) {
		  showAudioLabel(hotspot).then(() => {
			  window[hotspot.jump]?.(hotspot,false);
		  });
	  }
	  else window[hotspot.jump]?.(hotspot,false);
      if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
   } 
   else if (hotspot.type === "Collectible") {
	  if (!hotspot.active) return;
      gameState.currentDialogue = [{ text: hotspot.description, response: "" }];
      gameState.modalIndex = 0;
      gameState.modalOpen = true;
      gameState.singleClickModal = true;
      gameState.ignoreNextClickl = true;
  	  // Verifica se precisa tocar audio antes e depois vai para Show2Modal
	  if (hotspot?.audio) {
	  	  showAudioLabel(hotspot);//.then(() => {
		    show2Modal(gameState.currentDialogue[0].text, hotspot, false);
		  //});
		  if (hotspot?.jump)
		      window[hotspot.jump]?.(hotspot, false);
		} 
	  else {
		show2Modal(gameState.currentDialogue[0].text, hotspot, false);
	    if ( hotspot?.jump ) {
		  window[hotspot.jump]?.(hotspot, false);
		  }

		}
      document.addEventListener("click", advanceModal);
	  //só faz o collect se não for do tipo nocollect...
	  if ( hotspot.subtype == "NoCollect") {
		// se for do tipo que desaparece do jogo, remove da cena e do cache
        if ( hotspot.removeHotspot ){
			if (imgElement && imgElement.parentNode) 	imgElement.parentNode.removeChild(imgElement);
			removeHotspot(hotspot.id, gameState.sceneCurrent);
		  }  
	  }
	  else 
      if (!gameState.collectiblesFound.includes(hotspot.id)) {
        gameState.collectiblesFound.push(hotspot.id);
        addToInventory(hotspot);
        
		// se for do tipo que desaparece do jogo, remove da cena e do cache
        if ( hotspot.removeHotspot ){
			if (imgElement && imgElement.parentNode) 	imgElement.parentNode.removeChild(imgElement);
			removeHotspot(hotspot.id, gameState.sceneCurrent);
		  }
	    }
      if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
   } 
   else if (hotspot.type === "Object") {
	  if (!hotspot.active) return;
      const acceptedItems = hotspot.acceptedItems || [];
      const collected = imgElement.collectedItems || [];
      const allDelivered = acceptedItems.every(item => collected.includes(item));
      if ( hotspot.jumpAlways ) {
        // dispara a função jumpAlways
        window[hotspot.jumpAlways]?.(hotspot,false);
	  }
	  else
	  if (allDelivered && hotspot.jump) {
        // dispara a função jump
		console.log(".....................");
        window[hotspot.jump]?.(hotspot,false);
		gameState.currentDialogue = [{ text: hotspot.description, response: "" }];
        // se não tiver descrição, não mostra o showModal 
		if ( gameState.currentDialogue[0].text != "" ) {
			gameState.modalIndex = 0;
			gameState.modalOpen = true;
			gameState.singleClickModal = true;
			gameState.ignoreNextClickl = true;
			if (hotspot?.audio) {
				showAudioLabel(hotspot);//.then(() => {
					show2Modal(gameState.currentDialogue[0].text, hotspot, false);
				//	});
				}
			else 
				show2Modal(gameState.currentDialogue[0].text, hotspot, false);
			document.addEventListener("click", advanceModal);
			}
		else 
			//ver se tem audio, pelo menos...
		    if (hotspot?.audio)
				showAudioLabel(hotspot);
        } 
	  else 
	    {
        // só abre modal com descrição
        gameState.currentDialogue = [{ text: hotspot.description, response: "" }];
        // mostra o showModal 
		if ( gameState.currentDialogue[0].text != "" ) {
			gameState.modalIndex = 0;
			gameState.modalOpen = true;
			gameState.singleClickModal = true;
			gameState.ignoreNextClickl = true;

			// Verifica se precisa tocar audio antes e depois vai para Show2Modal
			if (hotspot?.audio) {
				showAudioLabel(hotspot);//.then(() => {
					show2Modal(gameState.currentDialogue[0].text, hotspot, false);
				//	});
				} 
			else {
				show2Modal(gameState.currentDialogue[0].text, hotspot, false);
				}
			document.addEventListener("click", advanceModal);
			}
        }
      if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
    }
   else if (hotspot.type === "ObjectState") {
        if (!hotspot.active) return;
        if ((hotspot._state.firstClick) && (hotspot.description!="")) {
          // Só no primeiro clique mostra a descrição
          gameState.modalOpen = true;
          gameState.singleClickModal = true;
          gameState.ignoreNextClickl = true;
		  // Verifica se precisa tocar audio antes e depois vai para Show2Modal
		  if (hotspot?.audio) {
			showAudioLabel(hotspot);//.then(() => {
				show2Modal(hotspot.description, hotspot, false);
			//	});
			  } 
		  else {
			  show2Modal(hotspot.description, hotspot, false);
			  }		  
          document.addEventListener("click", advanceModal);
          hotspot._state.firstClick = false;
          } 
		else 
		  {
		  // é só um objeto toggable, sem descrição, mas pode
		  // precisar tocar o som. 
		  if (hotspot?.audio)
			  showAudioLabel(hotspot);
		  hotspot._state.firstClick = true;
		  }

        hotspot._state.showingImg01 = !hotspot._state.showingImg01;
		const newImg = hotspot._state.showingImg01 ? hotspot.img01 : hotspot.img02;
		
		// atualiza objeto e imagem na tela
		hotspot.src = newImg;
		imgElement.src = newImg;  
        if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
		// jump.
		window[hotspot.jump]?.(hotspot,false);
    }	
}

//quando tenho uma fakeImage controlando o ObjectState
function ToggleStateFake(hotspot, imgElement){
   if ((hotspot._state.firstClick) && (hotspot.description!="")) {
	  // Só no primeiro clique mostra a descrição
      gameState.modalOpen = true;
      gameState.singleClickModal = true;
      gameState.ignoreNextClickl = true;
	  // Verifica se precisa tocar audio antes e depois vai para Show2Modal
	  if (hotspot?.audio) {
	  	 showAudioLabel(hotspot);
		 //.then(() => {
		   show2Modal(hotspot.description, hotspot, false);
		 //});
	    } 
	  else {
	     show2Modal(hotspot.description, hotspot, false);
		   }		  
      document.addEventListener("click", advanceModal);
      hotspot._state.firstClick = false;
      } 
	else 
	  {
	  // é só um objeto toggable, sem descrição, mas pode
	  // precisar tocar o som. 
	  if (hotspot?.audio)
		  showAudioLabel(hotspot);
		  hotspot._state.firstClick = true;
	  }
    hotspot._state.showingImg01 = !hotspot._state.showingImg01;
	const newImg = hotspot._state.showingImg01 ? hotspot.img01 : hotspot.img02;
		
	// atualiza objeto e imagem na tela
	hotspot.src = newImg;
	imgElement.src = newImg;  
    if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
		// jump.
		window[hotspot.jump]?.(hotspot,false);
}

//remove um item já colecionado por um objeto
function dropItem(img, itemId) {
  if (!img.collectedItems) return;

  img.collectedItems = img.collectedItems.filter(id => id !== itemId);
}



// ===================== DETERMINA DIÁLOGO DO PERSONAGEM =====================
function determineCharacterDialogue(character) {
  // marca que já falou ao menos uma vez
  if (!gameState.talkedTo[character.id]) {
    gameState.talkedTo[character.id] = true;
  }

  // options base do personagem
  let baseOptions = normalizeOptions(character.dialogue);
  console.log(...baseOptions);

  // options condicionais habilitadas
  const condOptions = (character.conditionalDialogue || [])
    .filter(cond => {
	  let hasStates = cond.requireStates ? cond.requireStates.every(c => gameState.statesFound.includes(c)) : true;
      let hasClues = cond.requiresClues ? cond.requiresClues.every(c => gameState.cluesFound.includes(c)) : true;
      let hasCollectibles = cond.requiresCollectibles ? cond.requiresCollectibles.every(c => gameState.collectiblesFound.includes(c)) : true;
      return hasClues && hasCollectibles && hasStates;
    })
    .map(cond => ({
      id: cond.id || `cond_${Math.random()}`, // usa id do JSON ou gera único
      messages: cond.messages || [],
      jump: cond.jump || null 
    }));

  //debugConditionalOptions(gameState.currentHotspot);


  // junta tudo
  let allOptions = [...baseOptions, ...condOptions];

  // remove opções já usadas para este personagem
  const used = getUsedSetForChar(character.id);
  console.log("used = ");
  console.log(...used );
  allOptions = allOptions.filter(opt => !used.has(opt.id));
  
  console.log("allOptions = ");
  console.log(...allOptions );

  // fallback: se não sobrou nada, usa defaultDialogue 
  if (allOptions.length === 0) {
    const def = normalizeOptions(character.defaultDialogue);
    return { mode: "default", messages: def[0].messages, jump: def[0].jump, optionId: def[0].id };
  }

  // se só restou 1 option → linear direto
  if (allOptions.length === 1) {
    const only = allOptions[0];
    return { mode: "linear", messages: only.messages, jump: only.jump, optionId: only.id };
  }

  // várias options → mostra menu
  return { mode: "options", options: allOptions };
}


function handleCharacterClick(hotspot) {
  gameState.currentDialogue = determineCharacterDialogue(hotspot);
  gameState.currentHotspot = hotspot;
  gameState.modalIndex = 0;
  gameState.modalOpen = true;
  gameState.singleClickModal = false;
  gameState.ignoreNextClickl = true;
  if (gameState.dialogueMode === "linear") {
    show2Modal(gameState.currentDialogue[gameState.modalIndex].text, hotspot, false);
	//aqui 
    document.addEventListener("click", advanceModal);
  } else if (gameState.dialogueMode === "options") {
    showDialogueOptions(gameState.currentDialogue, hotspot);
  }

  if (hotspot.unlocksClues) hotspot.unlocksClues.forEach(unlockClue);
}


function showDialogueOptions(options, hotspot) {
  const modal = document.getElementById("modal-container");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalText = document.getElementById("modal-text");

  // Cabeçalho como fala do Zanko
  modalImg.src = "assets/zankoPH.png";
  modalName.innerText = "Inspetor Zanko";
  modalName.style.color = zankoColor;
  modalText.style.color = zankoColor;

  // Lista de escolhas
  modalText.innerHTML = "";
  options.forEach(opt => {
	const firstLine = opt.messages?.[0]?.text || "";   
	const choice = document.createElement("div");
    choice.className = "dialogue-choice"; 
    choice.innerText = "> "+firstLine;
    choice.onclick = () => {
      // começa a executar a option escolhida (fluxo linear)
      gameState.currentDialogue = opt.messages || [];
      gameState.pendingJump = opt.jump || null;
      gameState.pendingOptionId = opt.id;
	  
	  //se for option do tipo condição, fazer ela não aparecer novamente.
	  if (opt.condIndex !== undefined) {
		gameState.executedConditionals.add(opt.id);
		}
	  
	  gameState.modalIndex = 0;
      document.removeEventListener("click", advanceModal);
      document.addEventListener("click", advanceModal);
      show2Modal(gameState.currentDialogue[gameState.modalIndex].text, hotspot, false);
    };
    modalText.appendChild(choice);
  }); 
  modalImg.style.display = "block";
  modal.style.display = "block";
}


function selectOption(option, hotspot) {
  gameState.selectedOption = option;
  option.used = true; // marca como já usada
  gameState.dialogueMode = "linear"; // depois que escolheu, volta a ser linear
  gameState.modalIndex = 0;
  gameState.currentDialogue = option;
  document.removeEventListener("click", advanceModal);
  document.addEventListener("click", advanceModal);
  show2Modal(option[gameState.modalIndex].text, hotspot, false);
}

// Função para normalizar as Opções de Mensagens 
function normalizeOptions(raw) {
  if (!raw) return [];

  // Caso "raw" já seja uma única option (objeto), padroniza para array
  const arr = Array.isArray(raw) ? raw : [raw];

  return arr.map((opt, idx) => {
    // id da Option
    let id = null;
    if (Array.isArray(opt.option)) id = opt.option[0];
    else if (typeof opt.option === "string") id = opt.option;
    else id = String(idx + 1); // fallback

    // linhas do diálogo
    let messages = opt.messages;
    if (!Array.isArray(messages) && Array.isArray(opt.dialogue)) {
      // suporte ao caso condicional antigo que trazia "dialogue" como array de {text,response}
      messages = opt.dialogue;
    }
    if (!Array.isArray(messages)) messages = [];

    return {
      id,
      messages,
      jump: opt.jump || null
    };
  });
}

function getUsedSetForChar(charId) {
  if (!gameState.usedOptionsByChar[charId]) gameState.usedOptionsByChar[charId] = new Set();
  return gameState.usedOptionsByChar[charId];
}



// ===================== AVANÇA MODAL =====================
function advanceModal(e) {
  //if (debug) console.log("advanceModal: Enter");
  if (!gameState.modalOpen) return;
  if (gameState.ignoreNextClickl) { gameState.ignoreNextClickl = false; return; }
  
  if (gameState.singleClickModal) {
    gameState.singleClickModal = false;
    hideModal();
    gameState.modalOpen = false;
    document.removeEventListener("click", advanceModal);
    return;
    }

  gameState.modalIndex++;
  if (gameState.modalIndex >= gameState.currentDialogue.length * 2) {
    hideModal();
    gameState.modalOpen = false;
	gameState.ignoreNextClickl = false;
	gameState.singleClickModal = false;
    document.removeEventListener("click", advanceModal);
    // marca a option como usada (se houver)
    if (gameState.currentHotspot?.type === "Character" && gameState.pendingOptionId)   {
       const used = getUsedSetForChar(gameState.currentHotspot.id);
       used.add(gameState.pendingOptionId);
      }
    // executa Jump pendente (se houver)
    if (gameState.pendingJump && typeof window[gameState.pendingJump] === "function")  {
      try { window[gameState.pendingJump](gameState.currentHotspot,false); } catch (err) { console.error(err); }
      }

    // limpa pendências
    gameState.pendingJump = null;
    gameState.pendingOptionId = null;
    return;
    }

  const pairIndex = Math.floor(gameState.modalIndex / 2);
  const isResponse = gameState.modalIndex % 2 === 1;
  const msg = isResponse ? gameState.currentDialogue[pairIndex].response : gameState.currentDialogue[pairIndex].text;
  //console.log("special" + gameState.currentHotspot.specialMsg+ " " + gameState.currentHotspot.id);
  //specialMsg == parte da conversa que dá start para algo... por exemplo, uma animacao
  const specialMsgs = Array.isArray(gameState.currentHotspot.specialMsg)
  ? gameState.currentHotspot.specialMsg
  : [gameState.currentHotspot.specialMsg];

if (specialMsgs.includes(msg)) {
  window[gameState.currentHotspot.jumpMsg]?.(gameState.currentHotspot, false);
}
  /*if ( msg === gameState.currentHotspot.specialMsg )
    {	
	window[gameState.currentHotspot.jumpMsg]?.(gameState.currentHotspot,false); 
	}*/
  show2Modal(msg, gameState.currentHotspot, isResponse);
}

// ===================== MOSTRAR MODAL =====================
function show2Modal(text, hotspot, isResponse = false) {
  const modal = document.getElementById("modal-container");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name"); // novo
  const modalText = document.getElementById("modal-text");

  modalText.innerText = text;

  // Nome do hotspot
  modalName.innerText = hotspot.name;

  // Define qual ícone mostrar
  if ((hotspot.type === "Character") || (hotspot.type === "ObjectTalkable") ) {
	if (!isResponse) {
        // Fala do Zanko
		modalText.style.color = zankoColor;
        modalName.style.color = zankoColor;
        modalImg.src = "assets/zankoPH.png";
        modalName.innerText = "Inspetor Zanko";
	    } 
	else {
		// Fala do Personagem
        modalText.style.color = hotspot.color || "#ffffff";
		modalName.style.color = hotspot.color || "#ffffff";
		modalImg.src = hotspot.icon;
        modalName.innerText = hotspot.name;
		}
	} 
	else { // Hotspot não é personagem → fala do Zanko
		modalText.style.color = zankoColor;
        modalName.style.color = zankoColor;
		modalImg.src = "assets/zankoPH.png";
		modalName.innerText = "Inspetor Zanko";
	}
  modalImg.style.display = "block";
  modal.style.display = "block";
}

// ===================== ESCONDE MODAL =====================
function hideModal() {
  const modal = document.getElementById("modal-container");
  modal.style.display = "none";
}

// ============== CHAMAR MODAL POR FUNÇÃO ==================

function showCharacterMessage(nomeCharacter, message) {
return new Promise((resolve) => {
  if (debug) console.log("f:showCharacterMessage");
  const modal = document.getElementById("modal-container");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalText = document.getElementById("modal-text");
  if ( nomeCharacter == "Zanko") {
	modalImg.src = "assets/zankoPH.png";
    modalName.innerText = "Inspetor Zanko";
    modalName.style.color = zankoColor;
    modalText.style.color = zankoColor;
    modalText.innerText = message;	
  }
  else {
	  console.log("nomeCharacter = "+nomeCharacter);
	const character = gameState.sceneCurrent.hotspots.find(h => h.name === nomeCharacter);
	// Define texto e nome
    modalText.innerText = message;
    modalName.innerText = character.name;
    // Define cor e ícone
    modalText.style.color = character.color || "#ffffff";
    modalName.style.color = character.color || "#ffffff";
	modalImg.src = character.icon;
  }
  
  // Exibe modal
  modalImg.style.display = "block";
  modal.style.display = "block";

  gameState.modalOpen = true;
  gameState.singleClickModal = true;
  gameState.ignoreNextClickl = true;
  document.removeEventListener("click", closeHandler);
  document.addEventListener("click", closeHandler);
});
}

function closeHandler(e) {
  if (debug) console.log("closeHandler");
  if (gameState.ignoreNextClickl) {
    gameState.ignoreNextClickl = false;
    return;
  }
  hideModal();
  gameState.modalOpen = false;
  document.removeEventListener("click", closeHandler); // remove corretamente
}

// ===================== STATES ==========================
function unlockState(stateId) {
  if (!gameState.statesFound.includes(stateId)) {
    gameState.statesFound.push(stateId);
  }
}


// ===================== CLUES =====================
function unlockClue(clueId) {
  console.log("Entrei unlockClue:" + clueId);
  if (!gameState.cluesFound.includes(clueId)) {
	console.log("liberei clue");
    gameState.cluesFound.push(clueId);
  }
  gameState.numberCluesFound++;
  console.log("gameState.numberCluesFound = "+gameState.numberCluesFound);
  if ( gameState.numberCluesFound == 28){
	  unlockClue("Pista.ALL");
	  console.log("encontrei todas as pistas");
	  // chamar Camburão e Iago 
	  const novoDialogo = {
		option: ["2"],
		messages: [
		{ text: "Iago, pode vir.", response: "Certo, inseptor." },
		{ text: "E é melhor trazer o camburão.", response: "Vou pegar as chaves." }
		],
		jump: "irCulpados"
		};
		setHotspotState("cenaEscritorio01.json", "talkTelefone", {
			dialogue: [novoDialogo]
			}, true);
		
		}
}

// exibir modal de pistas
function showCluesModal() {
  const cluesModal = document.getElementById("clues-modal-container");
  const cluesList = document.getElementById("clues-modal-list");
  if (!cluesModal || !cluesList) return;

  cluesList.innerHTML = "";

  // pega os dados das pistas desbloqueadas
  const foundClues = gameState.cluesFound
    .map(clueId => allCluesData.find(c => c.id === clueId))
    .filter(Boolean);

  // agrupa por grupo
  const groupedClues = foundClues.reduce((acc, clue) => {
    if (!acc[clue.grupo]) acc[clue.grupo] = [];
    acc[clue.grupo].push(clue);
    return acc;
  }, {});
  
  const gruposOrdenados = Object.entries(groupedClues).sort(([grupoA], [grupoB]) => {
  if (grupoA === "Fim de Jogo") return -1;
  if (grupoB === "Fim de Jogo") return 1;
  return grupoA.localeCompare(grupoB); // opcional: ordena os demais
	});

  // monta a interface
  gruposOrdenados.forEach(([groupName, clues]) => {
  const groupTitle = document.createElement("h3");
  groupTitle.textContent = groupName;
  cluesList.appendChild(groupTitle);

  const ul = document.createElement("ul");
  clues.forEach(clue => {
    const li = document.createElement("li");
    li.textContent = clue.text;
    ul.appendChild(li);
  });

  cluesList.appendChild(ul);
});

  cluesModal.style.display = "flex";

  setTimeout(() => {
    document.onclick = () => {
      cluesModal.style.display = "none";
      document.onclick = null;
    };
  }, 0);
}


// ===================== INVENTÁRIO =====================
function addToInventory(itemData) {
  const inventory = document.getElementById("inventory");

  const img = document.createElement("img");
  img.src = itemData.imgInventory;
  img.alt = itemData.name;
  img.title = itemData.name;
  img.classList.add("inventory-item");
  img.draggable = true;

  // aqui adicionamos o identificador único no DOM
  img.setAttribute("data-id", itemData.id);
  img.ondragstart = (e) => {
    e.dataTransfer.setData("itemId", itemData.id);
  };

  inventory.appendChild(img);
}


function removeFromInventory(collectibleId) {
  const index = gameState.collectiblesFound.indexOf(collectibleId);
  if (index !== -1) {
    gameState.collectiblesFound.splice(index, 1);
  } else {
    console.warn(`removeFromInventory — não encontrado em collectiblesFound: ${collectibleId}`);
  }

  // tentativa de remover do DOM 
  const inventory = document.getElementById("inventory");
  if (inventory) {
    const itemElement = inventory.querySelector(`[data-id="${collectibleId}"]`);
    if (itemElement) {
      itemElement.remove();
    } else {
      console.warn(`removeFromInventory — elemento UI não encontrado para: ${collectibleId}`);
    }
  } else {
    console.warn("removeFromInventory — inventário (#inventory) não existe no DOM.");
  }
}

// retorna o nome de um objeto no inventário passando o id
function getInventoryItemName(hotspotId) {
  const inventory = document.getElementById("inventory");
  if (!inventory) {
    console.warn("getInventoryItemName — inventário (#inventory) não existe no DOM.");
    return null;
  }

  // procura o elemento pelo data-id
  const itemElement = inventory.querySelector(`[data-id="${hotspotId}"]`);
  if (!itemElement) {
    console.warn(`getInventoryItemName — item não encontrado no inventário: ${hotspotId}`);
    return null;
  }

  // retorna o título (ou alt como fallback)
  return itemElement.title || itemElement.alt || null;
}

// retorna um HotSpot pelo Id procurando em todas as cenas...
function findHotspotById(itemId) {
  for (const [sceneName, scene] of gameState.sceneCache.entries()) {
    const hotspot = scene.hotspots.find(h => h.id === itemId);
    if (hotspot) {
      return hotspot; 
    }
  }
  return null; // não achou em nenhuma cena
}

// remove um Hotspot da cena para eliminar do cache
function removeHotspot(hotspotId, scene) {
  // se a cena for passada como nome (string), pega no cache
  if (typeof scene === "string") {
    scene = gameState.sceneCache instanceof Map
      ? gameState.sceneCache.get(scene)
      : gameState.sceneCache[scene];
  }

  if (!scene) {
    console.warn(`Cena não encontrada.`);
    return false;
  }

  // encontra o índice do hotspot
  const index = scene.hotspots.findIndex(h => h.id === hotspotId);
  if (index === -1) {
    console.warn(`Hotspot "${hotspotId}" não encontrado na cena.`);
    return false;
  }
  //console.log("removeHotspot - index:"+index);

  // remove o elemento DOM se existir
  const hotspot = scene.hotspots[index];
  if (hotspot.element && hotspot.element.parentNode) {
	  //console.log("removeHotspot - hotspot.element: " + hotspot.element);
    hotspot.element.parentNode.removeChild(hotspot.element);
  }

  // remove do array
  scene.hotspots.splice(index, 1);

  return true; // sucesso
}


// ===================== CARREGA CENA AO INICIAR =====================
window.onload = () => {
  // 1) Inicializa a cena
  fadeToScene("cenaHall01.json");

  // 2) Garante que o modal de diálogo comece escondido (sem crash se ainda não existir)
  const modal = document.getElementById("modal-container");
  if (modal) modal.style.display = "none";

  // 3) Liga o clique do botão de pistas
  const cluesBtn = document.getElementById("clues-button");
  if (cluesBtn) {
    cluesBtn.onclick = () => {
      showCluesModal();
    };
  }
};

//================ FUNCOES DOS HOTSPOTS  ==================

// altera vários valores de uma hotspot 
// Ex: setHotspotState("cenaTeste", "objCarretelLinha", {
//  visible: "hidden",
// active: false
// },false);
// o último parâmetro deve ser enviado como true caso o parâmetro seja uma imagem que precisa ser alterada na hora. se for true, acha o elemento na página e altera; caso contrário, não faz nada.
function setHotspotState(sceneName, hotspotId, changes, onfly) {
  //if ( debug ) console.log("setHotspotState");
  // verifica se a cena existe no cache
  const scene = gameState.sceneCache instanceof Map
    ? gameState.sceneCache.get(sceneName)
    : gameState.sceneCache[sceneName];

  if (!scene) {
    console.warn(`Cena "${sceneName}" não encontrada no cache.`);
    return false;
  }

  // procura o hotspot
  const hotspot = scene.hotspots.find(h => h.id === hotspotId);
  if (!hotspot) {
    console.warn(`Hotspot "${hotspotId}" não encontrado na cena "${sceneName}".`);
    return false;
  }
  //console.log("setHotspotState.AcheiHotSpot:"+hotspotId);

  // aplica as mudanças genéricas
  // percorre as chaves em "changes"
  for (const key in changes) {
    if (key === "dialogue" && Array.isArray(changes.dialogue)) {
      // substitui o array inteiro ou mescla
      hotspot.dialogue = changes.dialogue; 
	  }
    else {
      hotspot[key] = changes[key];
    }
  }
  
  //if (debug) printAllScenes();
  //se for uma mudança "onfly", atualizar imagem na página 
  if (onfly) {
    const keys = ["img", "img01", "img02"];
    const foundKey = keys.find(k => k in changes);
    if (foundKey) {
      atualizarImagem(hotspot, changes[foundKey]);
      }

    // também atualiza posição se mudanças incluem x ou y
    const el = document.getElementById(hotspot.id);
    if (el) {
      if ("x" in changes) {
        el.style.left = `${changes.x}px`;
      }
      if ("y" in changes) {
        el.style.top = `${changes.y}px`;
      }
    }
  }
  
  // regra especial para `active`
  if ("active" in changes && hotspot.element) {
	if (changes.active) 
		hotspot.element.style.cursor = "pointer";
    else 	
		hotspot.element.style.cursor = "default";
  }
  // regra especial para `visible`
  if ("visible" in changes && hotspot.element) {
    if (changes.visible === "visible") {
      hotspot.element.style.visibility = "visible";
      hotspot.element.style.display = "block";
      hotspot.element.style.cursor = "pointer";
    } else if (changes.visible === "hidden") {
	  hotspot.element.style.visibility = "hidden";
      hotspot.element.style.display = "none";
    }
  }
  //if (debug) console.log("setHotspotState - hotspot.active: " + hotspot.active);
  return true; // sucesso
}

function atualizarImagem(hs,img_src) {
 //if ( debug ) console.log("atualizarImagem: " + img_src ); 
 const el = document.getElementById(hs.id); // pega o <img> pelo id do hotspot
  if (el) {
    // força a troca da imagem
    el.src = img_src + "?t=" + Date.now();
	hs.img02 = img_src;
  }
}

// alterar a visibilidade do HOTSPOT
/*function setHotspotVisibility(hotName, state) {
  //Tornar invisível...
  const hotspot = sceneCurrent.hotspots.find(h => h.id === hotName);
  // atualiza a propriedade do JSON/objeto
  hotspot.visible = state;
  if ( state === "visible" ) {
	hotspot.active = true;
	// atualiza o elemento na tela, se existir
	hotspot.element.style.visibility = "visible";
	hotspot.element.style.display = "block";
	hotspot.element.style.cursor = "pointer";
    }
  else 
   {
   hotspot.active = false;
   // atualiza o elemento na tela, se existir
   hotspot.element.style.visibility = "hidden";
   hotspot.element.style.display = "none";
   }

}*/

// altera para Active = TRUE ou FALSE um conjunto de hotspots 
// enviadas por código
function setHotspotsActive(ids = [], isActive = true, cena = null) {
  if (!Array.isArray(ids) || ids.length === 0) return;

  // decide qual cena usar: a atual ou a informada
  const scene = cena
    ? (gameState.sceneCache instanceof Map
        ? gameState.sceneCache.get(cena)
        : gameState.sceneCache[cena])
    : gameState.sceneCurrent;

  if (!scene) {
    console.warn(`Cena "${cena || '(atual)'}" não encontrada.`);
    return;
  }

  ids.forEach(id => {
    const hotspot = scene.hotspots.find(h => h.id === id);
    if (hotspot) {
      hotspot.active = isActive;

      // se a cena for a atual, altera o cursor na tela
      if (scene === gameState.sceneCurrent) {
        const img = document.getElementById(id);
        if (img) {
          img.style.cursor = isActive ? "pointer" : "default";
        }
      }
    } else {
      console.warn(`Hotspot "${id}" não encontrado na cena "${cena || '(atual)'}".`);
    }
  });
}

/*function setHotspotsActive(ids = [], isActive = true, cena) {
  if (!Array.isArray(ids) || ids.length === 0) return;

  ids.forEach(id => {
    const hotspot = gameState.sceneCurrent.hotspots.find(h => h.id === id);
    if (hotspot) {
      hotspot.active = isActive;
	  const img = document.getElementById(id);
      if ((img)&&(isActive)) {
        img.style.cursor = "pointer";
      }
	  if ((img)&&(!isActive)) {
        img.style.cursor = "default";
      }
    }
  });
}*/

// ================= AUDIO ==============================

/*function playAudio(audioFile, callback, waitAudio) {
  if (!audioFile) {
    if (callback) callback(); // se não tiver áudio, chama o callback direto
    return;
  }

  const audio = new Audio(audioFile);
  audio.play().catch(err => {
    console.warn("Erro ao reproduzir áudio:", err);
    if (callback) callback();
  });
  
  // Se precisa esperar o áudio terminar para chamar o Modal
  if (waitAudio) {
	// Quando terminar, chama a função de callback (ex: show2Modal)
	// tranca a interação com o usuário 
    document.body.style.pointerEvents = "none";
	audio.addEventListener("ended", () => {
		//libera a interação com o usuário
		document.body.style.pointerEvents = "auto";
		document.addEventListener("click", advanceModal);
		if (callback) callback();
		});
    }
  // Caso contrário: áudio toca ao mesmo tempo que o modal.	
  else if (callback) {
	  document.addEventListener("click", advanceModal);
	  callback();
	  }
}*/

// ================= ANIMAÇÃO ==========================

/*function playAnimation(containerId, spriteUrl, frameWidth, frameHeight, frameCount, duration, posX, posY, mode = "FF") {
  const container = document.getElementById(containerId);

  // gera um id único baseado no spriteUrl
  const animId = "anim-" + btoa(spriteUrl).replace(/=/g, "");
  let anim = document.getElementById(animId);

  if (!anim) {
    // cria o div apenas se não existir
    anim = document.createElement("div");
    anim.id = animId;
    anim.style.position = "absolute";
    anim.style.left = posX + "px";
    anim.style.top = posY + "px";
    anim.style.width = frameWidth + "px";
    anim.style.height = frameHeight + "px";
    anim.style.backgroundImage = `url(${spriteUrl})`;
    anim.style.backgroundRepeat = "no-repeat";
    anim.style.zIndex = 9999;

    container.appendChild(anim);
  }

  const frameDuration = duration / frameCount;
  let frame = mode === "FF" ? 0 : frameCount - 1;

  // caso já tenha intervalos antigos, limpamos
  if (anim._interval) clearInterval(anim._interval);

  anim._interval = setInterval(() => {
    anim.style.backgroundPosition = `-${frame * frameWidth}px 0px`;

    if (mode === "FF") {
      frame++;
      if (frame >= frameCount) {
        clearInterval(anim._interval);
        anim._interval = null;
        // fixa no último frame (forward)
        anim.style.backgroundPosition = `-${(frameCount - 1) * frameWidth}px 0px`;
      }
    } else if (mode === "RW") {
      frame--;
      if (frame < 0) {
        clearInterval(anim._interval);
        anim._interval = null;
        // fixa no primeiro frame (rewind)
        anim.style.backgroundPosition = `0px 0px`;
      }
    }
  }, frameDuration);
}*/

function showAudioLabel(data, mensagem, position, tt) {
  return new Promise((resolve) => {
    const label = document.createElement("div");
	const texto = mensagem ?? data.audio;
    label.classList.add("audio");
    label.innerText = texto;

    const centerX = data.x + data.width / 2;
    let centerY = 0;
	const pos = position ?? data?.posAudio ?? "upper";
	
	if ( pos == "low" )
		// centro da metade inferior
		centerY = data.y + (data.height/2) + (data.height/4); 
	else 
	if ( pos == "center" )
		// centro da metade
		centerY = data.y + data.height / 2; 
	else 
	if ( pos == "lowest" )
		// centro da metade
		centerY = data.y + (data.height) + 10; 		
	else	    
		// centro da metade superior - padrao
		centerY = data.y + data.height / 4;
		
    label.style.left = `${centerX}px`;
    label.style.top = `${centerY}px`;
    label.style.transform = "translate(-50%, -50%)";

    document.getElementById("scene").appendChild(label);
    const tempo = tt ?? data?.timeAudio ?? 750;
    setTimeout(() => {
      label.remove();
      resolve(); // avisa que terminou
    }, tempo);
  });
}

// ============= DEBUG =====================

function debugConditionalOptions(character) {
  if (!character.conditionalDialogue) {
    console.log("Sem conditionalDialogue");
    return;
  }

  console.log("=== Condicionais do personagem:", character.name, "===");

  const condOptions = character.conditionalDialogue
    .filter(cond => {
      let hasStates = cond.requireStates ? cond.requireStates.every(c => gameState.statesFound.includes(c)) : true;
	  let hasClues = cond.requiresClues ? cond.requiresClues.every(c => gameState.cluesFound.includes(c)) : true;
      let hasCollectibles = cond.requiresCollectibles ? cond.requiresCollectibles.every(c => gameState.collectiblesFound.includes(c)) : true;
      return hasClues && hasCollectibles && hasStates;
    })
    .map(cond => ({
      id: cond.id || `cond_${Math.random()}`, // garante id único
      messages: cond.messages || [],
      jump: cond.jump || null
    }));

  console.log("condOptions filtradas:");
  condOptions.forEach(opt => {
    const executed = gameState.executedConditionals.has(opt.id) ? "✅ executada" : "❌ não executada";
    console.log(`ID: ${opt.id}, Jump: ${opt.jump}, mensagens:`, opt.messages, executed);
  });
}


function printAllScenes() {
  if (gameState.sceneCache instanceof Map) {
    gameState.sceneCache.forEach((scene, name) => {
      console.log(`Cena: ${name}`);
      console.log(JSON.stringify(scene, null, 2)); // identado
    });
  } else {
    for (const name in gameState.sceneCache) {
      console.log(`Cena: ${name}`);
      console.log(JSON.stringify(gameState.sceneCache[name], null, 2));
    }
  }
}


// ==== Funções utilitárias para serializar Map/Set ====
function serializeGameState() {
  return JSON.stringify({
    ...gameState,
    // transforma Map em array de entries
    sceneCache: Array.from(gameState.sceneCache.entries()),
    // transforma Set em array
    executedConditionals: Array.from(gameState.executedConditionals)
  });
}

function deserializeGameState(serialized) {
  const raw = JSON.parse(serialized);

  // Reconstrói Map
  const newSceneCache = new Map(raw.sceneCache);

  // Reconstrói Set
  const newExecutedConditionals = new Set(raw.executedConditionals);

  // Atualiza gameState
  gameState = {
    ...raw,
    sceneCache: newSceneCache,
    executedConditionals: newExecutedConditionals
  };

  // Atualiza a cena atual (Map garante referência válida)
  if (gameState.sceneCurrent && typeof gameState.sceneCurrent === 'string') {
    gameState.sceneCurrent = gameState.sceneCache.get(gameState.sceneCurrent) || null;
  }
}

function saveSlot(slot) {
  localStorage.setItem(`saveSlot_${slot}`, serializeGameState());
  updateSaveSlotsUI();
  showSaveMessage(`Jogo salvo no slot ${slot}`, "#8fd18f");
}

function loadSlot(slot) {
  const data = localStorage.getItem(`saveSlot_${slot}`);
  if (!data) {
    alert(`Nenhum jogo salvo no slot ${slot}`);
    return;
  }

  deserializeGameState(data);

  if (gameState.sceneCurrent) {
    renderScene(gameState.sceneCurrent);
  }

  showSaveMessage(`Jogo carregado do slot ${slot}`, "#8fd18f");
}

function updateSaveSlotsUI() {
  const slots = document.querySelectorAll(".save-slot");

  slots.forEach(slotEl => {
    const slot = slotEl.dataset.slot;
    const statusEl = document.getElementById(`slot-status-${slot}`);
    const saved = localStorage.getItem(`saveSlot_${slot}`);

    if (saved) {
      statusEl.innerText = "Ocupado";
      slotEl.classList.remove("slot-empty");
      slotEl.classList.add("slot-occupied");
    } else {
      statusEl.innerText = "Vazio";
      slotEl.classList.remove("slot-occupied");
      slotEl.classList.add("slot-empty");
    }
  });
}

function openSaveModal() {
  const overlay = document.getElementById("save-modal-overlay");
  updateSaveSlotsUI();
  overlay.style.display = "block";
}

function closeSaveModal() {
  document.getElementById("save-modal-overlay").style.display = "none";
}

// 🔥 clique fora fecha
function setupModalClose() {
  const overlay = document.getElementById("save-modal-overlay");
  const modal = document.getElementById("save-modal-container");

  overlay.addEventListener("click", () => {
    closeSaveModal();
  });

  modal.addEventListener("click", (e) => {
    e.stopPropagation(); // impede fechar ao clicar dentro
  });
}

function initSaveLoadUI() {
  document.querySelectorAll(".save-action").forEach(btn => {
    btn.addEventListener("click", () => {
      saveSlot(btn.dataset.slot);
    });
  });

  document.querySelectorAll(".load-action").forEach(btn => {
    btn.addEventListener("click", () => {
      loadSlot(btn.dataset.slot);
    });
  });

  document.getElementById("save-button").addEventListener("click", openSaveModal);

  setupModalClose();
}

function showSaveMessage(text, color = "#ccc") {
  const el = document.getElementById("save-modal-message");
  el.innerText = text;
  el.style.color = color;

  // limpa depois de um tempo
  setTimeout(() => {
    el.innerText = "";
  }, 2500);
}



document.addEventListener("keydown", (e) => {
  if (e.key === "F1") {
    e.preventDefault(); // evita abrir ajuda do browser

    debugMode = !debugMode;

    const debugElements = document.querySelectorAll(".debug-link");
    debugElements.forEach(el => {
      el.style.display = debugMode ? "block" : "none";
    });
  }
});