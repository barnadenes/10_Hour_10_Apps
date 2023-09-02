const lengthNum = document.querySelector('.pLength');
const passwordInput = document.querySelector('.password');
const generateBtn = document.querySelector('.generate');
const iconEl = document.querySelector('i');
const upperBtn = document.querySelector('.upper');
const lowerBtn = document.querySelector('.lower');
const numberBtn = document.querySelector('.number');
const symbolBtn = document.querySelector('.symbol');

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function generatePassword() {
    const password = [];
    let num = '';

    if(lengthNum.value === null || lengthNum.value <= 5) {
        passwordInput.value = '';
        return passwordInput.value = 'min 5 chars & check 1 box atleast';
    }
    
    for(let i = 0; i < lengthNum.value; i++) {
        if(upperBtn.checked  && lengthNum.value != password.length) {
            num = Math.floor(Math.random()* upperLetters.length);
            password.push(upperLetters[num]);
        }
        if(lowerBtn.checked  && lengthNum.value != password.length) {
            num = Math.floor(Math.random()* lowerLetters.length);
            password.push(lowerLetters[num]);
        }
        if(numberBtn.checked  && lengthNum.value != password.length) {
            num = Math.floor(Math.random()* numbers.length);
            password.push(numbers[num]);
        }
        if(symbolBtn.checked  && lengthNum.value != password.length) {
            num = Math.floor(Math.random()* symbols.length);
            password.push(symbols[num]);
        }
    }

    passwordInput.value = '';
    passwordInput.value = password.join('');
    
}

generateBtn.addEventListener('click', () => {
    generatePassword();
})

iconEl.addEventListener('click', () => {
    passwordInput.select();
    navigator.clipboard.writeText(passwordInput.value);
})


