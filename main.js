function rnd(max) {
    return Math.floor(Math.random() * max);
}

function DatetoDay(date) {
    var DateData = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return DateData.join("/");
}

const key = "LastAccess";
const gas = "https://script.google.com/macros/s/AKfycbwBjP4Q8NgBp6paSnkwB5r0LrWBpZnASx0f5tXIhX9ZYuPOL0sdvoqFoLJYmsO6oTc/exec";
const datetime = new Date();
const today = DatetoDay(datetime);
const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
var his = -1;
var i = 0;
var m = 10 + rnd(10);
//localStorage.clear();

function Report(txt) {
    var res = fetch(gas + "?text=" + txt);
}

function Mail(txt) {
    var res = fetch(gas + "?mail=" + txt);
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
        cmd.innerText = "「" + parts[a] + "」を" + b + "回" + how[c] + "…";
        if (i==1) {Mail("始めた(" + m + ")");};
            window.onunload = function(){
                setStorage();
                Mail("離れた");
            };
            window.setTimeout(function(){
                Report(parts[a] + b + how[c]);
        }, 1000);
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