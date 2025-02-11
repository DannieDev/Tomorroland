document.addEventListener("DOMContentLoaded", function () {
    // Manejo del menú responsive en móviles
    var toggler = document.querySelector(".navbar-toggler");
    var menu = document.querySelector("#my-nav");

    toggler.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

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

    document.querySelectorAll('.maine-menu .nav-item').forEach(item => {
        let timeout;
        let dropdown = item.querySelector('.dropdown');

        if (dropdown) {
            item.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                dropdown.style.display = 'block';
            });

            item.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 100);
            });
        }
    });

    // Cerrar dropdowns al hacer clic fuera de ellos
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.maine-menu .nav-item .dropdown').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    });

    // Cargar dinámicamente Header y Footer
    let headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("/src/views/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
            });
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
