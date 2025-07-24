// Cargar menú y opiniones
let menu = [];
let opiniones = [];

// Cargar menú desde data/menu.json o localStorage si existe
async function cargarMenu() {
  let localMenu = localStorage.getItem('menuKiara');
  if(localMenu){
    menu = JSON.parse(localMenu);
  } else {
    const res = await fetch('data/menu.json');
    menu = await res.json();
  }
  mostrarCategorias();
  mostrarMenu('todas');
  mostrarDestacados();
}

// Mostrar categorías como filtros
function mostrarCategorias() {
  const categorias = [
    { id: 'todas', nombre: 'Todas' },
    { id: 'cocteles_sopas', nombre: '🥣 Cocteles y Sopas' },
    { id: 'antojitos_nicas', nombre: '🫓 Antojitos Nicas' },
    { id: 'varios', nombre: '🥗 Varios' },
    { id: 'refrescos', nombre: '🧃 Refrescos' },
    { id: 'pupusas', nombre: '🧀 Pupusas' },
    { id: 'desayuno_nica', nombre: '🍳 Desayuno Nica' },
    { id: 'comidas_rapidas', nombre: '🌭 Comidas Rápidas' },
    { id: 'especialidades', nombre: '🥩 Especialidades de la Casa' },
    { id: 'recomendaciones', nombre: '⭐ Recomendaciones del Chef' },
    { id: 'temporada', nombre: '🌿 Platos de Temporada' }
  ];
  const cont = document.getElementById('filtros-categorias');
  cont.innerHTML = '';
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.nombre;
    btn.className = cat.id === 'todas' ? 'active' : '';
    btn.onclick = () => {
      document.querySelectorAll('#filtros-categorias button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mostrarMenu(cat.id);
    };
    cont.appendChild(btn);
  });
}

// Personalización emocional y visual del menú
function mostrarMenu(categoriaSeleccionada) {
  const cont = document.getElementById('menu-lista');
  cont.innerHTML = '';
  // Definir categorías y sus iconos
  const categorias = [
    { id: 'cocteles_sopas', nombre: 'Cocteles y Sopas', icon: '🥣', img: 'cocteles_sopas.jpg', slogan: '¡Frescura y sabor que enamoran!' },
    { id: 'antojitos_nicas', nombre: 'Antojitos Nicas', icon: '🫓', img: 'antojitos_nicas.jpg', slogan: 'Tradición que abraza el corazón' },
    { id: 'varios', nombre: 'Varios', icon: '🥗', img: 'varios.jpg', slogan: 'Para todos los gustos y antojos' },
    { id: 'refrescos', nombre: 'Refrescos', icon: '🧃', img: 'refrescos.jpg', slogan: 'Refresca tu momento' },
    { id: 'pupusas', nombre: 'Pupusas', icon: '🧀', img: 'pupusas.jpg', slogan: '¡El alma de El Salvador en tu mesa!' },
    { id: 'desayuno_nica', nombre: 'Desayuno Nica', icon: '🍳', img: 'desayuno_nica.jpg', slogan: 'Despierta sonrisas, ¡despierta Kiara!' },
    { id: 'comidas_rapidas', nombre: 'Comidas Rápidas', icon: '🌭', img: 'comidas_rapidas.jpg', slogan: '¡Sabor y alegría al instante!' },
    { id: 'especialidades', nombre: 'Especialidades de la Casa', icon: '🥩', img: 'especialidades.jpg', slogan: 'Platos que conquistan paladares' },
    { id: 'recomendaciones', nombre: 'Recomendaciones del Chef', icon: '⭐', img: 'recomendaciones.jpg', slogan: '¡Lo mejor de lo mejor!' },
    { id: 'temporada', nombre: 'Platos de Temporada', icon: '🌿', img: 'temporada.jpg', slogan: 'Sabores únicos, solo por hoy' }
  ];
  let catsToShow = categorias.filter(cat => categoriaSeleccionada === 'todas' || cat.id === categoriaSeleccionada);
  catsToShow.forEach(cat => {
    let platosCat = menu.filter(p => p.categoria === cat.id);
    if(platosCat.length === 0) return;
    let mostrar = platosCat.slice(0, 6);
    const card = document.createElement('div');
    card.className = 'menu-categoria';
    // Imagen de la categoría con placeholder
    const img = document.createElement('img');
    img.className = 'cat-img';
    img.src = `assets/img/${cat.id}/${cat.img}`;
    img.alt = cat.nombre;
    img.onerror = function(){
      this.onerror=null;
      this.src='https://ui-avatars.com/api/?name='+encodeURIComponent(cat.nombre)+'&background=1F4690&color=fff&size=160&rounded=true';
    };
    card.appendChild(img);
    const info = document.createElement('div');
    info.className = 'cat-info';
    // Título y slogan
    const titulo = document.createElement('div');
    titulo.className = 'cat-titulo';
    titulo.innerHTML = `<span class=\"cat-icon\">${cat.icon}</span> ${cat.nombre}`;
    info.appendChild(titulo);
    const slogan = document.createElement('div');
    slogan.style.fontSize = '1.1rem';
    slogan.style.color = 'var(--rojo-nica)';
    slogan.style.fontWeight = '600';
    slogan.style.marginBottom = '1rem';
    slogan.textContent = cat.slogan;
    info.appendChild(slogan);
    // Lista de platos
    const ul = document.createElement('ul');
    ul.className = 'cat-lista';
    mostrar.forEach(plato => {
      const li = document.createElement('li');
      li.className = 'cat-item' + (plato.recomendado ? ' recomendado' : '');
      // Imagen del plato con placeholder
      const imgPlato = document.createElement('img');
      imgPlato.className = 'item-img';
      imgPlato.src = `assets/img/${plato.categoria}/${plato.imagen}`;
      imgPlato.alt = plato.nombre;
      imgPlato.onerror = function(){
        this.onerror=null;
        this.src='https://ui-avatars.com/api/?name='+encodeURIComponent(plato.nombre)+'&background=FF3B3F&color=fff&size=54&rounded=true';
      };
      li.appendChild(imgPlato);
      const infoPlato = document.createElement('div');
      infoPlato.className = 'item-info';
      // Nombre y badge
      const nombre = document.createElement('div');
      nombre.className = 'item-nombre';
      nombre.innerHTML = `<span>${plato.nombre} ${plato.recomendado ? '✨' : ''}</span>`;
      if(plato.recomendado) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = '¡Favorito!';
        nombre.appendChild(badge);
      }
      if(plato.categoria === 'temporada') {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = '¡Solo por hoy!';
        nombre.appendChild(badge);
      }
      infoPlato.appendChild(nombre);
      // Descripción emocional
      const desc = document.createElement('div');
      desc.className = 'item-desc';
      desc.innerHTML = `<span style='color:var(--rojo-nica);font-size:1.1em;'>❤</span> ${plato.descripcion}`;
      infoPlato.appendChild(desc);
      // Sugerencia de bebida con separación visual
      if(plato.sugerencia_bebida) {
        const bebida = document.createElement('div');
        bebida.className = 'item-bebida';
        bebida.style.marginTop = '0.2rem';
        bebida.style.borderTop = '1px dashed var(--azul-nica)';
        bebida.style.paddingTop = '0.2rem';
        bebida.innerHTML = '<span class="bebida-icon">🍹</span> ' + plato.sugerencia_bebida + ' <span style="color:var(--azul-nica);font-size:0.95em;">(¡Perfecto maridaje!)</span>';
        infoPlato.appendChild(bebida);
      }
      li.appendChild(infoPlato);
      // Precio destacado
      const precio = document.createElement('div');
      precio.className = 'item-precio';
      precio.innerHTML = `<span style='font-size:1.2em;'>C$${plato.precio}</span> <span style='font-size:0.9em;color:var(--blanco);font-weight:400;'>/ porción</span>`;
      li.appendChild(precio);
      // Botón agregar irresistible
      const btn = document.createElement('button');
      btn.className = 'btn-agregar';
      btn.innerHTML = '<span>¡Quiero esto!</span> <span>🛒</span>';
      li.appendChild(btn);
      ul.appendChild(li);
    });
    if(platosCat.length > 6) {
      const btn = document.createElement('button');
      btn.textContent = 'Ver más delicias';
      btn.className = 'btn-primary';
      btn.onclick = () => {
        ul.innerHTML = '';
        platosCat.forEach(plato => {
          const li = document.createElement('li');
          li.className = 'cat-item' + (plato.recomendado ? ' recomendado' : '');
          // Imagen del plato con placeholder
          const imgPlato = document.createElement('img');
          imgPlato.className = 'item-img';
          imgPlato.src = `assets/img/${plato.categoria}/${plato.imagen}`;
          imgPlato.alt = plato.nombre;
          imgPlato.onerror = function(){
            this.onerror=null;
            this.src='https://ui-avatars.com/api/?name='+encodeURIComponent(plato.nombre)+'&background=FF3B3F&color=fff&size=54&rounded=true';
          };
          li.appendChild(imgPlato);
          const infoPlato = document.createElement('div');
          infoPlato.className = 'item-info';
          const nombre = document.createElement('div');
          nombre.className = 'item-nombre';
          nombre.innerHTML = `<span>${plato.nombre} ${plato.recomendado ? '✨' : ''}</span>`;
          if(plato.recomendado) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = '¡Favorito!';
            nombre.appendChild(badge);
          }
          if(plato.categoria === 'temporada') {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = '¡Solo por hoy!';
            nombre.appendChild(badge);
          }
          infoPlato.appendChild(nombre);
          const desc = document.createElement('div');
          desc.className = 'item-desc';
          desc.innerHTML = `<span style='color:var(--rojo-nica);font-size:1.1em;'>❤</span> ${plato.descripcion}`;
          infoPlato.appendChild(desc);
          if(plato.sugerencia_bebida) {
            const bebida = document.createElement('div');
            bebida.className = 'item-bebida';
            bebida.innerHTML = '<span class="bebida-icon">🍹</span> ' + plato.sugerencia_bebida + ' <span style="color:var(--azul-nica);font-size:0.95em;">(¡Perfecto maridaje!)</span>';
            infoPlato.appendChild(bebida);
          }
          li.appendChild(infoPlato);
          const precio = document.createElement('div');
          precio.className = 'item-precio';
          precio.innerHTML = `<span style='font-size:1.2em;'>C$${plato.precio}</span> <span style='font-size:0.9em;color:var(--blanco);font-weight:400;'>/ porción</span>`;
          li.appendChild(precio);
          const btn = document.createElement('button');
          btn.className = 'btn-agregar';
          btn.innerHTML = '<span>¡Quiero esto!</span> <span>🛒</span>';
          li.appendChild(btn);
          ul.appendChild(li);
        });
        btn.style.display = 'none';
      };
      info.appendChild(btn);
    }
    info.appendChild(ul);
    card.appendChild(info);
    cont.appendChild(card);
  });
}

// Crear item de plato
function crearPlatoItem(plato) {
  const div = document.createElement('div');
  div.className = 'menu-item' + (plato.recomendado ? ' recomendado' : '');
  div.innerHTML = `
    <img src="assets/img/${plato.categoria}/${plato.imagen}" alt="${plato.nombre}" style="width:100%;border-radius:12px;">
    <h3>${plato.nombre}</h3>
    <p>${plato.descripcion}</p>
    <div class="precio">C$${plato.precio}</div>
    <div class="sugerencia-bebida">Sugerencia: ${plato.sugerencia_bebida || 'Refresco natural'}</div>
    <button class="btn-agregar">Agregar al pedido</button>
  `;
  // Técnica del anclaje
  if (plato.ancla) {
    const ancla = document.createElement('div');
    ancla.className = 'ancla';
    ancla.innerHTML = `<span style="color:var(--rojo-nica);font-weight:700;">${plato.ancla}</span>`;
    div.appendChild(ancla);
  }
  return div;
}

// Mostrar platos destacados (3 aleatorios recomendados o de temporada)
function mostrarDestacados() {
  const cont = document.getElementById('platos-destacados');
  let destacados = menu.filter(p => p.recomendado || p.categoria === 'temporada');
  destacados = destacados.sort(() => 0.5 - Math.random()).slice(0, 3);
  cont.innerHTML = '';
  destacados.forEach(plato => cont.appendChild(crearPlatoItem(plato)));
}

// Galería
function mostrarGaleria() {
  const grid = document.getElementById('galeria-grid');
  grid.innerHTML = '';
  const categorias = [
    'cocteles_sopas','antojitos_nicas','varios','refrescos','pupusas','desayuno_nica','comidas_rapidas','especialidades','recomendaciones','temporada'
  ];
  categorias.forEach(cat => {
    // Simulación: 2 imágenes por categoría
    for(let i=1;i<=2;i++){
      const div = document.createElement('div');
      div.className = 'galeria-item';
      div.innerHTML = `<img src="assets/img/${cat}/img${i}.jpg" alt="${cat}"><div class="galeria-hover"><span>${cat.replace('_',' ')}</span><button class="btn-primary">Ver más</button></div>`;
      grid.appendChild(div);
    }
  });
}

// Opiniones (simulado)
function mostrarOpiniones() {
  const cont = document.getElementById('opiniones-lista');
  const opiniones = [
    {cliente:'María G.', texto:'¡El mejor sabor nica en Catarina! El ambiente y la atención son inigualables.'},
    {cliente:'Carlos R.', texto:'Las pupusas y el desayuno nica son mi debilidad. ¡Recomendadísimo!'},
    {cliente:'Ana S.', texto:'Me encantó la variedad y la presentación de los platos. Volveré pronto.'}
  ];
  cont.innerHTML = '';
  opiniones.forEach(op => {
    const div = document.createElement('div');
    div.className = 'opinion-item';
    div.innerHTML = `<div class="cliente">${op.cliente}</div><div>${op.texto}</div>`;
    cont.appendChild(div);
  });
}

// Modo oscuro
const btnModoOscuro = document.getElementById('modo-oscuro-toggle');
btnModoOscuro.onclick = () => {
  document.body.classList.toggle('modo-oscuro');
  localStorage.setItem('modoOscuro', document.body.classList.contains('modo-oscuro'));
};
if(localStorage.getItem('modoOscuro')==='true'){
  document.body.classList.add('modo-oscuro');
}

// Formulario de opinión
const formOpinion = document.getElementById('form-opinion');
if(formOpinion){
  formOpinion.onsubmit = e => {
    e.preventDefault();
    alert('¡Gracias por tu opinión!');
    formOpinion.reset();
  };
}

// Inicialización
window.onload = () => {
  cargarMenu();
  mostrarGaleria();
  mostrarOpiniones();
}; 