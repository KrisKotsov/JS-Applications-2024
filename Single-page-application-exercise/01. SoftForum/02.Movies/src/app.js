import { showHome } from "./home.js"
import { showLogin } from "./login.js"
import { showLogout } from "./logout.js"
import { showRegisterView } from "./register.js"
import { getUserData } from "./userHelper.js"

document.querySelectorAll("section").forEach(section => section.style.display = "none")
document.querySelector("nav").addEventListener("click", onNavigate)
const userMSG = document.getElementById("welcome-msg")

const userNav = document.querySelectorAll("li.user")
const guestNav = document.querySelectorAll("li.guest")

const routes = {
    "/": showHome,
    "/home": showHome,
    "/register": showRegisterView,
    "/login": showLogin,
    "/logout": showLogout
}

function onNavigate(e) {
    if (e.target.tagName !== "A" || !e.target.href) {
        return
    }
    e.preventDefault()
    const url = new URL(e.target.href)
    const path = url.pathname
    routes[path]()
}

export function updateNav() {
    const userData = getUserData()
    if (userData) {
        userNav.forEach(li => li.style.display = "block")
        guestNav.forEach(li => li.style.display = "none")
        userMSG.textContent = `Welcome, ${userData.email}`
    } else {
        userNav.forEach(li => li.style.display = "none")
        guestNav.forEach(li => li.style.display = "block")
        userMSG.textContent = ""
    }
}

updateNav()
showHome()