/* =============================================
   DrumStore Pro — main.js
   Lógica principal del sitio
   ============================================= */

'use strict';

// ======= FILTRO DE CATÁLOGO =======
const priceSlider  = document.getElementById('precio-slider');
const priceOutput  = document.getElementById('precio-slider-value');
const catalogCards = document.querySelectorAll('.producto-card');
const nivelRadios  = document.querySelectorAll('input[name="nivel"]');

function filterCatalog() {
  const maxPrice   = priceSlider ? Number(priceSlider.value) : 0;
  const selected   = document.querySelector('input[name="nivel"]:checked');
  const nivelValue = selected ? selected.id.replace('nivel-', '') : 'todos';

  catalogCards.forEach(card => {
    const cardNivel = card.getAttribute('data-nivel') || 'todos';
    const cardPrice = Number(card.getAttribute('data-precio') || 0);
    const okNivel   = nivelValue === 'todos' || cardNivel === nivelValue || cardNivel === 'todos';
    const okPrecio  = maxPrice === 0 || cardPrice <= maxPrice;
    card.classList.toggle('d-none', !(okNivel && okPrecio));
  });
}

if (priceSlider && priceOutput) {
  const updateLabel = () => {
    const v = Number(priceSlider.value);
    priceOutput.textContent = `Hasta ${v} €`;
    priceSlider.setAttribute('aria-valuenow', String(v));
    filterCatalog();
  };
  priceSlider.addEventListener('input', updateLabel);
  updateLabel();
}

nivelRadios.forEach(r => r.addEventListener('change', filterCatalog));

// ======= CARRITO =======
let cartItems = [];

const cartItemsList   = document.getElementById('cart-items');
const cartTotalEl     = document.getElementById('cart-total');
const cartCountEl     = document.getElementById('cart-count');

function renderCart() {
  if (!cartItemsList || !cartTotalEl || !cartCountEl) return;
  cartItemsList.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = '<li class="list-group-item text-body-secondary fst-italic">Tu carrito está vacío.</li>';
  } else {
    cartItems.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <span>${item.nombre}</span>
        <div class="d-flex align-items-center gap-3">
          <span class="fw-semibold">${item.precio.toFixed(2)} €</span>
          <button class="btn btn-sm btn-outline-danger py-0 px-1 remove-item" data-idx="${idx}" aria-label="Eliminar ${item.nombre}">
            <i class="bi bi-x" aria-hidden="true"></i>
          </button>
        </div>`;
      cartItemsList.appendChild(li);
      total += item.precio;
    });
  }

  cartTotalEl.textContent  = `${total.toFixed(2)} €`;
  cartCountEl.textContent  = String(cartItems.length);

  // Animación badge
  cartCountEl.classList.remove('pop');
  void cartCountEl.offsetWidth; // reflow
  cartCountEl.classList.add('pop');

  // Delegación de eventos para eliminar
  cartItemsList.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      cartItems.splice(Number(btn.dataset.idx), 1);
      renderCart();
    });
  });
}

function addToCart(nombre, precio) {
  cartItems.push({ nombre, precio });
  renderCart();
}

// Botones "Añadir al carrito" en tarjetas
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    addToCart(btn.getAttribute('data-producto') || 'Producto', Number(btn.getAttribute('data-precio') || 0));
  });
});

// ======= MODAL DE PRODUCTO (datos dinámicos) =======
const productoModal = document.getElementById('modalProducto');
if (productoModal) {
  productoModal.addEventListener('show.bs.modal', event => {
    const trigger  = event.relatedTarget;
    if (!trigger) return;
    const nombre   = trigger.getAttribute('data-producto') || '';
    const precio   = trigger.getAttribute('data-precio')   || '';
    const desc     = trigger.getAttribute('data-desc')     || '';
    const nivel    = trigger.getAttribute('data-nivel')    || '';

    const labelEl  = productoModal.querySelector('#modalProductoLabel');
    const descEl   = productoModal.querySelector('#modal-desc');
    const precioEl = productoModal.querySelector('#modal-precio');
    const nivelEl  = productoModal.querySelector('#modal-nivel');
    const addBtn   = productoModal.querySelector('#modal-add-cart');

    if (labelEl)  labelEl.textContent  = nombre;
    if (descEl)   descEl.textContent   = desc;
    if (precioEl) precioEl.textContent = precio ? `${Number(precio).toLocaleString('es-ES')} €` : '';
    if (nivelEl)  nivelEl.textContent  = nivel;

    // Botón añadir carrito desde modal
    if (addBtn) {
      addBtn.onclick = () => {
        addToCart(nombre, Number(precio));
        bootstrap.Modal.getInstance(productoModal).hide();
      };
    }
  });
}

// ======= TOOLTIPS =======
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el);
});

// ======= VALIDACIÓN DE FORMULARIO =======
const contactForm = document.querySelector('form[aria-labelledby="contacto-titulo"]');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }
    contactForm.classList.remove('was-validated');
    contactForm.reset();
    if (formSuccess) {
      formSuccess.hidden = false;
      setTimeout(() => { formSuccess.hidden = true; }, 5000);
    }
  });
}

// ======= CANVAS: VISUALIZADOR DE RITMO =======
const canvas = document.getElementById('drumCanvas');
if (canvas && canvas.getContext) {
  const ctx      = canvas.getContext('2d');
  const W        = canvas.width;
  const H        = canvas.height;
  const barCount = 16;
  const gap      = 6;
  const barW     = (W - gap * (barCount + 1)) / barCount;
  let   frame    = 0;

  // Patrón rítmico simplificado (kick en 1,5; snare en 3,7; hats en todos)
  const pattern = [0.9, 0.4, 0.5, 0.4, 0.55, 0.4, 0.85, 0.4, 0.9, 0.4, 0.55, 0.4, 0.55, 0.4, 0.85, 0.7];

  function drawBars() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < barCount; i++) {
      const base    = pattern[i];
      const wave    = Math.sin(frame / 20 + i * 0.6) * 0.15;
      const height  = Math.max(0.05, base + wave) * H * 0.85;
      const x       = gap + i * (barW + gap);
      const y       = H - height;

      const grad = ctx.createLinearGradient(x, y, x, H);
      grad.addColorStop(0, '#ff6b35');
      grad.addColorStop(0.6, '#f59e0b');
      grad.addColorStop(1, '#22c55e');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, height, 3);
      ctx.fill();
    }

    frame++;
    requestAnimationFrame(drawBars);
  }

  // roundRect polyfill básico por si acaso
  if (!ctx.roundRect) {
    ctx.roundRect = function(x, y, w, h) { ctx.rect(x, y, w, h); };
  }

  drawBars();
}
