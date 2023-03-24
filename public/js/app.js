const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg=document.getElementById('message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

   
    fetch('/weather?location='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg.innerText=data.error;
        }
        else{
        msg.innerText='Current weather is like '+data.description+'.'+'The temperature is '+data
        .temp+'.'+'Although it feelsLike '+data.feelslike;
    }
    })
})
})