let overlay = document.querySelector(".overlay")
let overlayButton = document.querySelector(".overlay .button")
let nameSpan = document.querySelector(".name span")
let boxes = document.querySelectorAll(".box")
let wrongTries = document.querySelector(".wrong-tries span")
let musicSuccess = document.getElementById("success")
let musicNegative = document.getElementById("negative")
let music = document.getElementById("music")
let timer = document.querySelector(".timer")

let a = 0;
let arrN = []
// let arrNew = []

window.onload = () => {
    let arr = [15, 12, 8, 19, 2, 9, 1, 14, 3, 7, 16, 11, 5, 4, 17, 6, 10, 13, 18]


    for (let i = 0; i <= arr.length; i++) {
        let random = Math.floor(Math.random() * arr.length)
        // if (arrN.includes(arr[random]) === false) {
            arrN[i] = arr[random]
        // }
    }
    // for (let i = 0; i < arrN.length; i++) {
    //     arrNew[i] = arr[i] !== arrN[i]
    // }
    // let arrNew = arr.filter((ele, index) => {
    //     if (ele === arrN[index]) {
    //         return ele
    //     }
    //     // console.log(arr[index] = arrN[index])
    // })
    //     console.log(arr)
    //     console.log(arrN)
    //     console.log(arrNew)
        
        for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.order = arrN[i]
                // console.log(arrN[i])
        }
    }


overlayButton.onclick =  () => {
    let name = prompt("Wahts Your Name ?")
    music.play()
    timOut(100)
    nameSpan.innerHTML = name === "" || name === null ? "Unknown" : name ;
    overlay.remove()
}

boxes.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        ele.classList.add("open")
        a++
        if (a === 2) {
            boxes.forEach((ele) => {
                if (ele.classList.contains("open") === false && ele.classList.contains("true") === false) {
                    ele.classList.add("freeze")
                }
            })
            let b = document.querySelectorAll(".open")
            let c = document.querySelectorAll(".freeze")
            if (b[0].dataset.name === b[1].dataset.name) {
                let open = [b[0], b[1]]
                addEleTrue(open)
                removeFreeze(c)
                musicSuccess.play()
                a = 0;
            }else {
                removeOpen(b)
                removeFreeze(c)
                musicNegative.play()
                a = 0;
                wrongTries.innerHTML++
            }
        }
    })
})

function removeFreeze(ele) {
    let setTime = setInterval( () => {
        ele.forEach((ele) => {
            ele.classList.remove("freeze")
        })
        clearInterval(setTime)
    }, 1000)
    
}

function removeOpen(ele) {
    let setTime = setInterval( () => {
        ele.forEach((ele) => {
            ele.classList.remove("open")
        })
        clearInterval(setTime)
    }, 1000)
}

function addEleTrue(eleT) {
    eleT.forEach((ele) => {
        ele.classList.remove("open")
        ele.classList.add("true")
    })
}

function timOut(tim) {
    
    let setTim = setInterval(() => {
        let minut = Math.floor(tim / 60)
        let second = Math.floor(tim % 60)
        
        minut = minut < 10 ? `0${minut}` : minut;
        second = second < 10 ? `0${second}` : second;

        tim--

        if (minut === "00" && second === "00") {
            clearInterval(setTim)
            document.querySelector(".boupp").classList.add("show")
            boxes.forEach((ele) => {
                ele.classList.add("true")
            })
            music.remove()
            let settime = setInterval(() => {
                window.location.reload()
            }, 3000);
        }

        timer.children[0].innerHTML = `${minut} : <span> ${second} </span>`
    }, 1000);
    

}