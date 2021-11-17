export function ModuleView() {
    let self = this;
    let myModuleContainer = null;
    let contentContainer = null;
    let matrix = 4;
    let coords = [];
    let strResults = '';
    let countUser = 0;
    let nameUser = 'User';
    let music = new Audio('Audio/music1.mp3');
    let audioObj = {
        click: new Audio('Audio/click.mp3'),
        xlop: new Audio('Audio/xlop.mp3'),
        shag: new Audio('Audio/shag.mp3'),
    };

    let permitAudioModel = true;

    const NameComponent = {
        id: "name",
        title: "User NickName",
        render: () => {
            return `<div class='divGameOver'>
           <label for="username">Ваше Имя:</label>
            <input type="text" id="username" value='User'>
           <a id='nameID' class ='modal__NewGame' href="#game">OK</a>
           </div>`
        }

    };

    const GameComponent = {
        id: "game",
        title: "2048",
        render: () => {

            function lineDivs() {
                var lineDiv = '';
                for (let i = 0; i < matrix; i++) {
                    let lineDivsStroke = '';
                    for (let j = 0; j < matrix; j++) {
                        lineDivsStroke += `<div class="lineDivsStroke matrix${matrix}" id='elem${i}${j}'></div>`
                    }

                    lineDiv += `<div class='lineDivs'>${lineDivsStroke}</div>`
                }
                return lineDiv;
            }
            return `<div class='gameDiv'>${lineDivs()}</div>`;
        }
    };

    const RulesComponent = {
        id: "rules",
        title: "Rules",
        render: () => {
            return `<div class='rulesClass'><ol>
          <li>В каждом раунде появляется плитка номинала «2» (с вероятностью 80 %) или «4» (с вероятностью 20 %)</li>
          <li>Нажатием стрелки игрок может скинуть все плитки игрового поля в одну из 4 сторон. Если при сбрасывании две плитки одного номинала «налетают» одна на другую, то они превращаются в одну, номинал которой равен сумме соединившихся плиток. После каждого хода на свободной секции поля появляется новая плитка номиналом «2» или «4». Если при нажатии кнопки местоположение плиток или их номинал не изменится, то ход не совершается.</li>
          <li>Если в одной строчке или в одном столбце находится более двух плиток одного номинала, то при сбрасывании они начинают соединяться с той стороны, в которую были направлены. Например, находящиеся в одной строке плитки (4, 4, 4) после хода влево превратятся в (8, 4), а после хода вправо — в (4, 8). Данная обработка неоднозначности позволяет более точно формировать стратегию игры.</li>
          <li>За каждое соединение игровые очки увеличиваются на номинал получившейся плитки.
          Игра заканчивается поражением, если после очередного хода невозможно совершить действие.</li></ol></div>`
        }
    };

    const MenuComponent = {
        id: "menu",
        title: "Menu",
        render: () => {
            return `
          <div class='menuDivContent'>
            <div class='divsMenu' id='divsMenuName'><a href="#name">Имя:${nameUser}</a></div>
            <div class='divsMenu'><button id='btnSoundsID'>Звуки вкл/выкл</button></div>
            <div class='divsMenu'><button id='btnMusicID'>Музыка вкл/выкл</button></div>
            <div class='divsMenu'><button class='size' id='sizeMinus'>-</button><hr><div>Клеток в ряду:<p id='sizeP'>${matrix}<p></div><hr><button class='size' id='sizePlus'>+</button></div>
            <div class='divsMenu'><a id='newGameMenu' href="#game">Новая Игра</a></div>
          </div>
        `
        }
    };

    const ResultsComponent = {
        id: "contacts",
        title: "Results",
        render: () => {
            return `
         <div class='resultsDivContent'>
           <ol id='resultsOl'>${strResults}</ol>
          </div>
          `
        }
    };

    const YouWin = {
        id: "win",
        title: "Win",
        render: () => {
            return `<div class='divGameOver'>
           <h2>Вы выйграли!!!Поздравляем!!!</h2><p>Ваш результат: <span id='spanID'>${countUser}</span></p><a class ='modal__NewGame continueGame' href="#game">Продолжить</a>
          <a class ='modal__NewGame newGame' href="#game">Новая игра</a>
           </div>`

        }
    };

    const GameOver = {
        id: "gover",
        title: "GameOver",
        render: () => {
            return `<div class='divGameOver'>
           <h2>Game Over</h2><p>Ваш результат: <span id='spanID'>${countUser}</span></p><a class ='modal__NewGame newGame' href="#game">Новая игра</a>
           </div>`
        }
    };

    const ErrorComponent = {
        id: "error",
        title: "Achtung, warning, kujdes, attenzione, pozornost...",
        render: () => {
            return ` <h1>Ошибка 404</h1>
            <p>Страница не найдена, попробуйте вернуться на <a href="#game">главную</a>.</p>`
        }
    };

    const router = {
        game: GameComponent,
        rules: RulesComponent,
        menu: MenuComponent,
        results: ResultsComponent,
        default: NameComponent,
        error: ErrorComponent,
        gover: GameOver,
        name: NameComponent,
        win: YouWin,
    };

    this.init = function() {
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.append(container);

        myModuleContainer = container;

        const header = document.createElement('header');
        container.append(header);

        const nameGame = document.createElement('div');
        nameGame.classList.add('nameGame');
        nameGame.innerHTML = `<h1>2048</h1>`;
        header.append(nameGame);

        const countDiv = document.createElement('div');
        countDiv.innerHTML = `<p>Счет:</p><p id='countID'>0</P>`;
        countDiv.classList.add('countDiv');

        header.append(countDiv);

        const recordDiv = document.createElement('div');
        recordDiv.innerHTML = `<p>Рекорд:</p><p id='recordUser'>0</P>`;
        recordDiv.classList.add('countDiv');
        header.append(recordDiv);

        const mainMenuDiv = document.createElement('div');
        mainMenuDiv.classList.add('mainMenuDiv');
        container.append(mainMenuDiv);

        const menuGameDiv = document.createElement('div');
        menuGameDiv.innerHTML = `<a href="#game">ИГРА</a>`;
        menuGameDiv.classList.add('mainmenu__link');
        menuGameDiv.classList.add('menuDiv');
        mainMenuDiv.append(menuGameDiv);

        const rulesDiv = document.createElement('div');
        rulesDiv.innerHTML = `<a href="#rules">ПРАВИЛА</a>`;
        rulesDiv.classList.add('mainmenu__link');
        rulesDiv.classList.add('menuDiv');
        mainMenuDiv.append(rulesDiv);

        const menuDiv = document.createElement('div');
        menuDiv.innerHTML = `<a href="#menu">МЕНЮ</a>`;
        menuGameDiv.classList.add('mainmenu__link');
        menuDiv.classList.add('menuDiv');
        mainMenuDiv.append(menuDiv);

        const recordTableDiv = document.createElement('div');
        recordTableDiv.innerHTML = `<a href="#results">РЕЗУЛЬТАТЫ</a>`;
        menuGameDiv.classList.add('mainmenu__link');
        recordTableDiv.classList.add('menuDiv');
        mainMenuDiv.append(recordTableDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('contentDiv');
        container.append(contentDiv);

        contentContainer = contentDiv;
    };

    this.renderContent = function(hashPageName) {
        let routeName = "default";

        if (hashPageName.length > 0) {
            routeName = hashPageName in router ? hashPageName : "error";
        }

        window.document.title = router[routeName].title;
        contentContainer.innerHTML = router[routeName].render();
        if (hashPageName === 'game') {
            this.getCoordsElems();
        }
    };
    // получаем координаты всех дивов с ячейками 
    this.getCoordsElems = function() {
        for (let i = 0; i < matrix; i++) {
            coords[i] = [];
            for (let j = 0; j < matrix; j++) {
                let coordsElem = myModuleContainer.querySelector(`#elem` + i + j);
                coords[i][j] = {
                    top: coordsElem.offsetTop,
                    left: coordsElem.offsetLeft,
                }
            }
        }
    };
    // отрисовка всех ячеек с числами
    this.createDivs = function(mydata) {
        var divs = myModuleContainer.querySelectorAll('.lineDivsStroke');
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
                if (mydata[i][j].value) {

                    if (myModuleContainer.querySelector('#newElem' + i + j)) {} else {
                        this.createDiv(i, j, mydata[i][j].value)

                    }
                }
            }
        }
    };
    // отрисовка одной ячейки с числом
    this.createDiv = function(i, j, num) {
        let div = document.querySelector('.gameDiv')
        let newdiv = document.createElement('div');;
        newdiv.classList.add('newElem');
        newdiv.classList.add('newElemScale');
        newdiv.classList.add(`matrix${matrix}`);
        newdiv.dataset.color = num;
        setTimeout(() => {
            newdiv.classList.remove('newElemScale');
        }, 300);
        newdiv.id = 'newElem' + i + j;
        newdiv.style.cssText = `
              left: ${coords[i][j].left}px;
              top: ${coords[i][j].top}px;`;
        newdiv.textContent = num;
        div.append(newdiv);

    };
    // передвижение ячеек
    this.changeDivs = function(mydata, i, j, scale) {

        let newdiv = myModuleContainer.querySelector(`#newElem` + mydata.x + mydata.y);

        newdiv.style.top = `${coords[i][j].top}px`;
        newdiv.style.left = `${coords[i][j].left}px`;
        newdiv.dataset.color = mydata.value;
        newdiv.textContent = mydata.value;

        if (scale) {
            newdiv.classList.add('scale');

            setTimeout(() => newdiv.classList.remove('scale'), 500);
        };
        newdiv.id = 'newElem' + i + j;
    };


    // удаление одной ненужной ячейки
    this.removeItem = function(i, j) {
        if (myModuleContainer.querySelector(`#newElem` + i + j)) {
            (myModuleContainer.querySelector(`#newElem` + i + j)).remove();
        };
    };

    // удаление всех ячеек с числами
    this.removeAlwaysDivs = function() {
        for (let i = 0; i < matrix; i++) {
            for (let j = 0; j < matrix; j++) {
                if (myModuleContainer.querySelector(`#newElem` + i + j)) {
                    (myModuleContainer.querySelector(`#newElem` + i + j)).remove();
                }
            }
        }
    };
    // отрисовка счета
    this.countUpdate = function(count) {
        let countP = myModuleContainer.querySelector('#countID');
        countP.textContent = count;
    };
    // меняем значение количества клеток в меню и присваиваем значение 
    this.resizeMatrix = function(matrixModel) {
        matrix = matrixModel;
        myModuleContainer.querySelector('#sizeP').textContent = matrix;
    };

    this.winGame = function() {
        location.hash = 'win';
        var gameOver = document.querySelector('#spanID');

        countUser = count;
    };

    // если игра закончена, то открываем страницу GameOver
    this.gameOver = function(count) {

        location.hash = 'gover';

        var gameOver = document.querySelector('#spanID');

        countUser = count;

    };
    // включаем отключаем музыку
    this.musicPlay = function(permit) {
        if (permit) {
            music.play();
            music.loop = true;
        } else {
            music.pause();
        }
    };
    // включаем аудио
    this.audioPlay = function(flag) {
        if (permitAudioModel) {
            switch (flag) {
                case 'click':
                    audioObj.click.currentTime = 0;
                    audioObj.click.play();
                    break;
                case 'xlop':
                    audioObj.xlop.currentTime = 0;
                    audioObj.xlop.play();
                    break;
                case 'shag':
                    audioObj.shag.currentTime = 0;
                    audioObj.shag.play();

                    break;
            }
        }
    };
    // фиксируем флаг для аудио
    this.permitAudio = function(permitAudio) {
        permitAudioModel = permitAudio;
    };
    // устанавливаем имя
    this.getName = function(name) {
        nameUser = name;
    };
    // отрисовываем таблицу с результатами
    this.showRecord = function(results) {
        var record = 0;
        record = results[0].count;
        document.getElementById('recordUser').innerText = record;

        var str = '';
        for (let i = 0; i < results.length; i++) {
            var result = results[i];
            str += "<li>" + result.name + ":" +
                result.count + "</li>";
        };
        strResults = str;
    };
}
/* -------- end view --------- */