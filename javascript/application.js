import { Application, Controller } from 'stimulus';
window.Stimulus = Application.start()

import ButtonsControllers from "./controllers/buttons_controllers.js"
Stimulus.register("buttons", ButtonsControllers)