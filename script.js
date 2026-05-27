const firebaseConfig = {
  apiKey: "AIzaSyAtCkJLZVrECRr69i06a0H8t3EJb7eUShY",
  authDomain: "anti-block-senac-tic-tac-toe.firebaseapp.com",
  databaseURL: "https://anti-block-senac-tic-tac-toe-default-rtdb.firebaseio.com",
  projectId: "anti-block-senac-tic-tac-toe",
  storageBucket: "anti-block-senac-tic-tac-toe.firebasestorage.app",
  messagingSenderId: "892772968817",
  appId: "1:892772968817:web:f89c7551c696dbbf412ed0"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


const lobby = document.getElementById('lobby');
const gameScreen = document.getElementById('game-screen');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const salaIdElement = document.getElementById('sala-id');
const seuSimboloElement = document.getElementById('seu-simbolo');
const resetBtn = document.getElementById('reset-btn');

// Estado do Jogo Local
let salaId = null;
let meuSimbolo = null; 
let turnoAtual = 'X';
let tabuleiro = ["","","","","","","","",""];
let jogoAtivo = false;

// EVENTOS DE ENTRADA NA SALA
document.getElementById('btn-criar-sala').addEventListener('click', criarSala);
document.getElementById('btn-entrar-sala').addEventListener('click', () => {
    const id = document.getElementById('input-sala').value.trim();
    if(id) entrarNaSala(id);
});

// FUNÇÃO PARA CRIAR SALA (Jogador 1 - X)
function criarSala() {
    salaId = Math.floor(1000 + Math.random() * 9000).toString(); // Gera código de 4 dígitos
    meuSimbolo = 'X';
    
    // Salva a estrutura inicial no Firebase
    database.ref('salas/' + salaId).set({
        tabuleiro: ["","","","","","","","",""],
        turno: 'X',
        status: 'aguardando',
        jogadorX: true,
        jogadorO: false
    }).then(() => {
        iniciarInterfaceJogo();
    });
}

// FUNÇÃO PARA ENTRAR EM SALA EXISTENTE (Jogador 2 - O)
function entrarNaSala(id) {
    salaId = id;
    
    database.ref('salas/' + salaId).once('value', (snapshot) => {
        if(!snapshot.exists()) {
            alert('Sala não encontrada!');
            return;
        }
        
        const dadosSala = snapshot.val();
        
        if(dadosSala.jogadorO) {
            alert('Esta sala já está cheia!');
            return;
        }
        
        meuSimbolo = 'O';
        // Atualiza no Firebase informando que o jogador O entrou e o jogo pode começar
        database.ref('salas/' + salaId).update({
            jogadorO: true,
            status: 'jogando'
        }).then(() => {
            iniciarInterfaceJogo();
        });
    });
}

// ATIVA A ESCUTA EM TEMPO REAL DO BANCO
function iniciarInterfaceJogo() {
    lobby.style.display = 'none';
    gameScreen.style.display = 'block';
    salaIdElement.textContent = salaId;
    seuSimboloElement.textContent = meuSimbolo;
    seuSimboloElement.className = meuSimbolo; // Adiciona cor ao texto do símbolo

    // Conecta o ouvinte do Firebase: qualquer mudança na nuvem atualiza a tela
    database.ref('salas/' + salaId).on('value', (snapshot) => {
        if(!snapshot.exists()) return;
        const dados = snapshot.val();
        
        tabuleiro = dados.tabuleiro;
        turnoAtual = dados.turno;
        
        // Atualiza o visual das células
        cells.forEach((cell, index) => {
            cell.textContent = tabuleiro[index];
            cell.className = 'cell'; // Limpa classes antigas
            if(tabuleiro[index]) cell.classList.add(tabuleiro[index]);
        });

        // Gerencia os estados do jogo
        if(dados.status === 'aguardando') {
            statusElement.textContent = "Aguardando o Jogador 2 entrar...";
            jogoAtivo = false;
        } else if (dados.status === 'jogando') {
            jogoAtivo = true;
            if(turnoAtual === meuSimbolo) {
                statusElement.textContent = "Seu turno! Jogue.";
            } else {
                statusElement.textContent = `Turno do oponente (${turnoAtual})...`;
            }
        } else if (dados.status === 'vitoria') {
            statusElement.innerHTML = `Jogador <span class="${dados.vencedor}">${dados.vencedor}</span> Venceu! 🎉`;
            jogoAtivo = false;
        } else if (dados.status === 'empate') {
            statusElement.textContent = "O jogo empatou! 😮";
            jogoAtivo = false;
        }
    });
}

// CLIQUE NAS CÉLULAS DO TABULEIRO
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        
        // Só joga se for o seu turno, a casa estiver vazia e o jogo ativo
        if(!jogoAtivo || turnoAtual !== meuSimbolo || tabuleiro[index] !== "") return;
        
        tabuleiro[index] = meuSimbolo;
        
        // Passa o turno
        const proximoTurno = meuSimbolo === 'X' ? 'O' : 'X';
        
        // Verifica localmente se essa jogada deu vitória ou empate
        let statusJogo = 'jogando';
        let vencedor = '';
        
        const condicoesVitoria = [
            [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
        ];

        for (let i = 0; i < condicoesVitoria.length; i++) {
            const [a, b, c] = condicoesVitoria[i];
            if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
                statusJogo = 'vitoria';
                vencedor = meuSimbolo;
                break;
            }
        }

        if (statusJogo !== 'vitoria' && !tabuleiro.includes("")) {
            statusJogo = 'empate';
        }

        // Envia todas as atualizações para o Firebase de uma vez só
        database.ref('salas/' + salaId).update({
            tabuleiro: tabuleiro,
            turno: proximoTurno,
            status: statusJogo,
            vencedor: vencedor
        });
    });
});

// BOTAÃO DE REINICIAR (Limpa a sala no Firebase para recomeçar)
resetBtn.addEventListener('click', () => {
    database.ref('salas/' + salaId).update({
        tabuleiro: ["","","","","","","","",""],
        turno: 'X',
        status: 'jogando',
        vencedor: ''
    });
});