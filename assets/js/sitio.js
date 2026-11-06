/* Ivonne Harvey · sitio: barra que se vuelve sólida al salir de la portada, entrada suave de los bloques
   y acordeón de un solo panel abierto. En las páginas interiores la barra ya viene sólida. */
(function(){
  "use strict";
  var barra = document.getElementById("barra");
  var portada = document.getElementById("inicio");
  if(barra && portada){
    var revisar = function(){ barra.classList.toggle("solida", window.scrollY > portada.offsetHeight - 80); };
    window.addEventListener("scroll", revisar, { passive: true });
    revisar();
  }

  var piezas = document.querySelectorAll(".lead, .cuerpo, .tema, .tarjeta-pod, .h2");
  if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    var vigia = new IntersectionObserver(function(entradas){
      entradas.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("visto"); vigia.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    [].forEach.call(piezas, function(p){ p.classList.add("aparece"); vigia.observe(p); });
  }

  var paneles = document.querySelectorAll(".acordeon details");
  [].forEach.call(paneles, function(d){
    d.addEventListener("toggle", function(){
      if(d.open){ [].forEach.call(paneles, function(o){ if(o !== d){ o.open = false; } }); }
    });
  });
})();
