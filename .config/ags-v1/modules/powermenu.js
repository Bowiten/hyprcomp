const WINDOW_NAME = "powermenu"

export const powermenu = Widget.Window({
    name: WINDOW_NAME,
    setup: self => self.keybind("Escape", () => {
            App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
})
