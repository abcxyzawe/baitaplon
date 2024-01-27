function addNewToast(sts,text) {
    let status = {
        success : {
            icon : '<i class="fa-solid fa-check"></i>',
            title : 'Success!',
            color : 'success',
        },
        error : {
            icon : '<i class="fa-solid fa-triangle-exclamation"></i>',
            title : 'Error!',
            color : 'error',
        }
    }
    
    var container = document.querySelector('.toastcontainer');

    var newToast = document.createElement('div');
    newToast.className = 'toast new-toast'+ ' ' + status[sts].color;
    newToast.innerHTML = `
        <div class="toast_logo">
            ${status[sts].icon}
        </div>
        <div class="toast_content">
            <h1>${status[sts].title}</h1>
            <p>${text}</p>
        </div>
    `;

    var previousToast = container.querySelector('.toast');

    if (previousToast) {
        container.insertBefore(newToast, previousToast);
    } else {
        container.appendChild(newToast);
    }

    newToast.addEventListener('animationend', function() {
        newToast.classList.remove('new-toast');
    });

    setTimeout(function() {
        newToast.classList.add('new-toast');
    }, 0);
}