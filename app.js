listeners();

function listeners(){
    document.getElementById('Calculate').addEventListener('click',function(e){
        //hide the results
        document.querySelector('#results').style.display = 'none';
        document.querySelector('#loading').style.display = 'block';
    
        setTimeout(Calculate , 1000);
        
        e.preventDefault();
    });

    document.getElementById('clear-amount').addEventListener('click',clearInput);
    document.getElementById('clear-interest').addEventListener('click',clearInput);
    document.getElementById('clear-years').addEventListener('click',clearInput);
}

function clearInput(e){
    // console.log(e.target.previousElementSibling);
    e.target.previousElementSibling.value = '';
    document.querySelector('#results').style.display = 'none';
    e.preventDefault();
}

function Calculate(){
    
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/ 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest , calculatedPayment);
    const monthly = (principle*x*calculatedInterest)/(x-1);
    
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayment).toFixed(2);
        totalInterest.value = ((totalPayment.value) - principle).toFixed(2);
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'block';
    }else{
        showError('please check your numbers');
    }
    
}

function showError(error){

    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'none';

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //create a new element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    //insert before heading
    card.insertBefore(errorDiv , heading);

    document.querySelector('#loading').style.display = 'none';
    setTimeout(clearError , 2000);
}

function clearError(){
    document.querySelector('.alert').remove();
}