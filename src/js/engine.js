/**
 * ════════════════════════════════════════════════════════════
 *  LevelTecUp — src/js/engine.js
 *  Motor de Gamificação: XP, Níveis, Ranking e Persistência.
 *
 *  Responsabilidades deste módulo:
 *  ├── Definição dos Níveis (Iniciante → Pro-Técnico)
 *  ├── Cálculo de XP e progressão de nível
 *  ├── Sistema de ranking de erros por subtema
 *  ├── Persistência via localStorage
 *  └── Estado global da aplicação (AppState)
 *
 *  DEPENDÊNCIAS: data.js deve ser carregado antes deste arquivo.
 *
 *  Conceito de "Engine":
 *  Em game design, a "engine" é o núcleo que processa as regras
 *  do jogo. Aqui, ela processa as regras de aprendizagem gamificada.
 * ════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════════
// 1. TABELA DE NÍVEIS
//    Define os 10 níveis do sistema de progressão.
//    Cada nível tem: limiar mínimo de XP, nome, cor de badge
//    e emoji representativo.
//
//    A estrutura de array ordenado permite buscas simples:
//    percorre-se do último para o primeiro até achar o nível
//    cujo `xpMin` seja ≤ ao XP do aluno.
// ═══════════════════════════════════════════════════════════

/**
 * Tabela de níveis da plataforma.
 * Ordem crescente de XP mínimo requerido.
 *
 * @type {Nivel[]}
 */
const NIVEIS = [
  { nivel: 1,  xpMin:    0, nome: 'Iniciante',        emoji: '🌱', cor: '#8b92ab' },
  { nivel: 2,  xpMin:   80, nome: 'Curioso',           emoji: '🔍', cor: '#4d9fff' },
  { nivel: 3,  xpMin:  180, nome: 'Estudante',         emoji: '📚', cor: '#2edd9a' },
  { nivel: 4,  xpMin:  320, nome: 'Dedicado',          emoji: '⚡', cor: '#a78bfa' },
  { nivel: 5,  xpMin:  500, nome: 'Aplicado',          emoji: '🎯', cor: '#fb923c' },
  { nivel: 6,  xpMin:  720, nome: 'Destaque',          emoji: '🏅', cor: '#4d9fff' },
  { nivel: 7,  xpMin:  980, nome: 'Avançado',          emoji: '💎', cor: '#2edd9a' },
  { nivel: 8,  xpMin: 1300, nome: 'Elite',             emoji: '🔥', cor: '#f87171' },
  { nivel: 9,  xpMin: 1700, nome: 'Especialista',      emoji: '🌟', cor: '#a78bfa' },
  { nivel: 10, xpMin: 2200, nome: 'Pro-Técnico',       emoji: '🏆', cor: '#fbbf24' },
];

// ═══════════════════════════════════════════════════════════
// 2. ESTADO GLOBAL DA APLICAÇÃO (AppState)
//    Objeto central que mantém TODOS os dados em memória.
//
//    Padrão de Design: "Single Source of Truth" —
//    toda alteração de estado deve passar por este objeto
//    e ser persistida via Engine.save().
// ═══════════════════════════════════════════════════════════

/**
 * Estado global único da aplicação.
 * Modifique apenas via funções do Engine para garantir consistência.
 */
const AppState = {

  // ── Perfil ──────────────────────────────────────────
  usuarios: [],      // Lista de todos os cadastrados
  userLogado: null,  // Objeto do usuário atual {nome, role, xp...}
  isLoggedIn: false,
  role:         'aluno',     // 'aluno' | 'professor'
  viewAtual:    'dashboard', // ID da view ativa
  subtemaAtivo: null,        // ID do subtema aberto

  // ── Progresso do aluno ──────────────────────────────
  /** Map: subtemaId → true (concluído) */
  progresso: {},

  /** Pontos de experiência acumulados */
  xpTotal: 0,

  // ── Ranking de erros ────────────────────────────────
  /**
   * Map: subtemaId → { nome: string, erros: number }
   * Registra quantas vezes o aluno errou questões de cada subtema.
   */
  ranking: {},

  // ── Dados de turma (simulados) ──────────────────────
  /** Lista de alunos injetada a partir de data.js */
  alunos: ALUNOS_TURMA,

  // ── Materiais complementares ────────────────────────
  /** Array de materiais adicionados pelo professor/aluno */
  materiais: [],

  // ── Streaks ─────────────────────────────────────────
  /** Último dia de acesso (formato ISO) */
  ultimoAcesso: null,
  /** Contador de dias consecutivos de acesso */
  streak: 1,
};

// Referências globais aos gráficos Chart.js
// São armazenadas para permitir destruição antes de recriar.
let chartDesempenho = null;
let chartTurma      = null;

// ═══════════════════════════════════════════════════════════
//  ENGINE — Funções de Gestão de identidade
// ═══════════════════════════════════════════════════════════

// 3. Função para Registrar Usuário
function engineRegistrar(novoUsuario) {
  // Verifica se o username já existe
  const existe = AppState.usuarios.find(u => u.usuario === novoUsuario.usuario);
  if (existe) return { sucesso: false, msg: "Este nome de usuário já existe." };

  AppState.usuarios.push(novoUsuario);
  engineSave();
  return { sucesso: true, msg: "Cadastro realizado com sucesso!" };
}

// 4. Função para Validar Login
function engineValidarLogin(user, pass) {
  const conta = AppState.usuarios.find(u => u.usuario === user && u.senha === pass);
  if (conta) {
    AppState.userLogado = conta;
    AppState.isLoggedIn = true;
    engineSave();
    return { sucesso: true, role: conta.role };
  }
  return { sucesso: false, msg: "Usuário ou senha incorretos." };
}

// ═══════════════════════════════════════════════════════════
// 3. CHAVES DO localStorage
//    Centralizar as chaves evita erros de digitação e facilita
//    futuras refatorações (ex: migrar para IndexedDB).
// ═══════════════════════════════════════════════════════════

const LS_KEYS = {
usuarios:     'leveltecup_usuarios',
  userLogado:   'leveltecup_userLogado',
  isLoggedIn:   'leveltecup_isLoggedIn',
  progresso:    'leveltecup_progresso',
  xpTotal:      'leveltecup_xp',
  ranking:      'leveltecup_ranking',
  materiais:    'leveltecup_materiais',
  streak:       'leveltecup_streak',
  ultimoAcesso: 'leveltecup_ultimo_acesso',
};

// ═══════════════════════════════════════════════════════════
// 4. ENGINE — Funções de Persistência
// ═══════════════════════════════════════════════════════════

/**
 * Carrega os dados persistidos do localStorage e injeta no AppState.
 * Deve ser chamado UMA VEZ na inicialização da aplicação.
 *
 * Por que usar try/catch?
 * O JSON.parse lança SyntaxError se os dados estiverem corrompidos.
 * O try/catch garante que o app não quebre por dados inválidos.
 */
function engineLoad() {
  try {
    const users  = localStorage.getItem(LS_KEYS.usuarios);
    const logged = localStorage.getItem(LS_KEYS.userLogado);
    const isLog  = localStorage.getItem(LS_KEYS.isLoggedIn);
    const p = localStorage.getItem(LS_KEYS.progresso);
    const x = localStorage.getItem(LS_KEYS.xpTotal);
    const r = localStorage.getItem(LS_KEYS.ranking);
    const m = localStorage.getItem(LS_KEYS.materiais);
    const s = localStorage.getItem(LS_KEYS.streak);
    const u = localStorage.getItem(LS_KEYS.ultimoAcesso);

    if (p) AppState.progresso    = JSON.parse(p);
    if (x) AppState.xpTotal      = Number(x);
    if (r) AppState.ranking      = JSON.parse(r);
    if (m) AppState.materiais    = JSON.parse(m);
    if (s) AppState.streak       = Number(s);
    if (u) AppState.ultimoAcesso = u;
    if (users)  AppState.usuarios   = JSON.parse(users);
    if (logged) AppState.userLogado = JSON.parse(logged);
    if (isLog)  AppState.isLoggedIn = isLog === 'true';

    // Atualiza streak ao carregar
    engineAtualizarStreak();

  } catch (e) {
    console.warn('[Engine] Falha ao carregar estado:', e);
  }
}

/**
 * Serializa e persiste o AppState no localStorage.
 * Chame esta função após qualquer alteração de estado.
 */
function engineSave() {
  try {
    localStorage.setItem(LS_KEYS.usuarios,   JSON.stringify(AppState.usuarios));
    localStorage.setItem(LS_KEYS.userLogado, JSON.stringify(AppState.userLogado));
    localStorage.setItem(LS_KEYS.isLoggedIn, String(AppState.isLoggedIn));
    localStorage.setItem(LS_KEYS.progresso,    JSON.stringify(AppState.progresso));
    localStorage.setItem(LS_KEYS.xpTotal,      String(AppState.xpTotal));
    localStorage.setItem(LS_KEYS.ranking,      JSON.stringify(AppState.ranking));
    localStorage.setItem(LS_KEYS.materiais,    JSON.stringify(AppState.materiais));
    localStorage.setItem(LS_KEYS.streak,       String(AppState.streak));
    localStorage.setItem(LS_KEYS.ultimoAcesso, AppState.ultimoAcesso || '');
    
  } catch (e) {
    console.warn('[Engine] Falha ao salvar estado:', e);
  }
}

/**
 * Reseta todo o progresso do aluno (útil para testes).
 * Limpa o localStorage e recarrega a página.
 */
function engineReset() {
  if (!confirm('Tem certeza que deseja resetar todo o seu progresso?')) return;
  Object.values(LS_KEYS).forEach(key => localStorage.removeItem(key));
  window.location.reload();
}

// ═══════════════════════════════════════════════════════════
// 5. ENGINE — Sistema de XP e Níveis
// ═══════════════════════════════════════════════════════════

/**
 * Retorna o objeto de nível correspondente ao XP fornecido.
 * Algoritmo: percorre a tabela NIVEIS do último para o primeiro
 * e retorna o primeiro cujo xpMin seja ≤ ao xpAtual.
 *
 * Complexidade: O(n) onde n = número de níveis (10).
 *
 * @param {number} xp - XP atual do aluno
 * @returns {Nivel} Objeto do nível atual
 */
function engineGetNivel(xp) {
  // Percorre do nível mais alto para o mais baixo
  for (let i = NIVEIS.length - 1; i >= 0; i--) {
    if (xp >= NIVEIS[i].xpMin) return NIVEIS[i];
  }
  return NIVEIS[0]; // Fallback: nível 1
}

/**
 * Retorna o próximo nível após o atual.
 * Retorna null se o aluno já está no nível máximo.
 *
 * @param {number} nivelAtual - Número do nível atual
 * @returns {Nivel|null}
 */
function engineGetProximoNivel(nivelAtual) {
  const proximo = NIVEIS.find(n => n.nivel === nivelAtual + 1);
  return proximo || null;
}

/**
 * Calcula o percentual de progresso DENTRO do nível atual.
 * Usado para a barra de XP no perfil.
 *
 * Exemplo: Se o nível 3 exige 180 XP e o nível 4 exige 320 XP,
 * e o aluno tem 250 XP:
 * → progresso = (250 - 180) / (320 - 180) = 70 / 140 ≈ 50%
 *
 * @param {number} xp
 * @returns {number} Percentual de 0 a 100
 */
function engineGetPorcentagemNivel(xp) {
  const atual   = engineGetNivel(xp);
  const proximo = engineGetProximoNivel(atual.nivel);

  if (!proximo) return 100; // Nível máximo atingido

  const range    = proximo.xpMin - atual.xpMin;
  const progress = xp - atual.xpMin;

  return Math.min(100, Math.round((progress / range) * 100));
}

/**
 * Soma XP ao aluno, verifica subida de nível e persiste.
 *
 * @param {number} quantidade - XP a adicionar
 * @returns {{ nivelAntes: Nivel, nivelDepois: Nivel, subiu: boolean }}
 */
function engineAdicionarXP(quantidade) {
  const nivelAntes = engineGetNivel(AppState.xpTotal);

  AppState.xpTotal += quantidade;

  const nivelDepois = engineGetNivel(AppState.xpTotal);
  const subiu       = nivelDepois.nivel > nivelAntes.nivel;

  engineSave();

  return { nivelAntes, nivelDepois, subiu };
}

// ═══════════════════════════════════════════════════════════
// 6. ENGINE — Progresso e Conclusão de Subtemas
// ═══════════════════════════════════════════════════════════

/**
 * Marca um subtema como concluído e adiciona o XP correspondente.
 * Retorna false se o subtema já estava concluído.
 *
 * @param {string} subtemaId - ID do subtema
 * @param {number} xp        - XP do subtema (de data.js)
 * @returns {boolean} true se foi concluído agora, false se já era
 */
function engineConcluirSubtema(subtemaId, xp) {
  if (AppState.progresso[subtemaId]) return false;  // Já concluído

  AppState.progresso[subtemaId] = true;
  engineAdicionarXP(xp); // Já chama engineSave()

  return true;
}

/**
 * Verifica se um subtema está concluído.
 *
 * @param {string} subtemaId
 * @returns {boolean}
 */
function engineEstaConcluidо(subtemaId) {
  return !!AppState.progresso[subtemaId];
}

/**
 * Calcula métricas globais de progresso a partir do catálogo.
 *
 * @returns {{ total: number, concluidos: number, pct: number }}
 */
function engineCalcProgresso() {
  let total     = 0;
  let concluidos = 0;

  CATALOGO.forEach(area => {
    area.temas.forEach(tema => {
      tema.subtemas.forEach(sub => {
        total++;
        if (AppState.progresso[sub.id]) concluidos++;
      });
    });
  });

  const pct = total > 0 ? Math.round((concluidos / total) * 100) : 0;
  return { total, concluidos, pct };
}

/**
 * Calcula o progresso por área individualmente.
 * Retorna array com { area, total, concluidos, pct } para cada área.
 *
 * @returns {Array<{ area: Area, total: number, concluidos: number, pct: number }>}
 */
function engineCalcProgressoPorArea() {
  return CATALOGO.map(area => {
    let total     = 0;
    let concluidos = 0;

    area.temas.forEach(tema => {
      tema.subtemas.forEach(sub => {
        total++;
        if (AppState.progresso[sub.id]) concluidos++;
      });
    });

    const pct = total > 0 ? Math.round((concluidos / total) * 100) : 0;
    return { area, total, concluidos, pct };
  });
}

// ═══════════════════════════════════════════════════════════
// 7. ENGINE — Sistema de Ranking de Erros
//    Registra quantas vezes o aluno errou em cada subtema.
//    Permite identificar os pontos fracos do aluno.
// ═══════════════════════════════════════════════════════════

/**
 * Registra um erro do aluno em um subtema específico.
 * Incrementa o contador de erros e persiste.
 *
 * @param {string} subtemaId   - ID do subtema onde o erro ocorreu
 * @param {string} subtemaNome - Nome legível do subtema
 */
function engineRegistrarErro(subtemaId, subtemaNome) {
  if (!AppState.ranking[subtemaId]) {
    // Primeira vez errando neste subtema: cria entrada
    AppState.ranking[subtemaId] = { nome: subtemaNome, erros: 0 };
  }

  AppState.ranking[subtemaId].erros++;
  engineSave();
}

/**
 * Retorna o ranking de erros ordenado de forma decrescente.
 * Filtra apenas subtemas com pelo menos 1 erro.
 *
 * Algoritmo de ordenação:
 * - Array.sort() com comparador: b.erros - a.erros
 * - Complexidade: O(n log n) para n subtemas
 *
 * @param {number} [limit=5] - Quantos itens retornar (top N)
 * @returns {Array<{ nome: string, erros: number }>}
 */
function engineGetRankingErros(limit = 5) {
  return Object.values(AppState.ranking)
    .filter(item => item.erros > 0)       // Remove itens sem erros
    .sort((a, b) => b.erros - a.erros)    // Ordena decrescente
    .slice(0, limit);                     // Limita ao top N
}

// ═══════════════════════════════════════════════════════════
// 8. ENGINE — Sistema de Streak (Sequência de dias)
//    Incentiva o aluno a acessar a plataforma diariamente.
// ═══════════════════════════════════════════════════════════

/**
 * Verifica e atualiza a sequência de dias consecutivos (streak).
 * Lógica:
 * - Se o último acesso foi ONTEM → incrementa streak
 * - Se o último acesso foi HOJE  → mantém streak (não dobra)
 * - Se o último acesso foi antes → reseta para 1
 */
function engineAtualizarStreak() {
  const hoje   = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const ultimo = AppState.ultimoAcesso;

  if (!ultimo) {
    // Primeiro acesso na plataforma
    AppState.streak       = 1;
    AppState.ultimoAcesso = hoje;
    engineSave();
    return;
  }

  if (ultimo === hoje) return; // Já acessou hoje, não altera

  // Calcula diferença em dias
  const msUltimo = new Date(ultimo).getTime();
  const msHoje   = new Date(hoje).getTime();
  const diffDias = Math.round((msHoje - msUltimo) / 86_400_000); // 86400000 ms = 1 dia

  if (diffDias === 1) {
    AppState.streak++;         // Acessou ontem: +1 dia consecutivo
  } else {
    AppState.streak = 1;       // Quebrou a sequência: reseta
  }

  AppState.ultimoAcesso = hoje;
  engineSave();
}

// ═══════════════════════════════════════════════════════════
// 9. ENGINE — Busca no Catálogo
//    Utilitários para localizar dados no objeto CATALOGO.
// ═══════════════════════════════════════════════════════════

/**
 * Busca um subtema pelo ID percorrendo todo o catálogo.
 * Retorna o contexto completo: área, tema e subtema.
 *
 * Complexidade: O(A × T × S) — A=áreas, T=temas, S=subtemas.
 * Na prática é muito rápido pois o catálogo é pequeno.
 *
 * @param {string} subtemaId
 * @returns {{ area: Area, tema: Tema, subtema: Subtema } | null}
 */
function engineEncontrarSubtema(subtemaId) {
  for (const area of CATALOGO) {
    for (const tema of area.temas) {
      for (const sub of tema.subtemas) {
        if (sub.id === subtemaId) {
          return { area, tema, subtema: sub };
        }
      }
    }
  }
  return null; // Não encontrado
}

// ═══════════════════════════════════════════════════════════
// 10. ENGINE — Utilitários de UI
// ═══════════════════════════════════════════════════════════

/**
 * Gera a saudação adequada com base no horário.
 *
 * @returns {string}
 */
function engineSaudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia! Vamos estudar para o IFAM? ☀️';
  if (hora < 18) return 'Boa tarde! Continue sua jornada de estudos! 📚';
  return 'Boa noite! Que tal uma revisão rápida? 🌙';
}

/**
 * Formata um número de XP com separador de milhar.
 * Ex: 1234 → "1.234"
 *
 * @param {number} xp
 * @returns {string}
 */
function engineFormatarXP(xp) {
  return xp.toLocaleString('pt-BR');
}
