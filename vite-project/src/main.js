import { SetAppPage } from "./modules/app/app-page.js";
import { MainMenu } from "./modules/app/main-menu.js";
import { MainTests } from "./modules/tests/tests.js";
import { CreateNotifyBox } from "./modules/utils/notify.js";

CreateNotifyBox();
MainTests();
SetAppPage();
MainMenu();

