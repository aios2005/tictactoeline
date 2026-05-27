# ❌ Jogo da Velha Online - Anti Block ⭕

Uma aplicação web estática, leve e responsiva de Jogo da Velha (*Tic-Tac-Toe*) focada em partidas *multiplayer* em tempo real. O projeto foi estruturado especificamente para contornar restrições comuns em redes institucionais (como isolamento de pontos de acesso e bloqueios de firewalls de jogos locais).

Hospedado gratuitamente no **GitHub Pages** e alimentado pelo **Firebase Realtime Database**.

---

## 🚀 Funcionalidades

- **Multiplayer em Tempo Real:** Conexão instantânea entre dois dispositivos através de WebSockets (via Firebase).
- **Sistema de Salas:** Criação de partidas dinâmicas através de um código numérico de 4 dígitos (ex: `1234`), permitindo que os jogadores entrem na mesma sessão facilmente.
- **Design Totalmente Responsivo:** Desenvolvido com CSS Grid e Flexbox, adaptando-se perfeitamente a ecrãs de computadores, portáteis e smartphones.
- **Bypass de Bloqueios de Rede:** Como o tráfego é processado como requisições HTTPS normais para a cloud, o jogo evita o bloqueio de conexões diretas (Peer-to-Peer) em redes escolares ou corporativas.
- **Deploy Automatizado:** Configurado com Integração/Implantação Contínua (CI/CD) nativa do GitHub Pages. Qualquer alteração enviada para o repositório reflete-se no site em poucos segundos.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza o conceito moderno de separação entre a interface (*Front-end*) e o estado da aplicação (*Back-end/BaaS*):

- **Front-end:** HTML5 (Estrutura semântica), CSS3 (Estilização moderna e responsiva) e JavaScript Vanilla (Lógica local do jogo).
- **Back-end as a Service (BaaS):** [Firebase Realtime Database](https://firebase.google.com/) para sincronização de dados JSON em tempo real.
- **Hospedagem:** [GitHub Pages](https://pages.github.com/) para servir os arquivos estáticos de forma global e gratuita.

---

## 📂 Estrutura do Projeto

```text
├── index.html       # Estrutura do lobby de salas e do tabuleiro do jogo
├── style.css        # Estilização visual, cores temáticas e regras de responsividade
├── script.js       # Inicialização do Firebase, gestão do estado da sala e lógica de vitória
└── README.md        # Documentação do projeto
```

🔧 Como Rodar o Projeto Localmente
Se quiseres clonar o repositório e testar as alterações na tua máquina:

Clona o repositório:

Bash
git clone [https://github.com/aios2005/tictactoeline](https://github.com/aios2005/tictactoeline.git)

Configura o teu próprio Firebase (Opcional):

Caso queiras testar numa infraestrutura tua, cria um projeto no Console do Firebase, ativa o Realtime 
Database em modo de teste e substitui o objeto firebaseConfig dentro do ficheiro script.js:

```
JavaScript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    databaseURL: "SUA_DATABASE_URL",
    ...
};
```

Executa a aplicação:

Basta abrir o arquivo index.html diretamente em qualquer navegador de internet, ou utilizar uma extensão como o Live Server no VS Code.

🔄 Fluxo de Atualização (CI/CD)
Este repositório está configurado para atualizar automaticamente. Sempre que fizeres alterações no código local e enviares para o GitHub, o site público será atualizado:

Bash
git add .
git commit -m "Minha nova funcionalidade ou correção"
git push origin main
Dica de Teste: Se as alterações não aparecerem imediatamente no teu telemóvel ou PC após o deploy, limpa o cache do navegador ou abre o link numa aba anónima.

📝 Licença
Este projeto é de código aberto e livre para fins educacionais e de estudo. Sente-te à vontade para clonar, modificar e criar a tua própria versão (como um Lig-4, Batalha Naval, etc.).

Desenvolvido como um desafio prático de lógica de programação multiplayer e arquitetura de redes.