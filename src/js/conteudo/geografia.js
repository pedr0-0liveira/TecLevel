const CONTEUDO_GEOGRAFIA = {
  id: 'geografia',
  nome: 'Geografia',
  icon: '🌍',
  color: '#FFFBEB',
  desc: 'Brasil, mundo e espaço geográfico',
  topicos: [
    {
      id: 'geografia',
      nome: 'Geografia Física',
      subtopicos: [
        {
          id: 'brasil-regioes',
          nome: 'Regiões Brasileiras',
          conteudo: {
            titulo: 'Regiões Brasileiras',
            texto: `
              <h3>As 5 Regiões do Brasil</h3>
              <ul>
                <li><strong>Norte:</strong> maior região em área; abriga a Amazônia; baixa densidade demográfica. Estados: AM, PA, AC, RO, RR, AP, TO.</li>
                <li><strong>Nordeste:</strong> 9 estados; clima semiárido no interior (sertão); maior diversidade cultural e tradições afro-brasileiras.</li>
                <li><strong>Centro-Oeste:</strong> sede do Distrito Federal (Brasília); domínio do Cerrado; agropecuária intensa.</li>
                <li><strong>Sudeste:</strong> região mais populosa e industrializada; estados de SP, RJ, MG e ES.</li>
                <li><strong>Sul:</strong> colonização europeia predominante; clima subtropical com geadas; RS, SC e PR.</li>
              </ul>
              <h3>Biomas Brasileiros</h3>
              <ul>
                <li><code>Amazônia</code> — floresta tropical úmida; maior biodiversidade do mundo</li>
                <li><code>Cerrado</code> — savana brasileira; nascente de grandes rios</li>
                <li><code>Caatinga</code> — único bioma exclusivamente brasileiro; clima semiárido</li>
                <li><code>Mata Atlântica</code> — altamente devastada; menos de 12% original</li>
                <li><code>Pampa</code> — campos gaúchos; pecuária extensiva</li>
                <li><code>Pantanal</code> — maior planície alagável do mundo</li>
              </ul>
            `,
            video: 'https://www.youtube.com/embed/bZSNVL5VSXU'
          }
        },
        {
          id: 'cartografia',
          nome: 'Cartografia e Orientação',
          conteudo: {
            titulo: 'Cartografia e Orientação',
            texto: `
              <h3>O que é Cartografia?</h3>
              <p>É a ciência que estuda a representação da Terra em mapas, cartas e plantas.</p>
              <h3>Escala</h3>
              <p>Relação entre a distância no mapa e a distância real. Ex: <code>1:100.000</code> significa que 1 cm no mapa = 100.000 cm = 1 km na realidade.</p>
              <ul>
                <li><strong>Escala grande</strong> (ex: 1:1.000) → mais detalhes, menor área</li>
                <li><strong>Escala pequena</strong> (ex: 1:10.000.000) → menos detalhes, maior área</li>
              </ul>
              <h3>Pontos Cardeais e Colaterais</h3>
              <p>Cardeais: Norte (N), Sul (S), Leste (L/E), Oeste (O/W). Colaterais: NE, NO, SE, SO.</p>
              <h3>Coordenadas Geográficas</h3>
              <p><strong>Latitude:</strong> distância angular ao Equador (0° a 90° N/S). <strong>Longitude:</strong> distância ao Meridiano de Greenwich (0° a 180° L/O).</p>
            `,
            video: 'https://www.youtube.com/embed/pVL8LlT5lVQ'
          }
        }
      ]
    }
  ]
};