
document.addEventListener("DOMContentLoaded", function () {
  var dkh = document.querySelector(".text-list > a");
  dkh.addEventListener("click", function () {
    // Lấy menu con
    var submenu = this.nextElementSibling;

    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      // Đóng tất cả các menu con khác trước khi mở menu này
      var allSubmenus = document.querySelectorAll(".text-list__item");
      allSubmenus.forEach(function (menu) {
        menu.style.display = "none";
      });
      // Hiển thị menu con
      submenu.style.display = "block";
    }
  });
});

// MEnu
const list = document.querySelectorAll(".list");
list.forEach((listItem) => {
  listItem.onclick = active;
});

function active() {
  var nameId = this.id;
  const getMenu = document.querySelectorAll(".list-main");
  const getMainMenu = document.querySelector(".list-main" + "." + nameId);
  getMenu.forEach((listItem) => {
    listItem.classList.add("disable");
  });
  getMainMenu.classList.remove("disable");
}

//   Tại trang nội dung của sơ yếu lí lịch
function showContent(contentId) {
  // Ẩn tất cả các nội dung
  var allContents = document.querySelectorAll(".tths-main");
  for (var i = 0; i < allContents.length; i++) {
    allContents[i].classList.add("none");
  }

  // Hiển thị nội dung tương ứng với mục được chọn
  var selectedContent = document.querySelector("." + contentId);
  selectedContent.classList.remove("none");
}

function showPoint(ctId) {
  // Ẩn tất cả nội dung
  var allContent = document.querySelectorAll(".point-main");
  for (var i = 0; i < allContent.length; i++) {
    allContent[i].classList.add("noseen");
  }
  // Hiển thị nội dung của lớp cụ thể
  var specificContent = document.querySelector("." + ctId);
  specificContent.classList.remove("noseen");
}

const allSideMenu = document.querySelectorAll(
  "#sidebar .sidebar-list.top li a"
);

allSideMenu.forEach((item) => {
  const li = item.parentElement;
  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const allSideMenu = document.querySelectorAll(
    "#sidebar .sidebar-list.top li a"
  );

  allSideMenu.forEach((item, index) => {
    item.addEventListener("click", function () {
      const li = item.parentElement;

      // Kiểm tra xem mục đã có lớp 'active' hay chưa
      const isActive = li.classList.contains("active");

      // Nếu chưa có lớp 'active', thì xóa 'active' từ tất cả các mục và thêm 'active' cho mục được nhấp
      if (!isActive) {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      }
    });
  });
});


// Kiểm tra xem Local Storage đã được hỗ trợ chưa
if (typeof (Storage) !== "undefined") {
  // Lấy dữ liệu từ Local Storage nếu có
  document.getElementById("savedEmail").innerText = localStorage.getItem("savedEmail") || "";
  document.getElementById("savedPhoneOwn").innerText = localStorage.getItem("savedPhoneOwn") || "";
  document.getElementById("savedPhoneFml").innerText = localStorage.getItem("savedPhoneFml") || "";
  document.getElementById("savedXaphuong").innerText = localStorage.getItem("savedXaphuong") || "";
  document.getElementById("savedHuyen").innerText = localStorage.getItem("savedHuyen") || "";
  document.getElementById("savedTinh").innerText = localStorage.getItem("savedTinh") || "";
  document.getElementById("savedQue").innerText = localStorage.getItem("savedQue") || "";
}

function validateSetAcc() {
  var email = document.getElementById("email").value;
  var phone_own = document.getElementById("phone-own").value;
  var phone_fml = document.getElementById("phone-fml").value;
  var xaphuong = document.getElementById("xaphuong").value;
  var huyen = document.getElementById("huyen").value;
  var tinh = document.getElementById("tinh").value;

  var thongBao = document.getElementById("thongbao");
  var checkEmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

  // Đặt tất cả các thông báo về rỗng trước khi kiểm tra
  thongBao.innerHTML = "";
  document.getElementById("checkPhoneOwn").innerHTML = "";
  document.getElementById("checkPhoneFml").innerHTML = "";
  let ktra = true;

  if (email == "" || email == null) {
    thongBao.innerHTML = "Không được để trống mục này!";
    ktra = false;
  } else {
    if (!checkEmail.test(email)) {
      thongBao.innerHTML = "Email không đúng định dạng!";
      ktra = false;
    }
  }

  var checkPhoneOwn = document.getElementById("checkPhoneOwn");
  var checkphone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (phone_own == "" || phone_own == null) {
    checkPhoneOwn.innerHTML = "Không được để trống mục này!";
    ktra = false;
  } else {
    if (!checkphone.test(phone_own)) {
      checkPhoneOwn.innerHTML = "Số điện thoại không đúng định dạng!";
      ktra = false;
    }
  }

  var checkPhoneFml = document.getElementById("checkPhoneFml");
  var checkphonegd = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (phone_fml == "" || phone_fml == null) {
    checkPhoneFml.innerHTML = "Không được để trống mục này!";
    ktra = false;
  } else {
    if (!checkphonegd.test(phone_fml)) {
      checkPhoneFml.innerHTML = "Số điện thoại không đúng định dạng!";
      ktra = false;
    }
  }

  const thongtin = document.querySelectorAll(".kitu");
  thongtin.forEach(list => {
    console.log(list.value);
    if (list.value == '' || list.value == null) {
      const getParent = list.parentNode;
      const getp = getParent.querySelector('.error-message');
      if (!getp) {
        const newp = document.createElement("p");
        newp.classList.add("error-message");
        newp.innerText = "Không được để trống mục này!";
        getParent.appendChild(newp);
      }
     ktra = false;
    } else {
      const getParent = list.parentNode;
      const getp = getParent.querySelector('.error-message');
      if (getp) {
        getp.remove();
      }
    }
  });
  // Nếu tất cả đều hợp lệ
  if(ktra){
    thongBao.innerHTML = "";
  checkPhoneOwn.innerHTML = "";
  checkPhoneFml.innerHTML = "";
  }
  
   return ktra;
}

function saveInformation() {
  var successMessage = document.getElementById("successMessage");
  var toastIcon = document.getElementById("toastIcon");
  console.log(toastIcon);
 
  if (validateSetAcc()) {
    // Lưu thông tin vào Local Storage
    if (typeof (Storage) !== "undefined") {
      
      var email = document.getElementById("email").value;
      var phone_own = document.getElementById("phone-own").value;
      var phone_fml = document.getElementById("phone-fml").value;
      var xaphuong = document.getElementById("xaphuong").value;
      var huyen = document.getElementById("huyen").value;
      var tinh = document.getElementById("tinh").value;

      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPhoneOwn", phone_own);
      localStorage.setItem("savedPhoneFml", phone_fml);
      localStorage.setItem("savedXaphuong", xaphuong);
      localStorage.setItem("savedHuyen", huyen);
      localStorage.setItem("savedTinh", tinh);
      localStorage.setItem("savedQue", xaphuong + ", " + huyen + ", " + tinh);
    }
    successMessage.style.display = "flex";
    console.log(validateSetAcc()); 
    successMessage.querySelector("h3").innerText = "Lưu thành công";
    toastIcon.classList.add("bxs-check-circle");
    toastIcon.classList.remove("bxs-error-circle");
    successMessage.style.backgroundColor = "#64d864";
   
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 3000);
  } else {  
    successMessage.style.display = "flex";  
    // Nếu có lỗi, ẩn thông báo thành công và hiển thị thông báo thất bại
    successMessage.style.backgroundColor = "#f74f4f";
    toastIcon.classList.add("bxs-error-circle");
    toastIcon.classList.remove("bxs-check-circle");
    successMessage.querySelector("h3").innerText = "Lưu thất bại!";
   
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 2000);
  }
}

