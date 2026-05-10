const CONTEUDO_PORTUGUES = {
  id: 'portugues',
  nome: 'Português',
  icon: '📝',
  color: '#FFF7ED',
  desc: 'Interpretação, gramática e redação',
  topicos: [
    {
      id: 'interpretacao',
      nome: 'Interpretação de Texto',
      subtopicos: [
        {
          id: 'ideias-principais',
          nome: 'Ideia Principal e Secundária',
          conteudo: {
            titulo: 'Ideia Principal e Secundária',
            texto: `
              <h3>O que é a Ideia Principal?</h3>
              <p>A ideia principal é o tema central do texto — aquilo sobre o qual o autor está falando. Ela sustenta todo o restante do conteúdo.</p>
              <h3>O que são Ideias Secundárias?</h3>
              <p>As ideias secundárias complementam, explicam ou exemplificam a ideia principal. Elas não existem sozinhas: dependem da ideia central para ter sentido.</p>
              <h3>Como identificar?</h3>
              <ul>
                <li>Pergunte: <em>"Do que esse texto trata?"</em> → ideia principal</li>
                <li>Pergunte: <em>"O que o autor diz sobre isso?"</em> → ideias secundárias</li>
                <li>Observe o título e o primeiro parágrafo — geralmente revelam o tema</li>
              </ul>
              <h3>Dica de prova</h3>
              <p>Nas questões de interpretação, o enunciado costuma pedir o que o texto <strong>afirma</strong>, <strong>defende</strong> ou <strong>trata</strong>. Leia o texto inteiro antes de responder e volte ao trecho indicado para confirmar.</p>
            `,
            video: 'https://www.youtube.com/embed/0OD5USbVeAk'
          }
        },
        {
          id: 'inferencia',
          nome: 'Inferência e Linguagem Implícita',
          conteudo: {
            titulo: 'Inferência e Linguagem Implícita',
            texto: `
              <h3>O que é inferir?</h3>
              <p>Inferir é chegar a uma conclusão que <strong>não está escrita</strong> no texto, mas que pode ser compreendida a partir do que foi dito. É "ler nas entrelinhas".</p>
              <h3>Linguagem implícita vs. explícita</h3>
              <ul>
                <li><strong>Explícita:</strong> informação dita diretamente ("O aluno foi aprovado.")</li>
                <li><strong>Implícita:</strong> informação deduzida ("O aluno comemorou muito." → subentende-se que foi aprovado)</li>
              </ul>
              <h3>Pressupostos e Subentendidos</h3>
              <p><strong>Pressuposto</strong> é algo que o leitor precisa aceitar para a frase fazer sentido. <strong>Subentendido</strong> é uma informação que o autor insinua, mas não assume responsabilidade.</p>
              <h3>Exemplo</h3>
              <p>"João ainda fuma." → Pressuposto: João fumava antes. Subentendido: Fumar é um hábito negativo.</p>
            `,
            video: 'https://www.youtube.com/embed/WJRV_0OFCXQ'
          }
        }
      ]
    },
    {
      id: 'gramatica',
      nome: 'Gramática',
      subtopicos: [
        {
          id: 'classes-gramaticais',
          nome: 'Classes Gramaticais',
          conteudo: {
            titulo: 'Classes Gramaticais',
            texto: `
              <h3>As 10 Classes Gramaticais</h3>
              <ul>
                <li><code>Substantivo</code> — nomeia seres, lugares, sentimentos (ex: <em>casa, felicidade</em>)</li>
                <li><code>Artigo</code> — determina o substantivo (ex: <em>o, a, um, uma</em>)</li>
                <li><code>Adjetivo</code> — caracteriza o substantivo (ex: <em>bonito, rápido</em>)</li>
                <li><code>Numeral</code> — indica quantidade ou ordem (ex: <em>dois, primeiro</em>)</li>
                <li><code>Pronome</code> — substitui ou acompanha o substantivo (ex: <em>eu, ele, meu</em>)</li>
                <li><code>Verbo</code> — indica ação, estado ou fenômeno (ex: <em>correr, ser, chover</em>)</li>
                <li><code>Advérbio</code> — modifica verbo, adjetivo ou outro advérbio (ex: <em>muito, nunca, bem</em>)</li>
                <li><code>Preposição</code> — liga palavras (ex: <em>de, em, por, com</em>)</li>
                <li><code>Conjunção</code> — liga orações (ex: <em>e, mas, porque, portanto</em>)</li>
                <li><code>Interjeição</code> — expressa emoção (ex: <em>Ai! Nossa! Oba!</em>)</li>
              </ul>
              <h3>Dica</h3>
              <p>A mesma palavra pode pertencer a classes diferentes dependendo do contexto. <em>"Ele falou baixo"</em> (advérbio) vs. <em>"Ele comprou um apartamento baixo"</em> (adjetivo).</p>
            `,
            video: 'https://www.youtube.com/embed/BLHn7qMnMYQ'
          }
        },
        {
          id: 'concordancia',
          nome: 'Concordância Verbal e Nominal',
          conteudo: {
            titulo: 'Concordância Verbal e Nominal',
            texto: `
              <h3>Concordância Nominal</h3>
              <p>O adjetivo concorda em <strong>gênero</strong> (masculino/feminino) e <strong>número</strong> (singular/plural) com o substantivo a que se refere.</p>
              <p>Ex: <em>"As alunas dedicadas"</em> — <em>dedicadas</em> concorda com <em>alunas</em> (fem. plural).</p>
              <h3>Concordância Verbal</h3>
              <p>O verbo concorda em <strong>número</strong> e <strong>pessoa</strong> com o sujeito.</p>
              <p>Ex: <em>"Os meninos correm."</em> — <em>correm</em> (3ª pessoa do plural) concorda com <em>os meninos</em>.</p>
              <h3>Casos Especiais</h3>
              <ul>
                <li>Sujeito coletivo → verbo no singular: <em>"A turma saiu."</em></li>
                <li>Sujeito composto antes do verbo → verbo no plural: <em>"Pedro e Ana chegaram."</em></li>
                <li>Pronome <strong>se</strong> como partícula apassivadora → verbo concorda com o sujeito: <em>"Vendem-se casas."</em></li>
              </ul>
            `,
            video: 'https://www.youtube.com/embed/pB7M_9pBBW8'
          }
        }
      ]
    },
    {
      id: 'redacao',
      nome: 'Redação',
      subtopicos: [
        {
          id: 'dissertacao',
          nome: 'Dissertação Argumentativa',
          conteudo: {
            titulo: 'Dissertação Argumentativa',
            texto: `
              <h3>O que é?</h3>
              <p>É o tipo de texto mais cobrado nas provas de ingresso. Exige que você defenda um ponto de vista sobre um tema com argumentos sólidos e organizados.</p>
              <h3>Estrutura Obrigatória</h3>
              <ul>
                <li><strong>Introdução</strong> — apresente o tema e sua tese (ponto de vista). De 3 a 5 linhas.</li>
                <li><strong>Desenvolvimento</strong> — 2 parágrafos, cada um com 1 argumento + 1 exemplo ou dado concreto.</li>
                <li><strong>Conclusão</strong> — retome a tese, sintetize os argumentos e, se pedido, proponha uma solução. De 3 a 4 linhas.</li>
              </ul>
              <h3>Conectivos Essenciais</h3>
              <ul>
                <li>Adição: <em>além disso, também, ademais</em></li>
                <li>Oposição: <em>no entanto, porém, contudo, todavia</em></li>
                <li>Conclusão: <em>portanto, logo, assim, dessa forma</em></li>
                <li>Causa: <em>pois, porque, visto que, já que</em></li>
              </ul>
              <h3>Erros Mais Comuns</h3>
              <p>Fugir do tema, usar gírias, escrever em 1ª pessoa (eu acho...), e não propor solução quando exigido.</p>
            `,
            video: 'https://www.youtube.com/embed/LUuMBBW2T5Q'
          }
        }
      ]
    }
  ]
};
