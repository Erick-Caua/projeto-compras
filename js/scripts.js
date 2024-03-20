//seleção de Tags
const frm = document.querySelector("form");
const resp1 = document.querySelector("#resp1");
const resp2 = document.querySelector("#resp2");
const read = document.querySelector(".awesome-button");
const nfe = document.querySelector("#numbernfe");
const spanresp1 = document.querySelector("#spanresp");
const fecharcx = document.querySelector(".fechar1")

//pagamento
const valorPago = document.querySelector(".pgat");
const realiPamt = document.querySelector(".pgatend");
const totalpgmt = document.querySelector("#valuePgmt");
const respto1 = document.querySelector(".respto1");
const respto2 = document.querySelector(".respto2");
const respto3 = document.querySelector(".respto3");
const compraFinalizada = document.querySelector(".purchaseCompleted")
const print = document.querySelector(".print");
const novaCompra = document.querySelector(".newBuy")
const itenslist = document.querySelector(".totalitens");
const totalditens = document.querySelector(".totalprod");
const checkbox = document.querySelector(".boxcheck");

//seleção de container

const container1 = document.querySelector(".formcontrol");
const container2 = document.querySelector(".fecharcaixa");
totalpgmt.value = 0
//adição de eventos

let resposta = "" //string com a resposta a ser exibida
let numContas = 0 //inicializa contador
let valTotal = 0 // e acumulador 


// functions para gerar números únicos
function gerarNumerosAleatorios() {
    var numeros = [];
    while (numeros.length < 6) {
        var numeroAleatorio = Math.floor(Math.random() * 60) + 1; // Gera um número aleatório entre 1 e 60
        if (numeros.indexOf(numeroAleatorio) === -1) { // Verifica se o número já foi gerado
            numeros.push(numeroAleatorio);
        }
    }
    return numeros;
}


if (!spanresp1.value) {
    let numbernota = gerarNumerosAleatorios().join(``)
    spanresp1.innerText = numbernota
}

function addclasse() {
    container1.classList.toggle("hidden")
    container2.classList.toggle("hidden")

}

function invoice() {
    totalditens.innerText = `${resposta} \n`
    itenslist.innerText = resp2.innerText = `${numContas} Produto(s) - Total R$: ${valTotal.toFixed(2)} \n`;
    respto1.innerText = `Valor total da compra: R$${valTotal}`;
}
function pagmto(n, m) {
    n = valTotal;
    m = Number(totalpgmt.value);

    soma = m - n
    if (m < n) {
        alert(` Valor pago: R$${m} não é suficiente para pagar suas compras! 
        Valor das compras: R$ ${n}
        Falta pagar R$ ${n - m}`)
    } else {
        respto2.innerText = `Valor total pago: R$${m}`;
        respto3.innerText = `Troco: R$${soma}`;

        compraFinalizada.classList.remove("hidden")
    }

}

function comprarNovamente() {
    resposta = ""
    numContas = 0
    valTotal = 0
    totalpgmt.value = 0
    resp1.innerText = ``
    resp2.innerText = ``;
    respto2.innerText = ``;
    respto3.innerText = ``;
    totalditens.innerText = ``
    itenslist.innerText = ``;
    respto1.innerText = ``;
    checkbox.checked = false
}


read.addEventListener("click", (e) => {
    e.preventDefault();

    const productName = frm.textaccount.value;
    const productValue = Number(frm.valueaccount.value);
    const quantityProduct = Number(frm.quantityAccount.value)


    if (productName === '' || productValue === 0 || quantityProduct === 0) {
        alert('Preencha todos os campos')
    } else {
        numContas++ //adiciona valores ao contador e acumulador

        valTotal += productValue * quantityProduct;
        resposta += quantityProduct + " - " + productName + " - R$: " + productValue.toFixed(2) + "\n"
        resp1.innerText = `${resposta} -----------------------------`
        resp2.innerText = `${numContas} Produto(s) - Total R$: ${valTotal.toFixed(2)}`;

        frm.textaccount.value = "";
        frm.valueaccount.value = "";
        frm.quantityAccount.value = "";
        frm.textaccount.focus();
    }

})

fecharcx.addEventListener("click", (e) => {  //botão de mudar para prox card
    e.preventDefault();

    addclasse()
    invoice()

});


realiPamt.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(totalpgmt.value)
    if (checkbox.checked === true && totalpgmt.value > 0) {
        pagmto()
    } else {
        alert("Selecione uma forma de pagamento")
    }

})

print.addEventListener("click", (e) => {
    e.preventDefault()

    alert("O comprovante está sendo impresso..")
})

novaCompra.addEventListener("click", (e) => {
    e.preventDefault()

    addclasse()
    comprarNovamente()
    compraFinalizada.classList.add("hidden")
})


