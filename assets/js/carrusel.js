document.addEventListener("DOMContentLoaded", function () {

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
