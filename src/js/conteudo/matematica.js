const CONTEUDO_MATEMATICA = {
  id: 'matematica',
  nome: 'Matemática',
  icon: '📐',
  color: '#EFF6FF',
  desc: 'Aritmética, álgebra e geometria',
  topicos: [
    {
      id: 'aritmetica',
      nome: 'Aritmética',
      subtopicos: [
        {
          id: 'fracoes',
          nome: 'Frações e Operações',
          conteudo: {
            titulo: 'Frações e Operações',
            texto: `
              <h3>O que é uma Fração?</h3>
              <p>Uma fração representa uma parte de um todo. É escrita como <code>a/b</code>, onde <strong>a</strong> é o numerador (partes que temos) e <strong>b</strong> é o denominador (partes do total).</p>
              <h3>Operações</h3>
              <ul>
                <li><strong>Adição/Subtração:</strong> iguale os denominadores (MMC), depois some ou subtraia os numeradores.</li>
                <li><strong>Multiplicação:</strong> multiplique numerador com numerador e denominador com denominador.</li>
                <li><strong>Divisão:</strong> multiplique pela fração invertida (inverso do divisor).</li>
              </ul>
              <h3>Simplificação</h3>
              <p>Divida numerador e denominador pelo MDC. Ex: <code>12/18 = 2/3</code> (dividindo por 6).</p>
              <h3>Fração Mista e Imprópria</h3>
              <p><strong>Imprópria:</strong> numerador maior que o denominador (ex: 7/3). <strong>Mista:</strong> número inteiro + fração (ex: 2 e 1/3).</p>
              <h3>Dica de prova</h3>
              <p>Antes de operar, sempre simplifique as frações. Isso evita trabalhar com números grandes desnecessariamente.</p>
            `,
            video: 'https://www.youtube.com/embed/gIJAX1Yp2XA'
          }
        },
        {
          id: 'porcentagem',
          nome: 'Porcentagem e Regra de Três',
          conteudo: {
            titulo: 'Porcentagem e Regra de Três',
            texto: `
              <h3>Porcentagem</h3>
              <p>Porcentagem significa "por cem". Para calcular X% de um valor: <code>valor × X ÷ 100</code>.</p>
              <p>Ex: 20% de 150 = 150 × 20 ÷ 100 = <strong>30</strong>.</p>
              <h3>Aumento e Desconto</h3>
              <ul>
                <li>Aumento de 15%: multiplique por <code>1,15</code></li>
                <li>Desconto de 15%: multiplique por <code>0,85</code></li>
              </ul>
              <h3>Regra de Três Simples</h3>
              <p>Usada quando duas grandezas são proporcionais. Monte a proporção, isole o valor desconhecido e calcule.</p>
              <p>Ex: Se 5 cadernos custam R$20, quanto custam 8? → <code>5/20 = 8/x → x = 32</code>.</p>
              <h3>Grandezas Inversamente Proporcionais</h3>
              <p>Quando uma aumenta e a outra diminui. Na regra de três, inverte-se um dos lados antes de calcular.</p>
            `,
            video: 'https://www.youtube.com/embed/J9dN07AMhNI'
          }
        }
      ]
    },
    {
      id: 'algebra',
      nome: 'Álgebra',
      subtopicos: [
        {
          id: 'equacoes',
          nome: 'Equações do 1º e 2º Grau',
          conteudo: {
            titulo: 'Equações do 1º e 2º Grau',
            texto: `
              <h3>Equação do 1º Grau</h3>
              <p>Forma: <code>ax + b = 0</code>. Isole o <em>x</em> passando os termos para o outro lado (trocando o sinal).</p>
              <p>Ex: <code>3x + 6 = 0 → 3x = -6 → x = -2</code>.</p>
              <h3>Equação do 2º Grau</h3>
              <p>Forma: <code>ax² + bx + c = 0</code>. Use a fórmula de Bhaskara:</p>
              <p><code>x = (-b ± √Δ) / 2a</code>, onde <code>Δ = b² - 4ac</code>.</p>
              <h3>Análise do Discriminante (Δ)</h3>
              <ul>
                <li><code>Δ > 0</code> → duas raízes reais distintas</li>
                <li><code>Δ = 0</code> → uma raiz real (raiz dupla)</li>
                <li><code>Δ &lt; 0</code> → sem raízes reais</li>
              </ul>
              <h3>Relações de Girard</h3>
              <p>Soma das raízes: <code>x₁ + x₂ = -b/a</code>. Produto das raízes: <code>x₁ × x₂ = c/a</code>. Útil para verificar a resposta.</p>
            `,
            video: 'https://www.youtube.com/embed/0OC0EkFaQO4'
          }
        },
        {
          id: 'funcoes',
          nome: 'Funções do 1º e 2º Grau',
          conteudo: {
            titulo: 'Funções do 1º e 2º Grau',
            texto: `
              <h3>O que é uma Função?</h3>
              <p>Uma função relaciona cada elemento de um conjunto A a exatamente um elemento de um conjunto B. Escrevemos <code>f(x)</code>.</p>
              <h3>Função do 1º Grau (afim)</h3>
              <p>Forma: <code>f(x) = ax + b</code>. Gráfico: reta. Quando <em>a > 0</em>, a função é crescente; <em>a < 0</em>, decrescente.</p>
              <h3>Função do 2º Grau (quadrática)</h3>
              <p>Forma: <code>f(x) = ax² + bx + c</code>. Gráfico: parábola. O <strong>vértice</strong> representa o ponto máximo ou mínimo:</p>
              <ul>
                <li><code>xv = -b / 2a</code></li>
                <li><code>yv = -Δ / 4a</code></li>
              </ul>
              <h3>Zeros da Função</h3>
              <p>Os pontos onde <code>f(x) = 0</code> são as raízes da equação correspondente (onde o gráfico corta o eixo x).</p>
            `,
            video: 'https://www.youtube.com/embed/Ygf9e6DpZmk'
          }
        }
      ]
    },
    {
      id: 'geometria',
      nome: 'Geometria',
      subtopicos: [
        {
          id: 'areas',
          nome: 'Áreas e Perímetros',
          conteudo: {
            titulo: 'Áreas e Perímetros',
            texto: `
              <h3>Perímetro</h3>
              <p>É a soma de todos os lados de uma figura plana.</p>
              <h3>Fórmulas de Área</h3>
              <ul>
                <li><strong>Quadrado:</strong> <code>A = l²</code></li>
                <li><strong>Retângulo:</strong> <code>A = b × h</code></li>
                <li><strong>Triângulo:</strong> <code>A = (b × h) / 2</code></li>
                <li><strong>Paralelogramo:</strong> <code>A = b × h</code></li>
                <li><strong>Trapézio:</strong> <code>A = (B + b) × h / 2</code></li>
                <li><strong>Círculo:</strong> <code>A = π × r²</code> e perímetro <code>C = 2πr</code></li>
              </ul>
              <h3>Teorema de Pitágoras</h3>
              <p>Em um triângulo retângulo: <code>hipotenusa² = cateto₁² + cateto₂²</code>.</p>
              <p>Triângulos notáveis: <strong>3-4-5</strong>, <strong>5-12-13</strong>, 45°-45°-90° (<code>l, l, l√2</code>) e 30°-60°-90° (<code>l, l√3, 2l</code>).</p>
            `,
            video: 'https://www.youtube.com/embed/9dlClMJXhQQ'
          }
        }
      ]
    }
  ]
};
