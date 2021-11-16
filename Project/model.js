 /* ------- begin model ------- */
 export function ModuleModel() {
    let self = this;
    let myModuleView = null;
    let mydata = [];
    let count = 0;
    let matrix = 4;
    let permitMusic = true;
    let permitAudio = true;
    let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let results;
    let updatePassword;
    let stringName = 'NastyaGalkina2048';
    let nameUser='user';
    let isNewGame = true;


    self.init = function(view) {
        myModuleView = view;
        self.newGame();
        self.readInfo();

    };

    self.newGame = function() {
         isNewGame = true;
        count = 0;
        myModuleView.countUpdate(count);
        for (let i = 0; i < matrix; i++) {
            mydata[i] = [];
            for (let j = 0; j < matrix; j++) {
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
       //  myModuleView.createDivs(mydata);
        
    };

    self.game = function() {
      if(isNewGame){
             self.randomNum();
             self.randomNum();
             isNewGame = false;
        }
        myModuleView.createDivs(mydata);
    };

    self.updateState = function(hashPageName) {
        myModuleView.renderContent(hashPageName);
    };

    self.randomNum = function() { // генерация случайных чисел и присвоения начального случайного числа mydata

        for (;;) {
            let r = Math.floor(Math.random() * 4);
            let c = Math.floor(Math.random() * 4);
            if (mydata[r][c].value === 0) { // Если значение в текущей координате в данных равно 0, вставляем случайное число 2 или 4
                let num = Math.random() > 0.2 ? 2 : 4; // Установленное случайное число 2 или 4 с вероятностью выпадения 80% и 20% соответственно
                mydata[r][c].value = num;
                 myModuleView.createDiv(r,c,num);

                break;
            }
        }
    };
    //--- двигаемся вниз
    self.moveBottom = function() {
        for (let j = 0; j < matrix; j++) {
            for (let i = matrix - 1; i > 0; i--) {
                var lasti = self.bottomNextItem(i, j);
                if (lasti !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[lasti][j].x;
                        mydata[i][j].value = mydata[lasti][j].value;
                        mydata[lasti][j].value = 0;
                        mydata[i][j].random = true;
                        myModuleView.changeDivs(mydata[i][j],i,j);
                        mydata[i][j].x = i;
                        mydata[i][j].y = j;
                        myModuleView.audioPlay('shag');
                        i++;
                    } else if (mydata[i][j].value === mydata[lasti][j].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        mydata[i][j].scale = true;
                        myModuleView.removeItem(lasti,j);
                        mydata[lasti][j].value = 0;
                        myModuleView.changeDivs(mydata[i][j],i,j);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }

            }
        }
        
        //----делаем проверку, если было изменение , то добавляем новое число
        for (let i = 0; i < matrix; i++) {
            if (mydata[i].find((elem) => elem.random === true || elem.scale === true)) {
                setTimeout(() => {
                    for (let i = 1; i <= matrix - 3; i++) {
                        self.randomNum();
                    }
                }, 300);
                break;
            }
        };
        //----Обнуляем все свойства для последующего изменения
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
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

    self.bottomNextItem = function(i, j) {
        for (var c = i - 1; c >= 0; c--) {
            if (mydata[c][j].value !== 0) {
                return c;
            }
        }
        return -1;
    };

    self.moveTop = function() {
        for (let j = 0; j < matrix; j++) {
            for (let i = 0; i < matrix - 1; i++) {
                var nexti = self.topNextItem(i, j);
                if (nexti !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[nexti][j].x;
                        mydata[i][j].y = mydata[nexti][j].y;
                        mydata[i][j].value = mydata[nexti][j].value;
                        mydata[nexti][j].value = 0;
                        mydata[i][j].random = true;
                        myModuleView.changeDivs(mydata[i][j],i,j);
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
                        myModuleView.changeDivs(mydata[i][j],i,j);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }

            };
        }
       //  myModuleView.changeDivs(mydata);

        for (let i = matrix - 1; i >= 0; i--) {
            if (mydata[i].find((elem) => elem.random === true || elem.scale === true)) {
                setTimeout(() => {
                    for (let i = 1; i <= matrix - 3; i++) {
                        self.randomNum();
                    }
                }, 300);
                break;
            }
        };

        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
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

    self.topNextItem = function(i, j) {
        for (var c = i + 1; c < matrix; c++) {
            if (mydata[c][j].value !== 0) {
                return c;
            }
        }
        return -1;
    };

    self.moveLeft = function() {

        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix - 1; j++) {
                var nextj = self.leftNextItem(i, j);
                if (nextj !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[i][nextj].x;
                        mydata[i][j].y = mydata[i][nextj].y;
                        mydata[i][j].value = mydata[i][nextj].value;
                        mydata[i][j].random = true;
                        mydata[i][nextj].value = 0;
                        myModuleView.changeDivs(mydata[i][j],i,j);
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
                        myModuleView.changeDivs(mydata[i][j],i,j);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }
            }
        };

        for (let i = 0; i < matrix; i++) {
            if ((mydata[i].find((elem) => elem.random === true)) || (mydata[i].find((elem) => elem.scale === true))) {
                setTimeout(() => {
                    for (let i = 1; i <= matrix - 3; i++) {
                        self.randomNum();
                    }
                }, 300);

                break;
            }
        };

        for (let i = 0; i < matrix; i++) {
            for (let j = matrix - 1; j >= 0; j--) {
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

    self.leftNextItem = function(i, j) {
        for (var c = j + 1; c < matrix; c++) {
            if (mydata[i][c].value !== 0) {
                return c;
            }
        }
        return -1;
    };

    self.moveRight = function() {

        for (let i = 0; i < matrix; i++) {
            for (let j = matrix - 1; j > 0; j--) {
                var lastj = self.rightNextItem(i, j);
                if (lastj !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[i][lastj].x;
                        mydata[i][j].y = mydata[i][lastj].y;
                        mydata[i][j].value = mydata[i][lastj].value;
                        mydata[i][j].random = true;
                        mydata[i][lastj].value = 0;
                        myModuleView.changeDivs(mydata[i][j],i,j);
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
                        myModuleView.changeDivs(mydata[i][j],i,j);
                        myModuleView.audioPlay('xlop');
                    }
                } else {
                    break;
                }
            }
        };

        for (let i = 0; i < matrix; i++) {
            if ((mydata[i].find((elem) => elem.random === true)) || (mydata[i].find((elem) => elem.scale === true))) {
                setTimeout(() => {
                    for (let i = 1; i <= matrix - 3; i++) {
                        self.randomNum();
                    }
                }, 300);
                break;
            }
        };

        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
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

    self.rightNextItem = function(i, j) {
        for (var c = j - 1; c >= 0; c--) {
            if (mydata[i][c].value !== 0) {
                return c;
            }
        }
        return -1;
    };

    self.gameOver = function() {
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
                if (mydata[i][j].value === 0) {
                    return false;
                };
                if (j < matrix - 1) {
                    if (mydata[i][j].value === mydata[i][j + 1].value) {
                        return false;
                    }
                };
                if (i < matrix - 1) {
                    if (mydata[i][j].value === mydata[i + 1][j].value) {
                        return false;
                    }
                }
            }
        }
        self.updateResults();
        return true;
    };

    self.resizeMatrix = function(argument) {
        switch (argument) {
            case '-':
                if (matrix > 4) {
                    matrix--;
                    myModuleView.resizeMatrix(matrix);
                    self.newGame();
                }
                break;

            case '+':
                if (matrix < 8) {
                    matrix++;
                    myModuleView.resizeMatrix(matrix);
                    self.newGame();
                }
                break;
        }
    };

    self.setMusic = function() {
        if (permitMusic) {
            myModuleView.musicPlay(permitMusic);
            permitMusic = false;

        } else {
            myModuleView.musicPlay(permitMusic);
            permitMusic = true;
        }
    };


    self.permitAudio = function() {
        if (permitAudio) {
            myModuleView.permitAudio(permitAudio);
            permitAudio = false;
        } else {
            myModuleView.permitAudio(permitAudio);
            permitAudio = true;
        }
    };


    self.setName = function(name) {
        if (!name) {
            nameUser = 'User';
        } else {
            nameUser = name;
        };
        myModuleView.getName(nameUser);

    };



    // получает информацию с сервера и показывает ее
    self.readInfo = function() {
        $.ajax({
            url: ajaxHandlerScript,
            type: 'POST',
            dataType: 'json',
            data: {
                f: 'READ',
                n: stringName
            },
            cache: false,
            success: self.readReady,
            error: self.errorHandler
        });
    };

    self.readReady = function(callresult) { // информация получена - показывает
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            results = [];
            if (callresult.result != "") { // либо строка пустая - сообщений нет
                results = JSON.parse(callresult.result);
            }
            myModuleView.showRecord(results);
        }
    }

    // получает информацию с сервера, добавляет новое,
    // показывает и сохраняет на сервере
    self.updateResults = function() {
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
            success: self.lockGetReady,
            error: self.errorHandler
        });
    }

    // информация получена, добавляет, показывает, сохраняет
    self.lockGetReady = function(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            results = [];
            if (callresult.result != "") { // либо строка пустая - сообщений нет
                results = JSON.parse(callresult.result);

            }

            var userName = nameUser;
            var counts = count;
            results.push({
                name: userName,
                count: counts
            });
            results.sort((a, b) => a.count > b.count ? -1 : 1);

            if (results.length > 10)
                results = results.slice(0, 10);

            myModuleView.showRecord(results);

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
                success: self.updateReady,
                error: self.errorHandler
            });
        }
    }

    // информация вместе с новым сохранены на сервере
    self.updateReady = function(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
    };

    self.errorHandler = function(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    };

}

/* -------- end model -------- */