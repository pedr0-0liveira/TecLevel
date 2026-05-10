const CONTEUDO_HISTORIA = {
  id: 'historia',
  nome: 'História',
  icon: '🏛️',
  color: '#FFFBEB',
  desc: 'Historia do Brasil e do Mundial',
  topicos: [
    {
      id: 'historia-brasil',
      nome: 'História do Brasil',
      subtopicos: [
        {
          id: 'colonizacao',
          nome: 'Colonização e Brasil Colônia',
          conteudo: {
            titulo: 'Colonização e Brasil Colônia',
            texto: `
              <h3>O Contexto das Grandes Navegações</h3>
              <p>No século XV, europeus buscavam rotas para as Índias em busca de especiarias. Portugal liderou as navegações e chegou ao Brasil em <strong>1500</strong>, com a expedição de Pedro Álvares Cabral.</p>
              <h3>Ciclos Econômicos</h3>
              <ul>
                <li><strong>Pau-brasil (1500–1530):</strong> extração de madeira valiosa para tingimento.</li>
                <li><strong>Cana-de-açúcar (1530–1650):</strong> principal riqueza do período; base do trabalho escravo africano.</li>
                <li><strong>Mineração (1700–1800):</strong> descoberta de ouro e diamantes em Minas Gerais; enriquecimento da Coroa Portuguesa.</li>
              </ul>
              <h3>Resistência Indígena e Africana</h3>
              <p>Os povos indígenas resistiram à colonização e muitos foram escravizados ou dizimados por doenças. Os africanos escravizados criaram formas de resistência como os <strong>quilombos</strong> (Quilombo dos Palmares — líder Zumbi).</p>
              <h3>Inconfidência Mineira (1789)</h3>
              <p>Movimento separatista em Minas Gerais contra os impostos portugueses. O principal líder, <strong>Tiradentes</strong>, foi enforcado e esquartejado.</p>
            `,
            video: 'https://www.youtube.com/embed/Lmz-bOTqTEk'
          }
        },
        {
          id: 'republica',
          nome: 'República e Brasil Contemporâneo',
          conteudo: {
            titulo: 'República e Brasil Contemporâneo',
            texto: `
              <h3>Proclamação da República (1889)</h3>
              <p>Em 15 de novembro de 1889, o Marechal Deodoro da Fonseca proclamou a República, encerrando o Império de Dom Pedro II.</p>
              <h3>República Velha (1889–1930)</h3>
              <p>Dominada pelas oligarquias rurais de São Paulo e Minas Gerais — a chamada <strong>política do café com leite</strong>. O voto era aberto (voto de cabresto) e a corrupção era ampla.</p>
              <h3>Era Vargas (1930–1945 e 1950–1954)</h3>
              <p>Getúlio Vargas governou como ditador no <strong>Estado Novo</strong> (1937–1945), com censura e industrialização. Criou a CLT (1943) e a Petrobras (1953).</p>
              <h3>Ditadura Militar (1964–1985)</h3>
              <p>Golpe militar em 1964. Período marcado por AI-5 (1968), censura, repressão e "milagre econômico". A redemocratização culminou na <strong>Constituição de 1988</strong>.</p>
            `,
            video: 'https://www.youtube.com/embed/5P8iMmzRCOQ'
          }
        }
      ]
    }
  ]
};
