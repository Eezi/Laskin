//Tehdään laskin luokka johon lisätään toiminto funktiot
class Calculator {
    //rakentaja funktio
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    //
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
    //poistetaan yksi numero numerojonon päästä
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        
    }
        //Lisätään numeroita toistensa perään 
    appendNumber(number) {
        //Tehdään ratkaisu jolla käyttäjä voi tehdä vain yhden pisteen
        if (number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation) {
        //Luodaan toiminnot näkyviin
        if (this.currentOperand == '') return //Palaa alkuun jos nykyinen numero on tyhjä
        if (this.previousOperand !== '') {    // Jos aikaisempi ruutu ei ole tyhjä
            this.compute()         //Jos ruudussa on lukuja niin suorittaa compute function
        }      

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    
    compute() {
        let computation
        //Luodaan numeroista float lukuja
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev)  || isNaN(current)) return //jos ei ole numero niin palauta alkuun
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:  // Jos mitään aikaisemmista ei tapahdu niin sitten suorittaa default eli alkuun
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    //Laskutoimitukset vaikuttaa molemmissa ruuduissa 
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) //parseFloat(number) = muuttaa luvun desimaaliluvuks
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { 
          maximumFractionDigits: 0 })         
        }
        //pystyy tehdä pisteitä ja pilkkuja vaikka ei ole vielä ekaa lukua
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
        
    
//päivittää numerot ruudulle
    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
               `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        } else {
          this.previousOperandTextElement.innerText = ''
        }
        
    }

}


//Tässä osuudessa valitaan kaikki nappulat HTML tiedoista 
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//Haetaan laskin luokka
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//Tehdään numeronappulat forEach kun valitaan kaikki napit
numberButtons.forEach(button => {
    button.addEventListener('click', () => { //addEventListener mahdollistaa että jotain tapahtuu kun klikataan
        calculator.appendNumber(button.innerText) //nappi lisää sen mitä se sisältää
        calculator.updateDisplay() //päivittää numerot ruudulle kun nappeja painetaan.
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
//hyväksyy yhtäsuuren merkin klikkauksen ja suorittaa laskun sekä päivittää laskimen
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
