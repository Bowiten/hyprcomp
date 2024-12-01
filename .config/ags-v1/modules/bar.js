const hyprland = await Service.import("hyprland")
const audio = await Service.import("audio")
const battery = await Service.import("battery")

const date = Variable("", {
    poll: [1000, 'date "+%H:%M %b %e"'],
})

const spacing = 12

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

function Workspaces() {
    const activeId = hyprland.active.workspace.bind("id")

    // make an array of 5 buttons, each corresponding to a hyprland workspace
    // tldr i dont wanna see the special workspace and its -98 or whatever it looks weird lol
    const workspaces = Array.from({ length: 5 }, (_, i) => i + 1).map(id => Widget.Button({
        attribute: id,
        label: `${id}`,
        onClicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
        class_name: activeId.as(i => `${i === id ? "focused" : ""}`),
    }))

    return Widget.Box({
        class_name: "workspaces",
        spacing: spacing,
        children: workspaces,
    })
}

function ClientTitle() {
    return Widget.Label({
        class_name: "client-title",
        label: hyprland.active.client.bind("class"),
    })
}

// TODO: change to a button

function Clock() {
    return Widget.Button({
        label: date.bind(),
        onClicked: () => print("this button does nothing"),
    })
}

function Volume() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }
    console.log(audio)
    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    const icon = Widget.Icon({
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
    })

    const slider = Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value }) => audio.speaker.volume = value,
        setup: self => self.hook(audio.speaker, () => {
            self.value = audio.speaker.volume || 0
        }),
    })

    return Widget.Box({
        class_name: "volume",
        css: "min-width: 180px",
        children: [icon, slider],
    })
}

function BatteryLabel() {
    const value = battery.bind("percent").as(p => `${p.toString()}%`)
    //const icon = battery.bind("percent").as(p =>
    //    `battery-level-${Math.floor(p / 10) * 10}-symbolic`)

    return Widget.Box({
        class_name: "battery",
        visible: battery.bind("available"),
        children: [
            //Widget.Icon({ icon }),
            Widget.Label({ label: value }),
        ],
    })
}

// layout of the bar
function Left() {
    return Widget.Box({
        spacing: spacing,
        children: [
            Workspaces(),
            ClientTitle(),
        ],
    })
}

function Center() {
    return Widget.Box({
        spacing: spacing,
        children: [
            Media(),
            Notification(),
        ],
    })
}

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: spacing,
        children: [
            //Volume(),
            BatteryLabel(),
            Clock(),
        ],
    })
}

export function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        monitor,
        class_name: "bar",
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        layer: "bottom",
        child: Widget.CenterBox({
            start_widget: Left(),
            //            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}
