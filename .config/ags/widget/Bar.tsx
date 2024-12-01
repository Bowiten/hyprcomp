import { Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, bind } from "astal"
import AstalBattery from "gi://AstalBattery?version=0.1"
import AstalHyprland from "gi://AstalHyprland?version=0.1"

function Workspaces() {
    const hyprland = AstalHyprland.get_default()

    return <box spacing={12}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map(id => (
            <button
                className={bind(hyprland, "focused_workspace").as(fw =>
                    id === fw.id ? "focused" : "")}
                onClicked={() => hyprland.dispatch("workspace", String(id))}>
                {id}
            </button>
        ))}
    </box>
}

// TODO: clicking should toggle between title and client
function Title() {
    const hyprland = AstalHyprland.get_default()
    const focused = bind(hyprland, "focusedClient")

    return <button>
        {focused.as(fc => (
            <label label={bind(fc, "class").as(String)} />
        ))}
    </button>
}

// TODO: clicking should do something
function Battery() {
    const battery = AstalBattery.get_default()

    const percent = String(Math.trunc(battery.get_percentage() * 100)) + "%"
    return <button>
        <label label={percent} />
    </button>
}

// TODO: clicking should do something
function Time() {
    const time = Variable("").poll(1000, 'date "+%H:%M %b %e"')

    return <button>
        <label label={bind(time).as(String)} />
    </button>
}

export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        className="Bar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}>
        <centerbox>
            <box hexpand spacing={12} halign={Gtk.Align.START}>
                <Workspaces />
                <Title />
            </box>
            <box />
            <box hexpand spacing={12} halign={Gtk.Align.END}>
                <Battery />
                <Time />
            </box>
        </centerbox>
    </window>
}
