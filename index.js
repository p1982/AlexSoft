const numOfLetter = 5;
const arrOfLetter = [] 
const div = document.getElementById('root')
const form = document.createElement('form')
div.appendChild(form)
form.id = "letterForm"

form.addEventListener('change', function(event){
    const valueSelected = event.target.value
    getData(valueSelected)   
    
})

function generateArrOfLetter (num) {    
    while(arrOfLetter.length<5){
        let randomCharCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97
        let letter = String.fromCharCode(randomCharCode)
        if (!arrOfLetter.includes(letter)){
            arrOfLetter.push(letter)
        }
    }
}
generateArrOfLetter(numOfLetter)

function displayLetter (arr) {
    const select = document.createElement('select')
    const optionStart = document.createElement('option')
    
    form.appendChild(select)
    select.appendChild(optionStart)
    optionStart.innerText = 'select letter'
    arr.forEach(item => {
        const option = document.createElement('option')
        option.innerText = item
        option.setAttribute('value', item)
        select.appendChild(option)
    })
}
displayLetter(arrOfLetter)

async function getData (value)  {
    const responce = await fetch(`./json/list.json`)
    const responceData = await responce.json()
    const result = displayList(responceData, value)
    return JSON.stringify(result)
}

function displayList (data, value) {
    const ul = document.createElement('ul')
    div.appendChild(ul)
    const filterData = data.filter(item => {
        if(item.name[0].toLowerCase() === value) return true
    })
    console.log(filterData);
    if (filterData.length === 0){
        const p = document.createElement("p")
        p.innerText = 'no match result'
    } else {
        filterData.forEach(item => {
            ul.innerHTML =""
            const li = document.createElement('li')
            li.innerText = item.name
            ul.appendChild(li)
        })
    }
}
