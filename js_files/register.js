async function registerSort() {
    console.log('In bubbe()');
    const ele = document.querySelectorAll(".bar");
    const arr = [];
    for (let i = 0; i < ele.length; i++) {
        const eleHeight = parseInt(ele[i].style.height);
        arr.push(eleHeight);
    }
    const sortedArray = mySort(arr);
    for (let i = 0; i < ele.length; i++) {
        const currentEle = ele[i];
        currentEle.style.height = sortedArray[i] + 'px';
        currentEle.children[0].textContent = sortedArray[i]/2;
        currentEle.style.background = 'green';
        await waitforme(delay);
    }
}
function mySort(arr) {
    const arrObj = {};
    for (const number of arr) {
        arrObj[number] = arrObj[number] || 0;
        arrObj[number]++;
    }
    const output = [];
    for (const num in arrObj) {
        for (let i = 0; i < arrObj[num]; i++) {
            output.push(num);
        }
    }
    return output;
}

const regSortbtn = document.querySelector(".registerSort");
regSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    time = 0;
    wait_time = 0;
    timerRunning = true;
    timerStart();
    await registerSort();
    timerEnd();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});