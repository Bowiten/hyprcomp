import { Bar } from "./modules/bar.js"
import { NotificationPopups } from "./modules/notifications.js"
import { applauncher } from "./modules/applauncher.js"
import { powermenu } from "./modules/powermenu.js"

/* testing notification
Utils.timeout(100, () => Utils.notify({
    summary: "Notification Popup Example",
    iconName: "info-symbolic",
    body: "Lorem ipsum dolor sit amt, qui minim labore adipisicing "
        + "minim sint cillum sint consectetur cupidatat",
    actions: {
        "Cool": () => print("pressed Cool"),
        "Not cool": () => print("pressed Not Cool"),
    }
}))
*/

App.config({
    style: "./style.css",
    windows: [
        NotificationPopups(),
        applauncher,
        powermenu,
        Bar(),
    ],
})

export { }
