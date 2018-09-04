import { LoginViewComponent } from "./views/login-view/login-view.component";
import { MainViewComponent } from "./views/main-view/main-view.component";
import { OutlineViewComponent } from "./views/outline-view/outline-view.component";

export const AppRoutes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginViewComponent },
    { path: 'items', component: MainViewComponent },
    { path: 'item/:itemid', component: MainViewComponent },
    { path: 'outline', component: OutlineViewComponent },
]