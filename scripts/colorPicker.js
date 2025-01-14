import { monoColor, complemColor, analogColor, splitColor, triadColor, tetraColor, getComplement } from './colorCalculator.js';

document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const eyedropper =  document.getElementById("eyedropper");
    const colors =  document.getElementById("colors");

    const Child = (color, msg) => {
        const errorLabel = document.createElement("err")
        errorLabel.setAttribute("class", "errorLabel")
        errorLabel.style.backgroundColor = color
        errorLabel.innerText = msg

        content.appendChild(errorLabel)
        setTimeout(() => {
            content.removeChild(errorLabel)
        }, 2000)
    }

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0]

        if (tab.url === undefined || tab.url.indexOf('chrome') == 0) {
            eyedropper.innerHTML = '<span>Eye Dropper</span> can\'t access <i>Chrome pages</i>'
        }
        else if (tab.url.indexOf('file') === 0) {
            eyedropper.innerHTML = '<span>Eye Dropper</span> can\'t access <i>local pages</i>'

        }
        else {
            const button = document.createElement("button")
            button.setAttribute("id", "eyedropper-button")
            button.innerText = "Eyedropper"

            button.addEventListener("click", () => {
                if (!window.EyeDropper) {
                    Child("#ad5049", 'Your browser does not support color picking')
                    return
                }

                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { from: "popup", query: "eye_dropper_clicked" }
                );
                window.close()
            })

            eyedropper.appendChild(button)
        }
    });

    chrome.storage.local.get("color_hex_code", (resp) => {

        if (resp.color_hex_code && resp.color_hex_code.length > 0) {
            resp.color_hex_code.forEach(hexCode => {
                const divElement = document.createElement("div")
                divElement.innerText = hexCode;
                divElement.style.color = getComplement(hexCode);
                divElement.style.backgroundColor = hexCode;

                divElement.style.border = "solid";
                divElement.style.borderWidth = "1px";
                divElement.style.borderColor = "#2F2B38";
                divElement.style.borderRadius = "3px";
                divElement.style.height = "20px";

                divElement.addEventListener("click", () => {
                    navigator.clipboard.writeText(hexCode);
                    Child("#e19526", "Hex code is copied to clipboard!")

                    monoColor(hexCode);
                    complemColor(hexCode);
                    analogColor(hexCode);
                    splitColor(hexCode);
                    triadColor(hexCode);
                    tetraColor(hexCode);
                })
                colors.appendChild(divElement)
            })

            const ClearButton = document.createElement("button")
            ClearButton.innerText = "Clear"
            ClearButton.setAttribute("id", "ClearButton")
            ClearButton.addEventListener("click", () => {
                chrome.storage.local.remove("color_hex_code")
                window.close()
            })
            colors.appendChild(ClearButton)
        }

    })
})