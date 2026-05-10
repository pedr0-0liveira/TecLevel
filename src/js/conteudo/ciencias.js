const CONTEUDO_CIENCIAS = {
  id: 'ciencias',
  nome: 'Ciências',
  icon: '🔬',
  color: '#F0FFF4',
  desc: 'Biologia, Química e Física básica',
  topicos: [
    {
      id: 'biologia',
      nome: 'Biologia',
      subtopicos: [
        {
          id: 'celula',
          nome: 'A Célula',
          conteudo: {
            titulo: 'A Célula',
            texto: `
              <h3>A Unidade da Vida</h3>
              <p>A célula é a menor unidade estrutural e funcional dos seres vivos. Todo organismo é formado por uma ou mais células.</p>
              <h3>Tipos de Células</h3>
              <ul>
                <li><strong>Procariótica:</strong> sem núcleo definido (membrana nuclear ausente). Ex: bactérias.</li>
                <li><strong>Eucariótica:</strong> possui núcleo com membrana nuclear. Ex: células animais e vegetais.</li>
              </ul>
              <h3>Estruturas Principais</h3>
              <ul>
                <li><code>Membrana plasmática</code> — controla a entrada e saída de substâncias</li>
                <li><code>Citoplasma</code> — meio onde ficam as organelas</li>
                <li><code>Núcleo</code> — contém o DNA e controla as atividades celulares</li>
                <li><code>Mitocôndria</code> — produz energia (ATP) — "usina da célula"</li>
                <li><code>Ribossomo</code> — produz proteínas</li>
                <li><code>Cloroplasto</code> — presente em vegetais; realiza a fotossíntese</li>
              </ul>
              <h3>Divisão Celular</h3>
              <p><strong>Mitose:</strong> gera 2 células iguais (crescimento). <strong>Meiose:</strong> gera 4 células com metade dos cromossomos (reprodução sexuada).</p>
            `,
            video: 'https://www.youtube.com/embed/8IlzKri08kU'
          }
        },
        {
          id: 'ecologia',
          nome: 'Ecologia e Meio Ambiente',
          conteudo: {
            titulo: 'Ecologia e Meio Ambiente',
            texto: `
              <h3>Conceitos Fundamentais</h3>
              <ul>
                <li><strong>Ecossistema:</strong> conjunto de seres vivos + ambiente físico interagindo.</li>
                <li><strong>Bioma:</strong> grande região com clima, flora e fauna característicos. Ex: Amazônia, Cerrado.</li>
                <li><strong>Habitat:</strong> local onde o organismo vive. <strong>Nicho ecológico:</strong> papel que desempenha no ecossistema.</li>
              </ul>
              <h3>Cadeias e Teias Alimentares</h3>
              <ul>
                <li><strong>Produtores:</strong> vegetais — fazem fotossíntese</li>
                <li><strong>Consumidores primários:</strong> herbívoros</li>
                <li><strong>Consumidores secundários:</strong> carnívoros que comem herbívoros</li>
                <li><strong>Decompositores:</strong> fungos e bactérias — reciclam a matéria</li>
              </ul>
              <h3>Relações Ecológicas</h3>
              <p><strong>Harmônicas:</strong> mutualismo (+/+), comensalismo (+/0), protocooperação. <strong>Desarmônicas:</strong> predatismo (+/−), parasitismo (+/−), competição (−/−).</p>
            `,
            video: 'https://www.youtube.com/embed/2Sn3S9x1NvE'
          }
        }
      ]
    },
    {
      id: 'quimica',
      nome: 'Química',
      subtopicos: [
        {
          id: 'tabela-periodica',
          nome: 'Tabela Periódica e Ligações',
          conteudo: {
            titulo: 'Tabela Periódica e Ligações Químicas',
            texto: `
              <h3>A Tabela Periódica</h3>
              <p>Organiza os elementos por número atômico crescente. <strong>Períodos</strong> (linhas) indicam o número de camadas eletrônicas; <strong>famílias/grupos</strong> (colunas) indicam o número de elétrons na última camada (valência).</p>
              <h3>Família dos Gases Nobeis (18)</h3>
              <p>Estáveis, com camada de valência completa. Não formam ligações comuns. Ex: Hélio (He), Neônio (Ne), Argônio (Ar).</p>
              <h3>Tipos de Ligação Química</h3>
              <ul>
                <li><strong>Iônica:</strong> metal + não-metal → transferência de elétrons → forma íons. Ex: NaCl (sal de cozinha).</li>
                <li><strong>Covalente:</strong> não-metal + não-metal → compartilhamento de elétrons. Ex: H₂O, CO₂.</li>
                <li><strong>Metálica:</strong> metal + metal → "mar de elétrons". Responsável pela condutividade.</li>
              </ul>
              <h3>Regra do Octeto</h3>
              <p>Os átomos tendem a ganhar, perder ou compartilhar elétrons até atingir 8 elétrons na última camada (estabilidade).</p>
            `,
            video: 'https://www.youtube.com/embed/Zb8LGG7AvI0'
          }
        }
      ]
    },
    {
      id: 'fisica',
      nome: 'Física',
      subtopicos: [
        {
          id: 'cinematica',
          nome: 'Cinemática: Movimento e Velocidade',
          conteudo: {
            titulo: 'Cinemática: Movimento e Velocidade',
            texto: `
              <h3>Conceitos Básicos</h3>
              <ul>
                <li><strong>Posição (s):</strong> onde o objeto está no espaço.</li>
                <li><strong>Deslocamento (Δs):</strong> variação de posição = s_final − s_inicial.</li>
                <li><strong>Distância:</strong> total percorrido (sempre positivo).</li>
              </ul>
              <h3>Velocidade e Aceleração</h3>
              <ul>
                <li><strong>Velocidade média:</strong> <code>v = Δs / Δt</code></li>
                <li><strong>Aceleração média:</strong> <code>a = Δv / Δt</code></li>
              </ul>
              <h3>Movimento Uniforme (MU)</h3>
              <p>Velocidade constante, aceleração zero. Equação: <code>s = s₀ + v·t</code>.</p>
              <h3>Movimento Uniformemente Variado (MUV)</h3>
              <p>Aceleração constante. Equações:</p>
              <ul>
                <li><code>v = v₀ + a·t</code></li>
                <li><code>s = s₀ + v₀·t + (a·t²)/2</code></li>
                <li><code>v² = v₀² + 2·a·Δs</code> (equação de Torricelli)</li>
              </ul>
            `,
            video: 'https://www.youtube.com/embed/JX8kRxFpLSE'
          }
        }
      ]
    }
  ]
};
