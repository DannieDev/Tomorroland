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

    // Abre el Dropdown al pasar el mouse
    const menuItems = document.querySelectorAll(".maine-menu .navbar-nav .nav-item");

    menuItems.forEach(item => {
        const dropdown = item.querySelector(".dropdown");

        if (dropdown) {
            item.addEventListener("mouseenter", () => {
                dropdown.classList.add("show-dropdown");
            });

            item.addEventListener("mouseleave", () => {
                dropdown.classList.remove("show-dropdown");
            });

            item.addEventListener("click", (event) => {
                event.stopPropagation(); // Evita el cierre inmediato por otro evento
                dropdown.classList.toggle("show-dropdown");
            });

            document.addEventListener("click", (event) => {
                if (!item.contains(event.target)) {
                    dropdown.classList.remove("show-dropdown");
                }
            });
        }
    });

    // Cerrar el menú desplegable al hacer clic fuera
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.dropdown.show-dropdown').forEach(dropdown => {
            if (!dropdown.parentElement.contains(e.target)) {
                dropdown.classList.remove('show-dropdown');
            }
        });
    });

    // Lógica para cambiar el texto del botón de cuenta (Login / Registro)
    setTimeout(() => {
        const currentPage = window.location.pathname.split("/").pop();
        const accountButton = document.querySelector(".account-btn");

        if (!accountButton) return;

        if (currentPage === "login") {
            accountButton.innerHTML = '<i class="fa fa-user-plus"></i> Regístrate';
            accountButton.href = "/register";
        } else if (currentPage === "register") {
            accountButton.innerHTML = '<i class="fa fa-sign-in-alt"></i> Inicia sesión';
            accountButton.href = "/login";
        }
    }, 100);

    // Limpiar el search automáticamente cuando pierde el foco
    const searchInput = document.querySelector(".search-input");

    if (searchInput) {
        searchInput.addEventListener("blur", function () {
            setTimeout(() => {
                if (!this.matches(":focus")) {
                    this.value = "";
                }
            }, 100);
        });
    }
    
    // Migas de Pan
    const breadcrumbContainer = document.getElementById("breadcrumb-placeholder");
    if (!breadcrumbContainer) {
        console.warn("⚠ No se encontró el contenedor de migas de pan.");
        return;
    }

    // Obtener la página actual
    let path = window.location.pathname.split("/").pop() || "home"; // Si está vacío, asumir "index"


    let breadcrumbHTML = `<nav class="breadcrumb"><ul>`;

    // Definir rutas y nombres con las nuevas rutas de EJS
    const routes = {
        "": "Inicio",
        "home": "Inicio",
        "login": "Login",
        "register": "Registro",
        "contact": "Contacto",
        "belgica": "Tomorrowland Bélgica",
        "radio": "One World Radio",
        "experience": "Experiencias",
        "404": "Página No Encontrada",
    };

    // Si estamos en el index, solo mostrar "Inicio"
    if (path === "home") {
        breadcrumbHTML += `<li class="active">Inicio</li>`;
    } else {
        // Mostrar "Inicio" como enlace y luego la página actual
        breadcrumbHTML += `<li><a href="/">Inicio</a></li>`;
        breadcrumbHTML += `<li class="separator"> > </li>`;

        if (routes[path]) {
            breadcrumbHTML += `<li class="active">${routes[path]}</li>`;
        } else {
            breadcrumbHTML += `<li class="active">Página Desconocida</li>`;
        }
    }

    breadcrumbHTML += `</ul></nav>`;
    breadcrumbContainer.innerHTML = breadcrumbHTML;
});
