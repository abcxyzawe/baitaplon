let option = document.querySelectorAll(".btn")
const activebutton = document.getElementById("bg-active")
option.forEach((key) => {
    key.addEventListener('click', (event) => {
        activebutton.style.left = (key.offsetLeft + 20) + 'px';
    })
})

//about//

const btn = document.querySelectorAll('.fa-caret-down')

btn.forEach(list => {
    list.addEventListener('click', function() {
        const getparent = list.parentNode.parentNode
        const box = getparent
        box.classList.toggle('disable')
        list.classList.toggle('active')
    })
})

//auto//

function scrollTo(num) {
    window.scroll({
        top: num,
        behavior: 'smooth'
    });
}

const btnnav = document.querySelectorAll('.btn')

btnnav.forEach(list => {
    list.onclick = function() {
        if (list.id == 'home') {
            scrollTo(0)
        } else {
            const gethead = document.querySelector('.' + list.id)
            scrollTo(gethead.offsetTop)
        }

    }
})