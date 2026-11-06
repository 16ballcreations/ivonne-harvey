/* Ivonne Harvey · escritos y eventos.
   Lee assets/data/escritos.json y assets/data/eventos.json y pinta las tarjetas donde haya un
   contenedor con data-lista="escritos" o data-lista="eventos". Para publicar algo nuevo basta con
   agregar una entrada al JSON: el orden lo da la fecha (lo más reciente primero).
   Atributos del contenedor: data-fuente (ruta al JSON), data-limite (cuántas mostrar),
   data-formato="tarjeta" | "completo" (eventos). */
(function(){
  "use strict";
  var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var LAMINA = { "Tecnología":"l1", "Investigación":"l2", "Comunidad":"l3" };
  var hoy = new Date(); hoy.setHours(0,0,0,0);

  function esc(t){ return String(t == null ? "" : t).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
  function partes(f){ var p = String(f).split("-"); return { a:+p[0], m:p[1] ? +p[1] : null, d:p[2] ? +p[2] : null }; }
  function fechaLarga(f){
    var p = partes(f);
    if(p.d){ return p.d + " de " + MESES[p.m-1] + " de " + p.a; }
    if(p.m){ var m = MESES[p.m-1]; return m.charAt(0).toUpperCase() + m.slice(1) + " de " + p.a; }
    return String(p.a);
  }
  function comoFecha(f){ var p = partes(f); return new Date(p.a, (p.m || 12) - 1, p.d || 28); }
  function ordenar(lista){ return lista.slice().sort(function(a,b){ return comoFecha(b.fecha) - comoFecha(a.fecha); }); }
  var flecha = '<svg aria-hidden="true"><use href="#diag"/></svg>';

  function escrito(e){
    return '<a class="escrito" data-tema="' + esc(e.tema) + '" href="' + esc(e.enlace) + '" target="_blank" rel="noopener">' +
      '<p class="cat">' + esc(e.tipo) + ' · ' + esc(e.tema) + '</p>' +
      '<div class="lamina ' + (LAMINA[e.tema] || "l1") + '" aria-hidden="true"><span class="serif">' + esc(e.sello) + '</span></div>' +
      '<p class="fecha">' + fechaLarga(e.fecha) + '</p>' +
      '<h3 class="serif">' + esc(e.titulo) + '</h3>' +
      '<p class="resumen">' + esc(e.resumen) + '</p>' +
      '<span class="leer">Leer en LinkedIn ' + flecha + '</span></a>';
  }

  function proximo(e){ return comoFecha(e.fecha) >= hoy; }
  function meta(e){ return [e.rol, e.lugar, e.modalidad].filter(Boolean).map(esc).join(' · '); }
  function insignia(e){ return proximo(e) ? '<span class="insignia">Próximo</span>' : ''; }

  function eventoTarjeta(e){
    return '<a class="evento-t" href="' + esc(e.enlace) + '" target="_blank" rel="noopener">' +
      '<p class="ev-fecha">' + fechaLarga(e.fecha) + insignia(e) + '</p>' +
      '<h3 class="serif">' + esc(e.nombre) + '</h3>' +
      (e.charla ? '<p class="ev-charla">' + esc(e.charla) + '</p>' : '') +
      '<p class="ev-meta">' + meta(e) + '</p></a>';
  }

  function eventoCompleto(e){
    var p = partes(e.fecha);
    var dia = p.d ? p.d : MESES[(p.m || 1) - 1].slice(0,3);
    var aprendido = e.aprendizajes && e.aprendizajes.length
      ? '<ul class="ev-lista">' + e.aprendizajes.map(function(a){ return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>'
      : '<p class="ev-pendiente">' + (proximo(e) ? 'Lo que me lleve de este encuentro lo cuento aquí después del evento.' : 'Reseña por escribir.') + '</p>';
    return '<article class="evento" id="' + esc(e.fecha + '-' + e.nombre).toLowerCase().replace(/[^a-z0-9]+/g,'-') + '">' +
      '<div class="ev-cal" aria-hidden="true"><b class="serif">' + dia + '</b><span>' + (p.d ? MESES[p.m-1].slice(0,3) + ' ' : '') + p.a + '</span></div>' +
      '<div class="ev-cuerpo">' +
        '<p class="ev-fecha">' + fechaLarga(e.fecha) + insignia(e) + '</p>' +
        '<h2 class="serif">' + esc(e.nombre) + '</h2>' +
        '<p class="ev-meta">' + meta(e) + (e.organiza ? '<br>Organiza: ' + esc(e.organiza) : '') + '</p>' +
        (e.charla ? '<p class="ev-charla serif">«' + esc(e.charla) + '»</p>' : '') +
        (e.resena ? '<p class="ev-resena">' + esc(e.resena) + '</p>' : '') +
        '<div class="ev-aprendi"><p class="ev-rot">Lo que me llevo</p>' + aprendido + '</div>' +
        '<a class="btn btn-tinta" href="' + esc(e.enlace) + '" target="_blank" rel="noopener">Ver en LinkedIn ' + flecha + '</a>' +
      '</div></article>';
  }

  function filtros(cont, lista){
    var barra = document.querySelector('[data-filtros="' + cont.id + '"]');
    if(!barra){ return; }
    var temas = [];
    lista.forEach(function(e){ if(temas.indexOf(e.tema) < 0){ temas.push(e.tema); } });
    barra.innerHTML = ['Todos'].concat(temas).map(function(t, i){
      return '<button type="button" class="filtro" aria-pressed="' + (i === 0) + '" data-tema="' + esc(t) + '">' + esc(t) + '</button>';
    }).join('');
    barra.addEventListener('click', function(ev){
      var b = ev.target.closest('.filtro'); if(!b){ return; }
      [].forEach.call(barra.children, function(x){ x.setAttribute('aria-pressed', x === b); });
      var t = b.getAttribute('data-tema');
      [].forEach.call(cont.children, function(c){ c.hidden = t !== 'Todos' && c.getAttribute('data-tema') !== t; });
    });
  }

  [].forEach.call(document.querySelectorAll('[data-lista]'), function(cont){
    var tipo = cont.getAttribute('data-lista');
    var limite = +cont.getAttribute('data-limite') || Infinity;
    var formato = cont.getAttribute('data-formato') || 'tarjeta';
    fetch(cont.getAttribute('data-fuente'))
      .then(function(r){ if(!r.ok){ throw new Error(r.status); } return r.json(); })
      .then(function(datos){
        var lista = ordenar(datos);
        if(tipo === 'eventos' && formato === 'tarjeta'){
          /* en la portada: primero lo próximo, luego lo más reciente */
          lista = lista.filter(proximo).reverse().concat(lista.filter(function(e){ return !proximo(e); }));
        }
        lista = lista.slice(0, limite);
        var pintar = tipo === 'escritos' ? escrito : (formato === 'completo' ? eventoCompleto : eventoTarjeta);
        cont.innerHTML = lista.map(pintar).join('');
        if(tipo === 'escritos'){ filtros(cont, lista); }
      })
      .catch(function(){ cont.classList.add('sin-datos'); });
  });
})();
