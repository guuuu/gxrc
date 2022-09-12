import ReactDOM from "react-dom";
import App from "./render/App";
import "./render/index.css";

function render() {
    ReactDOM.render(App(), document.getElementById("root"));

    const div: HTMLDivElement = document.createElement("div");
    div.style.width = "96%"
    div.style.height = "20px"
    div.style.position = "absolute"
    div.style.top = "0px"
    div.style.left = "0px"
    div.style.zIndex = "99"
    div.style.userSelect = "none"
    div.id = "draggable"
    document.body.prepend(div)
}

render();
