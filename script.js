

let cart = [];

const list = document.querySelector("ul");
const buttonShowAll = document.querySelector(".show-all");
const buttonPorcent = document.querySelector(".porcent");
const buttonToltal = document.querySelector(".total");
const buttonFilter = document.querySelector(".filter");
const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutButton = document.getElementById("checkout-button");

function formatCurrency(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function showAll(productsArray) {
    let myLi = "";
    productsArray.forEach((product, index) => {
        myLi += `
        <li class="animate__animated animate__fadeInUp">
            <img src="${product.src}" alt="${product.name}">
            <p>${product.name}</p>
            <p class="item-price">${formatCurrency(product.price)}</p>
            <button onclick="addToCart(${index})">Adicionar ao Carrinho</button>
        </li>
        `;
    });
    list.innerHTML = myLi;
}

function mapAll() {
    const newPrice = menuOptions.map((product) => ({
        ...product, // Spread Operator
        price: product.price * 0.9 // 0.9 é um macete para tirar 10%
    }));
    showAll(newPrice);
}

function somarTudo() {
    const totalItens = menuOptions.reduce((acc, curr) => acc + curr.price, 0);
    list.innerHTML = `
    <li>
    <p>O valor total dos itens é ${formatCurrency(totalItens)}</p>
    </li>
    `;
}

function filterVegan() {
    const filterVege = menuOptions.filter(product => product.vegan);
    showAll(filterVege);
}

function addToCart(index) {
    const product = menuOptions[index];
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.src}" alt="${item.name}" style="width: 50px; height: auto; border-radius: 5px; margin-right: 10px;">
            <span>${item.name} - ${formatCurrency(item.price)}</span>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(li);
    });
    cartTotal.innerText = `Total: ${formatCurrency(total)}`;
    cartCount.innerText = `Quantidade: ${cart.length}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleModal() {
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
}

buttonShowAll.addEventListener("click", () => showAll(menuOptions));
buttonPorcent.addEventListener("click", mapAll);
buttonToltal.addEventListener("click", somarTudo);
buttonFilter.addEventListener("click", filterVegan);
cartIcon.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);
window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        toggleModal();
    }
});

checkoutButton.addEventListener("click", () => {
    alert("Compra finalizada! Obrigado!");
    cart = [];
    updateCart();
    toggleModal();
});
