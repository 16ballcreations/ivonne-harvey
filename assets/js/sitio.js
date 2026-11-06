/* Ivonne Harvey · sitio:
   - barra que se vuelve sólida al salir de la portada (en las páginas interiores ya viene sólida);
   - parallax de la portada: baja al 20 % de la velocidad del scroll y el retrato crece hasta 1,05,
     mientras la sección siguiente la tapa;
   - entrada suave de los bloques;
   - «De la clase a la conversación»: pasos que avanzan solos cada 5 s, con la barra que marca el tiempo
     y el panel de la derecha que cambia con cada paso. Se detiene al pasar el mouse o con el teclado. */
(function(){
  "use strict";
  var quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var barra = document.getElementById("barra");
  var portada = document.getElementById("inicio");
  var foto = portada && portada.querySelector(".retrato img");

  var pendiente = false;
  function alDesplazar(){
    var y = window.scrollY;
    if(barra && portada){ barra.classList.toggle("solida", y > portada.offsetHeight - 80); }
    if(portada && !quieto){
      var alto = portada.offsetHeight;
      if(y <= alto){
        portada.style.transform = "translate3d(0," + (y * 0.2).toFixed(1) + "px,0)";
        if(foto){ foto.style.transform = "scale(" + (1 + Math.min(y / alto, 1) * 0.05).toFixed(4) + ")"; }
      }
    }
    pendiente = false;
  }
  window.addEventListener("scroll", function(){
    if(!pendiente){ pendiente = true; requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  alDesplazar();

  var piezas = document.querySelectorAll(".lead, .cuerpo, .tema, .tarjeta-pod, .h2, .cita-quien");
  if("IntersectionObserver" in window && !quieto){
    var vigia = new IntersectionObserver(function(entradas){
      entradas.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("visto"); vigia.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    [].forEach.call(piezas, function(p){ p.classList.add("aparece"); vigia.observe(p); });
  }

  /* pasos */
  [].forEach.call(document.querySelectorAll("[data-pasos]"), function(caja){
    var MS = 5000;
    var pasos = caja.querySelectorAll(".paso");
    var paneles = caja.querySelectorAll(".panel");
    var actual = 0, reloj = null, visible = false, detenido = false;
    caja.style.setProperty("--paso-ms", MS + "ms");

    function mostrar(i){
      actual = (i + pasos.length) % pasos.length;
      [].forEach.call(pasos, function(p, k){
        var si = k === actual;
        p.classList.toggle("activo", si);
        p.querySelector(".paso-tit").setAttribute("aria-expanded", si);
        /* reinicia la animación de la barra */
        var b = p.querySelector(".paso-barra"); b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
      });
      [].forEach.call(paneles, function(p, k){
        var si = k === actual;
        p.classList.toggle("activo", si);
        if(si){ p.hidden = false; } else { p.hidden = true; }
      });
      programar();
    }
    function programar(){
      clearTimeout(reloj);
      if(visible && !detenido && !quieto){ reloj = setTimeout(function(){ mostrar(actual + 1); }, MS); }
    }
    function detener(si){
      detenido = si;
      caja.classList.toggle("quieto", si);
      if(si){ clearTimeout(reloj); } else { mostrar(actual); }
    }

    [].forEach.call(pasos, function(p, k){
      p.querySelector(".paso-tit").addEventListener("click", function(){ mostrar(k); });
    });
    caja.addEventListener("mouseenter", function(){ detener(true); });
    caja.addEventListener("mouseleave", function(){ detener(false); });
    caja.addEventListener("focusin", function(){ detener(true); });
    caja.addEventListener("focusout", function(e){ if(!caja.contains(e.relatedTarget)){ detener(false); } });

    if(quieto){ caja.classList.add("quieto"); }
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(en){
        visible = en[0].isIntersecting;
        if(visible){ mostrar(actual); } else { clearTimeout(reloj); }
      }, { threshold: 0.35 }).observe(caja);
    } else { visible = true; mostrar(0); }
  });
})();
