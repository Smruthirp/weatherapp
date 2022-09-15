
const form = document.querySelector(`form`)
const search = document.querySelector(`input`)
const msg1 = document.querySelector(`#msg1`)
const msg2 = document.querySelector(`#msg2`)
const msg3 = document.querySelector(`#msg3`)

form.addEventListener(`submit`,(e) => {
    e.preventDefault()
    const location = search.value
    const url = `/weather?address=`+location
    msg1.textContent='Loading...'
    msg2.textContent = ''
    msg3.textContent = ``
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msg1.textContent=(data.error)
        } else{
            msg1.textContent=(`Location: `+data.location)
            msg2.textContent=(`Temperature: `+ data.Temperature)
            msg3.textContent = `Last Updated: ` + data.last
        }
    })
})
})