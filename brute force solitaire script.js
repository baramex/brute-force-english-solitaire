var game = [2, 2, 1, 1, 1, 2, 2, //0
            2, 2, 1, 1, 1, 2, 2, //7
            1, 1, 1, 1, 1, 1, 1, //14
            1, 1, 1, 0, 1, 1, 1, //21
            1, 1, 1, 1, 1, 1, 1, //28
            2, 2, 1, 1, 1, 2, 2, //35
            2, 2, 1, 1, 1, 2, 2]; //42

var NumsWin = [];

var timeout = 0;

var nbMouve = 0;
var nbGame = 0;
var nbM = 0;
var nbGameWin = 0;

var beforeTime = new Date().getTime();
var totalTime = new Date().getTime();

var isEnd = false;

var text = "";

var etapes = [];

while(!isEnd) Update();

function Update() {
    if(!isEnd) {
        beforeTime = new Date().getTime() - beforeTime;
        totalTime = new Date().getTime() - totalTime;
        if(etapes.length > nbMouve) {
            var num = etapes[nbMouve];
        }
        else {
            var num = Math.floor(Math.random() * Math.floor(49));
        }
        nbMouve++;
        timeout++;
        if(testRight(num)) {
            var index = getNumRandom(num);
            if(index != 100) {
                timeout = 0;
                nbM++;
                game[num+index] = 0;
                game[num+index*2] = 1;
                game[num] = 0;
                writeGame(num, index);
            }
        }
        if(timeout == 49*3) {
            nbGame++;
            if(testWin()) {
                game = [2, 2, 1, 1, 1, 2, 2,
                    2, 2, 1, 1, 1, 2, 2,
                    1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 0, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1,
                    2, 2, 1, 1, 1, 2, 2,
                    2, 2, 1, 1, 1, 2, 2];
                if(NumsWin.length != 0) {
                    nbGameWin++;
                    NumsWin[NumsWin.length] = getNumWin();
                }
                else {
                    nbGameWin++;
                    NumsWin[NumsWin.length] = getNumWin();
                }

                if(beforeTime > 1600000000000) {
                    beforeTime = new Date().getTime() - beforeTime;
                }

                if(totalTime > 1600000000000) {
                    totalTime = new Date().getTime() - totalTime;
                }

                console.clear();
                console.log("Une solution trouvée:\n" + text);

                console.log("Fin de la Brute Force:\nTemps de la partie: " + beforeTime + "ms\nNombre total de parties: " + nbGame + "\nTemps total: " + totalTime + "ms\nNombre de mouvement de la partie: " + nbM);
                isEnd = true;
            }
            else {
                game = [2, 2, 1, 1, 1, 2, 2,
                    2, 2, 1, 1, 1, 2, 2,
                    1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 0, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1,
                    2, 2, 1, 1, 1, 2, 2,
                    2, 2, 1, 1, 1, 2, 2];
                if(beforeTime > 1600000000000) {
                    beforeTime = new Date().getTime() - beforeTime;
                }
                if(totalTime > 1600000000000) {
                    totalTime = new Date().getTime() - totalTime;
                }
                console.clear();
                console.log("Brute Force en cours:\nTemps de la partie: " + beforeTime + "ms\nNombre total de parties: " + nbGame + "\nTemps total: " + totalTime + "ms\nNombre de mouvement de la partie: " + nbM);
            }

            timeout = 0;
            nbMouve = 0;
            nbM = 0;
            beforeTime = new Date().getTime();
            text = "";
        }
    }
}

function testWin() {
    var nb = 0;
    for(var i = 0; i < game.length; i++) {
        if(game[i] == 1) {
            nb++;
        }
    }
    if(nb == 1) {
        return true;
    }
    return false;
}

function getNumWin() {
    var nb = 0;
    for(var i = 0; i < game.length; i++) {
        if(game[i] == 1) {
            nb = i;
        }
    }
    return nb;
}

function getNumberForPlay(num, index) {
    var game1 = game;
    if(game1.length > num) {
        var val = game1[num];
        if(val == 1 && index >= 0 && index <= 3) {
            if(index == 0) {
                if(game1[num-2] == 0 && game1[num-1] == 1) {
                    var notAccept = [2, 3, 9, 10, 14, 15, 21, 22, 28, 29, 37, 38, 44, 45];
                    if(!notAccept.includes(num)) {
                        return true;
                    }
                }
            }
            if(index == 1) {
                if(game1[num+2] == 0 && game1[num+1] == 1) {
                    var notAccept = [4, 3, 11, 10, 20, 19, 27, 26, 34, 33, 39, 38, 46, 45];
                    if(!notAccept.includes(num)) {
                        return true;
                    }
                }
            }
            if(index == 2 && num - 14 >= 0) {
                if((game1[num-14] == 0 && game1[num-7] == 1)) {
                    var notAccept = [14, 15, 19, 20];
                    if(!notAccept.includes(num)) {
                        return true;
                    }
                }
            }
            if(index == 3 && num + 14 < game.length) {
                if((game1[num+14] == 0 && game1[num+7] == 1)) {
                    var notAccept = [28, 29, 33, 34];
                    if(!notAccept.includes(num)) {
                        return true;
                    }
                }
            }
        }
    }
}

function testRight(num) {
    if(game.length > num) {
        var val = game[num];
        if(val == 1) {
            if(getNumberForPlay(num, 0) || getNumberForPlay(num, 1) || getNumberForPlay(num, 2) || getNumberForPlay(num, 3)) {
                return true;
            }
        }
    }
    return false;
}

function getNumRandom(num) {
    var index = new Array;
    if(getNumberForPlay(num, 0)) {
        index.push(-1);
    }

    if(getNumberForPlay(num, 1)) {
        index.push(1);
    }

    if(getNumberForPlay(num, 2)) {
        index.push(-7);
    }

    if(getNumberForPlay(num, 3)) {
        index.push(7);
    }

    if(index.length > 0) {
        return index[Math.floor(Math.random() * Math.floor(index.length))];
    }
    else {
        return 100;
    }
}

function writeGame(num, direction) {
    var text1 = "-------\n";
    for(var i = 0; i < game.length; i++) {
        if(Math.floor(i / 7) == i / 7 && i != 0) {
            text1 += "\n";
        }
        if(game[i] != 2) {
            if(game[i] == 0) {
                text1 += "○";
            }
            if(game[i] == 1) {
                text1 += "●";
            }
        }
        else {
            text1 += " ";
        }
    }
    text1 += "\n" + num + "->" + (num+direction*2);
    text1 += "\n"
    text += text1;
}