const mySPA = (function() {

    /* ------- begin view -------- */
    function ModuleView() {
        let myModuleContainer = null;
        let menu = null;
        let contentGame = null;
        let contentMenu = null;
        let contentResults = null;
        let numberLine = 4;
        let numberColumns = 4;
        let nameUser = 'user';
        let music = new Audio('Audio/music1.mp3'); // Создаём новый элемент Audio
        let audioObj = {click:new Audio('Audio/click.mp3'), 
        xlop:new Audio('Audio/xlop.mp3'), 
        shag:new Audio('Audio/shag.mp3'),}
        

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
            divNameMenu.id='divsMenuName';
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
                                setTimeout(()=>{
                                  newdiv.classList.remove('newElemScale');
                                },300);
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

                                setTimeout(() => {newdiv.style.cssText = `
                                left:${elem.offsetLeft}px ;
                                top: ${elem.offsetTop}px ;`;
                                this.setColor();}, 0);

                                
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

        this.removeAlwaysDivs = function(){
         for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if(contentGame.querySelector(`#newElem` + i + j)){
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

        this.gameOver = function(count){

          location.hash = 'gameover';

          var gameOver = myModuleContainer.querySelector('.modal');
          
          gameOver.querySelector('span').textContent = count;
        
        };

        this.musicPlay = function(permit){
            if(permit){
                music.play();
                music.loop = true; 
            }else{
                music.pause();
            }
        };

        this.audioPlay = function(flag){
            switch(flag){
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

        this.getName = function(name){
           var modalNameOverlay = myModuleContainer.querySelector('.modalNameOverlay');
            modalNameOverlay.classList.add('modal_closed');

            var modalName = myModuleContainer.querySelector('.modalName');
            modalName.style.display = 'none';
          nameUser = name;
          var nameMenu = myModuleContainer.querySelector('#divsMenuName');;
            nameMenu.innerText = `NickName: ${nameUser}`;
        }
    }
    /* -------- end view --------- */
    /* ------- begin model ------- */
    function ModuleModel() {
        let myModuleView = null;
        let mydata = [];
        let count = 0;
        let permitMusic=true;
        var self = this;

        self.init = function(view) {
            myModuleView = view;
            self.newGame();
        };

        self.newGame = function(){
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
                    setTimeout(()=>{
                    self.randomNum();
                    myModuleView.game(mydata);
                   },300);
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
            
            if(self.gameOver()){
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
                    setTimeout(()=>{
                    self.randomNum();
                    myModuleView.game(mydata);
                   },300);
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
            
            if(self.gameOver()){
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
                   setTimeout(()=>{
                    self.randomNum();
                    myModuleView.game(mydata);
                   },300);
                    
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

            if(self.gameOver()){
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
                    setTimeout(()=>{
                    self.randomNum();
                    myModuleView.game(mydata);
                   },300);
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

            if(self.gameOver()){
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

        self.gameOver = function(){
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if(mydata[i][j].value===0){
                    return false;
                  };
                  if(j<3){
                    if(mydata[i][j].value ===mydata[i][j+1].value){
                      return false;
                    }
                  };
                  if(i<3){
                    if(mydata[i][j].value ===mydata[i+1][j].value){
                      return false;
                    }
                  }
                }
            }
            return true;
        }

        self.setMusic = function(){
            if(permitMusic){
                myModuleView.musicPlay(permitMusic);
                permitMusic=false;
                
            }else{
            myModuleView.musicPlay(permitMusic);
            permitMusic=true;
            }
        };

        self.setAudio = function(flag){
            myModuleView.audioPlay(flag);
        };

        self.setName = function(name){
          myModuleView.getName(name);
        }
    };

    /* -------- end model -------- */
    /* ----- begin controller ---- */
    function ModuleController() {
        let myModuleContainer = null;
        let myModuleModel = null;
        let startX;
        let startY;
        let endX;
        let endY;

        this.init = function(model) {
            myModuleContainer = document.querySelector('.container');
            myModuleModel = model;

            let musicBtn = myModuleContainer.querySelector('#btnMusicID');

            let menuDivs = myModuleContainer.querySelector('.mainMenuDiv');

            let btnNewGameFooter = myModuleContainer.querySelector('.modal__NewGame');

            let btnNewGameMenu = myModuleContainer.querySelector('#newGameMenu');

            let divNickSave = myModuleContainer.querySelector('#divNickSave');
            // вешаем слушателя на событие hashchange
            window.addEventListener("hashchange", this.updateState);

            // вешаем слушателя на события на кнопки 
            document.addEventListener("keydown", this.keyDownHandler, false);

            document.addEventListener("touchstart", this.touchstart, false);

            document.addEventListener("touchend", this.touchend, false);

            btnNewGameFooter.addEventListener('click',myModuleModel.newGame, false);

             btnNewGameMenu.addEventListener('click',myModuleModel.newGame, false);

            musicBtn.addEventListener('click', myModuleModel.setMusic, false);

            divNickSave.addEventListener('click',this.setName, false);
            
            menuDivs.addEventListener('click', (event)=>{
                let target = event.target;
                if (target.tagName != 'A') return;
                myModuleModel.setAudio('click');
            });

            


            this.updateState(); //первая отрисовка
        }

        this.updateState = function() {
            const hashPageName = location.hash.slice(1).toLowerCase();
            myModuleModel.updateState(hashPageName);
        };

        this.setName = function(){
          let divNickSave = myModuleContainer.querySelector('#divNickName');
          let name = divNickSave.querySelector('input').value;
          myModuleModel.setName(name);
        }

        this.keyDownHandler = function(event) {
            switch (event.key) {
                case "ArrowUp":
                    myModuleModel.updateTop();
                    break;

                case "ArrowDown":
                    myModuleModel.updateBottom();
                    break;

                case "ArrowLeft":
                    myModuleModel.updateLeft();
                    break;

                case "ArrowRight":
                    myModuleModel.updateRight();
                    break;

            }
        };
        this.touchstart = function(event) {
            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
        };

        this.touchend = function(event) {
            ;
            endX = event.changedTouches[0].pageX;
            endY = event.changedTouches[0].pageY;

            var x = endX - startX;
            var y = endY - startY;

            var absX = Math.abs(x) > Math.abs(y);
            var absY = Math.abs(y) > Math.abs(x);
            if (x > 0 && absX) {
                myModuleModel.updateRight();
            } else if (x < 0 && absX) {
                myModuleModel.updateLeft();
            } else if (y > 0 && absY) {
                myModuleModel.updateBottom();
            } else if (y < 0 && absY) {
                myModuleModel.updateTop();
            }
        };

    };
    /* ------ end controller ----- */

    return {
        init: function() {

            const view = new ModuleView();
            const model = new ModuleModel();
            const controller = new ModuleController();

            //связываем части модуля
            view.init();
            model.init(view);
            controller.init(model);
        },
    };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init()); // инициализируем модуль как только DOM готов.