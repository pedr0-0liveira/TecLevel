/**
 * ════════════════════════════════════════════════════════════
 *  LevelTecUp — src/js/main.js
 *  Controlador de Navegação e Renderização do DOM.
 *
 *  Responsabilidades:
 *  ├── Navegação SPA (Single Page Application)
 *  ├── Renderização dinâmica do Dashboard
 *  ├── Renderização da Árvore de Módulos
 *  ├── Renderização do Detalhe de Subtema + Exercícios
 *  ├── Painel do Professor
 *  ├── Gestão de Materiais
 *  └── Troca de Perfil (Aluno / Professor)
 *
 *  DEPENDÊNCIAS (ordem de carregamento no HTML):
 *  1. chart.umd.min.js (CDN)
 *  2. data.js
 *  3. engine.js
 *  4. main.js  ← este arquivo
 *
 *  Padrão Arquitetural:
 *  Este arquivo implementa um padrão similar ao MVC (Model-View-Controller):
 *  - Model: AppState + CATALOGO (data.js / engine.js)
 *  - View:  index.html
 *  - Controller: funções deste arquivo
 * ════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════════
// ESTADO TEMPORÁRIO DOS EXERCÍCIOS
// Registra quais exercícios do subtema atual já foram
// respondidos. Reseta sempre que um novo subtema é aberto.
// ═══════════════════════════════════════════════════════════

/**
 * Mapa de respostas do subtema ativo.
 * Estrutura: { [exercicioId]: { correto: boolean } }
 * @type {Object.<string, {correto: boolean}>}
 */
let exerciciosRespondidos = {};

/**
 * Arquivo selecionado no input de upload (simulação).
 * @type {File|null}
 */
let arquivoSelecionado = null;

// ═══════════════════════════════════════════════════════════
// 1. NAVEGAÇÃO SPA
//    Controla qual "página" (view) é exibida sem recarregar.
//    Todas as views existem no DOM simultaneamente;
//    apenas uma fica visível via classe CSS `hidden`.
// ═══════════════════════════════════════════════════════════

/**
 * Navega para uma view e renderiza seu conteúdo.
 * Este é o ponto central de navegação do SPA.
 *
 * Fluxo:
 * 1. Oculta todas as views (.view.hidden)
 * 2. Exibe apenas a view alvo
 * 3. Atualiza o item ativo na sidebar
 * 4. Chama a função de renderização específica
 *
 * @param {string} viewId - ID da view ('dashboard','modulos','subtema','professor','materiais')
 */
function navigateTo(viewId) {
  AppState.viewAtual = viewId;

  // Oculta todas as views (adiciona classe 'hidden')
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

  // Exibe a view selecionada (remove classe 'hidden')
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.remove('hidden');

  // Atualiza destaque na sidebar (marca item ativo)
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewId);
  });

  // Renderiza conteúdo específico da view
  // Cada view tem sua própria função de renderização
  switch (viewId) {
    case 'dashboard':  renderDashboard();  break;
    case 'modulos':    renderModulos();    break;
    case 'professor':  renderProfessor(); break;
    case 'materiais':  renderMateriais(); break;
    // 'subtema' é renderizado por abrirSubtema()
  }
}

// ═══════════════════════════════════════════════════════════
// 2. DASHBOARD
//    Visão geral do progresso do aluno.
// ═══════════════════════════════════════════════════════════

/**
 * Renderiza o Dashboard completo:
 * - Saudação e XP no header
 * - Cards de estatísticas
 * - Barra de progresso global
 * - Badge de nível
 * - Gráfico de desempenho por área
 * - Ranking de erros
 */
function renderDashboard() {
  const { total, concluidos, pct } = engineCalcProgresso();
  const nivel = engineGetNivel(AppState.xpTotal);

  // ── Saudação e header ──────────────────────────────
  document.getElementById('dashGreeting').textContent = engineSaudacao();

  // ── Cards de estatísticas ──────────────────────────
  document.getElementById('statXP').textContent        = engineFormatarXP(AppState.xpTotal);
  document.getElementById('statConcluidos').textContent = concluidos;
  document.getElementById('statProgresso').textContent  = `${pct}%`;
  document.getElementById('statStreak').textContent     = AppState.streak;
  document.getElementById('headerXP').textContent       = engineFormatarXP(AppState.xpTotal);

  // ── Nível e barra de progresso global ──────────────
  const nivelBadge = document.getElementById('progressBadge');
  nivelBadge.textContent = `${nivel.emoji} ${nivel.nome}`;
  nivelBadge.style.color        = nivel.cor;
  nivelBadge.style.borderColor  = nivel.cor + '66';
  nivelBadge.style.background   = nivel.cor + '18';

  document.getElementById('globalProgressBar').style.width = `${pct}%`;
  document.getElementById('progressCaption').textContent   =
    `${concluidos} de ${total} subtemas concluídos`;

  // ── Barra de XP do nível ───────────────────────────
  const pctNivel = engineGetPorcentagemNivel(AppState.xpTotal);
  const barraXP  = document.getElementById('nivelProgressBar');
  if (barraXP) barraXP.style.width = `${pctNivel}%`;

  const proximoNivel = engineGetProximoNivel(nivel.nivel);
  const xpProximo = document.getElementById('xpProximoNivel');
  if (xpProximo) {
    xpProximo.textContent = proximoNivel
      ? `${proximoNivel.xpMin - AppState.xpTotal} XP para ${proximoNivel.nome}`
      : '🏆 Nível máximo atingido!';
  }

  // ── Gráficos e ranking ─────────────────────────────
  renderGraficoDesempenho();
  renderRankingErros('rankingErros');
}

/**
 * (Re)cria o gráfico de barras de desempenho por área.
 * Destrói a instância anterior para evitar vazamento de memória:
 * Chart.js mantém referências internas que ocupam memória se não destruídas.
 */
function renderGraficoDesempenho() {
  const canvas = document.getElementById('chartDesempenho');
  if (!canvas) return;

  // Destrói instância anterior
  if (chartDesempenho) { chartDesempenho.destroy(); chartDesempenho = null; }

  const progressoPorArea = engineCalcProgressoPorArea();
  const labels = progressoPorArea.map(p => p.area.nome);
  const data   = progressoPorArea.map(p => p.pct);
  const cores  = progressoPorArea.map(p => p.area.cor);

  chartDesempenho = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Progresso (%)',
        data,
        // Adiciona transparência nas cores de fundo (sufixo '33' = 20% opacidade)
        backgroundColor: cores.map(c => c + '33'),
        borderColor:     cores,
        borderWidth:     2,
        borderRadius:    8,
        borderSkipped:   false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          min: 0, max: 100,
          grid:  { color: '#2a3047' },
          ticks: { color: '#8b92ab', callback: v => v + '%' }
        },
        x: {
          grid:  { display: false },
          ticks: { color: '#8b92ab' }
        }
      }
    }
  });
}

/**
 * Renderiza o ranking de subtemas com mais erros em um <ul>.
 *
 * @param {string} elementId - ID do elemento <ul> alvo
 */
function renderRankingErros(elementId) {
  const ul = document.getElementById(elementId);
  if (!ul) return;

  const itens    = engineGetRankingErros(5);
  const maxErros = itens.length > 0 ? itens[0].erros : 1;

  if (itens.length === 0) {
    ul.innerHTML = '<li class="ranking-empty">Nenhum erro registrado ainda!</li>';
    return;
  }

  ul.innerHTML = itens.map((item, i) => {
    // Determina classe CSS para os top 3 (cores especiais)
    const rankClass = i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : '';
    const barPct    = Math.round((item.erros / maxErros) * 100);
    const plural    = item.erros > 1 ? 's' : '';

    return `
      <li class="ranking-item">
        <span class="rank-num ${rankClass}">${i + 1}</span>
        <div class="rank-info">
          <div class="rank-tema">${item.nome}</div>
          <div class="rank-erros">${item.erros} erro${plural}</div>
        </div>
        <div class="rank-bar-wrap">
          <div class="rank-bar" style="width:${barPct}%"></div>
        </div>
      </li>
    `;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// 3. MÓDULOS — Árvore de conteúdo
//    Renderiza a hierarquia: Área → Tema → Subtema
// ═══════════════════════════════════════════════════════════

/**
 * Renderiza a árvore completa de módulos no container.
 * Usa `innerHTML` e `createElement` para construção eficiente do DOM.
 */
function renderModulos() {
  const container = document.getElementById('modulosContainer');
  if (!container) return;
  container.innerHTML = '';

  CATALOGO.forEach(area => {
    // Calcula progresso da área para exibir na barra mini
    const progArea = engineCalcProgressoPorArea().find(p => p.area.id === area.id);
    const areaPct  = progArea ? progArea.pct : 0;

    // ── Bloco da área ────────────────────────────────
    const areaDiv       = document.createElement('div');
    areaDiv.className   = 'area-block';
    areaDiv.innerHTML   = `
      <div class="area-header" onclick="toggleArea('temas-${area.id}')">
        <div class="area-icon" style="background:${area.cor}22">${area.icone}</div>
        <span class="area-name">${area.nome}</span>
        <div class="area-progress-mini">
          <span style="font-size:12px;color:var(--text-secondary)">${areaPct}%</span>
          <div class="mini-bar-wrap">
            <div class="mini-bar" style="width:${areaPct}%;background:${area.cor}"></div>
          </div>
        </div>
      </div>
      <div class="temas-list" id="temas-${area.id}"></div>
    `;
    container.appendChild(areaDiv);

    const temasContainer = areaDiv.querySelector(`#temas-${area.id}`);

    // ── Temas dentro da área ─────────────────────────
    area.temas.forEach(tema => {
      const subCount = tema.subtemas.length;
      const subConc  = tema.subtemas.filter(s => AppState.progresso[s.id]).length;

      const temaDiv     = document.createElement('div');
      temaDiv.className = 'tema-block';
      temaDiv.innerHTML = `
        <div class="tema-header" onclick="toggleTema('sub-${tema.id}', this)">
          <span class="tema-toggle">▶</span>
          <span class="tema-nome">${tema.nome}</span>
          <span class="tema-count">${subConc}/${subCount} concluídos</span>
        </div>
        <div class="subtemas-list" id="sub-${tema.id}" style="display:none"></div>
      `;
      temasContainer.appendChild(temaDiv);

      const subContainer = temaDiv.querySelector(`#sub-${tema.id}`);

      // ── Subtemas dentro do tema ────────────────────
      tema.subtemas.forEach(sub => {
        const concluido = !!AppState.progresso[sub.id];
        const subItem   = document.createElement('div');
        subItem.className = `subtema-item ${concluido ? 'concluido' : ''}`;
        subItem.onclick   = () => abrirSubtema(sub.id);
        subItem.innerHTML = `
          <div class="subtema-check">${concluido ? '✓' : ''}</div>
          <span class="subtema-nome">${sub.nome}</span>
          <span class="subtema-xp">+${sub.xp} XP</span>
        `;
        subContainer.appendChild(subItem);
      });
    });
  });
}

/**
 * Alterna a visibilidade da lista de temas de uma área.
 * Simples toggle de display CSS.
 *
 * @param {string} id - ID do elemento <div class="temas-list">
 */
function toggleArea(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? '' : 'none';
}

/**
 * Alterna a visibilidade dos subtemas de um tema.
 * Também rotaciona a seta (▶ → ▼) via classe CSS.
 *
 * @param {string} id        - ID do elemento <div class="subtemas-list">
 * @param {HTMLElement} header - Elemento header clicado (contém a seta)
 */
function toggleTema(id, header) {
  const el     = document.getElementById(id);
  if (!el) return;
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : '';
  // Rotaciona a seta: classe 'open' aplica transform: rotate(90deg) no CSS
  header.querySelector('.tema-toggle').classList.toggle('open', !isOpen);
}

// ═══════════════════════════════════════════════════════════
// 4. SUBTEMA — Detalhe de conteúdo e exercícios
// ═══════════════════════════════════════════════════════════

/**
 * Abre a view de detalhe de um subtema específico.
 * Popula o HTML com conteúdo, vídeo placeholder e exercícios.
 *
 * @param {string} subtemaId - ID do subtema a exibir
 */
function abrirSubtema(subtemaId) {
  const resultado = engineEncontrarSubtema(subtemaId);
  if (!resultado) return;

  const { area, tema, subtema } = resultado;

  // Armazena qual subtema está ativo e reseta respostas
  AppState.subtemaAtivo    = subtemaId;
  exerciciosRespondidos = {};

  // ── Preenche o cabeçalho ────────────────────────────
  document.getElementById('subtemaTitulo').textContent = subtema.nome;
  document.getElementById('subtemaPath').textContent   = `${area.nome} › ${tema.nome}`;
  document.getElementById('xpReward').textContent      = `+${subtema.xp} XP`;

  // ── Conteúdo textual (HTML do data.js) ──────────────
  document.getElementById('subtemaConteudo').innerHTML = subtema.conteudo;

  // ── Vídeo placeholder ───────────────────────────────
  // Em produção, substituir por embed real do YouTube
  const videoDiv = document.getElementById('subtemaVideo');
  if (videoDiv) {
    videoDiv.innerHTML = `
      <div class="video-inner">
        <span class="video-icon">▶</span>
        <span>Videoaula: ${subtema.nome}</span>
        <small style="color:var(--text-muted);margin-top:4px">
          Integração com YouTube disponível em breve
        </small>
      </div>
    `;
  }

  // ── Exercícios ──────────────────────────────────────
  renderExercicios(subtema.exercicios);

  // ── Estado do botão de conclusão ───────────────────
  const jaConcluido = !!AppState.progresso[subtemaId];
  const btn         = document.getElementById('btnConcluir');
  btn.disabled      = jaConcluido;
  btn.textContent   = jaConcluido ? '✅ Já concluído!' : '✅ Concluir Subtema';

  // ── Navega para a view de detalhe ──────────────────
  navigateTo('subtema');
}

/**
 * Renderiza os exercícios de múltipla escolha de um subtema.
 * Cada exercício tem um enunciado e alternativas como botões.
 *
 * @param {Exercicio[]} exercicios - Array de exercícios do subtema
 */
function renderExercicios(exercicios) {
  const container = document.getElementById('exerciciosList');
  if (!container) return;
  container.innerHTML = '';

  if (!exercicios || exercicios.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted)">Nenhum exercício disponível para este subtema.</p>';
    return;
  }

  exercicios.forEach((ex, idx) => {
    const div   = document.createElement('div');
    div.className = 'exercicio-item';
    div.id        = `ex-${ex.id}`;

    // Enunciado numerado
    div.innerHTML = `
      <p class="exercicio-enunciado">${idx + 1}. ${ex.enunciado}</p>
      <div class="alternativas" id="alt-${ex.id}"></div>
      <div id="fb-${ex.id}"></div>
    `;
    container.appendChild(div);

    const altContainer = div.querySelector(`#alt-${ex.id}`);

    // Renderiza cada alternativa como botão (A, B, C, D...)
    ex.alternativas.forEach((alt, i) => {
      const btn     = document.createElement('button');
      btn.className = 'alternativa-btn';
      // String.fromCharCode(65) = 'A', 66 = 'B', etc.
      btn.textContent = `${String.fromCharCode(65 + i)}) ${alt}`;
      btn.onclick     = () => responderExercicio(ex, i, btn, altContainer);
      altContainer.appendChild(btn);
    });
  });
}

/**
 * Processa a resposta do aluno a um exercício.
 *
 * Fluxo:
 * 1. Verifica se já foi respondido (ignora se sim)
 * 2. Compara índice escolhido com gabarito
 * 3. Desabilita todos os botões
 * 4. Destaca a correta (verde) e a errada (vermelho)
 * 5. Exibe mensagem de feedback
 * 6. Se errou → registra no engine para ranking
 *
 * @param {Exercicio}       exercicio       - Dados do exercício
 * @param {number}          indiceEscolhido - Índice da alternativa clicada (0-based)
 * @param {HTMLButtonElement} btnClicado    - Botão que foi clicado
 * @param {HTMLElement}     container       - Container com todos os botões do exercício
 */
function responderExercicio(exercicio, indiceEscolhido, btnClicado, container) {
  // Guard: ignora cliques em exercícios já respondidos
  if (exerciciosRespondidos[exercicio.id]) return;

  const correto = (indiceEscolhido === exercicio.gabarito);
  exerciciosRespondidos[exercicio.id] = { correto };

  // Desabilita todos os botões do exercício
  container.querySelectorAll('.alternativa-btn').forEach((btn, i) => {
    btn.disabled = true;
    // Marca a alternativa correta em verde
    if (i === exercicio.gabarito) btn.classList.add('correta');
  });

  // Marca a alternativa clicada em vermelho se errada
  if (!correto) btnClicado.classList.add('errada');

  // Feedback textual abaixo das alternativas
  const fbDiv = document.getElementById(`fb-${exercicio.id}`);
  if (correto) {
    fbDiv.innerHTML = `<p class="feedback-msg ok">✅ Correto! Muito bem!</p>`;
    // Bônus de XP por acerto (+5 XP)
    engineAdicionarXP(5);
  } else {
    const respostaCerta = exercicio.alternativas[exercicio.gabarito];
    fbDiv.innerHTML = `
      <p class="feedback-msg erro">
        ❌ Incorreto. A resposta certa era: <strong>${respostaCerta}</strong>
      </p>
    `;

    // Registra erro no engine para o ranking de dificuldades
    const ctx = engineEncontrarSubtema(AppState.subtemaAtivo);
    if (ctx) {
      engineRegistrarErro(ctx.subtema.id, ctx.subtema.nome);
    }
  }
}

/**
 * Marca o subtema ativo como concluído.
 * Chama o engine, atualiza a UI e exibe o toast de XP.
 * Acionado pelo botão "Concluir Subtema".
 */
function concluirSubtema() {
  const id = AppState.subtemaAtivo;
  if (!id) return;

  const ctx = engineEncontrarSubtema(id);
  if (!ctx) return;

  const { subiu, nivelDepois } = engineAdicionarXP(0); // Preview
  const foiConcluido = engineConcluirSubtema(id, ctx.subtema.xp);

  if (!foiConcluido) return; // Já estava concluído

  // Atualiza botão
  const btn     = document.getElementById('btnConcluir');
  btn.disabled  = true;
  btn.textContent = '✅ Já concluído!';

  // Verifica se subiu de nível
  const nivelAtual = engineGetNivel(AppState.xpTotal);
  const nivelAntes = engineGetNivel(AppState.xpTotal - ctx.subtema.xp);

  if (nivelAtual.nivel > nivelAntes.nivel) {
    mostrarToast(`🏆 SUBIU DE NÍVEL! ${nivelAtual.emoji} ${nivelAtual.nome}`, 4000);
  } else {
    mostrarToast(`+${ctx.subtema.xp} XP conquistado! 🎉`);
  }
}

// ═══════════════════════════════════════════════════════════
// 5. PAINEL DO PROFESSOR
// ═══════════════════════════════════════════════════════════

/**
 * Renderiza o painel do professor:
 * 1. Gráfico de desempenho da turma
 * 2. Ranking de erros (dados do aluno atual)
 * 3. Lista de alunos com progresso
 */
function renderProfessor() {
  renderGraficoTurma();
  renderRankingErros('rankingErrosTurma');
  renderListaAlunos();
}

/**
 * Cria o gráfico de barras duplas da turma (XP + Progresso%).
 * Usa dois eixos Y: esquerdo para XP, direito para porcentagem.
 */
function renderGraficoTurma() {
  const canvas = document.getElementById('chartTurma');
  if (!canvas) return;

  // Destrói instância anterior para evitar sobreposição
  if (chartTurma) { chartTurma.destroy(); chartTurma = null; }

  // Combina alunos simulados com o aluno atual
  const alunos  = [
    ...AppState.alunos,
    {
      nome:      'Você',
      xp:        AppState.xpTotal,
      progresso: engineCalcProgresso().pct
    }
  ];
  const labels  = alunos.map(a => a.nome);
  const dataXP  = alunos.map(a => a.xp);
  const dataPct = alunos.map(a => a.progresso);

  chartTurma = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label:           'XP',
          data:            dataXP,
          backgroundColor: 'rgba(46,221,154,0.25)',
          borderColor:     '#2edd9a',
          borderWidth:     2,
          borderRadius:    6,
          yAxisID:         'yXP'
        },
        {
          label:           'Progresso (%)',
          data:            dataPct,
          backgroundColor: 'rgba(77,159,255,0.25)',
          borderColor:     '#4d9fff',
          borderWidth:     2,
          borderRadius:    6,
          yAxisID:         'yPct'
        }
      ]
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#8b92ab', padding: 16 } }
      },
      scales: {
        yXP: {
          position: 'left',
          grid:  { color: '#2a3047' },
          ticks: { color: '#8b92ab' }
        },
        yPct: {
          position: 'right',
          min: 0, max: 100,
          grid:  { display: false },
          ticks: { color: '#4d9fff', callback: v => v + '%' }
        },
        x: {
          grid:  { display: false },
          ticks: { color: '#8b92ab' }
        }
      }
    }
  });
}

/**
 * Renderiza a lista de alunos da turma ordenada por XP (decrescente).
 * Combina dados simulados com o aluno atual.
 */
function renderListaAlunos() {
  const ul = document.getElementById('alunosList');
  if (!ul) return;

  const { pct } = engineCalcProgresso();

  // Combina e ordena por XP
  const todos = [
    ...AppState.alunos,
    { nome: 'Você (atual)', avatar: '👤', xp: AppState.xpTotal, progresso: pct }
  ].sort((a, b) => b.xp - a.xp);

  ul.innerHTML = todos.map((aluno, idx) => {
    const posicaoEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
    return `
      <li class="student-item">
        <div class="student-avatar">${aluno.avatar || aluno.nome[0]}</div>
        <div class="student-info">
          <div class="student-name">${aluno.nome} <span style="font-size:11px;color:var(--text-muted)">${posicaoEmoji}</span></div>
          <div class="student-prog">${aluno.progresso}% concluído</div>
          <div class="student-bar-wrap">
            <div class="student-bar" style="width:${aluno.progresso}%"></div>
          </div>
        </div>
        <div class="student-xp">${engineFormatarXP(aluno.xp)} XP</div>
      </li>
    `;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// 6. MATERIAIS — Upload simulado
// ═══════════════════════════════════════════════════════════

/**
 * Chamado quando o usuário seleciona um arquivo no input.
 * Preenche o campo de título com o nome do arquivo (simulação).
 * NOTA: Não realiza upload real — apenas simula a interação.
 *
 * @param {HTMLInputElement} input - O input[type=file]
 */
function simularUpload(input) {
  if (!input.files || input.files.length === 0) return;
  arquivoSelecionado = input.files[0];
  document.getElementById('uploadNome').value = arquivoSelecionado.name;
}

/**
 * Adiciona um material à biblioteca local.
 * Persiste via engineSave() no localStorage.
 */
function adicionarMaterial() {
  const nome = document.getElementById('uploadNome').value.trim();
  const area = document.getElementById('uploadArea2').value;

  if (!nome) {
    mostrarToast('⚠️ Informe o título do material.', 2500);
    return;
  }

  // Cria objeto de material com metadados
  const material = {
    id:        Date.now(),           // ID único baseado em timestamp
    nome,
    area:      area || 'Geral',
    tipo:      arquivoSelecionado
                 ? arquivoSelecionado.name.split('.').pop().toUpperCase()
                 : 'PDF',
    dataAdded: new Date().toLocaleDateString('pt-BR')
  };

  // Insere no início do array (mais recente aparece primeiro)
  AppState.materiais.unshift(material);
  engineSave();

  // Limpa o formulário
  document.getElementById('uploadNome').value  = '';
  document.getElementById('uploadArea2').value = '';
  document.getElementById('fileInput').value   = '';
  arquivoSelecionado = null;

  renderMateriais();
  mostrarToast('📚 Material adicionado com sucesso!');
}

/**
 * Remove um material pelo ID.
 * Usa Array.filter para criar novo array sem o item removido.
 *
 * @param {number} id - Timestamp ID do material
 */
function removerMaterial(id) {
  AppState.materiais = AppState.materiais.filter(m => m.id !== id);
  engineSave();
  renderMateriais();
}

/**
 * Renderiza a lista de materiais na Biblioteca.
 */
function renderMateriais() {
  const ul = document.getElementById('materiaisList');
  if (!ul) return;

  if (AppState.materiais.length === 0) {
    ul.innerHTML = '<li class="ranking-empty">Nenhum material adicionado ainda.</li>';
    return;
  }

  const icones = { PDF: '📄', EPUB: '📖', DOCX: '📝', PPTX: '📊', XLSX: '📊' };

  ul.innerHTML = AppState.materiais.map(m => `
    <li class="material-item">
      <span class="material-icon">${icones[m.tipo] || '📄'}</span>
      <div class="material-info">
        <div class="material-nome">${m.nome}</div>
        <div class="material-area">${m.area} · ${m.tipo} · ${m.dataAdded}</div>
      </div>
      <button class="material-delete"
              onclick="removerMaterial(${m.id})"
              title="Remover material">🗑️</button>
    </li>
  `).join('');
}

// ═══════════════════════════════════════════════════════════
// 7. TOAST DE NOTIFICAÇÃO
// ═══════════════════════════════════════════════════════════

/** Timer atual do toast (para cancelar se houver sobreposição) */
let toastTimer = null;

/**
 * Exibe o toast de notificação com uma mensagem.
 * Remove automaticamente após `duracao` milissegundos.
 *
 * @param {string} msg      - Mensagem a exibir
 * @param {number} [duracao=3000] - Duração em ms
 */
function mostrarToast(msg, duracao = 3000) {
  const toast = document.getElementById('xpToast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.remove('hidden');

  // Cancela timer anterior se houver
  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toastTimer = null;
  }, duracao);
}

// ── Alias para compatibilidade com o HTML original ──────────
/**
 * @deprecated Use mostrarToast()
 */
function mostrarToastXP(msg) { mostrarToast(msg); }

// ═══════════════════════════════════════════════════════════
// 8. TROCA DE PERFIL (Aluno / Professor)
// ═══════════════════════════════════════════════════════════

/**
 * Alterna entre os perfis Aluno e Professor.
 * Atualiza a sidebar e navega para a view adequada.
 *
 * @param {'aluno'|'professor'} role - Perfil desejado
 */
function switchRole(role) {
  AppState.role = role;

  // Atualiza botões do switcher (estado ativo)
  document.getElementById('btnAluno').classList.toggle('active', role === 'aluno');
  document.getElementById('btnProf').classList.toggle('active',  role === 'professor');

  if (role === 'professor') {
    // Atualiza perfil na sidebar para Professor
    document.getElementById('sidebarName').textContent   = 'Prof. Silva';
    document.getElementById('sidebarRole').textContent   = 'Professor';
    document.getElementById('sidebarAvatar').textContent = 'P';
    navigateTo('professor');
  } else {
    // Restaura perfil de Aluno
    document.getElementById('sidebarName').textContent   = 'Aluno';
    document.getElementById('sidebarRole').textContent   = 'Estudante';
    document.getElementById('sidebarAvatar').textContent = 'A';
    navigateTo('dashboard');
  }
}

// ═══════════════════════════════════════════════════════════
// 9. INICIALIZAÇÃO
//    Ponto de entrada único da aplicação.
//    DOMContentLoaded garante que o HTML está completamente
//    parseado antes de manipular o DOM.
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 1. Carrega dados persistidos no localStorage
  engineLoad();

  // 2. Renderiza a view inicial (Dashboard)
  navigateTo('dashboard');

  // 3. Log de diagnóstico (útil durante desenvolvimento)
  console.log(
    '%c LevelTecUp — v1.0.0 ',
    'background:#2edd9a;color:#0f1117;font-weight:bold;border-radius:4px;padding:4px 8px'
  );
  console.log('%c Preparação IFAM · CMM · Matias Machline', 'color:#4d9fff;font-size:12px');
  console.log('Estado inicial:', AppState);
  console.log('Total de subtemas no catálogo:', engineCalcProgresso().total);
});
