/* ----- begin controller ---- */
export function ModuleController() {
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

}