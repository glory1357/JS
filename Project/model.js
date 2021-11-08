 /* ------- begin model ------- */
 export function ModuleModel() {
    let self = this;
    let myModuleView = null;
    let mydata = [];
    let count = 0;
    let permitMusic = true;
    let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let results;
    let updatePassword;
    let stringName = 'NastyaGalkina2048';
    let nameUser;
    
    
    self.init = function(view) {
        myModuleView = view;
        self.newGame();
        this.refreshMessages();
    };
    
    self.newGame = function() {
        count = 0;
        myModuleView.countUpdate(count);
        for (let i = 0; i < 4; i++) {
            mydata[i] = [];
            for (let j = 0; j < 4; j++) {
                mydata[i][j] = {
                    x: i,
                    y: j,
                    value: 0,
                    scale: false,
                    random: false
                };
            }
        };
        myModuleView.removeAlwaysDivs();
        self.randomNum();
        self.randomNum();
        myModuleView.game(mydata);
    };
    
    self.updateState = function(hashPageName) {
        myModuleView.renderContent(hashPageName);
    };
    
    self.randomNum = function() { // генерация случайных чисел и присвоения начального случайного числа mydata
    
        for (;;) {
            let r = Math.floor(Math.random() * 4);
            let c = Math.floor(Math.random() * 4);
            if (mydata[r][c].value === 0) { // Если значение в текущей координате в данных равно 0 или пусто, вставляем случайное число 2 или 4
                let num = Math.random() > 0.2 ? 2 : 4; // Установленное случайное число 2 или 4 с вероятностью выпадения 80% и 20% соответственно
                mydata[r][c].value = num;
    
                break;
            }
        }
    };
    
    self.updateBottom = function() {
        for (let j = 0; j < 4; j++) {
            for (let i = 3; i > 0; i--) {
                var lasti = this.bottomNext(i, j);
                if (lasti !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[lasti][j].x;
                        mydata[i][j].y = mydata[lasti][j].y;
                        mydata[i][j].value = mydata[lasti][j].value;
                        mydata[lasti][j].value = 0;
                        mydata[i][j].random = true;
                        myModuleView.gameDraw(mydata);
                        mydata[i][j].x = i;
                        mydata[i][j].y = j;
                        myModuleView.audioPlay('shag');
                        i++;
                    } else if (mydata[i][j].value === mydata[lasti][j].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        mydata[i][j].scale = true;
                        myModuleView.removeItem(mydata[lasti][j].x, mydata[lasti][j].y);
                        mydata[lasti][j].value = 0;
                        myModuleView.gameDraw(mydata);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }
    
            }
        }
    
        // myModuleView.gameDraw(mydata);
        for (let i = 0; i < 4; i++) {
            if (mydata[i].find((elem) => elem.random === true || elem.scale === true)) {
                setTimeout(() => {
                    self.randomNum();
                    myModuleView.game(mydata);
                }, 300);
                break;
            }
        };
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                mydata[i][j].x = i;
                mydata[i][j].y = j;
                mydata[i][j].scale = false;
                mydata[i][j].random = false;
            }
        }
        myModuleView.countUpdate(count);
    
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
    };
    
    self.bottomNext = function(i, j) {
        for (var c = i - 1; c >= 0; c--) {
            if (mydata[c][j].value !== 0) {
                return c;
            }
        }
        return -1;
    };
    
    self.updateTop = function() {
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 3; i++) {
                var nexti = self.topNext(i, j);
                if (nexti !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[nexti][j].x;
                        mydata[i][j].y = mydata[nexti][j].y;
                        mydata[i][j].value = mydata[nexti][j].value;
                        mydata[nexti][j].value = 0;
                        mydata[i][j].random = true;
                        myModuleView.gameDraw(mydata);
                        mydata[i][j].x = i;
                        mydata[i][j].y = j;
                        myModuleView.audioPlay('shag');
                        i--;
                    } else if (mydata[i][j].value === mydata[nexti][j].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        mydata[i][j].scale = true;
                        myModuleView.removeItem(mydata[nexti][j].x, mydata[nexti][j].y);
                        mydata[nexti][j].value = 0;
                        myModuleView.gameDraw(mydata);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }
    
            };
        }
        // myModuleView.gameDraw(mydata);
        for (let i = 3; i >= 0; i--) {
            if (mydata[i].find((elem) => elem.random === true || elem.scale === true)) {
                setTimeout(() => {
                    self.randomNum();
                    myModuleView.game(mydata);
                }, 300);
                break;
            }
        };
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                mydata[i][j].x = i;
                mydata[i][j].y = j;
                mydata[i][j].scale = false;
                mydata[i][j].random = false;
            }
        }
        myModuleView.countUpdate(count);
    
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
    
    };
    
    self.topNext = function(i, j) {
        for (var c = i + 1; c < 4; c++) {
            if (mydata[c][j].value !== 0) {
                return c;
            }
        }
        return -1;
    };
    
    self.updateLeft = function() {
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                var nextj = self.leftNext(i, j);
                if (nextj !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[i][nextj].x;
                        mydata[i][j].y = mydata[i][nextj].y;
                        mydata[i][j].value = mydata[i][nextj].value;
                        mydata[i][j].random = true;
                        mydata[i][nextj].value = 0;
                        myModuleView.gameDraw(mydata);
                        mydata[i][j].x = i;
                        mydata[i][j].y = j;
                        myModuleView.audioPlay('shag');
                        j--;
                    } else if (mydata[i][j].value === mydata[i][nextj].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        mydata[i][j].scale = true;
                        myModuleView.removeItem(mydata[i][nextj].x, mydata[i][nextj].y);
                        mydata[i][nextj].value = 0;
                        myModuleView.gameDraw(mydata);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }
            }
        };
    
        // myModuleView.gameDraw(mydata);
    
        for (let i = 0; i < 4; i++) {
            if ((mydata[i].find((elem) => elem.random === true)) || (mydata[i].find((elem) => elem.scale === true))) {
                setTimeout(() => {
                    self.randomNum();
                    myModuleView.game(mydata);
                }, 300);
    
                break;
            }
        };
    
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                mydata[i][j].x = i;
                mydata[i][j].y = j;
                mydata[i][j].scale = false;
                mydata[i][j].random = false;
            }
        }
        myModuleView.countUpdate(count);
    
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
    };
    
    self.leftNext = function(i, j) {
        for (var c = j + 1; c < 4; c++) {
            if (mydata[i][c].value !== 0) {
                return c;
            }
        }
        return -1;
    };
    
    self.updateRight = function() {
    
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j > 0; j--) {
                var lastj = self.rightNext(i, j);
                if (lastj !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[i][lastj].x;
                        mydata[i][j].y = mydata[i][lastj].y;
                        mydata[i][j].value = mydata[i][lastj].value;
                        mydata[i][j].random = true;
                        mydata[i][lastj].value = 0;
                        myModuleView.gameDraw(mydata);
                        mydata[i][j].x = i;
                        mydata[i][j].y = j;
                        myModuleView.audioPlay('shag');
    
                        j++;
                    } else if (mydata[i][j].value === mydata[i][lastj].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        mydata[i][j].scale = true;
                        myModuleView.removeItem(mydata[i][lastj].x, mydata[i][lastj].y);
                        mydata[i][lastj].value = 0;
                        myModuleView.gameDraw(mydata);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }
            }
        };
    
        // myModuleView.gameDraw(mydata);
    
        for (let i = 0; i < 4; i++) {
            if ((mydata[i].find((elem) => elem.random === true)) || (mydata[i].find((elem) => elem.scale === true))) {
                setTimeout(() => {
                    self.randomNum();
                    myModuleView.game(mydata);
                }, 300);
                break;
            }
        };
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                mydata[i][j].x = i;
                mydata[i][j].y = j;
                mydata[i][j].scale = false;
                mydata[i][j].random = false;
            }
        }
        myModuleView.countUpdate(count);
    
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
    };
    
    self.rightNext = function(i, j) {
        for (var c = j - 1; c >= 0; c--) {
            if (mydata[i][c].value !== 0) {
                return c;
            }
        }
        return -1;
    };
    
    self.gameOver = function() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (mydata[i][j].value === 0) {
                    return false;
                };
                if (j < 3) {
                    if (mydata[i][j].value === mydata[i][j + 1].value) {
                        return false;
                    }
                };
                if (i < 3) {
                    if (mydata[i][j].value === mydata[i + 1][j].value) {
                        return false;
                    }
                }
            }
        }
        this.sendResults();
        return true;
    }
    
    self.setMusic = function() {
        if (permitMusic) {
            myModuleView.musicPlay(permitMusic);
            permitMusic = false;
    
        } else {
            myModuleView.musicPlay(permitMusic);
            permitMusic = true;
        }
    };
    
    self.setAudio = function(flag) {
        myModuleView.audioPlay(flag);
    };
    
    self.setName = function(name) {
        myModuleView.getName(name);
        if (!name) {
            nameUser = 'User';
        } else {
            nameUser = name
        }
    
    };
    
    
    
    // получает сообщения с сервера и потом показывает
    this.refreshMessages = function() {
        $.ajax({
            url: ajaxHandlerScript,
            type: 'POST',
            dataType: 'json',
            data: {
                f: 'READ',
                n: stringName
            },
            cache: false,
            success: this.readReady,
            error: this.errorHandler
        });
    };
    
    this.readReady = function(callresult) { // сообщения получены - показывает
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            results = [];
            if (callresult.result != "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                results = JSON.parse(callresult.result);
                results.sort((a, b) => a.count > b.count ? -1 : 1);
                // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
                if (!Array.isArray(results))
                    results = [];
            }
            myModuleView.showResults(results);
        }
    }
    
    // получает сообщения с сервера, добавляет новое,
    // показывает и сохраняет на сервере
    this.sendResults = function() {
        updatePassword = Math.random();
        $.ajax({
            url: ajaxHandlerScript,
            type: 'POST',
            dataType: 'json',
            data: {
                f: 'LOCKGET',
                n: stringName,
                p: updatePassword
            },
            cache: false,
            success: this.lockGetReady,
            error: this.errorHandler
        });
    }
    
    // сообщения получены, добавляет, показывает, сохраняет
    this.lockGetReady = function(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            results = [];
            if (callresult.result != "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                results = JSON.parse(callresult.result);
                
                // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
                if (!Array.isArray(results))
                    results = [];
            }
    
            var senderName = nameUser;
            var counts = count;
            results.push({
                name: senderName,
                count: counts
            });
                results.sort((a, b) => a.count > b.count ? -1 : 1);

            if (results.length > 10)
                results = results.slice(0,9);
    
            myModuleView.showResults(results);
    
            $.ajax({
                url: ajaxHandlerScript,
                type: 'POST',
                dataType: 'json',
                data: {
                    f: 'UPDATE',
                    n: stringName,
                    v: JSON.stringify(results),
                    p: updatePassword
                },
                cache: false,
                success: this.updateReady,
                error: this.errorHandler
            });
        }
    }
    
    // сообщения вместе с новым сохранены на сервере
    this.updateReady = function(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
    };
    
    this.errorHandler = function(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    };
    
    };
    
    /* -------- end model -------- */