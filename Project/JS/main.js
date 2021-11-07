import {ModuleView} from './JS/view.js';
import {ModuleModel} from './JS/model.js';
import {ModuleController} from './JS/controller.js';

const mySPA = (function() {



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