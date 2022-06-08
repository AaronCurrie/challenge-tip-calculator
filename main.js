
//save inputs to variables
let bill = document.getElementById("bill");
let people = document.getElementById("people");
let custom = document.getElementById("custom");
let reset = document.getElementById('reset');
let failed = document.getElementById('failed')

//variables to use in the calculations
let billValue;
let peopleValue = 0;
let percentValue = 0;

//get the value for the inputed bill amount
bill.addEventListener("input", (e) => {
    billValue = parseFloat(e.target.value);
    tipCalc(billValue, peopleValue, percentValue);
})

//get the value for the inputed people amount
people.addEventListener("input", (e) => {
    peopleValue = parseFloat(e.target.value);
    tipCalc(billValue, peopleValue, percentValue);
})

//get the value for the inputed custom amount
custom.addEventListener("input", (e) => {
    percents.forEach(percent => percent.classList.remove('active'));
    percentValue = parseFloat(e.target.value);
    tipCalc(billValue, peopleValue, percentValue);
})

//reset button
reset.addEventListener("click", resetAll)

//reset function
function resetAll() {
    billValue = 0;
    peopleValue = 0;
    percentValue = 0;
    bill.value = '';
    people.value = '';
    custom.value = '';
    document.getElementById("total-amount").innerHTML = "$0.00";
    document.getElementById("tip-amount").innerHTML = "$0.00";
    percents.forEach(percent => percent.classList.remove('active'));
    people.classList.remove('invalid')
    bill.classList.remove('invalid')
    failed.style.display = "none";
    reset.classList.remove('active')
}

function resetActive() {
    reset.classList.add('active')
}


//save all the button percents into an array
const percents = [...document.querySelectorAll('.percent')];

//add event listeners to each button and save its value for the calculation
percents.forEach(percent => {
    percent.addEventListener('click', (e) => {
        percents.forEach(percent => percent.classList.remove('active'));
        const clickedItem = e.target.closest('button');
        custom.value = "";
        percentValue = parseFloat(e.target.value);
        tipCalc(billValue, peopleValue, percentValue);
        clickedItem.classList.add('active')
    })
})

let tipPer = 0;
let totalPer = 0;


//Calculation function MAIN
function tipCalc(_bill, _people, _percent) { 
    //check if all inputs are entered
    if (_bill <= 0 || _bill == "") {
        document.getElementById("total-amount").innerHTML = "$0.00";
        document.getElementById("tip-amount").innerHTML = "$0.00";
        bill.classList.add('invalid');
    }else if(_people == 0 || _people == "") {
        people.classList.add('invalid');
        failed.style.display = "block";
        document.getElementById("total-amount").innerHTML = "$0.00";
        document.getElementById("tip-amount").innerHTML = "$0.00";
    }
    //activate the reset button once inputs have been entered
    if (_bill >= 1 || _people >= 1 || _percent >= 0) {
        resetActive()
    }

    // calculate and display the result
    if(_bill >= 1 && _people >= 1 && _percent >= 0) {
        people.classList.remove('invalid')
        bill.classList.remove('invalid')
        failed.style.display = "none";
        tip = (_bill / 100) * _percent;
        tipPer = (tip/_people).toFixed(2);
        billTotal = _bill + tip;
        totalPer = (billTotal / _people).toFixed(2);
        document.getElementById("total-amount").innerHTML = "$" + totalPer;
        document.getElementById("tip-amount").innerHTML = "$" + tipPer;
    }
}
