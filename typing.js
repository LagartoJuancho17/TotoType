let words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' '); /*Esto hace que divida el STRING en un array*/
let wordsCount = words.length;
const gameTime = 20 * 1000; //Tiempo de juego
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

const audioFiles = [
  '/audios/audio1.mp3',
  '/audios/audio2.mp3',
  '/audios/audio3.mp3',
  '/audios/audio4.mp3',
  '/audios/audio5.mp3',
]

const wordsPortuguese = 'o relogio cantava cancaoes de papel enquanto as nuvens discutiam sobre o preco das sandias invisiveis um peixe com chapeu de bolinhas tentava abrir uma porta que nunca existiu mas o vento sussurrava segredos de cores no topo de uma montanha plana os sapatos dancavam com entusiasmo sobre uma poca de fogo frio os caracois velozes apostavam corridas contra sombras distraidas enquanto uma arvore dormindo sonhava em voar as palavras derretidas caiam do ceu como chuva de tinta e um espelho sem reflexo perguntava por que os guarda chuvas nao sabiam nadar no ar'.split(' ');
const wordsEnglish = words;
const wordsSpanish = 'el reloj cantaba canciones de papel mientras las nubes discutian sobre el precio de las sandias invisibles un pez con sombrero de lunares intentaba abrir una puerta que nunca existio pero el viento le susurraba secretos de colores en la cima de una montaña plana los zapatos bailaban con entusiasmo sobre un charco de fuego frio los caracoles veloces apostaban carreras contra sombras distraidas mientras un arbol dormido soñaba con volar las palabras derretidas caian del cielo como lluvia de tinta y un espejo sin reflejo preguntaba por que los paraguas no sabian nadar en el aire'.split(' ');

document.getElementById('portuguese').addEventListener('click', () => {
    changeLanguage(wordsPortuguese);
    console.log("Portuguses")
});

document.getElementById('english').addEventListener('click', () => {
    changeLanguage(wordsEnglish);
    console.log("Ingles")
});

document.getElementById('spanish').addEventListener('click', () => {
    changeLanguage(wordsSpanish);
    console.log("Español")
});

function changeLanguage(newWords) {
    words = newWords;
    wordsCount = words.length;
    newGame();
}


/*PUNTAJES WPM*/
let scoreCount = 0; //Suma de los intentos

function updateScoreboard(wpm) {
    scoreCount++;
    const scoreboardBody = document.getElementById('scoreboard-body');
    const newRow = document.createElement('tr'); /*tengo que crear una fila en una tabla */
    newRow.innerHTML = `<td>${scoreCount}</td><td>${wpm.toFixed(2)}</td>`;/*Agrego el intento y despues el wpm*/
    scoreboardBody.appendChild(newRow);
}


// Función para reproducir un audio al azar
function playRandomAudio() {
    // Elegir un índice aleatorio del arreglo
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomAudio = new Audio(audioFiles[randomIndex]);
    randomAudio.play();
}

function playClickSound(){
  clickSound.play();
}

/*FUNCIONES PARA CREAR Y ELIMINAR CLASES */

function addClass(el, name) {
  el.classList.add(name);
}
function removeClass(el, name) {
  el.className = el.className.replace(name, '');
}


/*FUNCION PARA DAR PALABRA RANDOM */
function randomWord() {
  const randomIndex = Math.ceil(Math.random() * wordsCount); //.ceil redondea para arriba
  return words[randomIndex - 1]; //Retorna la palabra al final del array 
}

/*FORMATO DE LA PALABRA */ 
function formatWord(word) {
  return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`; //Split divide el string en un array y join lo une con un string 
}


function newGame() {
    console.log('Juego reseteado y listo para empezar');
    
    //Elimna la clase "over" antes de reiniicar
    removeClass(document.getElementById('game'),'over')
  // Reiniciar elementos de la interfaz
    const wordsContainer = document.getElementById('words');
    wordsContainer.innerHTML = '';
    wordsContainer.style.marginTop = '0px';

  // Crear nuevas palabras
  for (let i = 0; i < 200; i++) {
    wordsContainer.innerHTML += formatWord(randomWord());
  }

  // Reiniciar estado
  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('.letter'), 'current');
  document.getElementById('info').innerHTML = (gameTime / 1000) + ''; // Convertir segundos a minutos y segundos para mostrar en la interfaz 

  // Reiniciar variables globales
  clearInterval(window.timer); // Detener el temporizador
  window.timer = null; // Reiniciar el temporizador
  window.gameStart = null; 
  window.pauseTime = 0; // Reiniciar el tiempo de pausa 

}

function newGameWPM() {
    console.log('Juego reseteado y listo para empezar en modo WPM');
    
    // Eliminar la clase "over" antes de reiniciar 
    removeClass(document.getElementById('game'), 'over'); 
    
    // Reiniciar estado
    const wordsContainer = document.getElementById('words'); 
    wordsContainer.style.marginTop = '0px';
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    document.getElementById('info').innerHTML = (gameTime / 1000) + '';

    // Reiniciar variables globales
    clearInterval(window.timer);
    window.timer = null;
    window.gameStart = null;
    window.pauseTime = 0;
}


function getWpm() {
  const words = [...document.querySelectorAll('.word')]; // Obtener todas las palabras
  const lastTypedWord = document.querySelector('.word.current'); // Obtener la última palabra escrita
  const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1; // Obtener el índice de la última palabra escrita
  const typedWords = words.slice(0, lastTypedWordIndex); // Obtener todas las palabras escritas hasta la última palabra escrita 
  const correctWords = typedWords.filter(word => { 
    const letters = [...word.children]; 
    const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect')); // Obtener todas las letras incorrectas
    const correctLetters = letters.filter(letter => letter.className.includes('correct'));  // Obtener todas las letras correctas
    return incorrectLetters.length === 0 && correctLetters.length === letters.length; // Verificar si todas las letras son correctas 
  });
  return correctWords.length / gameTime * 60000; // Calcular las palabras por minuto (WPM)
}


/************************************************************************ */
function gameOver() {
  clearInterval(window.timer); // Detener el temporizador
  addClass(document.getElementById('game'), 'over'); // Agregar la clase "over" al div game
  const result = getWpm(); // Calcular el WPM
  document.getElementById('info').innerHTML = `WPM: ${result.toFixed(2)}`; // Mostrar el WPM en el div info 
  
  // Ocultar el div game y mostrar la pantalla de fin de juego en su lugar
  const gameDiv = document.getElementById('game');
  const gameOverScreen = document.getElementById('game-over');
  const header = document.getElementById('header');
  const languageButtons = document.getElementById('language-buttons');
  const scoreboard = document.getElementById('scoreboard');
  
  // Ajustar la posición y tamaño del game-over para que coincida con game
  gameOverScreen.style.top = gameDiv.offsetTop + 'px';
  gameOverScreen.style.left = gameDiv.offsetLeft + 'px';
  gameOverScreen.style.width = gameDiv.offsetWidth + 'px';
  gameOverScreen.style.height = gameDiv.offsetHeight + 'px';
  
  addClass(gameDiv, 'hidden'); 
  document.getElementById('final-wpm').innerHTML = `WPM: ${result.toFixed(2)}`;
  removeClass(gameOverScreen, 'hidden');
  addClass(gameOverScreen, 'visible');
  
  // Ocultar el header
  header.style.display = 'none';
  languageButtons.style.display = 'none';
  // Mostrar el scoreboard
  scoreboard.style.display = 'block';
  
  // Actualizar la tabla de puntajes
  updateScoreboard(result); 
}

document.getElementById('newGameBtn').addEventListener('click', () => {
  clearInterval(window.timer); // Detener el temporizador
  window.timer = null;
  newGame(); // Reiniciar el juego
});

// Añadir evento para el botón de reiniciar
document.getElementById('restartBtn').addEventListener('click', () => {
  const gameDiv = document.getElementById('game');
  const gameOverScreen = document.getElementById('game-over');
  const header = document.getElementById('header');
  const languageButtons = document.getElementById('language-buttons');
  const scoreboard = document.getElementById('scoreboard');
  
  removeClass(gameOverScreen, 'visible');
  addClass(gameOverScreen, 'hidden');
  removeClass(gameDiv, 'hidden');
  
  // Mostrar el header
  header.style.display = 'block';
  languageButtons.style.display = 'flex';
  // Ocultar el scoreboard
  scoreboard.style.display = 'none';
  
  newGame();
});

document.getElementById('newGameBtn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('levelModeBtn').classList.remove('active');
    clearInterval(window.timer);
    window.timer = null;
    newGameWPM();
});

document.getElementById('levelModeBtn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('newGameBtn').classList.remove('active');
    startLevelMode();
});

/************************************************************************ */
document.getElementById('game').addEventListener('keyup', ev => {

  playRandomAudio();
  
  const key = ev.key;
  const currentWord = document.querySelector('.word.current');
  const currentLetter = document.querySelector('.letter.current');
  const expected = currentLetter?.innerHTML || ' ';
  const isLetter = key.length === 1 && key !== ' ';
  const isSpace = key === ' ';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord.firstChild;

  if (document.querySelector('#game.over')) {
    return;
  }

  console.log({key,expected});

  if (!window.timer && isLetter) {
    window.timer = setInterval(() => {
      if (!window.gameStart) {
        window.gameStart = (new Date()).getTime();
      }
      const currentTimeFF = (new Date()).getTime();
      const msPassed = currentTimeFF - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      const sLeft = Math.round((gameTime / 1000) - sPassed);
      if (sLeft <= 0) {
        gameOver();
        return;
      }
      document.getElementById('info').innerHTML = sLeft + '';
    }, 1000);
  }

  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      removeClass(currentLetter, 'current');
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, 'current');
      }
    } else {
      // No agregar letras incorrectas al final de la palabra
      if (key !== expected) {
        return;
      }
      const incorrectLetter = document.createElement('span');
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = 'letter incorrect extra';
      currentWord.appendChild(incorrectLetter);
    }
  }

  if (isSpace) {
    if (expected !== ' ') {
      const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
      lettersToInvalidate.forEach(letter => {
        addClass(letter, 'incorrect');
      });
    }
    removeClass(currentWord, 'current');
    addClass(currentWord.nextSibling, 'current');
    if (currentLetter) {
      removeClass(currentLetter, 'current');
    }
    addClass(currentWord.nextSibling.firstChild, 'current');
    levelUp();
  }

  if (isBackspace) {
    if (currentLetter && isFirstLetter) {
      // make prev word current, last letter current
      removeClass(currentWord, 'current');
      addClass(currentWord.previousSibling, 'current');
      removeClass(currentLetter, 'current');
      addClass(currentWord.previousSibling.lastChild, 'current');
      removeClass(currentWord.previousSibling.lastChild, 'incorrect');
      removeClass(currentWord.previousSibling.lastChild, 'correct');
    }
    if (currentLetter && !isFirstLetter) {
      // move back one letter, invalidate letter
      removeClass(currentLetter, 'current');
      addClass(currentLetter.previousSibling, 'current');
      removeClass(currentLetter.previousSibling, 'incorrect');
      removeClass(currentLetter.previousSibling, 'correct');
    }
    if (!currentLetter) {
      addClass(currentWord.lastChild, 'current');
      removeClass(currentWord.lastChild, 'incorrect');
      removeClass(currentWord.lastChild, 'correct');
    }
  }

  // move lines / words
  if (currentWord.getBoundingClientRect().top > 250) {
    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');
    words.style.marginTop = (margin - 35) + 'px';
  }

});

document.getElementById('newGameBtn').addEventListener('click', () => {
    clearInterval(window.timer);
    window.timer = null;
  newGame();
});

newGame();



/*NIVEL DE JUEGO */
/*
let level = 1;
let levelScore = 0;
let levelTime = 15000; // Tiempo inicial en milisegundos
// */
let cantidadPalabrasPorJuego = 10;

function startLevelMode() {
    console.log("se ejecuta la funcion startLevelMode");
    level = 1;
    levelScore = 0;
    levelTime = 15000; // Reiniciar el tiempo inicial
    startNewLevel();
}

function startNewLevel() {
  console.log("se ejecuta la funcion start New Level");
  const wordsContainer = document.getElementById('words');
  wordsContainer.innerHTML = '';
  wordsContainer.style.marginTop = '0px';

  // Generar nuevas palabras
  for (let i = 0; i < cantidadPalabrasPorJuego; i++) {
    wordsContainer.innerHTML += formatWord(randomWord());
  }

  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('.letter'), 'current');
  document.getElementById('info').innerHTML = `Nivel: ${level} - Tiempo: ${(levelTime / 1000)}`;
  clearInterval(window.timer);

  window.timer = setInterval(() => {
    if (!window.gameStart) {
      window.gameStart = (new Date()).getTime();
    }
    const currentTime = (new Date()).getTime();
    const msElapsed = currentTime - window.gameStart;
    const secondsElapsed = Math.round(msElapsed / 1000);
    const secondsRemaining = Math.max(Math.round((levelTime / 1000) - secondsElapsed), 0); // Asegurarse de que no sea negativo
    document.getElementById('info').innerHTML = `Nivel: ${level} - Tiempo: ${secondsRemaining}`;
    if (secondsRemaining <= 0) {
      console.log("secondsRemaining: " + secondsRemaining);
      console.log("LevelTime: " + levelTime);
      console.log("secondsElapsed: " + secondsElapsed);
      clearInterval(window.timer); // Asegurarse de detener el temporizador
      gameOverLevelMode();
      return;
    }
  }, 1000);

  // Enfocar el juego para permitir escribir
  setTimeout(() => {
    document.getElementById('game').focus();
  }, 100);
}

function startNextLevel() {
  levelTime = Math.max(levelTime - 1000, 5000); // Reducir el tiempo en 3 segundos por nivel, mínimo 5 segundos 
  window.gameStart = null; // Reiniciar el tiempo de inicio del juego
  startNewLevel();
}

function levelUp() {
  if (checkLevelCompletion()) {
    console.log("Se subio el lvl");
    levelScore += 100 + level; // Sumar 100 puntos más el nivel actual
    level++; // Incrementar el nivel
    console.log("Nivel actual:" + level);
    startNextLevel(); // Iniciar el siguiente nivel
  }
}

function gameOverLevelMode() {
    console.log("Se ejecuta la funcion gameOverLevelMode")
    clearInterval(window.timer);
    addClass(document.getElementById('game'), 'over');
    document.getElementById('info').innerHTML = `Score: ${levelScore}`;
    
    // Ocultar el div game y mostrar la pantalla de fin de nivel en su lugar
    const gameDiv = document.getElementById('game');
    const levelEndScreen = document.getElementById('level-end');
    const header = document.getElementById('header');
    const languageButtons = document.getElementById('language-buttons');
    
    // Ajustar la posición y tamaño del level-end para que coincida con game
    levelEndScreen.style.top = gameDiv.offsetTop + 'px';
    levelEndScreen.style.left = gameDiv.offsetLeft + 'px';
    levelEndScreen.style.width = gameDiv.offsetWidth + 'px';
    levelEndScreen.style.height = gameDiv.offsetHeight + 'px';
    
    addClass(gameDiv, 'hidden');
    document.getElementById('current-score').innerHTML = `Score: ${levelScore}`;
    levelEndScreen.style.display = 'block';
    removeClass(levelEndScreen, 'hidden');
    addClass(levelEndScreen, 'visible');
    
    // Ocultar el header y los botones de idioma
    header.style.display = 'none';
    languageButtons.style.display = 'none';
}

document.getElementById('levelModeBtn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('newGameBtn').classList.remove('active');
    startLevelMode();
});

function startNextLevelHandler() {
    const levelEndScreen = document.getElementById('level-end');
    const gameDiv = document.getElementById('game');
    const header = document.getElementById('header');
    const languageButtons = document.getElementById('language-buttons');

    // Ocultar la pantalla de fin de nivel
    levelEndScreen.style.display = 'none';
    removeClass(levelEndScreen, 'visible');
    addClass(levelEndScreen, 'hidden');

    // Mostrar el juego
    removeClass(gameDiv, 'hidden');

    // Mostrar el header y los botones de idioma
    header.style.display = 'block';
    languageButtons.style.display = 'flex';

    // Iniciar el siguiente nivel
    startNextLevel();
}

document.getElementById('next-level-button').removeEventListener('click', startNextLevelHandler);
document.getElementById('next-level-button').addEventListener('click', startNextLevelHandler);

// Pase de nivel si se presiona el espacio
document.getElementById('game').addEventListener('keyup', ev => {
    const isSpace = ev.code === 'Space';
    if (isSpace) {
        if (document.querySelector('.word.current') === null) {
            levelUp();
        } else if (checkLevelCompletion()) {
            levelUp();
        }
    }
});

function checkLevelCompletion() {
    // Verificar si todas las palabras han sido escritas correctamente
    const words = document.querySelectorAll('.word');
    for (let word of words) {
        const letters = word.querySelectorAll('.letter');
        for (let letter of letters) {
            if (!letter.classList.contains('correct')) {
                return false;
            }
        }
    }
    console.log("todo completo");
    return true;
}

document.getElementById('next-level-button').addEventListener('click', function() {
    console.log("clickeo boton next-level");
    const levelEndScreen = document.getElementById('level-end');
    const gameDiv = document.getElementById('game');
    const header = document.getElementById('header');
    const languageButtons = document.getElementById('language-buttons');

    // Ocultar la pantalla de fin de nivel
    levelEndScreen.style.display = 'none';
    removeClass(levelEndScreen, 'visible');
    addClass(levelEndScreen, 'hidden');

    // Mostrar el juego
    removeClass(gameDiv, 'hidden');
    // Mostrar el header y los botones de idioma
    header.style.display = 'block';
    languageButtons.style.display = 'flex';
    newGame();
    startLevelMode();

    // Enfocar el juego para permitir escribir
    gameDiv.focus();
});
 