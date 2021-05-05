var papanMain;
const pemainNyata = 'O';
const computer = 'X';
const syaratMenang = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
mulaiMain();

function mulaiMain() {
    document.querySelector(".akhirgame").style.display = "none";
    papanMain = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', tekanKlik, false);
    }
}

function tekanKlik(kotak) {
    if (typeof papanMain[kotak.target.id] == 'number') {
        tekan(kotak.target.id, pemainNyata)
        if (!cekSeri()) tekan(tempatTerbaik(), computer);
    }
}

function tekan(kotakId, player) {
    papanMain[kotakId] = player;
    document.getElementById(kotakId).innerText = player;
    let pemenangGame = cekPemenang(papanMain, player)
    if (pemenangGame) kalah(pemenangGame)
}

function cekPemenang(papan, player) {
    let mainkan = papan.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let pemenangGame = null;
    for (let [index, menang] of syaratMenang.entries()) {
        if (menang.every(elem => mainkan.indexOf(elem) > -1)) {
            pemenangGame = {index: index, player: player};
            break;
        }
    }
    return pemenangGame;
}

function kalah(pemenangGame) {
    for (let index of syaratMenang[pemenangGame.index]) {
        document.getElementById(index).style.backgroundColor = pemenangGame.player == pemainNyata ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', tekanKlik, false);
    }
    pernyataanMenang(pemenangGame.player == pemainNyata ? "Selamat, Anda Menang!" : "Anda Kalah!");
}

function pernyataanMenang(siapa) {
    document.querySelector(".akhirgame").style.display = "block";
    document.querySelector(".akhirgame").innerText = siapa;
}
// langkah 1 berhasil
function kotakKosong() {
    return papanMain.filter(s =>typeof s == 'number');
}


function tempatTerbaik() {
    return kotakKosong()[0];
}

function cekSeri() {
    if (kotakKosong().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', tekanKlik, false);
        }
        pernyataanMenang("Permainan Seri!")
        return true;
    }
    return false;
}