
/* ══════════════════════════════════════════════════════════════
   ESTADO DA APLICAÇÃO (STATE)

   O "state" é um objeto que guarda informações temporárias
   sobre onde o usuário está navegando.
   Ele é atualizado conforme o usuário navega pelo app.
══════════════════════════════════════════════════════════════ */
let state = {
  learnPath: null,    // Guarda o caminho atual em Resumos: { materiaId, topicoId, subtId }
  exPath: null,       // Guarda o caminho atual em Exercícios
  quizState: null,    // Guarda o estado do quiz em andamento: { questions, current, score, answered }
  currentView: 'home' // Qual tela está aberta: 'home', 'learn' ou 'exercises'
};


/* ══════════════════════════════════════════════════════════════
   FUNÇÕES DE ARMAZENAMENTO LOCAL (localStorage)

   O localStorage é como um "HD" do navegador: guarda dados
   mesmo depois de fechar o browser. Os dados ficam no
   computador do usuário.
══════════════════════════════════════════════════════════════ */

/**
 * Retorna o usuário logado atualmente.
 * JSON.parse converte o texto salvo de volta para um objeto JS.
 * Se não houver usuário salvo, retorna null.
 */
function getUser() {
  return JSON.parse(localStorage.getItem('lt_user') || 'null');
}

/**
 * Salva o usuário no localStorage.
 * JSON.stringify converte o objeto JS em texto para ser salvo.
 */
function saveUser(u) {
  localStorage.setItem('lt_user', JSON.stringify(u));
}

/**
 * Retorna os dados de progresso do usuário logado
 * (XP, aulas feitas, exercícios, streak, lista de aulas concluídas).
 * Se não existir, cria um objeto com valores iniciais zerados.
 */
function getUserData() {
  const u = getUser();
  if (!u) return null;
  // Tenta buscar os dados do usuário; se não existir, usa os valores padrão
  return JSON.parse(
    localStorage.getItem('lt_data_' + u.login) ||
    JSON.stringify({ xp: 0, lessons: 0, exercises: 0, streak: 1, done: [] })
  );
}

/**
 * Salva os dados de progresso do usuário no localStorage.
 */
function saveUserData(d) {
  const u = getUser();
  if (!u) return;
  localStorage.setItem('lt_data_' + u.login, JSON.stringify(d));
}


/* ══════════════════════════════════════════════════════════════
   AUTENTICAÇÃO
══════════════════════════════════════════════════════════════ */

/**
 * Função chamada ao clicar em "Cadastrar e Entrar".
 * Lê os campos do formulário, valida e salva o usuário.
 */
function register() {
  // .value.trim() pega o texto do campo e remove espaços das pontas
  const name  = document.getElementById('reg-name').value.trim();
  const login = document.getElementById('reg-login').value.trim();
  const pass  = document.getElementById('reg-pass').value.trim();
  const err   = document.getElementById('auth-err'); // Elemento de mensagem de erro

  // Se algum campo estiver vazio, mostra erro e para a função (return = sai da função)
  if (!name || !login || !pass) {
    err.textContent = 'Preencha todos os campos.';
    err.style.display = 'block';
    return;
  }

  // Salva o usuário e inicia o app
  saveUser({ name, login, pass });
  err.style.display = 'none';
  initApp();
}

/**
 * Faz logout: remove o usuário do localStorage e volta para a tela de auth.
 */
function logout() {
  localStorage.removeItem('lt_user');
  document.getElementById('app-view').style.display = 'none';
  document.getElementById('app-view').classList.remove('active');
  document.getElementById('auth-view').style.display = 'flex';
}


/* ══════════════════════════════════════════════════════════════
   INICIALIZAÇÃO DO APP
══════════════════════════════════════════════════════════════ */

/**
 * Inicializa o app após login ou quando já há usuário salvo.
 * Esconde a tela de auth, mostra o app, e renderiza a tela inicial.
 */
function initApp() {
  const u = getUser();
  if (!u) {
    document.getElementById('auth-view').style.display = 'flex';
    return;
  }

  // Troca de tela: esconde auth, mostra app
  document.getElementById('auth-view').style.display = 'none';
  document.getElementById('app-view').style.display = 'flex';
  document.getElementById('app-view').classList.add('active');

  updateUI();           // Atualiza nome, XP, etc.
  renderMateriasHome(); // Monta a lista de matérias na home
  showView('home');     // Exibe a tela inicial
}

/**
 * Atualiza todos os elementos visuais da interface com os dados
 * mais recentes do usuário (nome, XP, nível, progresso, etc.).
 */
function updateUI() {
  const u = getUser();
  const d = getUserData();
  if (!u || !d) return;

  const xp = d.xp || 0;
  const level = Math.floor(xp / 100) + 1;  // Cada 100 XP = 1 nível
  const xpInLevel = xp % 100;               // XP restante dentro do nível atual
  const pct = xpInLevel + '%';              // Porcentagem da barra de progresso

  // Atualiza cada elemento do HTML com getElementById
  document.getElementById('sb-name').textContent = u.name.split(' ')[0]; // Só o primeiro nome
  document.getElementById('sb-xp').textContent = `${xp} XP · Nível ${level}`;
  document.getElementById('sb-xp-bar').style.width = pct;         // Barra de XP do menu
  document.getElementById('topbar-xp').textContent = xp;          // XP no topo
  document.getElementById('home-xp').textContent = xp;            // Card de XP
  document.getElementById('home-level').textContent = level;      // Nível exibido
  document.getElementById('home-xp-next').textContent = (100 - xpInLevel) + ' XP próx.';
  document.getElementById('home-xp-bar').style.width = pct;       // Barra de XP da home
  document.getElementById('home-streak').textContent = d.streak || 1;
  document.getElementById('home-lessons').textContent = d.lessons || 0;
  document.getElementById('home-exercises').textContent = d.exercises || 0;
  document.getElementById('home-greeting').textContent = `Olá, ${u.name.split(' ')[0]}! 👋`;
}


/* ══════════════════════════════════════════════════════════════
   MENU LATERAL (SIDEBAR)
══════════════════════════════════════════════════════════════ */

/**
 * Alterna o menu lateral entre aberto e fechado.
 * .classList.toggle() adiciona a classe se não tiver, ou remove se tiver.
 */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

/**
 * Fecha o menu lateral removendo as classes 'open' e 'show'.
 */
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}


/* ══════════════════════════════════════════════════════════════
   NAVEGAÇÃO ENTRE TELAS (VIEWS)
══════════════════════════════════════════════════════════════ */

// Títulos de cada tela para exibir na topbar
const viewTitles = { home: 'Início', learn: 'Resumos', exercises: 'Exercícios' };

/**
 * Muda para uma tela específica ('home', 'learn' ou 'exercises').
 * Remove 'active' de todas as views e adiciona apenas na escolhida.
 */
function showView(v) {
  // Remove a classe 'active' de todas as views (esconde todas)
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));

  // Adiciona 'active' apenas na view escolhida (mostra ela)
  document.getElementById('view-' + v).classList.add('active');

  // Atualiza qual item do menu está destacado como ativo
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const map = { home: 0, learn: 1, exercises: 2 }; // Índices dos itens do menu
  document.querySelectorAll('.nav-item')[map[v]].classList.add('active');

  // Atualiza o título da topbar
  document.getElementById('topbar-title').textContent = viewTitles[v];
  state.currentView = v;

  closeSidebar(); // Fecha o menu ao navegar (útil no celular)

  // Se ainda não carregou o conteúdo da tela, renderiza agora
  if (v === 'learn' && !state.learnPath)     renderLearnMateria();
  if (v === 'exercises' && !state.exPath)    renderExMateria();
  if (v === 'home')                          updateUI();
}


/* ══════════════════════════════════════════════════════════════
   TELA INICIAL — LISTA DE MATÉRIAS
══════════════════════════════════════════════════════════════ */

/**
 * Monta a lista de matérias na tela inicial.
 * Usa .map() para transformar cada item do array DATA em HTML,
 * e .join('') para juntar tudo em uma string única.
 */
function renderMateriasHome() {
  const el = document.getElementById('materias-home');

  // Template literals (crase + ${}) montam o HTML dinâmico
  el.innerHTML = DATA.map(m => `
    <div class="materia-card" onclick="goLearnMateria('${m.id}')">
      <div class="materia-icon" style="background:${m.color}">${m.icon}</div>
      <div class="materia-info">
        <div class="materia-name">${m.nome}</div>
        <div class="materia-desc">${m.desc}</div>
      </div>
      <div class="materia-badge">
        ${m.topicos.reduce((acc, t) => acc + t.subtopicos.length, 0)} aulas
      </div>
    </div>
  `).join('');
  // .reduce() soma o total de subtópicos de todos os tópicos da matéria
}

/**
 * Clique em uma matéria da home: vai para a tela Resumos
 * já aberta nessa matéria específica.
 */
function goLearnMateria(id) {
  state.learnPath = { materiaId: id, topicoId: null, subtId: null };
  showView('learn');
  renderLearnTopicos(id);
}


/* ══════════════════════════════════════════════════════════════
   TELA DE RESUMOS (LEARN)
══════════════════════════════════════════════════════════════ */

/**
 * Exibe a lista de todas as matérias na tela de Resumos.
 * Chamada quando o usuário ainda não escolheu nenhuma matéria.
 */
function renderLearnMateria() {
  const el = document.getElementById('learn-content');
  document.getElementById('learn-breadcrumb').innerHTML = ''; // Limpa o breadcrumb
  el.innerHTML = `
    <div class="section-title">📚 Escolha uma Matéria</div>
    <div class="materias-grid">
      ${DATA.map(m => `
        <div class="materia-card" onclick="renderLearnTopicos('${m.id}')">
          <div class="materia-icon" style="background:${m.color}">${m.icon}</div>
          <div class="materia-info">
            <div class="materia-name">${m.nome}</div>
            <div class="materia-desc">${m.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  state.learnPath = null; // Reseta o caminho de navegação
}

/**
 * Exibe os tópicos e subtópicos de uma matéria específica.
 * Também marca em verde os que já foram concluídos.
 *
 * @param {string} materiaId - O ID da matéria selecionada (ex: 'prog')
 */
function renderLearnTopicos(materiaId) {
  // .find() procura o primeiro item do array que satisfaz a condição
  const m = DATA.find(x => x.id === materiaId);
  state.learnPath = { materiaId, topicoId: null, subtId: null };

  // Monta o breadcrumb: "Resumos › [Nome da Matéria]"
  setBreadcrumb('learn', [
    { label: 'Resumos', action: 'renderLearnMateria()' },
    { label: m.nome, action: null }
  ]);

  const d = getUserData();
  const done = d ? d.done : []; // Lista de IDs de aulas já concluídas
  const el = document.getElementById('learn-content');

  el.innerHTML = `<div class="section-title">${m.icon} ${m.nome}</div>` +
    m.topicos.map(t => `
      <div style="margin-bottom:20px">
        <div style="font-family:Syne,sans-serif;font-weight:700;font-size:14px;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">
          ${t.nome}
        </div>
        <div class="topic-list">
          ${t.subtopicos.map(s => `
            <div class="topic-item ${done.includes(s.id) ? 'topic-done' : ''}"
                 onclick="renderLearnSub('${materiaId}','${t.id}','${s.id}')">
              <div>
                <div class="topic-item-title">${done.includes(s.id) ? '✅ ' : ''} ${s.nome}</div>
                <div class="topic-item-meta">${done.includes(s.id) ? 'Concluído' : 'Clique para estudar'}</div>
              </div>
              <div class="topic-item-arrow">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
}

/**
 * Exibe o conteúdo de uma aula específica (texto + vídeo + botão de concluir).
 *
 * @param {string} mId  - ID da matéria
 * @param {string} tId  - ID do tópico
 * @param {string} sId  - ID do subtópico (aula)
 */
function renderLearnSub(mId, tId, sId) {
  const m = DATA.find(x => x.id === mId);
  const t = m.topicos.find(x => x.id === tId);
  const s = t.subtopicos.find(x => x.id === sId);

  state.learnPath = { materiaId: mId, topicoId: tId, subtId: sId };

  // Monta o breadcrumb com 3 níveis: "Resumos › Matéria › Aula"
  setBreadcrumb('learn', [
    { label: 'Resumos',  action: 'renderLearnMateria()' },
    { label: m.nome,     action: `renderLearnTopicos('${mId}')` },
    { label: s.nome,     action: null }
  ]);

  const d = getUserData();
  const alreadyDone = d && d.done.includes(sId); // Verifica se já concluiu essa aula
  const el = document.getElementById('learn-content');

  el.innerHTML = `
    <div class="learn-card">
      <div class="learn-card-header">
        <div class="learn-card-title">${s.conteudo.titulo}</div>
        <div style="font-size:13px;color:var(--muted)">${m.nome} · ${t.nome}</div>
      </div>
      <div class="learn-card-body">
        ${s.conteudo.texto}
        <div class="video-wrap">
          <iframe src="${s.conteudo.video}" allowfullscreen loading="lazy"></iframe>
        </div>
        <button class="btn-finish" id="btn-finish"
                onclick="finishLesson('${sId}')"
                ${alreadyDone ? 'disabled' : ''}>
          ${alreadyDone ? '✅ Já Concluído' : '✔ Marcar como Concluído (+50 XP)'}
        </button>
      </div>
    </div>
  `;
}

/**
 * Marca uma aula como concluída e adiciona 50 XP ao usuário.
 * Só funciona se a aula ainda não foi concluída antes.
 *
 * @param {string} sId - ID do subtópico (aula) a ser concluído
 */
function finishLesson(sId) {
  const d = getUserData();
  if (!d) return;

  // .includes() verifica se o ID já está na lista de concluídos
  if (!d.done.includes(sId)) {
    d.done.push(sId);        // Adiciona o ID à lista de concluídos
    d.xp = (d.xp || 0) + 50;       // Soma 50 XP
    d.lessons = (d.lessons || 0) + 1; // Incrementa contador de aulas

    saveUserData(d);   // Salva no localStorage
    showXP('+50 XP');  // Mostra a notificação animada
    updateUI();        // Atualiza a interface

    // Desativa o botão de concluir visualmente
    document.getElementById('btn-finish').disabled = true;
    document.getElementById('btn-finish').textContent = '✅ Já Concluído';
  }
}


/* ══════════════════════════════════════════════════════════════
   TELA DE EXERCÍCIOS
══════════════════════════════════════════════════════════════ */

/**
 * Exibe a lista de matérias na tela de Exercícios.
 */
function renderExMateria() {
  const el = document.getElementById('ex-content');
  document.getElementById('ex-breadcrumb').innerHTML = '';
  el.innerHTML = `
    <div class="section-title">🎯 Escolha uma Matéria</div>
    <div class="materias-grid">
      ${DATA.map(m => `
        <div class="materia-card" onclick="renderExTopicos('${m.id}')">
          <div class="materia-icon" style="background:${m.color}">${m.icon}</div>
          <div class="materia-info">
            <div class="materia-name">${m.nome}</div>
            <div class="materia-desc">${m.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  state.exPath = null;
}

/**
 * Exibe os tópicos de exercícios de uma matéria.
 * Cada subtópico mostra quantas questões tem.
 *
 * @param {string} materiaId - ID da matéria selecionada
 */
function renderExTopicos(materiaId) {
  const m = DATA.find(x => x.id === materiaId);
  state.exPath = { materiaId, subtId: null };

  setBreadcrumb('ex', [
    { label: 'Exercícios', action: 'renderExMateria()' },
    { label: m.nome, action: null }
  ]);

  const el = document.getElementById('ex-content');
  el.innerHTML = `<div class="section-title">${m.icon} ${m.nome} — Exercícios</div>` +
    m.topicos.map(t => `
      <div style="margin-bottom:20px">
        <div style="font-family:Syne,sans-serif;font-weight:700;font-size:14px;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">
          ${t.nome}
        </div>
        <div class="topic-list">
          ${t.subtopicos.map(s => `
            <div class="topic-item" onclick="startQuiz('${materiaId}','${t.id}','${s.id}')">
              <div>
                <div class="topic-item-title">📝 ${s.nome}</div>
                <div class="topic-item-meta">${s.quiz.length} questões</div>
              </div>
              <div class="topic-item-arrow">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
}

/**
 * Inicia um quiz para um subtópico específico.
 * Configura o estado do quiz e renderiza a primeira questão.
 */
function startQuiz(mId, tId, sId) {
  const m = DATA.find(x => x.id === mId);
  const t = m.topicos.find(x => x.id === tId);
  const s = t.subtopicos.find(x => x.id === sId);

  state.exPath = { materiaId: mId, topicoId: tId, subtId: sId };

  // Configura o estado do quiz: lista de perguntas, índice atual, pontuação
  state.quizState = {
    questions: s.quiz, // Array com todas as perguntas
    current: 0,        // Qual pergunta está sendo exibida (começa na 0)
    score: 0,          // Quantas respostas corretas até agora
    answered: false    // Se a pergunta atual já foi respondida
  };

  setBreadcrumb('ex', [
    { label: 'Exercícios', action: 'renderExMateria()' },
    { label: m.nome, action: `renderExTopicos('${mId}')` },
    { label: s.nome, action: null }
  ]);

  renderQuiz(); // Renderiza a primeira questão
}

/**
 * Renderiza a questão atual do quiz, ou a tela de resultado final
 * se todas as questões foram respondidas.
 */
function renderQuiz() {
  const qs = state.quizState; // Atalho para o estado do quiz
  const el = document.getElementById('ex-content');

  // Se já respondeu todas as questões, mostra o resultado
  if (qs.current >= qs.questions.length) {
    const pct = Math.round((qs.score / qs.questions.length) * 100); // Porcentagem de acerto
    const xpGained = qs.score * 50; // 50 XP por questão correta

    // Salva o XP ganho no perfil do usuário
    const d = getUserData();
    if (d) {
      d.xp = (d.xp || 0) + xpGained;
      d.exercises = (d.exercises || 0) + qs.score;
      saveUserData(d);
      updateUI();
      if (xpGained > 0) showXP('+' + xpGained + ' XP');
    }

    // Tela de resultado
    el.innerHTML = `
      <div class="quiz-score">
        <div class="quiz-score-value">${pct}%</div>
        <div class="quiz-score-title">${pct >= 70 ? '🎉 Parabéns!' : '💪 Continue Praticando!'}</div>
        <div class="quiz-score-sub">${qs.score} de ${qs.questions.length} questões corretas · +${xpGained} XP</div>
        <button class="btn-primary" style="max-width:220px;margin:0 auto"
                onclick="renderExTopicos(state.exPath.materiaId)">
          Voltar aos Exercícios
        </button>
      </div>
    `;
    return; // Sai da função aqui
  }

  // Pega a pergunta atual
  const q = qs.questions[qs.current];

  el.innerHTML = `
    <div class="quiz-counter">Questão ${qs.current + 1} de ${qs.questions.length}</div>
    <div class="quiz-card">
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `
          <button class="quiz-option" id="opt-${i}" onclick="answerQuiz(${i})">${o}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="qfeedback"></div>
    </div>
    <div class="quiz-nav">
      <!-- Botão "Próxima" fica oculto até responder -->
      <button class="btn-secondary" id="btn-next" onclick="nextQuestion()" style="display:none">
        Próxima →
      </button>
    </div>
  `;

  state.quizState.answered = false; // Reseta o estado de resposta para a nova questão
}

/**
 * Processa a resposta do usuário a uma questão.
 * Destaca a correta em verde e a errada em vermelho.
 * Mostra feedback e o botão "Próxima".
 *
 * @param {number} idx - O índice da alternativa clicada (0, 1, 2 ou 3)
 */
function answerQuiz(idx) {
  const qs = state.quizState;
  if (qs.answered) return; // Impede responder duas vezes
  qs.answered = true;

  const q = qs.questions[qs.current];
  const correct = q.certa; // Índice da resposta correta

  // Desabilita todos os botões e colore correta/errada
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.disabled = true;
    if (i === correct)           el.classList.add('correct'); // Verde
    else if (i === idx && i !== correct) el.classList.add('wrong'); // Vermelho
  });

  // Exibe o feedback de certo ou errado
  const fb = document.getElementById('qfeedback');
  if (idx === correct) {
    qs.score++;
    fb.className = 'quiz-feedback show ok';
    fb.textContent = '✅ Resposta correta! +50 XP';
  } else {
    fb.className = 'quiz-feedback show err';
    fb.textContent = `❌ Incorreto. A resposta certa era: "${q.opts[correct]}"`;
  }

  // Mostra o botão de ir para a próxima questão
  document.getElementById('btn-next').style.display = 'block';
}

/**
 * Avança para a próxima questão do quiz.
 */
function nextQuestion() {
  state.quizState.current++; // Incrementa o índice da questão atual
  renderQuiz(); // Renderiza a próxima questão (ou o resultado se terminou)
}


/* ══════════════════════════════════════════════════════════════
   FUNÇÕES AUXILIARES (HELPERS)
══════════════════════════════════════════════════════════════ */

/**
 * Constrói e exibe a trilha de navegação (breadcrumb).
 * Ex: "Resumos › Programação › Variáveis"
 *
 * @param {string} view  - 'learn' ou 'ex' (define qual breadcrumb atualizar)
 * @param {Array}  items - Lista de objetos { label, action } para cada nível
 */
function setBreadcrumb(view, items) {
  const el = document.getElementById(view + '-breadcrumb');
  el.innerHTML = items.map((item, i) => {
    // Último item não tem link (é a página atual)
    if (!item.action || i === items.length - 1) {
      return `<span class="bc-item active">${item.label}</span>`;
    }
    // Outros itens têm link clicável
    return `<span class="bc-item" onclick="${item.action}">${item.label}</span>
            <span class="bc-sep">›</span>`;
  }).join('');
}

/**
 * Mostra uma notificação animada de XP ganha (ex: "+50 XP").
 * O elemento é criado, adicionado à tela, e removido após 850ms.
 *
 * @param {string} msg - Texto a exibir (ex: '+50 XP', '+150 XP')
 */
function showXP(msg) {
  const container = document.getElementById('xp-toast');
  const el = document.createElement('div'); // Cria um novo elemento HTML
  el.className = 'xp-pop';
  el.textContent = msg;
  container.appendChild(el); // Adiciona à tela

  // Remove o elemento após 850ms (tempo da animação CSS)
  setTimeout(() => el.remove(), 850);
}


/* ══════════════════════════════════════════════════════════════
   INICIALIZAÇÃO AO CARREGAR A PÁGINA

   'DOMContentLoaded' é um evento que dispara quando o HTML
   termina de ser lido pelo navegador (antes das imagens carregarem).
   É o momento certo para iniciar o JS.
══════════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  const u = getUser(); // Verifica se há usuário salvo no localStorage

  if (u) {
    initApp(); // Já tem usuário: vai direto pro app
  } else {
    document.getElementById('auth-view').style.display = 'flex'; // Mostra o cadastro
  }
});
