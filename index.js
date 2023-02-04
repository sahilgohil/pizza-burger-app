import { menuArray } from './data.js'
const itemDiv = document.getElementById('item-container')
const orderItems = document.getElementById('order-list-items')
const orderSection = document.getElementById('order-section')
const paymentForm = document.getElementById('payment-form')
 const popUpDiv = document.getElementsByClassName('pop-up')[0]

let orderTotal = 0
let isOrdering = false

paymentForm.addEventListener('submit',function(e){
    e.preventDefault()
    let paymentDetails = new FormData(paymentForm)
    popUpDiv.classList.add('display')
    renderMessage(paymentDetails)
    
})

function renderMenu()
{
    let menuString = ""
    menuArray.forEach(function(item){
        menuString += ` <div class="container-inner border">
                            <p class="pizza-icon border">${item.emoji}</p>
                            
                            <div class="pizza-text border">
                                <h2 class="pizza-title border">${item.name}</h2>
                                <p class="pizza-description border">${item.ingredients}</p>
                                <h2 class="price border">\$${item.price}</h2>
                            </div>
                            
                            <div class="border">
                                <button id= "${item.id}">+</button>
                            </div>
                    </div>`
    })
    itemDiv.innerHTML = menuString
}
renderMenu()

document.addEventListener('click',function(e){
    
    if(e.target.id === 'complete-order-btn')
    {
        completeOrder()
    }
  
    
    menuArray.forEach(function(item){
        if(item.id == e.target.id)
        {
            
            renderOrderList(item)
        }
    })
    

})


function renderOrderList(item)
{
    if(!isOrdering)
    {
            orderSection.classList.remove('display')
            isOrdering =true
    }
      const total = document.getElementById('total')
      orderTotal += item.price
      let orderItemString = ""
     
      orderItemString = `<div class="order">
                                <h2 class="bottom-margin">${item.name}</h2>
                                <h2 class="bottom-margin">\$ <span> ${item.price} </span></h2>
                            </div>`
      orderItems.innerHTML += orderItemString
      total.textContent = `\$${orderTotal}`  
}

function completeOrder(){
    
    if(isOrdering)
    {
       
        popUpDiv.classList.remove('display')
    }
}

function renderMessage(customer)
{
    
    const messageContainer = document.getElementById('message-box')
    
      let message = `<div class="message-container-inner" >
                        <p class="thank-message">Thanks, ${customer.get('fullname')}! Your order is on its way!</p>
                    </div>
                    ` 
    messageContainer.innerHTML = message
    messageContainer.classList.remove('display')
    orderSection.classList.add('display')
}


