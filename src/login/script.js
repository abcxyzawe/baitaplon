const btn = document.querySelector('button')

btn.onclick = function() {
    const pass = document.querySelector('.password').value
    const email = document.querySelector('.input').value
    if (email != "20230001@eaut.edu.vn" && pass != "admin") {
        alert("Error password or Username")
    }else {
        window.location.href = '../trang_Student/index.html'
    }
}