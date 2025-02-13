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

    // Abre el Dropdown al pasar el mouser
    const navItems = document.querySelectorAll('.maine-menu .nav-item');

    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');

        if (dropdown) {
            // Mostrar el menú al pasar el mouse
            item.addEventListener('mouseenter', function () {
                dropdown.classList.add('show-dropdown');
            });

            // Ocultar el menú al quitar el mouse
            item.addEventListener('mouseleave', function () {
                dropdown.classList.remove('show-dropdown');
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
    setTimeout(() => {
        const currentPage = window.location.pathname.split("/").pop();
        const accountButton = document.querySelector(".account-btn");

        if (currentPage === "login.html") {
            accountButton.innerHTML = '<i class="fa fa-user-plus"></i> Regístrate';
            accountButton.href = "register.html";
        } else if (currentPage === "register.html") {
            accountButton.innerHTML = '<i class="fa fa-sign-in-alt"></i> Inicia sesión';
            accountButton.href = "login.html";
        }
    }, 100);

    //Carrusel
    const showCards = document.querySelector(".show-cards");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    nextBtn.addEventListener("click", function () {
        showCards.scrollBy({ left: 300, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", function () {
        showCards.scrollBy({ left: -300, behavior: "smooth" });
    });

    const showCardsMonthly = document.querySelector(".show-cards-monthly");
    const prevBtnMonthly = document.querySelector(".prev-monthly");
    const nextBtnMonthly = document.querySelector(".next-monthly");

    nextBtnMonthly.addEventListener("click", function () {
        showCardsMonthly.scrollBy({ left: 350, behavior: "smooth" });
    });

    prevBtnMonthly.addEventListener("click", function () {
        showCardsMonthly.scrollBy({ left: -350, behavior: "smooth" });
    });
});
