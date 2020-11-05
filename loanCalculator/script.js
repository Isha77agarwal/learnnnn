document.querySelector('#loan-form').addEventListener('submit',function(e) {
    //Hide Results
    document.getElementById('results').style.display ='none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';
    e.preventDefault();

    setTimeout(calculate,2000);
});

//function to calculate amount
function calculate() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //computing monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //hide Loader
        document.getElementById('loading').style.display = 'none';

        //show Results
        document.getElementById('results').style.display ='block';
    } else {
        showError("Please check your values!!!");
    }
}

function showError(error) {
    //create Div
    const errorDiv = document.createElement('div');

    //Get Elements
    const card = document.querySelector('.card');
    const loanForm = document.querySelector('#loan-form');

    //Add Class
    errorDiv.className = 'alert alert-danger mb-3 mt-2';

    //Create text Node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Before the form element
    card.insertBefore(errorDiv,loanForm);

    //hide Loader
    document.getElementById('loading').style.display = 'none';

    //hide Results
    document.getElementById('results').style.display ='none';
    
    setTimeout(function(){
        errorDiv.remove();
    },3000);
}