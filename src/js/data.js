/**
 * ════════════════════════════════════════════════════════════
 *  LevelTecUp — src/js/data.js
 *  Base de dados: Áreas → Temas → Subtemas
 *
 *  Estrutura de cada Subtema:
 *  ├── id        : identificador único (string)
 *  ├── nome      : nome exibido na UI
 *  ├── xp        : pontos de experiência ao concluir
 *  ├── conteudo  : HTML com a explicação teórica
 *  └── exercicios: array de questões de múltipla escolha
 *       ├── id          : identificador único da questão
 *       ├── enunciado   : texto da pergunta
 *       ├── alternativas: array de strings (opções A, B, C, D)
 *       └── gabarito    : índice (0-based) da alternativa correta
 *
 *  Focado em: IFAM · CMM · Colégio Matias Machline
 *  Público-alvo: Alunos do 9º ano do Ensino Fundamental
 *
 *  Para adicionar conteúdo:
 *  1. Localize a área/tema desejado.
 *  2. Adicione um novo objeto ao array `subtemas`.
 *  3. Garanta que o `id` seja único em todo o catálogo.
 * ════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════════
// CATÁLOGO PRINCIPAL
// Array de Áreas. Cada área contém Temas, que contêm Subtemas.
// ═══════════════════════════════════════════════════════════

/** @type {Area[]} Catálogo completo do curso LevelTecUp */
const CATALOGO = [

  // ──────────────────────────────────────────────────────
  // ÁREA 1: MATEMÁTICA
  // Temas: Álgebra, Geometria, Aritmética, Estatística
  // ──────────────────────────────────────────────────────
  {
    id:    'mat',
    nome:  'Matemática',
    icone: '📐',
    cor:   '#4d9fff',   // Azul — variável CSS --accent-blue
    temas: [

      // ── TEMA: ÁLGEBRA ──────────────────────────────────
      {
        id:   'mat-alg',
        nome: 'Álgebra',
        subtemas: [

          {
            id:   'mat-alg-01',
            nome: 'Equações do 1º Grau',
            xp:   50,
            conteudo: `
              <p>Uma <strong>equação do 1º grau</strong> com uma incógnita possui a forma
              canônica <strong>ax + b = 0</strong>, onde <em>a ≠ 0</em> e <em>a, b ∈ ℝ</em>.</p>

              <p>O processo de resolução consiste em isolar a incógnita <em>x</em>
              usando as <strong>operações inversas</strong>:</p>
              <p><code>ax + b = 0 → ax = –b → x = –b/a</code></p>

              <p><strong>Exemplo prático:</strong></p>
              <p>Resolva: <em>3x + 6 = 0</em></p>
              <p>→ 3x = –6 → x = –6/3 → <strong>x = –2</strong></p>

              <p><strong>Dica IFAM:</strong> Verifique sempre substituindo o valor encontrado
              na equação original. Se o resultado for uma identidade, a solução está correta.</p>
            `,
            exercicios: [
              {
                id:           'mat-alg-01-q1',
                enunciado:    'Resolva a equação: 2x + 4 = 0',
                alternativas: ['x = 2', 'x = –2', 'x = 4', 'x = –4'],
                gabarito:     1   // x = –2
              },
              {
                id:           'mat-alg-01-q2',
                enunciado:    'Qual é o valor de x em: 5x – 15 = 0?',
                alternativas: ['x = –5', 'x = 15', 'x = 3', 'x = –3'],
                gabarito:     2   // x = 3
              },
              {
                id:           'mat-alg-01-q3',
                enunciado:    '(IFAM 2022) Um número somado a 7 resulta em 19. Esse número é:',
                alternativas: ['10', '12', '14', '16'],
                gabarito:     1   // 12
              }
            ]
          },

          {
            id:   'mat-alg-02',
            nome: 'Equações do 2º Grau',
            xp:   80,
            conteudo: `
              <p>A <strong>equação do 2º grau</strong> tem a forma <strong>ax² + bx + c = 0</strong>,
              com <em>a ≠ 0</em> e <em>a, b, c ∈ ℝ</em>.</p>

              <p>As raízes são calculadas pela <strong>Fórmula de Bhaskara</strong>:</p>
              <p><code>x = (–b ± √Δ) / 2a</code>, onde <code>Δ = b² – 4ac</code></p>

              <p><strong>Classificação pelo discriminante Δ:</strong></p>
              <p>• Δ &gt; 0 → duas raízes reais e distintas</p>
              <p>• Δ = 0 → duas raízes reais e iguais (raiz dupla)</p>
              <p>• Δ &lt; 0 → nenhuma raiz real (raízes complexas)</p>

              <p><strong>Relações de Girard</strong> (soma e produto das raízes):</p>
              <p>• x₁ + x₂ = –b/a</p>
              <p>• x₁ · x₂ = c/a</p>
            `,
            exercicios: [
              {
                id:           'mat-alg-02-q1',
                enunciado:    'Calcule o discriminante Δ de: x² – 5x + 6 = 0',
                alternativas: ['Δ = 1', 'Δ = 25', 'Δ = 49', 'Δ = 11'],
                gabarito:     0   // Δ = 25 – 24 = 1
              },
              {
                id:           'mat-alg-02-q2',
                enunciado:    'Quais são as raízes de x² – 5x + 6 = 0?',
                alternativas: ['x = 1 e x = 6', 'x = 2 e x = 3', 'x = –2 e x = –3', 'x = 1 e x = –6'],
                gabarito:     1   // x = 2 e x = 3
              },
              {
                id:           'mat-alg-02-q3',
                enunciado:    'Uma equação do 2º grau tem Δ = –4. Isso significa que ela possui:',
                alternativas: [
                  'Duas raízes reais distintas',
                  'Uma raiz real dupla',
                  'Nenhuma raiz real',
                  'Raízes iguais a zero'
                ],
                gabarito: 2   // Nenhuma raiz real
              }
            ]
          },

          {
            id:   'mat-alg-03',
            nome: 'Sistemas de Equações',
            xp:   70,
            conteudo: `
              <p>Um <strong>sistema de equações</strong> é um conjunto de equações
              que devem ser satisfeitas simultaneamente.</p>

              <p>Principais métodos de resolução:</p>
              <p>• <strong>Substituição:</strong> isola-se uma incógnita em uma equação e
              substitui-se na outra.</p>
              <p>• <strong>Adição (Eliminação):</strong> somam-se as equações de modo a
              eliminar uma das incógnitas.</p>
              <p>• <strong>Igualação:</strong> isola-se a mesma incógnita nas duas equações
              e igualam-se os membros.</p>

              <p><strong>Exemplo:</strong> Resolva o sistema {2x + y = 7; x – y = 2}</p>
              <p>Somando as equações: 3x = 9 → x = 3; y = 7 – 2(3) = 1.</p>
            `,
            exercicios: [
              {
                id:           'mat-alg-03-q1',
                enunciado:    'Resolva: {x + y = 10; x – y = 4}. Qual é o valor de x?',
                alternativas: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
                gabarito:     2   // x = 7
              }
            ]
          }
        ]
      },

      // ── TEMA: GEOMETRIA ────────────────────────────────
      {
        id:   'mat-geo',
        nome: 'Geometria',
        subtemas: [

          {
            id:   'mat-geo-01',
            nome: 'Áreas de Figuras Planas',
            xp:   60,
            conteudo: `
              <p>Principais fórmulas de <strong>área</strong> exigidas no IFAM:</p>
              <p>• <strong>Quadrado:</strong> A = l²</p>
              <p>• <strong>Retângulo:</strong> A = b × h</p>
              <p>• <strong>Triângulo:</strong> A = (b × h) / 2</p>
              <p>• <strong>Trapézio:</strong> A = [(B + b) × h] / 2</p>
              <p>• <strong>Paralelogramo:</strong> A = b × h</p>
              <p>• <strong>Círculo:</strong> A = π × r²</p>

              <p><strong>Atenção:</strong> A altura (<em>h</em>) deve ser sempre
              perpendicular à base.</p>
            `,
            exercicios: [
              {
                id:           'mat-geo-01-q1',
                enunciado:    'Qual é a área de um círculo com raio r = 3 cm? (Use π)',
                alternativas: ['6π cm²', '9π cm²', '3π cm²', '12π cm²'],
                gabarito:     1   // 9π
              },
              {
                id:           'mat-geo-01-q2',
                enunciado:    'Um retângulo tem base 8 m e altura 5 m. Qual é sua área?',
                alternativas: ['26 m²', '40 m²', '13 m²', '80 m²'],
                gabarito:     1   // 40
              }
            ]
          },

          {
            id:   'mat-geo-02',
            nome: 'Teorema de Pitágoras',
            xp:   65,
            conteudo: `
              <p>O <strong>Teorema de Pitágoras</strong> afirma que em todo triângulo
              retângulo, o quadrado da <strong>hipotenusa</strong> é igual à soma dos
              quadrados dos <strong>catetos</strong>:</p>
              <p><strong>a² = b² + c²</strong></p>
              <p>onde <em>a</em> é a hipotenusa e <em>b, c</em> são os catetos.</p>

              <p><strong>Ternas pitagóricas comuns</strong> (muito cobradas no IFAM):</p>
              <p>• (3, 4, 5) — pois 9 + 16 = 25</p>
              <p>• (5, 12, 13) — pois 25 + 144 = 169</p>
              <p>• (8, 15, 17) — pois 64 + 225 = 289</p>
            `,
            exercicios: [
              {
                id:           'mat-geo-02-q1',
                enunciado:    'Um triângulo retângulo tem catetos 3 e 4. Qual é a hipotenusa?',
                alternativas: ['6', '5', '7', '√7'],
                gabarito:     1   // 5
              },
              {
                id:           'mat-geo-02-q2',
                enunciado:    'Um quadrado tem diagonal 5√2 cm. Qual é o lado do quadrado?',
                alternativas: ['5 cm', '√10 cm', '10 cm', '2√5 cm'],
                gabarito:     0   // 5
              }
            ]
          },

          {
            id:   'mat-geo-03',
            nome: 'Volume de Sólidos Geométricos',
            xp:   75,
            conteudo: `
              <p>Principais fórmulas de <strong>volume</strong>:</p>
              <p>• <strong>Cubo:</strong> V = a³</p>
              <p>• <strong>Paralelepípedo:</strong> V = c × l × h</p>
              <p>• <strong>Cilindro:</strong> V = π × r² × h</p>
              <p>• <strong>Cone:</strong> V = (π × r² × h) / 3</p>
              <p>• <strong>Esfera:</strong> V = (4/3) × π × r³</p>
              <p>• <strong>Pirâmide:</strong> V = (A_base × h) / 3</p>

              <p><strong>Lembre-se:</strong> Volume é sempre em unidades cúbicas (cm³, m³).</p>
            `,
            exercicios: [
              {
                id:           'mat-geo-03-q1',
                enunciado:    'Um cubo tem aresta 3 cm. Qual é o seu volume?',
                alternativas: ['9 cm³', '18 cm³', '27 cm³', '81 cm³'],
                gabarito:     2   // 27
              }
            ]
          }
        ]
      },

      // ── TEMA: ARITMÉTICA ───────────────────────────────
      {
        id:   'mat-ari',
        nome: 'Aritmética e Números',
        subtemas: [

          {
            id:   'mat-ari-01',
            nome: 'Potenciação e Radiciação',
            xp:   55,
            conteudo: `
              <p>A <strong>potenciação</strong> é uma multiplicação de fatores iguais:</p>
              <p><code>aⁿ = a × a × a × ... (n vezes)</code></p>

              <p><strong>Propriedades importantes:</strong></p>
              <p>• Produto de potências de mesma base: aᵐ × aⁿ = aᵐ⁺ⁿ</p>
              <p>• Quociente: aᵐ / aⁿ = aᵐ⁻ⁿ</p>
              <p>• Potência de potência: (aᵐ)ⁿ = aᵐⁿ</p>
              <p>• Expoente zero: a⁰ = 1 (para a ≠ 0)</p>
              <p>• Expoente negativo: a⁻ⁿ = 1/aⁿ</p>

              <p>A <strong>radiciação</strong> é a operação inversa:</p>
              <p><code>ⁿ√a = b ↔ bⁿ = a</code></p>
            `,
            exercicios: [
              {
                id:           'mat-ari-01-q1',
                enunciado:    'Quanto vale 2³ × 2²?',
                alternativas: ['2⁵ = 32', '2⁶ = 64', '4⁵ = 1024', '2¹ = 2'],
                gabarito:     0   // 2^5 = 32
              },
              {
                id:           'mat-ari-01-q2',
                enunciado:    'Qual é o valor de √144?',
                alternativas: ['11', '12', '13', '14'],
                gabarito:     1   // 12
              }
            ]
          },

          {
            id:   'mat-ari-02',
            nome: 'Razão, Proporção e Regra de Três',
            xp:   60,
            conteudo: `
              <p>A <strong>razão</strong> entre a e b é a/b (b ≠ 0).</p>
              <p>Uma <strong>proporção</strong> é a igualdade entre duas razões: a/b = c/d.</p>
              <p><strong>Propriedade fundamental:</strong> a × d = b × c (produto cruzado).</p>

              <p><strong>Regra de três simples:</strong></p>
              <p>Se 3 grandezas são diretamente proporcionais:</p>
              <p>• 5 cadernos custam R$ 20,00. Quanto custam 8 cadernos?</p>
              <p>→ 5/20 = 8/x → x = (8 × 20)/5 = <strong>R$ 32,00</strong></p>
            `,
            exercicios: [
              {
                id:           'mat-ari-02-q1',
                enunciado:    'Se 4 pizzas alimentam 12 pessoas, quantas pizzas alimentam 30 pessoas?',
                alternativas: ['8 pizzas', '10 pizzas', '12 pizzas', '15 pizzas'],
                gabarito:     1   // 10
              }
            ]
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // ÁREA 2: FÍSICA
  // Temas: Mecânica, Termodinâmica, Óptica, Eletricidade
  // ──────────────────────────────────────────────────────
  {
    id:    'fis',
    nome:  'Física',
    icone: '⚛️',
    cor:   '#2edd9a',   // Verde — variável CSS --accent-green
    temas: [

      // ── TEMA: MECÂNICA ─────────────────────────────────
      {
        id:   'fis-mec',
        nome: 'Mecânica',
        subtemas: [

          {
            id:   'fis-mec-01',
            nome: 'Leis de Newton',
            xp:   70,
            conteudo: `
              <p>As <strong>três Leis de Newton</strong> fundamentam a Mecânica Clássica:</p>

              <p><strong>1ª Lei — Princípio da Inércia:</strong><br>
              "Um corpo em repouso tende a permanecer em repouso, e um corpo em movimento
              retilíneo uniforme tende a manter esse movimento, desde que a força resultante
              que age sobre ele seja nula."</p>

              <p><strong>2ª Lei — Princípio Fundamental da Dinâmica:</strong><br>
              <code>F = m × a</code><br>
              A força resultante é o produto da massa pela aceleração.</p>

              <p><strong>3ª Lei — Lei da Ação e Reação:</strong><br>
              "Para toda ação há uma reação igual em módulo, oposta em sentido e
              na mesma linha de ação."</p>
            `,
            exercicios: [
              {
                id:           'fis-mec-01-q1',
                enunciado:    'Um objeto de 5 kg é submetido a uma força F = 20 N. Qual é a aceleração?',
                alternativas: ['2 m/s²', '4 m/s²', '10 m/s²', '100 m/s²'],
                gabarito:     1   // 4 m/s²
              },
              {
                id:           'fis-mec-01-q2',
                enunciado:    'Qual lei de Newton explica por que precisamos usar cinto de segurança?',
                alternativas: ['3ª Lei', '2ª Lei', '1ª Lei (Inércia)', 'Lei da Gravitação'],
                gabarito:     2   // Inércia
              }
            ]
          },

          {
            id:   'fis-mec-02',
            nome: 'Cinemática — MRU e MRUV',
            xp:   65,
            conteudo: `
              <p><strong>Cinemática</strong> estuda o movimento sem considerar suas causas.</p>

              <p><strong>MRU (Movimento Retilíneo Uniforme):</strong></p>
              <p>• Velocidade constante: v = constante</p>
              <p>• Equação horária: <code>s = s₀ + v·t</code></p>

              <p><strong>MRUV (Movimento Retilíneo Uniformemente Variado):</strong></p>
              <p>• Aceleração constante: a = constante</p>
              <p>• Equação da velocidade: <code>v = v₀ + a·t</code></p>
              <p>• Equação horária: <code>s = s₀ + v₀t + at²/2</code></p>
              <p>• Equação de Torricelli: <code>v² = v₀² + 2a·Δs</code></p>
            `,
            exercicios: [
              {
                id:           'fis-mec-02-q1',
                enunciado:    'Em MRU com v = 10 m/s, qual o espaço percorrido em 5 s (s₀ = 0)?',
                alternativas: ['2 m', '50 m', '15 m', '500 m'],
                gabarito:     1   // 50 m
              },
              {
                id:           'fis-mec-02-q2',
                enunciado:    'Um carro parte do repouso com a = 2 m/s². Qual sua velocidade após 5 s?',
                alternativas: ['5 m/s', '7 m/s', '10 m/s', '20 m/s'],
                gabarito:     2   // 10 m/s
              }
            ]
          }
        ]
      },

      // ── TEMA: TERMODINÂMICA ────────────────────────────
      {
        id:   'fis-ter',
        nome: 'Termodinâmica e Calor',
        subtemas: [

          {
            id:   'fis-ter-01',
            nome: 'Temperatura e Escalas Termométricas',
            xp:   55,
            conteudo: `
              <p><strong>Temperatura</strong> é uma grandeza física que mede o grau de
              agitação das moléculas de um corpo.</p>

              <p><strong>Escalas termométricas:</strong></p>
              <p>• <strong>Celsius (°C):</strong> água congela em 0°C, ferve em 100°C</p>
              <p>• <strong>Fahrenheit (°F):</strong> água congela em 32°F, ferve em 212°F</p>
              <p>• <strong>Kelvin (K):</strong> escala absoluta; 0 K = –273,15°C</p>

              <p><strong>Conversão Celsius ↔ Fahrenheit:</strong></p>
              <p><code>(°F – 32) / 9 = °C / 5</code></p>

              <p><strong>Conversão Celsius ↔ Kelvin:</strong></p>
              <p><code>K = °C + 273</code></p>
            `,
            exercicios: [
              {
                id:           'fis-ter-01-q1',
                enunciado:    '37°C (temperatura corporal) equivale a quantos Kelvin?',
                alternativas: ['236 K', '273 K', '310 K', '373 K'],
                gabarito:     2   // 310 K
              }
            ]
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // ÁREA 3: PORTUGUÊS
  // Temas: Gramática, Interpretação, Redação
  // ──────────────────────────────────────────────────────
  {
    id:    'port',
    nome:  'Português',
    icone: '✍️',
    cor:   '#a78bfa',   // Roxo — variável CSS --accent-purple
    temas: [

      // ── TEMA: GRAMÁTICA ────────────────────────────────
      {
        id:   'port-gram',
        nome: 'Gramática',
        subtemas: [

          {
            id:   'port-gram-01',
            nome: 'Classes de Palavras',
            xp:   50,
            conteudo: `
              <p>As <strong>10 classes de palavras</strong> da Língua Portuguesa:</p>

              <p>• <strong>Substantivo:</strong> nomeia seres, objetos, lugares (ex: casa, João).</p>
              <p>• <strong>Adjetivo:</strong> caracteriza o substantivo (ex: bonito, grande).</p>
              <p>• <strong>Artigo:</strong> acompanha o substantivo (o, a, um, uma).</p>
              <p>• <strong>Numeral:</strong> indica quantidade ou ordem (ex: dois, primeiro).</p>
              <p>• <strong>Pronome:</strong> substitui ou acompanha o substantivo (eu, me, meu).</p>
              <p>• <strong>Verbo:</strong> expressa ação, estado ou fenômeno (correr, ser, chover).</p>
              <p>• <strong>Advérbio:</strong> modifica o verbo, adjetivo ou outro advérbio (rapidamente).</p>
              <p>• <strong>Preposição:</strong> liga palavras (de, para, com, em).</p>
              <p>• <strong>Conjunção:</strong> liga orações (e, mas, porque, se).</p>
              <p>• <strong>Interjeição:</strong> expressa emoção (Ah! Uau! Ei!).</p>
            `,
            exercicios: [
              {
                id:           'port-gram-01-q1',
                enunciado:    'Na frase "O livro novo está na estante", qual é o adjetivo?',
                alternativas: ['O', 'livro', 'novo', 'estante'],
                gabarito:     2   // novo
              },
              {
                id:           'port-gram-01-q2',
                enunciado:    'Identifique a preposição na frase: "Vou para a escola."',
                alternativas: ['Vou', 'para', 'a', 'escola'],
                gabarito:     1   // para
              }
            ]
          },

          {
            id:   'port-gram-02',
            nome: 'Pontuação e Ortografia',
            xp:   55,
            conteudo: `
              <p><strong>Principais sinais de pontuação:</strong></p>
              <p>• <strong>Vírgula (,):</strong> separa termos, enumera, indica pausa breve.</p>
              <p>• <strong>Ponto final (.):</strong> encerra período declarativo.</p>
              <p>• <strong>Ponto de exclamação (!):</strong> expressa emoção, ordem.</p>
              <p>• <strong>Ponto de interrogação (?):</strong> indica pergunta direta.</p>
              <p>• <strong>Dois-pontos (:):</strong> introduz enumeração, explicação ou citação.</p>
              <p>• <strong>Ponto e vírgula (;):</strong> separa itens de uma enumeração complexa.</p>

              <p><strong>Reforma Ortográfica de 2009:</strong></p>
              <p>• Supressão do trema em palavras do português (exceto nomes estrangeiros).</p>
              <p>• Eliminação do hífen em certos casos (ex: "autoescola", "socioeconômico").</p>
            `,
            exercicios: [
              {
                id:           'port-gram-02-q1',
                enunciado:    'Qual alternativa está escrita CORRETAMENTE conforme o Acordo Ortográfico?',
                alternativas: ['Freqüência', 'Frequência', 'Frequencia', 'Fréquência'],
                gabarito:     1   // Frequência (sem trema)
              }
            ]
          }
        ]
      },

      // ── TEMA: INTERPRETAÇÃO ────────────────────────────
      {
        id:   'port-int',
        nome: 'Interpretação de Texto',
        subtemas: [

          {
            id:   'port-int-01',
            nome: 'Estratégias de Leitura',
            xp:   60,
            conteudo: `
              <p>A <strong>interpretação de texto</strong> é uma das competências
              mais exigidas nos vestibulares do IFAM e CMM.</p>

              <p><strong>Habilidades essenciais:</strong></p>
              <p>• <strong>Identificar o tema:</strong> assunto central do texto.</p>
              <p>• <strong>Ideia principal:</strong> argumento ou mensagem mais importante.</p>
              <p>• <strong>Inferência:</strong> conclusão que pode ser tirada do texto,
              mesmo que não esteja explícita.</p>
              <p>• <strong>Sentido conotativo × denotativo:</strong> sentido figurado vs. sentido literal.</p>
              <p>• <strong>Intertextualidade:</strong> relação entre textos diferentes.</p>

              <p><strong>Dica:</strong> Sempre leia a pergunta ANTES de ler o texto.
              Isso orienta o foco da leitura.</p>
            `,
            exercicios: [
              {
                id:           'port-int-01-q1',
                enunciado:    'O que é "inferência" em interpretação de texto?',
                alternativas: [
                  'Copiar trechos do texto',
                  'Identificar palavras difíceis',
                  'Concluir algo que não está explícito no texto',
                  'Resumir o texto em uma frase'
                ],
                gabarito: 2
              }
            ]
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // ÁREA 4: CIÊNCIAS DA NATUREZA
  // Temas: Biologia, Química
  // ──────────────────────────────────────────────────────
  {
    id:    'cien',
    nome:  'Ciências',
    icone: '🔬',
    cor:   '#fb923c',   // Laranja — variável CSS --accent-orange
    temas: [

      {
        id:   'cien-bio',
        nome: 'Biologia',
        subtemas: [

          {
            id:   'cien-bio-01',
            nome: 'Célula — A Unidade da Vida',
            xp:   55,
            conteudo: `
              <p>A <strong>célula</strong> é a menor unidade estrutural e funcional dos seres vivos.</p>

              <p><strong>Tipos celulares:</strong></p>
              <p>• <strong>Procariótica:</strong> sem núcleo definido, sem organelas membranosas.
              Exemplo: bactérias e arqueas.</p>
              <p>• <strong>Eucariótica:</strong> núcleo envolto por membrana nuclear, com organelas.
              Exemplo: células animais, vegetais, fungos.</p>

              <p><strong>Organelas e funções:</strong></p>
              <p>• <strong>Mitocôndria:</strong> respiração celular (produção de ATP).</p>
              <p>• <strong>Ribossomo:</strong> síntese de proteínas.</p>
              <p>• <strong>Núcleo:</strong> contém o DNA; centro de controle celular.</p>
              <p>• <strong>Cloroplasto:</strong> fotossíntese (somente em células vegetais).</p>
            `,
            exercicios: [
              {
                id:           'cien-bio-01-q1',
                enunciado:    'Qual organela é responsável pela respiração celular?',
                alternativas: ['Ribossomo', 'Núcleo', 'Mitocôndria', 'Centríolo'],
                gabarito:     2   // Mitocôndria
              }
            ]
          }
        ]
      },

      {
        id:   'cien-qui',
        nome: 'Química',
        subtemas: [

          {
            id:   'cien-qui-01',
            nome: 'Tabela Periódica e Elementos',
            xp:   65,
            conteudo: `
              <p>A <strong>Tabela Periódica</strong> organiza os 118 elementos conhecidos
              em ordem crescente de número atômico (Z).</p>

              <p><strong>Organização:</strong></p>
              <p>• <strong>Períodos</strong> (linhas horizontais): 7 períodos, indicam o
              número de camadas eletrônicas.</p>
              <p>• <strong>Famílias/Grupos</strong> (colunas verticais): 18 grupos,
              elementos com propriedades semelhantes.</p>

              <p><strong>Famílias importantes:</strong></p>
              <p>• Família 1 (IA): Metais alcalinos (Li, Na, K...)</p>
              <p>• Família 17 (VIIA): Halogênios (F, Cl, Br...)</p>
              <p>• Família 18 (VIII A): Gases nobres (He, Ne, Ar...)</p>
            `,
            exercicios: [
              {
                id:           'cien-qui-01-q1',
                enunciado:    'Qual é o símbolo químico do Oxigênio?',
                alternativas: ['O', 'Ox', 'Og', 'Or'],
                gabarito:     0   // O
              }
            ]
          }
        ]
      }
    ]
  }

]; // Fim do CATALOGO

// ═══════════════════════════════════════════════════════════
// ALUNOS SIMULADOS (para o Painel do Professor)
// Em um sistema real, estes dados viriam de um backend/API.
// Aqui servem para popular o painel com dados de exemplo.
// ═══════════════════════════════════════════════════════════

/**
 * Lista de alunos simulados da turma.
 * Cada aluno tem: nome, inicial do avatar, XP e % de progresso.
 * @type {AlunoSimulado[]}
 */
const ALUNOS_TURMA = [
  { nome: 'Ana Lima',      avatar: 'A', xp: 420, progresso: 70 },
  { nome: 'Bruno Melo',    avatar: 'B', xp: 210, progresso: 35 },
  { nome: 'Carla Souza',   avatar: 'C', xp: 580, progresso: 95 },
  { nome: 'Diego Nunes',   avatar: 'D', xp: 140, progresso: 23 },
  { nome: 'Eva Rocha',     avatar: 'E', xp: 390, progresso: 65 },
  { nome: 'Felipe Castro', avatar: 'F', xp: 310, progresso: 52 },
  { nome: 'Gabi Torres',   avatar: 'G', xp: 460, progresso: 77 },
];
