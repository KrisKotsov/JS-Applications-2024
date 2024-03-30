import { page } from './lib.js'
import { showHome } from './views/home.js'
import { showLogin } from './views/login.js'
import { showRegister } from './views/register.js'
import { logout } from './data/users.js'
import { updateNav } from './util.js'
import { showCatalog } from './views/catalog.js'
import { showSell } from './views/sell.js'
import { showDetails } from './views/details.js'
import { showEdit } from './views/edit.js'


updateNav()

page('/', showHome)
page('/register', showRegister)
page('/login', showLogin)
page('/catalog', showCatalog)
page('/sell', showSell)
page('/catalog/:id', showDetails)
page('/edit/:id', showEdit)

page.start()

document.getElementById("logoutBtn").addEventListener("click", async () => {
    logout()
    updateNav()
    page.redirect('/')
})