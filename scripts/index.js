// ========================================
//  Dom Selections 
// ========================================
const orderForm = document.querySelector('[data-form]');







// ========================================
// Helper Functions
// ========================================
function handelSubmit(event) {
    event.preventDefault();
    console.log('You get a coffee, you get a coffee, and you get a coffee')

    console.log(event.target);

    // AJAX
    // Call fetch()
    // pass it the url
    // and an object with a method and body
    const url = event.target.action;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = {
        strength: elements.strength.value,
        flavor: elements.flavor.value,
        size: elements.size.value,
        coffee: elements.coffee.value,
        emailAddress: elements.emailAddress.value,
    };

    fetch(url, {
        method: method, 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)
    })
}




// ========================================
// Main Event Listeners 
// ========================================
console.log('about to add event listener!')
orderForm.addEventListener('submit', handelSubmit);
