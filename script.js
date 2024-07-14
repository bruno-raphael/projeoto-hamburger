const list = document.querySelector("ul")
const buttonShowAll = document.querySelector(".show-all")
const buttonPorcent = document.querySelector(".porcent")
const buttonToltal = document.querySelector(".total")
const buttonFilter = document.querySelector(".filter")


function formatCurrency(value) {

    const newValue = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return newValue
}




function showAll(productsArray) {

    let myLi = ""
    productsArray.forEach((product) => {
        myLi += `
        <li>
            <img src=${product.src}>
            <p >${product.name}</p>
            <p class="item-price">R$${formatCurrency(product.price)}</p>
        </li>
    `

    })

    list.innerHTML = myLi
}


function mapAll() {
    const newPrice = menuOptions.map((product) => ({

        ...product,//Spread Opertor
        price: product.price * 0.9 // 0.9 é macete um para tirar 10%


    }))

    showAll(newPrice)
}


function somarTudo() {

    const totalItens = menuOptions.reduce((acc, curr) => acc + curr.price, 0)

    list.innerHTML = `
    <li>
    <p>O valor total dos itens é  ${formatCurrency(totalItens)}</p>

    </li>
    `


}


function filterVegan() {

    const filterVege = menuOptions.filter(product => product.vegan)

    showAll(filterVege)
}





buttonShowAll.addEventListener("click", () => showAll(menuOptions))
buttonPorcent.addEventListener("click", mapAll)
buttonToltal.addEventListener("click", somarTudo)
buttonFilter.addEventListener("click", filterVegan)