// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {
    console.log('In swap()');

    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;

    temp = el1.children[0].textContent;
    el1.children[0].textContent = el2.children[0].textContent;
    el2.children[0].textContent = temp;
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn() {
    $(".sort-btn").prop('disabled', true);
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn() {
    $(".sort-btn").prop('disabled', false);
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider() {
    document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider() {
    document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn() {
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn() {
    document.querySelector(".newArray").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) {
    wait_time += milisec;
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

// Selecting size slider from DOM
let arraySize = document.querySelector('#arr_sz');

// Event listener to update the bars on the UI
arraySize.addEventListener('input', function () {
    console.log(arraySize.value, typeof (arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (260ms)
let delay = 260;

// Selecting speed slider from DOM
let delayElement = document.querySelector('#speed_input');

// Event listener to update delay time 
delayElement.addEventListener('input', function () {
    console.log(delayElement.value, typeof (delayElement.value));    
    $('#sort_speed').text(delayElement.value);
    delay = 320 - parseInt(delayElement.value);
});

// Creating array to store randomly generated numbers
let array = [];

// Call to display bars right when you visit the site
createNewArray();

// To create new array input size of array
function createNewArray(noOfBars = 60) {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an array of random numbers 
    array = [];
    let min = 251;
    let max = 0;
    for (let i = 0; i < noOfBars; i++) {
        const num = Math.floor(Math.random() * 250) + 1;
        array.push(num);
        if (num < min) {
            min = num;
        }
        if (num > max) {
            max = num;
        }
    }
    console.log(array);
    $('#array_max').text(max);
    $('#array_min').text(min);
    $('#array_len').text($('#arr_sz').val());
    $('#sort_speed').text($('#speed_input').val());
    $('#sort_timer').text(0);
    $('#sort_actual_timer').text(0);
    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = array[i];
        label.classList.add('value-label');
        bar.style.height = `${array[i] * 2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bar.appendChild(label);
        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function () {
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});
var time = 0;
var wait_time = 0;
var timerRunning = false;
function timerStart() {
    setTimeout(() => {
        time++;
        $('#sort_timer').text(`${time} seconds`);
        if(timerRunning){
            timerStart();
        }
    }, 1000);

}
function timerEnd() {
    timerRunning = false;
    setTimeout(() => {
        const actualTime = (time * 1000 - wait_time)/1000;
        $('#sort_actual_timer').text(`${actualTime} seconds`);
    }, 1000); 
}
