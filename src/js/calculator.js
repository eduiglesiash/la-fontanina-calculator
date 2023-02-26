
import listOfProducts from "../config/listOfProducts.js";
window.localStorage.clear();
const calculatorStorage = window.localStorage;
const keyValuesCalculator = listOfProducts.map((product) => product.name);
const KEY_TICKET = "Ticket";
const btnClearTicket = document.querySelector("[data-clear-ticket]");
const quantityProducts = document.querySelectorAll("[data-quantity]");

// INIT LOCALSTORAGE
calculatorStorage.setItem(KEY_TICKET, "0");
keyValuesCalculator.forEach((key) => calculatorStorage.setItem(key, "0"));

const getValueProductFromLocaStorage = (product, displayCounter) => {
    const value = Number(calculatorStorage.getItem(product));
    displayCounter.innerText = value;
};

const calculateTicket = () => {
    let ticketValue = 0;
    keyValuesCalculator.forEach((key) => {
        const quantityProduct = Number(calculatorStorage.getItem(key));
        const { price } = listOfProducts.find(
            (element) => element.name === key
        );
        ticketValue += quantityProduct * price;
    });
    calculatorStorage.setItem(KEY_TICKET, `${ticketValue}`);
};

const displayValueTicket = () => {
    const ticketOutput = document.querySelector("[data-ticket]");
    const ticketValue = calculatorStorage.getItem(KEY_TICKET);
    ticketOutput.innerHTML = ticketValue;
};

const calculatePriceProduct = (product, displayPriceProduct) => {
    const { price } = listOfProducts.find(
        (element) => element.name === product
    );
    const numberProduct = Number(calculatorStorage.getItem(product));
    // console.log({ price, numberProduct });
    displayPriceProduct.innerText = (price * numberProduct).toFixed(2);
};

const getQuantityOfLocalStorage = (elements) => {
    // console.log({elements});
    [...elements].forEach((element) => {
        const { product } = element.parentElement.dataset;
        getValueProductFromLocaStorage(product, element);
    });
};

const addButtonFn = (callbackBtn) => {
    const allButtons = document.querySelectorAll("[data-btn-type]");
    allButtons.forEach((button) =>
        button.addEventListener("click", callbackBtn)
    );
};

const activityBtn = (evt) => {
    const { product } = evt.target.parentElement.dataset;
    const { btnType } = evt.target.dataset;
    const counterDisplay =
        evt.target.parentElement.querySelector("[data-quantity]");
    const displayTotalPriceProduct =
        evt.target.parentElement.parentElement.querySelector("output span");
    let valueStorage = Number(calculatorStorage.getItem(product));

    // console.log({ product, btnType, valueStorage });

    const typesBtn = {
        plus: () => {
            valueStorage += 1;
        },
        minor: () => {
            valueStorage -= 1;
        },
    };

    typesBtn[btnType]();
    if (valueStorage <= -1) valueStorage = 0;
    calculatorStorage.setItem(product, `${valueStorage}`);
    getValueProductFromLocaStorage(product, counterDisplay);
    calculatePriceProduct(product, displayTotalPriceProduct);
    calculateTicket();
    displayValueTicket();
};

const clearTicket = () => {
    calculatorStorage.setItem(KEY_TICKET, "0");
    keyValuesCalculator.forEach((key) => {
        const displayTotalPriceProduct = document.querySelector(
            `[data-output="${key}"]`
        );
        calculatorStorage.setItem(key, "0");
        calculatePriceProduct(key, displayTotalPriceProduct);
    });
    calculateTicket();
    displayValueTicket();
};

// INIT CALCULATOR
btnClearTicket.addEventListener("click", clearTicket);
getQuantityOfLocalStorage(quantityProducts);
addButtonFn(activityBtn);
