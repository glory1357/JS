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
    let nameUser = 'user';
    let isNewGame = true;
    let isGenerateRandom = false;
    let isLock = false;
    let isAudioShag = false;
    let isAudioXlop = false;
    let isWinGame = true;


    self.init = function(view) {
        myModuleView = view;
        self.newGame();
        self.readInfo();

    };

    self.newGame = function() {
        isNewGame = true;
        isWinGame = true;
        count = 0;
        myModuleView.countUpdate(count);
        //  создаем двумерный массив 
        for (let i = 0; i < matrix; i++) {
            mydata[i] = [];
            for (let j = 0; j < matrix; j++) {
                mydata[i][j] = {
                    x: i,
                    y: j,
                    value: 0,
                };
            }
        };


    };

    self.game = function() {
        // если была вызвана функция новой игры, то дважды вызываем функцию рандома и удаляем ненужные дивы
        if (isNewGame) {
            self.randomNum();
            self.randomNum();
            myModuleView.removeAlwaysDivs();
            isNewGame = false;
        }
        //  вызываем отрисовку дивов с числами
        myModuleView.createDivs(mydata);
    };

    self.updateState = function(hashPageName) {
        myModuleView.renderContent(hashPageName);
    };

    self.randomNum = function() { // генерация случайных чисел и присвоения начального случайного числа mydata
        //  в mydata находим ячейку с нулевым значением, создаем хэш, куда присваиваем индексы ячейки и пушим в новый созданный массив
        let freeCells = [];
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
                if (mydata[i][j].value === 0) {
                    let obj = {
                        i: i,
                        j: j
                    };
                    freeCells.push(obj);
                }
            }

        }
        // если массив пустой, то ничего не делаем
        if (freeCells.length === 0) {
            return;
        }
        // рандомно выбираем индекс в массиве
        let i = Math.floor(Math.random() * freeCells.length);
        let obj = freeCells[i];

        let num = Math.random() > 0.2 ? 2 : 4; // Установленное случайное число 2 или 4 с вероятностью выпадения 80% и 20% соответственно
        // присваиваем в mydata по найденным индексам значение и вызываем отрисовку нового дива
        mydata[obj.i][obj.j].value = num;
        myModuleView.createDiv(obj.i, obj.j, num);
    };
    //--- двигаемся вниз
    self.moveBottom = function() {

        for (let j = 0; j < matrix; j++) {
            //начинаем проверку снизу вверх
            for (let i = matrix - 1; i > 0; i--) {
                // проверяем , есть ли числа в столбце выше выбранной ячейки
                var lasti = self.bottomNextItem(i, j);
                if (lasti !== -1) {
                    // если есть и ячейка пустая, то переностим значение числа и координаты ячейки с числом, вызываем отрисовку
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[lasti][j].x;
                        mydata[i][j].value = mydata[lasti][j].value;
                        mydata[lasti][j].value = 0;

                        myModuleView.changeDivs(mydata[i][j], i, j, false);
                        mydata[i][j].x = i;
                        isAudioShag = true;
                        isGenerateRandom = true;
                        i++;
                    } // если число равное числу в выбранной ячейке, то увеличиваем число в ячейке в 2 раза,удаляем ненужный див и делаем отрисовку
                    else if (mydata[i][j].value === mydata[lasti][j].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;

                        mydata[lasti][j].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, true);
                        myModuleView.removeItem(lasti, j);
                        isAudioXlop = true;
                        isGenerateRandom = true;
                    }
                } else {
                    break;
                }

            }
        }

        self.setAudio();
        //---- если было изменение , то добавляем новое число
        if (isGenerateRandom) {
            setTimeout(() => {
                for (let i = 1; i <= matrix - 3; i++) {
                    self.randomNum();
                }
            }, 300);
            isGenerateRandom = false;


        }

        // передаем счет для отображения
        myModuleView.countUpdate(count);
        // делаем проверку, если хода больше нет, то заканчиваем игру
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
        //вызываем проверку на выйгрыш
        if (isWinGame) {
            self.winGame();
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
            //начинаем проверку сверху вниз
            for (let i = 0; i < matrix - 1; i++) {
                // проверяем , есть ли числа в столбце ниже выбранной ячейки
                var nexti = self.topNextItem(i, j);
                if (nexti !== -1) {
                    // если есть и ячейка пустая, то переностим значение числа и координаты ячейки с числом, вызываем отрисовку
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].x = mydata[nexti][j].x;
                        mydata[i][j].value = mydata[nexti][j].value;
                        mydata[nexti][j].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, false);
                        mydata[i][j].x = i;
                        isAudioShag = true;
                        isGenerateRandom = true;
                        i--;
                    } // если число равное числу в выбранной ячейке, то увеличиваем число в ячейке в 2 раза,удаляем ненужный див и делаем отрисовку
                    else if (mydata[i][j].value === mydata[nexti][j].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        myModuleView.removeItem(mydata[nexti][j].x, mydata[nexti][j].y);
                        mydata[nexti][j].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, true);
                        isAudioXlop = true;
                        isGenerateRandom = true;
                    }

                } else {
                    break;
                }

            };
        }
        self.setAudio();
        //---- если было изменение , то добавляем новое число
        if (isGenerateRandom) {
            setTimeout(() => {
                for (let i = 1; i <= matrix - 3; i++) {
                    self.randomNum();
                }
            }, 300);
            isGenerateRandom = false;
        }

        // передаем счет для отображения
        myModuleView.countUpdate(count);

        // делаем проверку, если хода больше нет, то заканчиваем игру
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
        //вызываем проверку на выйгрыш
        if (isWinGame) {
            self.winGame();
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
            //начинаем проверку слева направо
            for (let j = 0; j < matrix - 1; j++) {
                // проверяем , есть ли числа в строке правее выбранной ячейки
                var nextj = self.leftNextItem(i, j);
                if (nextj !== -1) {
                    // если есть и ячейка пустая, то переностим значение числа и координаты ячейки с числом, вызываем отрисовку
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].y = mydata[i][nextj].y;
                        mydata[i][j].value = mydata[i][nextj].value;
                        mydata[i][nextj].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, false);
                        mydata[i][j].y = j;
                        isAudioShag = true;
                        isGenerateRandom = true;
                        j--;
                    } // если число равное числу в выбранной ячейке, то увеличиваем число в ячейке в 2 раза,удаляем ненужный див и делаем отрисовку
                    else if (mydata[i][j].value === mydata[i][nextj].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        myModuleView.removeItem(mydata[i][nextj].x, mydata[i][nextj].y);
                        mydata[i][nextj].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, true);
                        isAudioXlop = true;
                        isGenerateRandom = true;
                    }
                } else {
                    break;
                }
            }
        };

        self.setAudio();
        //---- если было изменение , то добавляем новое число
        if (isGenerateRandom) {
            setTimeout(() => {
                for (let i = 1; i <= matrix - 3; i++) {
                    self.randomNum();
                }
            }, 300);

            isGenerateRandom = false;
        }

        // передаем счет для отображения
        myModuleView.countUpdate(count);

        // делаем проверку, если хода больше нет, то заканчиваем игру
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
        //вызываем проверку на выйгрыш
        if (isWinGame) {
            self.winGame();
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
            //начинаем проверку справа налево
            for (let j = matrix - 1; j > 0; j--) {
                // проверяем , есть ли числа в строке левее выбранной ячейки
                var lastj = self.rightNextItem(i, j);
                // если есть и ячейка пустая, то переностим значение числа и координаты ячейки с числом, вызываем отрисовку
                if (lastj !== -1) {
                    if (mydata[i][j].value === 0) {
                        mydata[i][j].y = mydata[i][lastj].y;
                        mydata[i][j].value = mydata[i][lastj].value;
                        mydata[i][lastj].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, false);
                        mydata[i][j].y = j;
                        isGenerateRandom = true;
                        isAudioShag = true;
                        j++;
                    } // если число равное числу в выбранной ячейке, то увеличиваем число в ячейке в 2 раза,удаляем ненужный див и делаем отрисовку
                    else if (mydata[i][j].value === mydata[i][lastj].value) {
                        mydata[i][j].value *= 2;
                        count += mydata[i][j].value;
                        myModuleView.removeItem(mydata[i][lastj].x, mydata[i][lastj].y);
                        mydata[i][lastj].value = 0;
                        myModuleView.changeDivs(mydata[i][j], i, j, true);
                        isGenerateRandom = true;
                        isAudioXlop = true;
                    }

                } else {
                    break;
                }
            }
        };

        self.setAudio();
        //---- если было изменение , то добавляем новое число
        if (isGenerateRandom) {
            setTimeout(() => {
                for (let i = 1; i <= matrix - 3; i++) {
                    self.randomNum();
                }
            }, 300);
            isGenerateRandom = false;
        }

        // передаем счет для отображения
        myModuleView.countUpdate(count);

        // делаем проверку, если хода больше нет, то заканчиваем игру
        if (self.gameOver()) {
            myModuleView.gameOver(count);
        };
        //вызываем проверку на выйгрыш
        if (isWinGame) {
            self.winGame();
        }
    };

    self.rightNextItem = function(i, j) {
        for (var c = j - 1; c >= 0; c--) {
            if (mydata[i][c].value !== 0) {
                return c;
            }
        }
        return -1;
    };

    self.winGame = function() {
        // если есть значение 2048, то вызываем метод вью на открытие страницы и передаем счет    
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
                if (mydata[i][j].value === 2048) {
                    myModuleView.winGame(count)
                    isWinGame = false;
                }
            }
        }
    };

    self.gameOver = function() {
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
                // если есть нулевые значения, то возвращаем false
                if (mydata[i][j].value === 0) {
                    return false;
                };
                // если есть равные значения в строках в соседних ячейках, то возвращаем false
                if (j < matrix - 1) {
                    if (mydata[i][j].value === mydata[i][j + 1].value) {
                        return false;
                    }
                }; // если есть равные значения в столбцах в соседних ячейках, то возвращаем false
                if (i < matrix - 1) {
                    if (mydata[i][j].value === mydata[i + 1][j].value) {
                        return false;
                    }
                }
            }
        }
        // если проверка прошла, то вызываем функцию сохранения результатов на сервер
        self.updateResults();
        return true;
    };
    // если - то уменьшаем кличество ячеек, минимальное 4, если + то увеличиваем, максимальное 8 , и начинаем новую игру
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

    self.setAudio = function(click) {
        if (isAudioShag) {
            myModuleView.audioPlay('shag');
            isAudioShag = false;
        };
        if (isAudioXlop) {
            myModuleView.audioPlay('xlop');
            isAudioXlop = false;
        };
        if (click) {
            myModuleView.audioPlay('click');
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
            permitAudio = false;
            myModuleView.permitAudio(permitAudio);
        } else {
            permitAudio = true;
            myModuleView.permitAudio(permitAudio);

        }
    };

    // устанавливаем имя, если не задано, то User
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