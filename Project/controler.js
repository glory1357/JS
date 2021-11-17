export function ModuleController() {
    let self = this;
    let myModuleContainer = null;
    let myModuleModel = null;
    let startX;
    let startY;
    let endX;
    let endY;

    self.init = function(model) {

        myModuleContainer = document.querySelector('.container');
        myModuleModel = model;

        //Вешаем обработчик события, пользователь увидит запрос подтверждения на уход со страницы и его можно будет отменить
        window.onbeforeunload = function() {
            return true;
        };

        //---обработчик собыйтий на кнопки в контейнере
        myModuleContainer.addEventListener('click', self.clickButtons);
        //----обработчик на изменение фрагмента url
        window.addEventListener("hashchange", self.updateState);

        self.updateState(); //первая отрисовка
    };

    self.updateState = function() {
        const hashPageName = location.hash.slice(1).toLowerCase();
        myModuleModel.updateState(hashPageName);
        //----вешаем обработчики на клавиатуру и тач, если открыта страница игры и делаем отрисовку
        switch (hashPageName) {
            case 'game':
                document.addEventListener("keydown", self.keyDownHandler);
                document.addEventListener("touchstart", self.touchstart);
                document.addEventListener("touchend", self.touchend);
                myModuleModel.game();
                break;
            default:
                document.removeEventListener("keydown", self.keyDownHandler);
                document.removeEventListener("touchstart", self.keyDownHandler);
                document.removeEventListener("touchend", self.keyDownHandler);
                break;
        }
    };

    self.keyDownHandler = function(event) {
        switch (event.key) {
            case "ArrowUp":
                myModuleModel.moveTop();
                break;

            case "ArrowDown":
                myModuleModel.moveBottom();
                break;

            case "ArrowLeft":
                myModuleModel.moveLeft();
                break;

            case "ArrowRight":
                myModuleModel.moveRight();
                break;

        };
    };
    self.touchstart = function(event) {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    };

    self.touchend = function(event) {
        
        endX = event.changedTouches[0].pageX;
        endY = event.changedTouches[0].pageY;

        var x = endX - startX;
        var y = endY - startY;

        var absX = Math.abs(x) > Math.abs(y);
        var absY = Math.abs(y) > Math.abs(x);
        if (x > 0 && absX) {
            myModuleModel.moveRight();
        } else if (x < 0 && absX) {
            myModuleModel.moveLeft();
        } else if (y > 0 && absY) {
            myModuleModel.moveBottom();
        } else if (y < 0 && absY) {
            myModuleModel.moveTop();
        }
    };

    self.clickButtons = function(event) {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
            myModuleModel.setAudio('click');
        };
        switch (event.target) {
            case myModuleContainer.querySelector('#btnMusicID'):
                myModuleModel.setMusic();
                break;

            case myModuleContainer.querySelector('#btnSoundsID'):
                myModuleModel.permitAudio();
                break;

            case myModuleContainer.querySelector('#newGameMenu'):
                myModuleModel.newGame();
                break;

            case myModuleContainer.querySelector('#nameID'):
                let userName = myModuleContainer.querySelector('#username').value;
                myModuleModel.setName(userName);
                break;

            case myModuleContainer.querySelector('#sizeMinus'):
                myModuleModel.resizeMatrix(myModuleContainer.querySelector('#sizeMinus').innerText);
                break;

            case myModuleContainer.querySelector('#sizePlus'):
                myModuleModel.resizeMatrix(myModuleContainer.querySelector('#sizePlus').innerText);
                break;

            case myModuleContainer.querySelector('.newGame'):
                myModuleModel.newGame();
                break;

            case myModuleContainer.querySelector('.continueGame'):
                myModuleModel.game();
                break;
        }
    };
}