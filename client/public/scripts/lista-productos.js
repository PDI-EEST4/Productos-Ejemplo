const listado = document.getElementById('lista-productos');

const obtenerProductos = async () => {
  const response = await fetch('http://localhost:3000/api/productos')
  const productos = await response.json();

  return productos
}

const renderizarProductos = async () => {
  const productos = await obtenerProductos();

  listado.innerHTML = '';

  productos.forEach(producto => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'list-group-item-action');
    item.style = 'cursor:pointer';
    item.textContent = `${producto.nombre} - ${producto.precio}`
    item.addEventListener('click', () => {
      //Redireccionar 
      window.location.href = `/client/productos/show.html?producto=${producto.id}`
    });
    listado.appendChild(item);
  });
}

renderizarProductos();