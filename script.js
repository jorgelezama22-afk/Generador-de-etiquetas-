// script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('priceForm');
  const labelArea = document.getElementById('labelArea');
  const priceLabel = document.getElementById('priceLabel');
  const historyArea = document.createElement('div');
  historyArea.className = 'history-area';
  form.parentNode.appendChild(historyArea);

  function renderLabel({product, weight, price, total}) {
    return `<div class="product">${product}</div>
      <div class="weight">${parseFloat(weight).toFixed(3)} kg</div>
      <div class="unit-price">Precio/kg: $${parseFloat(price).toFixed(2)}</div>
      <div class="total">Total: $${parseFloat(total).toFixed(2)}</div>`;
  }

  function saveHistory(entry) {
    let hist = JSON.parse(localStorage.getItem('etiquetaHist')) || [];
    hist.unshift(entry);
    if (hist.length > 20) hist = hist.slice(0, 20);
    localStorage.setItem('etiquetaHist', JSON.stringify(hist));
  }

  function loadHistory() {
    return JSON.parse(localStorage.getItem('etiquetaHist')) || [];
  }

  function renderHistory() {
    const hist = loadHistory();
    if (hist.length === 0) {
      historyArea.innerHTML = '';
      return;
    }
    historyArea.innerHTML = '<h2>Historial reciente</h2>' + '<ul>' +
      hist.map(e => `<li><span>${e.product}</span> - <span>${parseFloat(e.weight).toFixed(2)}kg</span> - <span>$${parseFloat(e.total).toFixed(2)}</span></li>`).join('') + '</ul>';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = form.product.value.trim() || 'Producto';
    const weight = parseFloat(form.weight.value);
    const price = parseFloat(form.price.value);
    const total = weight * price;
    const labelObj = { product, weight, price, total };
    priceLabel.innerHTML = renderLabel(labelObj);
    labelArea.style.display = 'block';
    saveHistory(labelObj);
    renderHistory();
  });

  renderHistory();
});
