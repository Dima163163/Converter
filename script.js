const API = 'https://www.cbr-xml-daily.ru/daily_json.js';
const rates = {}
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const select = document.querySelector('#select')
const choiceOfConversion = document.querySelector('.money-item')
const input = document.querySelector('#input')
const label = document.querySelector('.label-input')
const labelResult = document.querySelector('.label-result')
const inputResult = document.querySelector('.input-result')
const button = document.querySelector('.btn')


const getCurrentcies = async (url) => {
	const response = await fetch(url)
	const data =	await response.json()
	return data 
}

getCurrentcies(API)


const showCurses = async(data) => {
	const response = await data(API)

	rates.USD = response.Valute.USD
	rates.EUR = response.Valute.EUR
	
	elementUSD.textContent = rates.USD.Value.toFixed(2)
	elementEUR.textContent = rates.EUR.Value.toFixed(2)
}

showCurses(getCurrentcies)

const renderCurses = () => {

		if(select.value === 'USD') {
			if (choiceOfConversion.value === 'RUBUSD'){
				label.textContent = 'Российский рубль RUB'
				labelResult.textContent = 'Доллар США'
				inputResult.value = (parseFloat(input.value) / rates.USD.Value).toFixed(2)
			} else if (choiceOfConversion.value === 'USDRUB'){
				label.textContent = 'Доллар США'
				labelResult.textContent = 'Российский рубль RUB'
				inputResult.value = (parseFloat(input.value) * rates.USD.Value).toFixed(2)
			} else {
				label.textContent = 'Необходимо указать в типе валюты USD и в типе перевода USDRUB или RUBUSD'
				labelResult.textContent = 'Необходимо указать в типе валюты USD и в типе перевода USDRUB или RUBUSD'
				inputResult.value = ''
				input.value = ''
			}
		} else if (select.value === 'EUR') {
			if (choiceOfConversion.value === 'RUBEUR'){
				label.textContent = 'Российский рубль RUB'
				labelResult.textContent = 'Евро EUR'
				inputResult.value = (parseFloat(input.value) / rates.EUR.Value).toFixed(2)
			}else if (choiceOfConversion.value === 'EURRUB'){
				label.textContent = 'Евро EUR'
				labelResult.textContent = 'Российский рубль RUB'
				inputResult.value = (parseFloat(input.value) * rates.EUR.Value).toFixed(2)
			} else {
				label.textContent = 'Необходимо указать в типе валюты EUR и в типе перевода EURRUB или RUBEUR'
				labelResult.textContent = 'Необходимо указать в типе валюты EUR и в типе перевода EURRUB или RUBEUR'
				inputResult.value = ''
				input.value = ''
			}
		} else {
			label.textContent = 'Вы не выбрали валюту'
			labelResult.textContent = 'Вы не выбрали валюту'
		}
}

button.addEventListener('click', () => {
	renderCurses(getCurrentcies)
})