/* ══════════════════════════════════════════════════════════════
   DATA INDEX — Combina conteúdo e questões de cada matéria

   Este arquivo recebe os objetos CONTEUDO_* e QUESTOES_*
   carregados antes dele e os une em um único array DATA,
   que é consumido pelo app.js sem qualquer alteração.

   Para adicionar uma nova matéria:
     1. Crie conteudo/nova-materia.js  → exporte CONTEUDO_NOVAMATERIA
     2. Crie questoes/nova-materia.js  → exporte QUESTOES_NOVAMATERIA
     3. Adicione o script no index.html (antes deste arquivo)
     4. Adicione mergeQuestoes(CONTEUDO_NOVAMATERIA, QUESTOES_NOVAMATERIA) abaixo
══════════════════════════════════════════════════════════════ */

/**
 * Combina um objeto de conteúdo com um objeto de questões.
 *
 * O objeto de questões deve usar o id do subtópico como chave:
 *   { 'id-do-subtopico': [ { q, opts, certa }, ... ] }
 *
 * @param {Object} conteudo  - Objeto CONTEUDO_* de uma matéria
 * @param {Object} questoes  - Objeto QUESTOES_* da mesma matéria
 * @returns {Object}         - Matéria com quiz embutido em cada subtópico
 */
function mergeQuestoes(conteudo, questoes) {
  return {
    ...conteudo,
    topicos: conteudo.topicos.map(topico => ({
      ...topico,
      subtopicos: topico.subtopicos.map(sub => ({
        ...sub,
        quiz: questoes[sub.id] || [] // Injeta o array de questões pelo id do subtópico
      }))
    }))
  };
}

/* ── Montagem do array global DATA ── */
const DATA = [
  mergeQuestoes(CONTEUDO_PORTUGUES,   QUESTOES_PORTUGUES),
  mergeQuestoes(CONTEUDO_MATEMATICA,  QUESTOES_MATEMATICA),
  mergeQuestoes(CONTEUDO_CIENCIAS,    QUESTOES_CIENCIAS),
  mergeQuestoes(CONTEUDO_HISTORIA,    QUESTOES_HISTORIA),
  mergeQuestoes(CONTEUDO_GEOGRAFIA,    QUESTOES_GEOGRAFIA),

];
