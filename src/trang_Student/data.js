async function getdataformserver(name) {
    try {
        const response = await fetch('http://localhost:3000/' + name);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const formatpoints = {
    "A+" : 9,
    "A" : 8.5,
    "B+" : 8,
    "B" : 7,
    "C+" : 6.5,
    "C" : 5.5,
    "D+" : 5.0,
    "D" : 4.0,
    "F" : 3.9,
}

function formartpoint(number) {
    let max = "A+"
    for (const i in formatpoints) {
        if (formatpoints[i] <= number) {
            max = i
            break
        }
    }
    return max
}

function convertpoints(number) {
    return number / 2.5
}

function getmainpoints(num1,num2,num3) {
    return (num1 * 0.1) + (num2 * 0.3) + (num3 * 0.6)
}

async function renderdata() {
    const datastudient = await Promise.all([
        getdataformserver("userdata")
    ])
    const mainclass = datastudient[0][0].studient[0].points
    const points1 = mainclass[0]
    const points2 = mainclass[1]
    const points3 = mainclass[2]
    const chuyencan = document.getElementById('cc')
    const giuaki = document.getElementById('gk')
    const cuoiki = document.getElementById('kthp')
    const pointsmain = document.getElementById('pointsmain')
    const halfpoint = document.getElementById('halfpoint')
    const stringpoint = document.getElementById('stringpoint')
    const stringpoint2 = document.getElementById('stringpoint2')
    const tbc = document.getElementById('tbc')
    chuyencan.innerText = points1
    giuaki.innerText = points2
    cuoiki.innerText = points3
    pointsmain.innerText = getmainpoints(points1,points2,points3)
    halfpoint.innerText = convertpoints(getmainpoints(points1,points2,points3))
    stringpoint2.innerText = formartpoint(getmainpoints(points1,points2,points3))
    stringpoint.innerText = formartpoint(getmainpoints(points1,points2,points3))
    tbc.innerText = getmainpoints(points1,points2,points3)
}

renderdata()