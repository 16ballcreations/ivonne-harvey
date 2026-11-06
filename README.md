# Ivonne Harvey

Sitio de marca personal de la **Dra. Ivonne Harvey**, preparado por [16 Ball Creations](https://16ballcreations.com).
Propuesta v0.2: no se indexa (`noindex`) hasta que Ivonne la apruebe.

HTML y CSS sin frameworks. Maqueta basada en la estructura de la plantilla Westbridge (portada oscura con
titular en serif de dos tonos, bandas papel / niebla / tinta, acordeón y tarjetas).

## Estructura

| Ruta | Qué es |
|---|---|
| `MARCA.md` | **La guía de marca** (fuente de verdad para cualquier agente): esencia, logotipo, color, tipografía, el hilo, tono, imagen, redes |
| `marca/` | El manual de marca visual (`/marca/`), v1.0 |
| `assets/css/marca.css` | Tokens de marca: colores, tipografía (Newsreader y TASA Orbiter), medidas, el hilo y botones |
| `assets/img/marca/` | Logotipo (tinta y papel) y sello en SVG |
| `index.html` | Portada: quién soy, temas, lo que hago, EDUCULTEC, últimos escritos, últimos eventos y cierre |
| `escritos/` | Vitrina del blog: todo lo publicado en LinkedIn, con filtro por tema |
| `eventos/` | Reseñas de eventos y lo aprendido en cada uno |
| `enlaces/` | Reemplazo del Linktree: sus redes primero y las de SAIR después |
| `assets/data/escritos.json`, `assets/data/eventos.json` | **El contenido que se actualiza** |
| `assets/js/contenido.js` | Lee los JSON y pinta las tarjetas (portada, escritos y eventos) |

## Paleta

Base: `#1C1A26` tinta · `#8C8A94` gris · `#D9413C` salmón · `#EDEAEB` niebla · `#3D81CE` azul.
Prioridad a grises y salmón; el azul solo resalta (la insignia «Próximo»). Para texto chico se usan los
derivados que cumplen contraste: salmón oscuro `#BF3A34`, gris de texto `#5E5C66` y azul oscuro `#2F6DB5`.

## Cómo publicar un escrito nuevo

Agregar un bloque al inicio de `assets/data/escritos.json` (el orden lo da la fecha, no la posición):

```json
{
  "titulo": "Título del escrito",
  "fecha": "2026-11-20",
  "tipo": "Publicación",
  "tema": "Tecnología",
  "sello": "IA",
  "resumen": "Una o dos frases con palabras propias, sin copiar el post.",
  "enlace": "https://www.linkedin.com/feed/update/urn:li:activity:…/"
}
```

- `tipo`: Publicación, Newsletter o Artículo.
- `tema`: Tecnología, Investigación o Comunidad (definen el color de la lámina y el filtro).
- `sello`: una palabra o número corto que va grande en la lámina.
- `fecha`: `AAAA-MM-DD`, o `AAAA-MM` si solo se sabe el mes.
- `enlace`: en LinkedIn, menú «…» del post → «Copiar enlace a la publicación».

## Cómo publicar un evento

Agregar un bloque a `assets/data/eventos.json`:

```json
{
  "nombre": "Nombre del evento",
  "fecha": "2026-12-03",
  "lugar": "Ciudad o plataforma",
  "organiza": "Quién lo organiza",
  "modalidad": "Presencial",
  "rol": "Ponente",
  "charla": "Título de la charla (o vacío)",
  "resena": "Qué pasó, en dos o tres frases.",
  "aprendizajes": ["Lo primero que me llevo.", "Lo segundo."],
  "enlace": "https://www.linkedin.com/…"
}
```

Si la fecha es futura aparece con la insignia «Próximo» y primero en la portada. Cuando pase el evento se
completan `resena` y `aprendizajes`.

Los cambios se pueden hacer desde la web de GitHub (abrir el archivo → lápiz → «Commit changes»); el sitio
se actualiza en un minuto. Si Ivonne lo va a editar ella misma, el siguiente paso es conectarle un panel
visual (por ejemplo Pages CMS) sobre estos mismos JSON.

## Reglas

- Su marca es suya: no lleva el logo de SAIR. SAIR se menciona y se enlaza como una de las cosas que hace;
  la portada del canal (`assets/img/educultec-sair.jpg`) se usa solo para presentar EDUCULTEC y en `enlaces/`.
- Se escribe en primera persona y se tutea al lector, como en su newsletter.
- Solo datos verificados. Nada de datos personales: el contacto es por LinkedIn hasta que haya uno público.
  Por eso `enlaces/` no lleva la hoja de vida de Drive ni el correo que sí tenía el Linktree.
- Los escritos se resumen con palabras propias y enlazan al original en LinkedIn.

## Pendientes

- Retrato en alta resolución (el actual es el avatar de Linktree, 772 px) y fotos en contexto: clase, escenario, EDUCULTEC, voluntariado.
- Aprobación de Ivonne: titular, temas, textos, reseñas de eventos (las actuales son borradores a partir de sus posts).
- Enlaces directos de los posts que hoy apuntan a su actividad (IA y UNESCO, curso BEIC, Global Business Experience).
- Correo público para el contacto, si lo quiere.
- Aprobación del manual de marca (lo marcado «Propuesta» en `/marca/`) y lo listado en su sección 11.2.
