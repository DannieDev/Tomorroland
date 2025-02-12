document.addEventListener("DOMContentLoaded", function () {

    var toggler = document.querySelector(".navbar-toggler");
    var menu = document.querySelector(".navbar-nav");

    if (toggler && menu) {
        toggler.addEventListener("click", function () {
            menu.classList.toggle("menu-open");
        });
    }

    // Manejo de dropdowns en escritorio (hover) y móviles (clic)
    document.querySelectorAll('.maine-menu .nav-item > a').forEach(item => {
        item.addEventListener('click', function (event) {
            let dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown')) {
                event.preventDefault();
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            }
        });
    });

    const navItems = document.querySelectorAll('.maine-menu .nav-item');

    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');

        // Mostrar el menú al pasar el mouse (hover)
        item.addEventListener('mouseenter', function () {
            if (dropdown) dropdown.classList.add('show-dropdown');
        });

        // Ocultar el menú al quitar el mouse
        item.addEventListener('mouseleave', function () {
            if (dropdown) dropdown.classList.remove('show-dropdown');
        });
    });

    // Cerrar el menú desplegable al hacer clic fuera
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.dropdown.show-dropdown').forEach(dropdown => {
            if (!dropdown.parentElement.contains(e.target)) {
                dropdown.classList.remove('show-dropdown');
            }
        });
    });

    // Cargar dinámicamente Header y Footer
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("/src/views/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;

                // Re-ejecutamos el código del botón hamburguesa después de cargar el header
                const toggler = document.querySelector(".navbar-toggler");
                const menu = document.querySelector(".navbar-nav");

                if (toggler && menu) {
                    toggler.addEventListener("click", function () {
                        menu.classList.toggle("menu-open");
                    });
                }
            })
            .catch(error => console.error("Error al cargar el header:", error));
    }

    let footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("/src/views/footer.html")
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            });
    }

    // Lógica para el botón de inicio de sesión
    let currentPage = window.location.pathname;
    let loginButton = document.querySelector(".account-btn");
    let menuItems = document.querySelectorAll(".navbar-nav .nav-item");
    let searchContainer = document.querySelector(".search-container");

    if (currentPage.includes("login.html")) {
        if (loginButton) {
            loginButton.innerHTML = '<i class="fa-solid fa-user-plus"></i> Registrarse';
            loginButton.href = "/src/pages/register.html";
        }
        menuItems.forEach(item => {
            if (item.textContent.includes("404")) item.style.display = "none";
        });
        if (searchContainer) searchContainer.style.display = "none";
    }

    if (currentPage.includes("register.html")) {
        if (loginButton) {
            loginButton.innerHTML = '<i class="fa-solid fa-user"></i> Iniciar Sesión';
            loginButton.href = "/src/pages/login.html";
        }
        menuItems.forEach(item => {
            if (item.textContent.includes("404")) item.style.display = "none";
        });
        if (searchContainer) searchContainer.style.display = "none";
    }

    if (currentPage.includes("contact.html")) {
        if (loginButton) {
            loginButton.innerHTML = '<i class="fa-solid fa-user"></i> Iniciar Sesión';
            loginButton.href = "/src/pages/login.html";
        }
        menuItems.forEach(item => {
            if (item.textContent.includes("404")) item.style.display = "none";
        });
        if (searchContainer) searchContainer.style.display = "none";
    }
});
