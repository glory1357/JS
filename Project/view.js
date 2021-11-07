export function ModuleView() {
    let myModuleContainer = null;
    let menu = null;
    let contentGame = null;
    let contentMenu = null;
    let contentResults = null;
    let numberLine = 4;
    let numberColumns = 4;
    let nameUser = 'user';
    let music = new Audio('Audio/music1.mp3'); // Создаём новый элемент Audio
    let audioObj = {
        click: new Audio('Audio/click.mp3'),
        xlop: new Audio('Audio/xlop.mp3'),
        shag: new Audio('Audio/shag.mp3'),
    };
    
    
    
    const GameComponent = {
        id: "game",
        title: "2048",
        render: () => {
            contentGame.style.display = 'block';
            contentMenu.style.display = 'none';
            contentResults.style.display = 'none';
            var overlay = myModuleContainer.querySelector('.modal-overlay');
            overlay.classList.add("modal_closed");
    
            var gameOver = myModuleContainer.querySelector('.modal');
            gameOver.classList.add("modal_closed");
        }
    };
    
    const MenuComponent = {
        id: "menu",
        title: "Menu",
        render: () => {
            contentGame.style.display = 'none';
            contentMenu.style.display = 'flex';
            contentResults.style.display = 'none';
    
        }
    };
    
    const ResultsComponent = {
        id: "contacts",
        title: "Results",
        render: () => {
            contentGame.style.display = 'none';
            contentMenu.style.display = 'none';
            contentResults.style.display = 'block';
        }
    
    };
    
    const GameOver = {
        id: "gameover",
        title: "GameOver",
        render: () => {
            var overlay = myModuleContainer.querySelector('.modal-overlay');
            overlay.classList.remove("modal_closed");
    
            var gameOver = myModuleContainer.querySelector('.modal');
            gameOver.classList.remove("modal_closed");
        }
    
    };
    
    const ErrorComponent = {
        id: "error",
        title: "Achtung, warning, kujdes, attenzione, pozornost...",
        render: () => {
            contentGame.style.display = 'none';
            contentMenu.style.display = 'none';
            contentResults.style.display = 'none';
            alert('Ошибка 404: Страница не найдена!');
        }
    };
    
    const router = {
        game: GameComponent,
        menu: MenuComponent,
        results: ResultsComponent,
        default: GameComponent,
        error: ErrorComponent,
        gameover: GameOver,
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
        countDiv.innerHTML = `<p>Count:</p><p id='countID'>0</P>`;
        countDiv.classList.add('countDiv');
    
        header.append(countDiv);
    
        const recordDiv = document.createElement('div');
        recordDiv.innerHTML = `<p>Record:</p><p>0</P>`;
        recordDiv.classList.add('recordDiv');
        header.append(recordDiv);
    
        const mainMenuDiv = document.createElement('div');
        mainMenuDiv.classList.add('mainMenuDiv');
        container.append(mainMenuDiv);
    
        menu = mainMenuDiv;
    
        const menuGameDiv = document.createElement('div');
        menuGameDiv.innerHTML = `<a href="#game">GAME</a>`;
        menuGameDiv.classList.add('mainmenu__link');
        menuGameDiv.classList.add('menuDiv');
        mainMenuDiv.append(menuGameDiv);
    
        const menuDiv = document.createElement('div');
        menuDiv.innerHTML = `<a href="#menu">MENU</a>`;
        menuGameDiv.classList.add('mainmenu__link');
        menuDiv.classList.add('menuDiv');
        mainMenuDiv.append(menuDiv);
    
        const recordTableDiv = document.createElement('div');
        recordTableDiv.innerHTML = `<a href="#results">RESULTS</a>`;
        menuGameDiv.classList.add('mainmenu__link');
        recordTableDiv.classList.add('menuDiv');
        mainMenuDiv.append(recordTableDiv);
    
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('gameDiv');
        container.append(gameDiv);
    
        contentGame = gameDiv;
    
        for (let i = 0; i < numberLine; i++) {
            let lineDivs = document.createElement('div');
            lineDivs.classList.add('lineDivs');
            gameDiv.append(lineDivs);
            for (let j = 0; j < numberColumns; j++) {
                let lineDivsStroke = document.createElement('div');
                lineDivsStroke.classList.add('lineDivsStroke');
                lineDivsStroke.id = 'elem' + i + j;
                lineDivs.append(lineDivsStroke);
            }
    
        }
        const menuDivContent = document.createElement('div');
        menuDivContent.classList.add('menuDivContent');
        container.append(menuDivContent);
    
        contentMenu = menuDivContent;
    
        const divNameMenu = document.createElement('div');
        divNameMenu.classList.add('divsMenu');
        divNameMenu.id = 'divsMenuName';
        divNameMenu.innerText = `NickName: ${nameUser}`;
        menuDivContent.append(divNameMenu);
    
        const divSoundMenu = document.createElement('div');
        divSoundMenu.classList.add('divsMenu');
        menuDivContent.append(divSoundMenu);
    
        const btnSound = document.createElement('button');
        btnSound.innerText = 'Звуки вкл/выкл';
        divSoundMenu.append(btnSound);
    
        const divMusicMenu = document.createElement('div');
        divMusicMenu.classList.add('divsMenu');
        menuDivContent.append(divMusicMenu);
    
        const btnMusic = document.createElement('button');
        btnMusic.innerText = 'Музыка вкл/выкл';
        btnMusic.id = 'btnMusicID';
        divMusicMenu.append(btnMusic);
    
        const divNewGameMenu = document.createElement('div');
        divNewGameMenu.classList.add('divsMenu');
        divNewGameMenu.id = 'newGameMenu';
        menuDivContent.append(divNewGameMenu);
        divNewGameMenu.innerHTML = `<a href="#game">New GAME</a>`;
    
        const resultsDivContent = document.createElement('div');
        resultsDivContent.classList.add('resultsDivContent');
        container.append(resultsDivContent);
    
        contentResults = resultsDivContent;
    
        const resultsUl = document.createElement('ul');
        resultsUl.id = 'resultsUl';
        resultsDivContent.append(resultsUl);
    
        //--------------- Game Over-----------------
    
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.classList.add('modal_closed');
        container.append(modalOverlay);
    
        const gameOverDiv = document.createElement('div');
        gameOverDiv.classList.add('modal');
        gameOverDiv.classList.add('modal_closed');
        container.append(gameOverDiv);
    
        const gameOverHeaderH2 = document.createElement('h2');
        gameOverHeaderH2.textContent = 'Game Over';
        gameOverDiv.append(gameOverHeaderH2);
    
        const gameOverHeaderP = document.createElement('p');
        gameOverHeaderP.textContent = 'Your result:';
        gameOverDiv.append(gameOverHeaderP);
    
        const gameOverHeaderSpan = document.createElement('span');
        gameOverDiv.append(gameOverHeaderSpan);
    
        const gameOverFooter = document.createElement('footer');
        gameOverFooter.classList.add('modal__footer');
        gameOverDiv.append(gameOverFooter);
    
        gameOverFooter.innerHTML = `<a class ='modal__NewGame' href="#game">New Game</a>`;
    
        //--------------Name----------------
        const modalOverlayName = document.createElement('div');
        modalOverlayName.classList.add('modal-overlay');
        modalOverlayName.classList.add('modalNameOverlay');
        container.append(modalOverlayName);
    
        const divNickName = document.createElement('div');
        divNickName.classList.add('modalName');
        container.append(divNickName);
    
        const divNickNameInput = document.createElement('div');
        divNickNameInput.id = 'divNickName';
        divNickName.append(divNickNameInput);
    
        divNickNameInput.innerHTML = `<label for="name">Your NickName:</label>
                 <input type="text" value='User' id="name" name="user_name" />`;
    
        const divNickSave = document.createElement('div');
        divNickSave.id = 'divNickSave';
        divNickName.append(divNickSave);
    
        divNickSave.innerHTML = `<button>OK</button>`;
    
    };
    
    this.updateButtons = function(currentPage) {
        const menuLinks = menu.querySelectorAll(".mainmenu__link");
    };
    
    this.renderContent = function(hashPageName) {
        let routeName = "default";
    
        if (hashPageName.length > 0) {
            routeName = hashPageName in router ? hashPageName : "error";
        }
    
        window.document.title = router[routeName].title;
        router[routeName].render();
        // this.updateButtons(router[routeName].id);
    };
    
    
    this.game = function(mydata) {
        var divs = contentGame.querySelectorAll('.lineDivsStroke');
        var newdivs = contentGame.querySelectorAll('.newdiv');
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (mydata[i][j].value) {
                    divs.forEach((elem) => {
                        if (contentGame.querySelector('#newElem' + i + j)) {} else if (elem.id === 'elem' + i + j) {
                            let newdiv = document.createElement('div');
                            newdiv.classList.add('newElem');
                            newdiv.classList.add('newElemScale');
                            setTimeout(() => {
                                newdiv.classList.remove('newElemScale');
                            }, 300);
                            newdiv.id = 'newElem' + i + j;
                            newdiv.textContent = mydata[i][j].value;
                            elem.append(newdiv);
    
                        }
                    })
                }
            }
        }
        this.setColor();
    
    };
    
    this.gameDraw = function(mydata) {
        var divs = contentGame.querySelectorAll('.lineDivsStroke');
    
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (mydata[i][j].value) {
                    divs.forEach((elem) => {
                        if (elem.id === 'elem' + i + j) {
                            var newdiv = contentGame.querySelector(`#newElem` + mydata[i][j].x + mydata[i][j].y);
    
                            setTimeout(() => {
                                newdiv.style.cssText = `
                                    left:${elem.offsetLeft}px ;
                                    top: ${elem.offsetTop}px ;`;
                                this.setColor();
                            }, 0);
    
    
                            if (mydata[i][j].scale) {
                                newdiv.classList.add('scale');
                            };
                            setTimeout(() => newdiv.classList.remove('scale'), 500);
                            newdiv.textContent = mydata[i][j].value;
                            newdiv.id = 'newElem' + i + j;
                        }
                    })
                }
            }
        }
        // this.setColor();
    };
    
    
    
    this.removeItem = function(i, j) {
        if (contentGame.querySelector(`#newElem` + i + j)) {
            (contentGame.querySelector(`#newElem` + i + j)).remove();
        };
    
    };
    
    this.removeAlwaysDivs = function() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (contentGame.querySelector(`#newElem` + i + j)) {
                    (contentGame.querySelector(`#newElem` + i + j)).remove();
                }
            }
        }
    };
    
    this.countUpdate = function(count) {
        let countP = myModuleContainer.querySelector('#countID');
        countP.textContent = count;
    };
    
    this.setColor = function() {
        var divs = contentGame.querySelectorAll('.newElem');
        divs.forEach((elem) => {
            switch (elem.innerText) {
                case '2':
                    elem.style.background = '#eee4da';
                    break;
                case '4':
                    elem.style.background = '#fff6cf';
                    break;
                case '8':
                    elem.style.background = '#f3b27a';
                    break;
                case '16':
                    elem.style.background = '#f69664';
                    break;
                case '32':
                    elem.style.background = '#f77c5f';
                    break;
                case '64':
                    elem.style.background = '#f75f3b';
                    break;
                case '128':
                    elem.style.background = '#edd073';
                    break;
                case '256':
                    elem.style.background = 'rgb(241 198 61)';
                    break;
                case '512':
                    elem.style.background = 'rgb(249 189 0)';
                    break;
                case '1024':
                    elem.style.background = 'rgb(249 149 0)';
                    break;
                case '2048':
                    elem.style.background = 'rgb(249 103 0)';
                    break;
            }
        })
    };
    
    this.gameOver = function(count) {
    
        location.hash = 'gameover';
    
        var gameOver = myModuleContainer.querySelector('.modal');
    
        gameOver.querySelector('span').textContent = count;
    
    };
    
    this.musicPlay = function(permit) {
        if (permit) {
            music.play();
            music.loop = true;
        } else {
            music.pause();
        }
    };
    
    this.audioPlay = function(flag) {
        switch (flag) {
            case 'click':
                audioObj.click.play();
                break;
            case 'xlop':
                audioObj.xlop.play();
                break;
            case 'shag':
                audioObj.shag.play();
                break;
        }
    };
    
    this.getName = function(name) {
        var modalNameOverlay = myModuleContainer.querySelector('.modalNameOverlay');
        modalNameOverlay.classList.add('modal_closed');
    
        var modalName = myModuleContainer.querySelector('.modalName');
        modalName.style.display = 'none';
        nameUser = name;
        var nameMenu = myModuleContainer.querySelector('#divsMenuName');;
        nameMenu.innerText = `NickName: ${nameUser}`;
    };
    
    this.showResults = function(results) {
        var str = '';
        for (let i = 0; i < results.length; i++) {
            var result = results[i];
            str += "<li>" + result.name + ":" +
                result.count + "</li>";
        }
        document.getElementById('resultsUl').innerHTML = str;
    };
    }
    /* -------- end view --------- */