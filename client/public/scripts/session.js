const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');


loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = new FormData(e.target);
  const body = [...data.entries()].reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

  const response = await fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body) // Convierte el cuerpo a JSON
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('token', token);
    alert('Sesion iniciada')
    window.location.reload();
  } else {
    alert('Error al iniciar sesión');
  }
});

registerForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = new FormData(e.target);
  const body = [...data.entries()].reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body) // Convierte el cuerpo a JSON
  });

  if (response.ok) {
    alert('Registro exitoso');
  } else {
    alert('Error al registrar');
  }
});



const checkSession = () => {
  const navbarOptions = document.getElementById('navbarOptions');
  const token = localStorage.getItem('token');
  
  if (token) {
    navbarOptions.innerHTML = '<a class="nav-link" id="endSessionBtn">Cerrar sesión</a>'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkSession();

  const endSessionBtn = document.getElementById('endSessionBtn');

  endSessionBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    checkSession();
    window.location.reload();
  });
})