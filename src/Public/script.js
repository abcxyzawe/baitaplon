let option = document.querySelectorAll(".changetype")
const activebutton = document.getElementById("bg-active")
const form = document.querySelector(".form")
let buttonactive = document.querySelector(".changetype.active")
option.forEach((key) => {
    key.addEventListener('click', (event) => {
        form.classList.remove('login');
        form.classList.remove('login2');
        form.classList.add(key.id);
        activebutton.style.left = key.offsetLeft + 'px';
        if (key.className != ".changetype.active") {
            key.classList.add('active');
            buttonactive.classList.remove('active');
            buttonactive = document.querySelector(".changetype.active")
        } else {
            buttonactive = document.querySelector(".changetype.active")
        }
    })
})

