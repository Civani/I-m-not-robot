const images = [
    "https://i.imgur.com/MtJPqjB.png",
    "https://i.imgur.com/dCx692n.png",
    "https://i.imgur.com/uZPze6D.png",
    "https://i.imgur.com/s4xtioi.png",
    "https://i.imgur.com/skLnaOI.png"
];

const SUCCESS_MESSAGE = "You are a human. Congratulations!";
const FAILURE_MESSAGE = "We can't verify you as a human. You selected the non-identical tiles.";
let selected = [];

let verify_button, reset_button;
function random_positions() {
    const arr = new Array(5).fill(false); // [false, false, false, false,  false]
    const result = [];
    
    let is_all_items_picked = false;
    while(!is_all_items_picked) {
        const rand = Math.floor(Math.random() * 5);

        if(!arr[rand]) {
            result.push(rand);
            arr[rand] = true;
        }

        is_all_items_picked = arr.every(item => item);
    }

    // Now randomly pick a copy for sixth image
    result.push(Math.floor(Math.random() * 5))

    return result;
}

function reset() {
    // hide the verify button
    verify_button.setAttribute('class', 'hide-button');

    // hide the reset button
    reset_button.setAttribute('class', 'hide-button');

    // remove all image selections
    selected = [];

    const imgs = document.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('class', '');
    }
}

function verify() {
    const para = document.getElementById('para');
    if(selected[0] === selected[1]){
        para.textContent = SUCCESS_MESSAGE;
    } else {
        para.textContent = FAILURE_MESSAGE;
    }
}

function init() {

    const images_div = document.getElementById("images");
    reset_button = document.getElementById('reset');
    verify_button = document.getElementById('btn');
    // Randomly render 6 images
    const rand_positions = random_positions();


    rand_positions.forEach((item) => {
        const img = document.createElement('img');
        img.setAttribute('src', images[item]);
        img.setAttribute('data-ns-test', `img${item + 1}`);
        img.setAttribute('referrerPolicy', 'no-referrer');
        images_div.appendChild(img);
        
        
        img.onclick = function () {
            // If already selected then do nothing
            if(img.classList.length === 1 && img.classList[0] === 'selected')
                return;
            
            img.setAttribute('class', 'selected');


            selected.push(item);

            // Check selection
            if(selected.length > 0) {
                reset_button.setAttribute('class', 'show-button');
            }

            if(selected.length === 2) {
                verify_button.setAttribute('class', 'show-button');
            }
        }

    })
    
}

window.onload = init;