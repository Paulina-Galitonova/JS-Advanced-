import { showCatalog } from "./views/catalog.js";
import { logout } from "./data/users.js";
import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { showHomeView } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showDetails } from "./views/details.js";
import { showCreate } from "./views/create.js";
import { showEdit } from "./views/edit.js";
import { showSearchView } from "./views/search.js";


//TODO Load correct views
page("/", showHomeView);
page("/register", showRegister);
page("/login", showLogin);
page("/catalog", showCatalog);
page("/catalog/:id",showDetails);
page("/create", showCreate);
page("/search", showSearchView);
page("/edit/:id",showEdit);






page.start();
updateNav();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout(); // Call the logout function
    updateNav();
    page.redirect('/');
});

