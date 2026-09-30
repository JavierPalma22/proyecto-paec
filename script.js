document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const chips = document.querySelectorAll('.chip');
    const btnEscape = document.getElementById('btn-escape');
    const btnModo = document.getElementById('btn-modo');
    const acordeones = document.querySelectorAll('.acordeon-header');

    let categoriaActual = 'todos';

    if (localStorage.getItem('modo-oscuro') === 'activo') {
        document.body.classList.add('dark-mode');
        btnModo.textContent = '☀️ Modo Claro';
    }

    btnModo.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            btnModo.textContent = '☀️ Modo Claro';
            localStorage.setItem('modo-oscuro', 'activo');
        } else {
            btnModo.textContent = '🌙 Modo Oscuro';
            localStorage.setItem('modo-oscuro', 'inactivo');
        }
    });

    acordeones.forEach(header => {
        header.addEventListener('click', () => {
            const acordeonItem = header.parentElement;
            const body = header.nextElementSibling;

            acordeonItem.classList.toggle('activo');

            if (acordeonItem.classList.contains('activo')) {
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    const filtrarTarjetas = () => {
        const textoBusqueda = buscador.value.toLowerCase().trim();

        tarjetas.forEach(tarjeta => {
            const categoriaTarjeta = tarjeta.getAttribute('data-categoria') || '';
            const tags = tarjeta.getAttribute('data-tags') || '';
            const titulo = tarjeta.querySelector('h2').textContent.toLowerCase();
            const descripcion = tarjeta.querySelector('p').textContent.toLowerCase();
            const categoriaTexto = tarjeta.querySelector('.categoria').textContent.toLowerCase();

            const coincideCategoria = (categoriaActual === 'todos' || categoriaTarjeta === categoriaActual);
            const coincideTexto = (
                tags.includes(textoBusqueda) || 
                titulo.includes(textoBusqueda) || 
                descripcion.includes(textoBusqueda) || 
                categoriaTexto.includes(textoBusqueda)
            );

            if (coincideCategoria && coincideTexto) {
                tarjeta.style.display = 'flex'; 
            } else {
                tarjeta.style.display = 'none';
            }
        });
    };

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('activo'));
            chip.classList.add('activo');

            categoriaActual = chip.getAttribute('data-filtro');
            filtrarTarjetas();
        });
    });

    buscador.addEventListener('input', filtrarTarjetas);

    const ejecutarEscape = () => {
        window.location.replace('https://www.google.com');
    };

    btnEscape.addEventListener('click', ejecutarEscape);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            ejecutarEscape();
        }
    });
});