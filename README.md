# 🥁 DrumStore Pro

> Proyecto académico de **Diseño de Interfaces Web (DIW)** — Grado Superior DAW  
> I.E.S. La Marisma · Huelva, Andalucía · 2025-2026

Tienda online de baterías y percusión, desarrollada como proyecto integral de la asignatura. Incluye diseño responsive con Bootstrap 5, contenido multimedia optimizado, elementos interactivos con JavaScript y aplicación de principios de accesibilidad WCAG 2.1.

---

## 🌐 Demo

> Abre `index.html` directamente en el navegador o despliega la carpeta en cualquier servidor estático.

---

## 📁 Estructura del proyecto

```
DrumStore-Pro/
├── index.html              # Página principal
├── css/
│   └── custom.min.css      # Estilos personalizados sobre Bootstrap
├── sass/
│   └── custom.scss         # Fuente Sass con variables y animaciones
├── js/
│   └── main.js             # Lógica: carrito, filtros, canvas, validación
├── img/                    # Imágenes (.jpg originales + .webp optimizadas)
├── audio/                  # Demos de sonido (.mp3)
├── video/                  # Demo de vídeo (.webm)
├── docs/
│   └── memoria.html        # Memoria del proyecto
├── sitemap.xml
└── robots.txt
```

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y accesibilidad |
| Bootstrap 5.3 | Rejilla responsive y componentes UI |
| Sass / CSS3 | Estilos personalizados y animaciones |
| JavaScript (ES6+) | Interactividad, carrito y canvas |
| WebP / WebM / MP3 | Multimedia optimizado para la web |

---

## ✅ Partes del proyecto

### Parte 1 — Planificación
- Tablero de tareas en Trello
- Control de versiones con Git y GitHub
- Guía de estilos (paleta, tipografía, rejilla)

### Parte 2 — Creación con Bootstrap
- Rejilla responsive con 4 breakpoints verificados
- Navbar, Carousel, Tabs, Modales, Accordion, Tooltips, Formulario con validación
- Archivo CSS personalizado + fuente Sass compilada

### Partes 3 y 4 — Multimedia e interactividad
- Imágenes en WebP con fallback JPG (`<picture>`) y `loading="lazy"`
- Vídeo WebM y audio MP3 con reproductores HTML5 nativos
- Carrusel personalizado en el hero y segundo carrusel de testimonios
- Visualizador de ritmo animado con `<canvas>` y `requestAnimationFrame`
- Carrito funcional con badge animado y eliminación por ítem
- Filtro de catálogo por nivel y precio máximo en tiempo real
- 8 animaciones CSS con `@keyframes` (fadeInUp, pulse, drumVibe, shimmerGrad…)
- Formulario de contacto con validación JavaScript y mensajes accesibles
- Sección FAQ con Accordion de Bootstrap
- Sección de testimonios con carrusel propio

### Parte 5 — Accesibilidad y usabilidad
- Principios WCAG 2.1 AA (Perceptible, Operable, Comprensible, Robusto)
- Skip link, foco visible, roles ARIA, `aria-live`, `aria-hidden`
- Contraste de color verificado con WebAIM (ratio mínimo 4.5:1)
- Validado con WAVE, Lighthouse (>90), axe DevTools y W3C Validator
- Análisis de usabilidad completo con rúbrica de 15 criterios

---

## 🎨 Paleta de colores

| Color | HEX | Uso |
|---|---|---|
| Naranja principal | `#FF6B35` | Botones, acentos |
| Verde acento | `#22C55E` | Foco visible |
| Azul muy oscuro | `#020617` | Fondo hero / navbar |
| Gris oscuro | `#111827` | Texto principal |

---

## ⚙️ Cómo compilar el Sass

```bash
sass sass/custom.scss css/custom.min.css --style=compressed --watch
```

---

## 📄 Licencias de recursos multimedia

Los recursos de terceros utilizados (imágenes, audio y vídeo) están registrados en:

- `img/recursos-img.txt`
- `audio/recursos-audio.txt`
- `video/recursos-video.txt`

Todo el material cumple con las licencias de uso correspondientes (Freepik, Unsplash).

[📖 Ver memoria del proyecto](memoria_drumstore.pdf)

---

## 👤 Autor

**Manuel García Rodríguez**  
Grado Superior en Desarrollo de Aplicaciones Web (DAW)  
GitHub: [@spacecrf](https://github.com/spacecrf)
