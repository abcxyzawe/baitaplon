let list = document.querySelectorAll(".nav li")
var isloaded = false;
var queuedisable = false;
let getenable = document.querySelector(".hovered")
let oldenable = document.querySelector(".enable");
let enablenew;
let newgetenable;

let dataclass = []
let studientdata = []

// toast noti

function autodelete(div, timeout) {
    setTimeout(function() {
        div.classList.add('noti-remove')
        div.addEventListener('animationend', function() {
            div.remove()
        });
    }, timeout);
}

function setclipboard(text) {
    navigator.clipboard.writeText(text).then(
        function() {
            addNewToast('success', "Đã Sao Chép Thành Công", 5000);
        },
        function(err) {
            addNewToast('error', "Không Thể Sao Chép " + err, 5000);
        }
    );
}

function formattime() {
    const date = new Date();
    const formatdate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return formatdate + ' - ' + formattedTime;    
}

function addNewToast(sts,text,timeout) {
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

    autodelete(newToast,timeout)
}

//

// patch data 

async function patchdata(url, data) {
    try {
        var option = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        
        const res = await fetch('http://localhost:3000/' + url, option)
        const result = await res.json()
        
        return result
    } catch (error) {
        throw error;
    }
}

//Post data//

async function postdata(url, data) {
    try {
        var option = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        
        const res = await fetch('http://localhost:3000/' + url, option)
        const result = await res.json()
        return result
    } catch (error) {
        throw error;
    }
}

//

async function getdataformserver(name) {
    try {
        const response = await fetch('http://localhost:3000/' + name);
        const data = response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

//Quan Ly Sinh Vien//
async function fetchData() {
    try {
        const [dataclass, studientdata,mainmenu,schedule,schedule2,documents] = await Promise.all([
            getdataformserver("maindata"),
            getdataformserver("userdata"),
            getdataformserver("mainmenu"),
            getdataformserver("schedule"),
            getdataformserver("schedule2"),
            getdataformserver("documents"),
        ]);
        addNewToast('success', "Loaded Data",5000)
        let ListNganh = document.querySelector(".list-qlsv.nganh")
        const chalistnganh = document.querySelector(".list-qlsv.mon");
        const tbody = document.querySelector('.table-list-sdt tbody')
        const chalistlop = document.querySelector(".list-qlsv.lop");

        //create list sinh vien, callback, reload//
        function getlistsv(finder) {
            const array = []
            studientdata.forEach(list => {
                list.studient.forEach(list2 => {
                    if (list2.id == finder || finder == '') {
                        array.push(list2);
                    }
                })
            })
            return array;
        }

        function renderlistsv(finder) {
            const rowstuident = document.querySelector('.table-list-sdt tbody')
            while (rowstuident.firstChild) {
                rowstuident.removeChild(rowstuident.firstChild);
            }
            getlistsv(finder).forEach(list => {
                const newrow = document.createElement('tr')
                const datarow = [
                    list.id,
                    list.name,
                    14,
                    list.class,
                    list.points[0],
                    list.points[1],
                    list.points[2],
                    list.status[0],
                    list.status[1],
                    "3d ago",
                    '<i class="fas fa-ellipsis"></i>',
                ]
                datarow.forEach((data) => {
                    const td = document.createElement('td');
                    td.innerHTML = data;
                    newrow.appendChild(td);
                });
                rowstuident.appendChild(newrow);
            })
        }
        const inputid = document.querySelector('.searchidsv')
        inputid.value = ''
        renderlistsv(inputid.value)
        calllistsinhvien()
        inputid.addEventListener('input', function(key) {
            renderlistsv(inputid.value)
            calllistsinhvien()
        })
        ////

        ///fucntion for quanlysinhvien//

        function makechildli(nameclass, textcontent, element, something) {
            const newlielement = document.createElement("li");
            newlielement.textContent = textcontent;
            newlielement.classList.add(nameclass);
            if (something != false) {
                newlielement.id = something;
            }
            element.appendChild(newlielement);
        }

        dataclass.classroom.forEach((data) => {
            const newlielement = document.createElement("li");
            newlielement.textContent = data.name;
            newlielement.classList.add("list-nganh");
            newlielement.classList.add("start");
            newlielement.id = data.id;
            ListNganh.appendChild(newlielement);
        });
        let getlistnganh = document.querySelectorAll(".list-nganh");
        function getdata(name) {
            const monhoc = [];
            for (const nganh of dataclass.classroom) {
                if (nganh.id == name) {
                    for (const listmon of nganh.monday) {
                        monhoc.push(listmon.tenmonhoc)
                    }
                }
            }
            return monhoc
        }

        let getlistmon = document.querySelectorAll(".list-mon");
        let getlistlop = document.querySelectorAll(".list-lop");
        let tennganhactive = ""
        let tenmonactive = ""
        let tenlopactive = ""

        function rendermon() {
            let childmon = document.querySelectorAll(".list-mon")
            getdata((this.id).toString()).forEach(list => {
                childmon.forEach(key2 => {
                    key2.remove()
                })
                makechildli("list-mon", list, chalistnganh, false)
            })
            tennganhactive = this.textContent
            getlistmon = document.querySelectorAll(".list-mon");
            getlistmon.forEach(key => {
                key.onclick = renderlop
                key.addEventListener('click', animationlop);
            })
        }
        getlistnganh.forEach(key => {
            key.onclick = rendermon
        })

        function getdata2(name, mon) {
            const listclass = [];
            for (const nganh of dataclass.classroom) {
                if (nganh.name == name) {
                    for (const listmon of nganh.monday) {
                        if (listmon.tenmonhoc == mon) {
                            return listmon.class
                        }
                    }
                }
            }
        }

        function getdatasinhvien(nameclass) {
            let array = []
            studientdata.forEach(list => {
                if (list.class == nameclass) {
                    array = list.studient;
                }
            })
            return array
        }

        function rendersinhvien() {
            const rowstuident = document.querySelector('.listsv tbody')
            while (rowstuident.firstChild) {
                rowstuident.removeChild(rowstuident.firstChild);
            }
            getdatasinhvien((this.textContent).toString()).forEach(list => {
                const newrow = document.createElement('tr')
                const datarow = [
                    list.id,
                    list.name,
                    14,
                    this.textContent,
                    list.points[0],
                    list.points[1],
                    list.points[2],
                    list.status[0],
                    list.status[1],
                    "3d ago",
                    '<i class="fas fa-ellipsis"></i>',
                ]
                datarow.forEach((data) => {
                    const td = document.createElement('td');
                    td.innerHTML = data;
                    newrow.appendChild(td);
                });
                rowstuident.appendChild(newrow);
                calllistsinhvien()
            })
        }

        function renderlop() {
            let getchildlop = document.querySelectorAll(".list-lop")
            getdata2(tennganhactive, this.textContent).forEach(list => {
                getchildlop.forEach(key2 => {
                    key2.remove()
                })
                makechildli("list-lop", list, chalistlop, false)
            })
            tenmonactive = this.textContent
            getlistlop = document.querySelectorAll(".list-lop");
            getlistlop.forEach(key => {
                key.onclick = rendersinhvien
                key.addEventListener('click', animationlop);
            })
        }

        // Menu nav
        
        //Input Menu//
        const thongtinsv = document.querySelector('.thongtinsv p');
        const diemchuyencan = document.querySelector('.input-dcc input');
        const diemgiuaki = document.querySelector('.input-dgk input');
        const diemcuoiki = document.querySelector('.input-dck input');
        let getidclass = '';
        let getidmsv = '';
        let arraypoints = []
        //// msv for idclass
        function msvforidclass(msv) {
            let avc = ''
            studientdata.forEach(list => {
                list.studient.forEach(list2 => {
                    if (list2.id == msv) {
                        avc = list.id
                    }
                })
            })
            return avc
        }
        
        //// minimenu
        let menua = document.querySelector('.navselect');
        
        function addAutoDeleteNav(div) {
            document.addEventListener('click', function(event) {
                if (event.target.classList.contains('nav-disable') || event.target.closest('tbody tr td i')) {
                    return
                }
                if (event.target.closest('.navselect')) {
                    if (event.target.classList.contains('text-action') !== true) {
                        div.classList.add('nav-disable');
                    }
                } else {
                    div.classList.add('nav-disable');
                }
            });
        }
        let datasinhvien;
        function calllistsinhvien() {
            getalllist = document.querySelectorAll('tbody tr td i');
            getalllist.forEach(list => {
                list.addEventListener('click', function(event) {
                    menua.classList.remove('nav-disable');
                    menua.style.left = (event.pageX - 160) + 'px';
                    menua.style.top = (event.pageY - 150) + 'px';
                    const onetimecall = getlistsv(list.parentNode.parentNode.children[0].textContent)
                    onetimecall.forEach(list2 => {
                        datasinhvien = list2
                        var thongtinfortext = list2.name + ' - ' + list2.id
                        thongtinsv.innerHTML = thongtinfortext
                        diemchuyencan.value = list2.points[0]
                        diemgiuaki.value = list2.points[1]
                        diemcuoiki.value = list2.points[2]
                        arraypoints.push(list2.points)
                        getidmsv = list2.id
                        getidclass = msvforidclass(list2.id)
                    })

                    addAutoDeleteNav(menua);
                });
            });
        }

        //build function for sinh vien ( copy thong tin , sua diem ) minimenu//
            let buttonmenu = document.querySelectorAll('.navselect > ul > li');
            const getshadow = document.querySelector('.shadow');
            const btnsuadiem = document.querySelector('.btnsuadiem');
            buttonmenu.forEach(list => {
                list.addEventListener('click', function() {
                    if (list.classList.contains('copythongtin')) {
                        setclipboard(JSON.stringify(datasinhvien), null, 2)
                    } else if (list.classList.contains('suadiem')) {
                        getshadow.classList.remove('disable-shadow')
                    }
                })
            })
            // deleteshadow
                document.addEventListener('click', function(event) {
                    if (event.target.closest('.container-az')) {
                        return
                    }
                    if (event.target.closest('.shadow')) {
                        getshadow.classList.add('disable-shadow');
                    }
                });
            //
        //

        btnsuadiem.onclick = function () {
            let dtsv;
            studientdata.forEach(list2 => {
                if (list2.id == getidclass) {
                    dtsv = list2
                }
            })
            getshadow.classList.add('disable-shadow')
            for (const key in dtsv.studient) {
                if (dtsv.studient[key].id == getidmsv) {
                    dtsv.studient[key].points[0] = diemchuyencan.value;
                    dtsv.studient[key].points[1] = diemgiuaki.value;
                    dtsv.studient[key].points[2] = diemcuoiki.value;
                }
            }
            patchdata('userdata/' + getidclass, dtsv)
            addNewToast('success', 'Da Thay Doi Diem Cua Sinh Vien',5000)
        }

        // fucntion for diem danh//
        const getmainoption = document.getElementById('classs')

        function getallclass() {
            let array = []
            studientdata.forEach(list => {
                array.push(list.class)
            })
            return array
        }

        function addoption() {
            getallclass().forEach(list => {
                const newoption = document.createElement('option')
                newoption.text = list
                getmainoption.appendChild(newoption)
            })
        }
        addoption()
        let savelopdiemdanh = ''
        function renderlistdiemdanh() {
            const rowstuident = document.querySelector('.listdiemdanh tbody')
            while (rowstuident.firstChild) {
                rowstuident.removeChild(rowstuident.firstChild);
            }
            savelopdiemdanh = getmainoption.value
            getdatasinhvien(getmainoption.value).forEach(list => {
                const newrow = document.createElement('tr')
                const datarow = [
                    list.id,
                    list.name,
                    list.class,
                    `
                    <td class="trangthai">
                        <select id="trangthai">
                            <option>Đi Học</option>
                            <option>Nghỉ Học</option>
                            <option>Đi Muộn</option>
                        </select>
                    </td>
                    `,
                    `
                    <input type="checkbox" class="selecttrangthai">
                    `
                ]
                datarow.forEach((data) => {
                    const td = document.createElement('td');
                    td.innerHTML = data;
                    newrow.appendChild(td);
                });
                rowstuident.appendChild(newrow);
            })
        }

        const getbtnhoanthanh = document.querySelector('.findstudient.hoanthanh')
        const getbtngetclass = document.querySelector('.findstudient.getclass')
        const getbuttonselectall = document.getElementById('main-trangthai')
        getbtnhoanthanh.onclick = function() {
            const getform = document.querySelector('.form')
            const getto = document.querySelector('.to')
            if (getform.value != '' && getto.value != '') {
                addNewToast('success', 'Đã Điểm Danh', 5000);
                let data1 = []
                const rowstuident = document.querySelectorAll('.listdiemdanh tbody tr')
                rowstuident.forEach(list => {
                    var dta = {
                        'name' : list.querySelectorAll('td')[0].innerText,
                        'id' : list.querySelectorAll('td')[1].innerText,
                        'status' : list.querySelectorAll('td')[3].querySelector('#trangthai').value
                    }
                    data1.push(dta)
                })
                const datarow = {
                    'data' : data1,
                    'form' : getform.value,
                    'to' : getto.value,
                    'class' : savelopdiemdanh,
                    'time' : formattime(),
                }
                postdata('schedule',datarow)
            } else {
                addNewToast('error', "Nhập Từ From Đến To",5000)
            }
        }
        getbtngetclass.onclick = renderlistdiemdanh

        getbuttonselectall.onclick = function() {
            const getlisti = document.querySelectorAll('.selecttrangthai')
            getlisti.forEach(list => {
                if (getbuttonselectall.checked == false) {
                    list.checked = false
                } else {
                    list.checked = true
                }
            })
        }

        let getoptiontrangthai = document.getElementById('settrangthai')
        getoptiontrangthai.onchange = () => {
            getoptiontrangthai = document.getElementById('settrangthai')
            const getlisti = document.querySelectorAll('.selecttrangthai')
            getlisti.forEach(list => {
                if (list.checked == true) {
                    list.parentNode.parentNode.querySelector('#trangthai').value = getoptiontrangthai.value
                }
            })
        }

        function fucntiongetstatus(object,status) {
            var num = 0
            object.data.forEach(list => {
                if (list.status == status) {
                    num ++
                }
            })
            return num
        }

        function renderhistorydd() {
            schedule.forEach(list => {
                var container = document.querySelector('.body-lsdd')
                var newbox = document.createElement('div');
                newbox.className = `box-thongtin`;
                newbox.id = list.id
                newbox.innerHTML = `
                <div class="header-lsdd">
                    <h1>Lịch Sử Điểm Danh</h1>
                </div>
                <div class="boxheader">
                    <h3>ID: ${list.id} - Lớp: ${list.class} - Tiết: ${list.form + '-' + list.to} - Time : ${list.time}
                        <button class = "getthongtindd">Copy Thông Tin</button>
                    </h3>
                </div>
                <div class="boxstatus">
                    <div class="dihoc">
                        Số Học Sinh Đi Học: ${fucntiongetstatus(list,"Đi Học")}
                    </div>
                    <div class="nghihoc">
                        Số Học Sinh Nghỉ Học: ${fucntiongetstatus(list,"Nghỉ Học")}
                    </div>
                    <div class="dimuon">
                        Số Học Sinh Đi Muộn: ${fucntiongetstatus(list,"Đi Muộn")}
                    </div>
                </div>
                `;
                var hasbox = container.querySelector('.box-thongtin');

                if (hasbox) {
                    container.insertBefore(newbox, hasbox);
                } else {
                    container.appendChild(newbox);
                }
            })
        }
        renderhistorydd()

        //getthongtin//

        const btnthongtindd = document.querySelectorAll('.getthongtindd') 

        function idforhistory(id) {
            let abz;
            schedule.forEach(list => {
                if (list.id == id) {
                    abz = list
                }
            })
            return abz
        }

        btnthongtindd.forEach(list => {
            list.addEventListener('click', function() {
                setclipboard(JSON.stringify(idforhistory(list.parentNode.parentNode.parentNode.id), null, 2))
            })
        })

        //function for lich hoc//

        function renderlichhoc() {
            const rowstuident = document.querySelector('.listlichhoc tbody')
            while (rowstuident.firstChild) {
                rowstuident.removeChild(rowstuident.firstChild);
            }
            schedule2.forEach(list => {
                const newrow = document.createElement('tr')
                const datarow = [
                    list.tiet,
                    list.monday,
                    list.time,
                    list.endtime,
                    list.class,
                ]
                datarow.forEach((data) => {
                    const td = document.createElement('td');
                    td.innerHTML = data;
                    newrow.appendChild(td);
                });
                rowstuident.appendChild(newrow);
            })
        }
        renderlichhoc()

        //function for tai lieu//
        function getallmon() {
            const arr = []
            dataclass.classroom.forEach(list => {
                arr.push(list.monday[0].tenmonhoc)
            })
            return arr
        }
        function rendermonfortailieu() {
            const containermon = document.getElementById('file-mon')
            getallmon().forEach(list => {
                let newoption = document.createElement('option')
                newoption.text = list
                containermon.appendChild(newoption)
            })
        }
        rendermonfortailieu()

        const btntailieu = document.querySelector('.button-sendtailieu')
        
        function sendtailieu() {
            const tailieu = document.querySelector('.input-file');
            const mainfile = tailieu.files[0];
            const title = document.querySelector('.title-tailieu')
            const desc = document.querySelector('.desc-tailieu')
            const nganh = document.getElementById('file-mon')
            if (mainfile) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    var data = {
                        title : title.value,
                        content: desc.value,
                        nganh: nganh.value,
                        basefile : event.target.result,
                        namefile : tailieu.value.split('\\').pop(),
                    }
                    postdata('documents', data)
                };
                reader.readAsDataURL(mainfile)
            }
        }
        
        btntailieu.onclick = sendtailieu
        
        function renderfile() {
            const containerdiv = document.querySelector('.boxtailieu')
            documents.forEach(list => {
                const newdiv = document.createElement('div')
                newdiv.classList.add('boxtailieu-htr')
                newdiv.innerHTML = `
                <div class="title-tailieu">
                    <h3>${list.title} - ${list.nganh}</h3>
                    <p>${list.content}</p>
                </div>
                <div class="hidden" id = "${list.namefile}"></div>
                <div class="icondown">
                    <i id = "${list.basefile}" class="fa-solid fa-download"></i>
                </div>
                `
                containerdiv.appendChild(newdiv)
            })
        }
        renderfile()

        function dowloadfile() {
            const downloadLink = document.createElement("a");
            downloadLink.href = this.id;
            downloadLink.download = this.parentNode.parentNode.querySelector('.hidden').id;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }

        const getallbtndown = document.querySelectorAll('.icondown i')

        getallbtndown.forEach(list => {
            list.onclick = dowloadfile
        })

        // animation //
        const step = document.querySelectorAll(".one, .two , .three")
        const start = document.querySelectorAll(".start")
        let translate = {
            'one' : 1,
            'two' : 2,
            'three' : 3
        }

        
        let endanimation = false
        function animations() {
            step.forEach(list => {
                if (list.classList.contains('step') && (list.classList.contains('two') || list.classList.contains('three'))) {
                    list.classList.remove('step')
                    list.classList.add('steped')
                    return
                }
                if (list.classList.contains('one') && list.classList.contains('steped') == false) {
                    list.classList.add('step')
                    return
                }
            })
        }

        step.forEach(list => { 
            list.addEventListener('animationend', key => {
                list.classList.remove('steped')
            })
        })
        
        function findKey(value) {
            for (const [key, val] of Object.entries(translate)) {
                if (val === value) {
                    return key;
                }
            }
            return null;
        }
        function getnumber(key) {
            let num;
            key.classList.forEach(list => {
                if (typeof(translate[list]) == "number") {
                    num = translate[list]
                }
            })
            return num
        }

        function gethigherbtn() {
            const higher = document.querySelectorAll(".step")
            let max = 1
            higher.forEach(list => {
                if (getnumber(list) > max) {
                    max = getnumber(list)
                }
            })
            return max
        }
        
        function animationlop() {
            if (getnumber(this.parentNode.parentNode) + 1 < gethigherbtn()) {
                
            } else {
                let nextbtn = document.querySelectorAll('.' + findKey(getnumber(this.parentNode.parentNode) + 1))
                nextbtn.forEach(key => {
                    key.classList.add('step')
                })
            }
        }

        start.forEach(btn => {
            btn.addEventListener('click', animations);
        })
        //Hieu ung menu//
        const elementToTransform = document.querySelectorAll('.list');
        const getmainmenu = document.querySelector('.list' + '.' + mainmenu.menu);
        const getmainnav = document.getElementById(mainmenu.menu);
        getmainmenu.classList.add('enable')
        getmainnav.classList.add('hovered')
        getenable = document.querySelector(".hovered")
        oldenable = document.querySelector(".enable");
        function active() {
            if (this.classList.contains('hovered') != true) {
                if (isloaded && queuedisable == false) {
                    list.forEach((item) => {
                        item.classList.remove("hovered");
                    })
                    this.classList.add("hovered")
                    newgetenable = document.querySelector(".hovered")
                    oldenable = document.querySelector('.' + 'list' + '.' + getenable.id)
                    oldenable.classList.remove('enable');
                    oldenable.classList.add('disable');
                    getenable = document.querySelector(".hovered")
                    enablenew = document.querySelector('.' + 'list' + '.' + newgetenable.id)
                    mainmenu.menu = newgetenable.id
                    if (newgetenable.id != "logout") {
                        patchdata('mainmenu', mainmenu)
                    }
                }
            }
        }

        list.forEach((item) => {
            item.onclick = active;
        })

        // Menu //

        let toggle = document.querySelector(".toggle");
        let nav = document.querySelector(".nav");
        let main = document.querySelector(".main")

        toggle.onclick = function () {
            nav.classList.toggle("active");
            main.classList.toggle("active");
        }
        // doi animation

        elementToTransform.forEach((event) => {
            event.addEventListener('animationend', (key) => {
                if (event.classList.contains('enable') && queuedisable == false) {
                    isloaded = true;
                } else {
                    event.classList.remove('disable');
                    enablenew.classList.add('enable');
                    queuedisable = false;
                }
            })
        })
        
    } catch (error) {
        addNewToast('error', error,5000)
    }
}

fetchData();

//out to logout//

let toggle = document.querySelector(".toggle");
let nav = document.querySelector(".nav");
let main = document.querySelector(".main")
//auto minium nav bar//

function handleResize() {
    if (this.innerWidth <= 1200) {
        nav.classList.add("active");
        main.classList.add("active");
    }
}

window.addEventListener('resize', handleResize);

var maxwitdh = window.matchMedia("(max-width: 1200px)").matches;

if (maxwitdh) { 
    nav.classList.add("active");
    main.classList.add("active");
}

//custom put file//

const fileInput = document.getElementById('filetailieu');
const outputfile = document.querySelector('.file-name');

fileInput.addEventListener('change', function () {
    const fileName = this.value.split('\\').pop();
    outputfile.textContent = fileName || 'No File';
});