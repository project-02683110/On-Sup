function rnd(max) {
    return Math.floor(Math.random() * max);
}

function DatetoDay(date) {
    var DateData = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return DateData.join("/");
}

const key = "LastAccess";
const gas = "https://script.google.com/macros/s/AKfycbwCURicSMubJgOLvtKkIQr5Jug6NDHtbq7BqabEMTGlIgDVjsJwy6_MFe4bSxGBrOGS/exec";
const datetime = new Date();
const today = DatetoDay(datetime);
const timemax = 100;
var his = -1;
var i = 0;
var m = 10 + rnd(10);
var lo = 5 + rnd(5);
var pbc = 0;
var reload = false;
var optopen = false;
let int;
//localStorage.clear();

function Report(txt) {
    var res = fetch(gas + "?text=" + txt);
}

function Mail(txt) {
    var res = fetch(gas + "?mail=" + txt);
}

function sendPass(txt) {
    var res = fetch(gas + "?pass=" + txt);
}

function getStorage() {
    const btn = document.getElementById("btn");
    const cmd = document.getElementById("cmd");
    const rep = document.getElementById("rep");
	const ret = localStorage.getItem(key);
	if (ret !== null && ret == today) {
        rep.remove();
        btn.remove();
        cmd.innerText = "また明日しようね…";
	}
}

function setStorage() {
    localStorage.setItem(key, today);
}

window.addEventListener("load", ()=>{
	getStorage();
    const limit = document.getElementById("limit");
    limit.innerText = timemax;
});

function Change() {
    const btn = document.getElementById("btn");
    const cmd = document.getElementById("cmd");
    const rep = document.getElementById("rep");
    var parts = ["おまんこ(クリトリス以外)","乳輪","乳首","クリトリス"];
    var how = ["さする","なぞる","たたく","はじく","つまむ"];
    if (i < m) {
        i++;
        console.log(i);
        console.log(his);
        do {var a = rnd(4)} while (a == his);
        his = a;
        var b = (rnd(5)+1)*10;
        if (a < 2) {var c = rnd(2)} else {var c = rnd(5)};
        rep.style.visibility = "visible";
        btn.innerText = "したよ…";
        if (i == lo) {
            cmd.innerText = "脚を45°開く…";
        } else {
            cmd.innerText = "「" + parts[a] + "」を" + b + "回" + how[c] + "…";
        }
        if (i==1) {Mail("始めた(" + m + ")");};
        window.onunload = function(){
            if (! reload) {
                setStorage();
                Mail("離れた");
            }
        }
        if (i == lo) {
            Report("脚開く");
        } else {
            window.setTimeout(function(){
                Report(parts[a] + b + how[c]);
            }, 1000);
        }
    } else {
        setStorage();
        rep.remove();
        btn.remove();
        cmd.innerText = m + "回指令したから、今日は我慢しよう…"
        Mail("耐えた");
    }
};

function OrgRep() {
    setStorage();
    const btn = document.getElementById("btn");
    const cmd = document.getElementById("cmd");
    const rep = document.getElementById("rep");
    rep.remove();
    btn.remove();
    cmd.innerText = "気持ちよかったね… 今日は終わりにしよう…"
    Mail("いった");
}

function resbtn() {
    pbc++;
    if (pbc >= 10) {
        pop("cdin");
        var passcode = 0;
        for (let i = 0; i < 6; i++) {
            passcode = passcode * 10 + rnd(9) + 1;
        }
        sendPass(passcode);
        optopen = true;
        countDown();
        const codes = document.querySelectorAll('.code')
        codes[0].focus()
        codes.forEach((code, idx) => {
            code.addEventListener('keydown', (e) => {
                if (optopen == false) {
                    codes[idx].value = ''
                } else if(e.key >= 0 && e.key <=9) {
                    //codes[idx].value = ''
                    setTimeout(() => codes[idx + 1].focus(), 10)
                } else if (e.key === 'Backspace') {
                    setTimeout(() => codes[idx - 1].focus(), 10)
                } else if (e.key === 'Enter') {
                    var uin = 0;
                    for (let i = 0; i < 6; i++) {
                        uin = uin + codes[i].value;
                    }
                    console.log(uin);
                    if (uin == passcode) {
                        cls();
                        const cmd = document.getElementById("cmd");
                        cmd.innerText = "3秒後に更新します…";
                        window.setTimeout(function(){
                            localStorage.clear();
                            pbc = 0;
                            reload = true;
                            location.reload();
                        }, 3000);
                    }
                }
            })
        })
        pbc = 0;
    }
}

function pop(init) {
    const error = document.getElementById("err");
    const close = document.getElementById("close");
    const fade = document.getElementById("fade");
    const popup = document.getElementById(init);
    close.classList.remove("unv");
    fade.classList.remove("unv");
    if (popup == null) {
        error.classList.remove("unv");
    } else {
        popup.classList.remove("unv");
    }
}

function cls() {
    const close = document.getElementById("close");
    const fade = document.getElementById("fade");
    const popup = document.getElementsByClassName("pop-up");
    optopen = false;
    close.classList.add("unv");
    fade.classList.add("unv");
    for (let i = 0; i < popup.length; i++) {
        popup[i].classList.add("unv");
    }
}

function FieldClear() {
    const txa = document.getElementById("txa");
    txa.value = null;
}

function Contact() {
    const txa = document.getElementById("txa");
    const text = txa.value;
    console.log(text);
    Mail(text);
    FieldClear();
    cls();
}

async function countDown() {
    const limit = document.getElementById("limit");
    var time = timemax;
    if (int) {
        clearInterval(int);
    }
    int = setInterval(function(){
        if (optopen == false || time < 0) {
            limit.innerText = timemax;
            optopen = false;
            clearInterval(int);
        } else {
            limit.innerText = time;
            time--
        }
    }, 1000);
}