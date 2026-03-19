// Pega os valores das moedas a converter, das moedas convertidas e do botão que efetuará a conversão

const currencySelectToConvert = document.querySelector(".currencySelectToConvert")
const currencySelectConverted = document.querySelector(".currencySelectConverted")
const requiredField = document.querySelector(".requiredField")
const convertButton = document.querySelector(".convertButton")


// Esta função é chamada quando o campo inputCurrency está vazio, cobrindo suas bordas de vermelho
function setError() {
    requiredField.style.border = '3px solid #772FD3'
}

// Função responsável por validar o formulário de conversão de moedas
function validateForm() {
    if (requiredField.value.length == 0) {
        setError()
    } else {
        requiredField.style.border = '1px solid #000'
        convertValues()
    }
}

// Função que efetiva a conversão das moedas escolhidas
async function convertValues() {

    try {

        const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,BTC-BRL").then(response => response.json())

        // Lista todas as moedas utilizadas na conversão
        const exchangeRates = {
            real: { locale: "pt-BR", currency: "BRL", rate: 1 },
            dolar: { locale: "en-US", currency: "USD", rate: data.USDBRL.high },
            canada: { locale: "ca-US", currency: "CAD", rate: data.CADBRL.high },
            euro: { locale: "en-US", currency: "EUR", rate: data.EURBRL.high },
            libra: { locale: "en-GB", currency: "GBP", rate: data.GBPBRL.high },
            iene: { locale: "ja-JP", currency: "JPY", rate: data.JPYBRL.high },
            bitcoin: { locale: "de-DE", currency: "BTC", rate: data.BTCBRL.high },
            // Aqui você pode adicionar mais moedas...
        };

        // Realiza a formatação das moedas
        const formatCurrency = (value, locale, currency, maximumFractionDigits) =>
            new Intl.NumberFormat(locale, {
                style: "currency",
                currency,
                maximumFractionDigits
            }).format(value);


        // Coloca na tela o valor informado pelo usuário, o valor da moeda inicial formatada e o valor da moeda convertida formatada
        const inputCurrencyValue = document.querySelector(".inputCurrency").value
        const currencyValueToConvert = document.querySelector(".currencyValueToConvert")
        const currencyValueConverted = document.querySelector(".currencyValue")


        // Obtém as moedas selecionadas pelo usuário
        const from = currencySelectToConvert.value;
        const to = currencySelectConverted.value;


        // A conversão será realizada se somente for digitado números
        const amount = Number(inputCurrencyValue);

        // Verifica se os selects possuem valores válidos
        if (exchangeRates[from] && exchangeRates[to] && amount) {
            const fromConfig = exchangeRates[from];
            const toConfig = exchangeRates[to];

            // Valor inicial
            currencyValueToConvert.innerHTML = formatCurrency(amount, fromConfig.locale, fromConfig.currency, 2);

            // Converte primeiro o valor para real e depois para moeda destino
            // Convertendo o valor para real (multiplicando ou dividindo dependendo da moeda)
            const amountInReal = amount * fromConfig.rate;

            // Agora converte para moeda destino dividindo pelo rate da moeda destino
            const convertedAmount = amountInReal / toConfig.rate;

            // Valor convertido
            currencyValueConverted.innerHTML = formatCurrency(convertedAmount, toConfig.locale, toConfig.currency, 8);

        }

    } catch (e) {
        console.error(e);
        alert("Falha ao carregar taxas. Tente novamente.");
    }
}

// Função chamada quando é selecionada a moeda inicial
function changeCurrencyToConvert() {
    const currencyNameToConvert = document.getElementById("currencyNameToConvert");
    const currencyImgToConvert = document.querySelector(".currencyImgToConvert");
    const currencyValueToConvert = document.querySelector(".currencyValueToConvert");

    const currencyData = {
        real: {
            fullName: 'Real',
            imgSrc: './assets/real.png',
            name: 'R$ 0,00'
        },
        dolar: {
            fullName: 'Dólar americano',
            imgSrc: './assets/dolar.png',
            name: 'US$ 0.00'
        },
        canada: {
            fullName: 'Dólar canadense',
            imgSrc: './assets/dolarCanadense.png',
            name: 'CA$ 0.00'
        },
        euro: {
            fullName: 'Euro',
            imgSrc: './assets/euro.png',
            name: '€ 0.00'
        },
        libra: {
            fullName: 'Libra',
            imgSrc: './assets/libra.png',
            name: '£ 0.00'
        },
        iene: {
            fullName: 'Iene',
            imgSrc: './assets/iene.png',
            name: '¥ 0.00'
        },
        bitcoin: {
            fullName: 'Bitcoin',
            imgSrc: './assets/bitcoin.png',
            name: '₿ 0'
        },
        // Adicione outras moedas aqui
    };

    const selectedCurrencyToConvert = currencySelectToConvert.value;

    if (currencyData[selectedCurrencyToConvert]) {
        currencyNameToConvert.innerHTML = currencyData[selectedCurrencyToConvert].fullName;
        currencyImgToConvert.src = currencyData[selectedCurrencyToConvert].imgSrc;
        currencyValueToConvert.innerHTML = currencyData[selectedCurrencyToConvert].name;
    } else {
        currencyNameToConvert.innerHTML = 'Moeda não encontrada';
        currencyImgToConvert.src = ''; // Ou um placeholder
        currencyValueToConvert.innerHTML = ''; // Ou um placeholder
    }


    convertValues()
}

// Função chamada quando é selecionada a moeda convertida
function changeCurrencyConverted() {
    const currencyName = document.getElementById("currencyName")
    const currencyImg = document.querySelector(".currencyImg")
    const currencyValue = document.querySelector(".currencyValue")

    const currencyData = {
        real: {
            fullName: 'Real',
            imgSrc: './assets/real.png',
            name: 'R$ 0,00'
        },
        dolar: {
            fullName: 'Dólar americano',
            imgSrc: './assets/dolar.png',
            name: 'US$ 0.00'
        },
        canada: {
            fullName: 'Dólar canadense',
            imgSrc: './assets/dolarCanadense.png',
            name: 'CA$ 0.00'
        },
        euro: {
            fullName: 'Euro',
            imgSrc: './assets/euro.png',
            name: '€ 0.00'
        },
        libra: {
            fullName: 'Libra',
            imgSrc: './assets/libra.png',
            name: '£ 0.00'
        },
        iene: {
            fullName: 'Iene',
            imgSrc: './assets/iene.png',
            name: '¥ 0.00'
        },
        bitcoin: {
            fullName: 'Bitcoin',
            imgSrc: './assets/bitcoin.png',
            name: '₿ 0'
        },
        // Adicione outras moedas aqui
    };

    const selectedCurrencyConverted = currencySelectConverted.value;

    if (currencyData[selectedCurrencyConverted]) {
        currencyName.innerHTML = currencyData[selectedCurrencyConverted].fullName;
        currencyImg.src = currencyData[selectedCurrencyConverted].imgSrc;
        currencyValue.innerHTML = currencyData[selectedCurrencyConverted].name;
    } else {
        currencyName.innerHTML = 'Moeda não encontrada';
        currencyImg.src = ''; // Ou um placeholder
        currencyValue.innerHTML = ''; // Ou um placeholder
    }


    convertValues()
}

// Chama o AddEventListener para os eventos change e click das funções abaixo
currencySelectToConvert.addEventListener("change", changeCurrencyToConvert)
currencySelectConverted.addEventListener("change", changeCurrencyConverted)
convertButton.addEventListener("click", validateForm)