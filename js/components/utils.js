import {
    UI_STATUS_FEEDBACK,
    UI_CLASSES,
} from "./data.js";

/* ///////////////
    FUNCTIONS for DOM TRAVERSAL
/////////////// */

// FUNCTION to TRAVERSE and RETURN the PARENT with given class
export function getParentElement(element, targetParent) {
    let parent = element.parentNode;
    return parent.tagName.toUpperCase() == targetParent.toUpperCase()
        ? parent
        : getParentElement(parent, targetParent);
}

/* ///////////////
    UI COMPONENTS FUNCTIONS
/////////////// */

/* ///////////////
    FUNCTION FOR HANDLING INPUTS
/////////////// */


// FUNCTION to REFRESH INPUT TAG PROPERTIES
export function refreshInputs() {
    // FILLABLE INPUTS (all inputs except Radios and Checkboxes)
    let inputArr = document.querySelectorAll("input:not([type=radio]):not([type=checkbox]), .text-input");

    inputArr.forEach(input => {
        input.classList.add("text-input");

        // POPULATE 👁️ Password Visibility Button if current input is Password
        if (input.type == "password") {
            let passwordVisibilityBtn = document.createElement("button");
            passwordVisibilityBtn.type = "button";
            passwordVisibilityBtn.classList.add("password-visibility-btn", "trail", "icon");
            passwordVisibilityBtn.innerHTML = `<i class="bi bi-eye"></i><i class="bi bi-eye-slash"></i>`;

            // Get Parent Element of current Password Input and  append Eye button in it.
            getParentElement(input, UI_CLASSES.fieldset).append(passwordVisibilityBtn);

            // Password Visibility Event
            passwordVisibilityBtn.addEventListener("click", function (e) {
                e.preventDefault();
                input.type = input.type == "password" ? "text" : "password";
                passwordVisibilityBtn.classList.toggle("visible", input.type != "password");
            })
        }
    })

    // TOGGLE INPUTS like Radio and Checkbox
    let inputToggleArr = document.querySelectorAll("input[type=radio], input[type=checkbox]");
    inputToggleArr.forEach(input => {
        input.classList.add("toggle-input");
    });
}

// FUNCTION to SET specified INPUT MESSAGE
export function setInputMsg(inputTag, msg, status = UI_STATUS_FEEDBACK.error) {
    removeInputMsg(inputTag, status);

    // Create message div
    const msgDiv = document.createElement("div");
    // Set class, by default, it's "error"
    msgDiv.classList.add("msg", status);
    msgDiv.innerHTML = `<span>${msg}</span>`;

    // Find parent for appending
    const fieldset = getParentElement(inputTag, UI_CLASSES.fieldset);
    fieldset.append(msgDiv);
}

// FUNCTION to REMOVE specified INPUT MESSAGE
export function removeInputMsg(inputTag, status = UI_STATUS_FEEDBACK.error) {
    const fieldset = getParentElement(inputTag, UI_CLASSES.fieldset);
    // Get type of msg to be deleted, by default, "error"
    fieldset.querySelectorAll("." + status).forEach(div => div.remove());
}

// FUNCTION for INPUT VALIDATION
export function validateInput(inputTag, errorMsg) {
    removeInputMsg(inputTag);
    inputTag.value = inputTag.value.trim();
    if (inputTag.required && !inputTag.value) {
        setInputMsg(inputTag, "This field is required");
        return false;
    }

    const pattern = inputTag.pattern?.trim();
    if (!pattern || new RegExp(pattern).test(inputTag.value.trim())) {
        return true
    };

    setInputMsg(inputTag, errorMsg);
    return false;
}

// FUNCTION to validate TOGGLE INPUTS like radio and checkboxes
export function validateToggleInputs(toggleInputs, msg = "This field is required") {
    let validationArray = [];
    toggleInputs.forEach(input => {
        if (input.required && !input.checked) {
            validationArray.push(false);
        }
    })

    if (validationArray.includes(false)) {
        setInputMsg(toggleInputs[0], msg);
        return false;
    }

    return true;
}

// FUNCTION to SET specified INPUT VALUE or REMOVE it not specified
export function setInputValue(inputTag, value = "") {
    inputTag.value = value;
}


/* ///////////////
    FUNCTIONS FOR CREATING COMPONENTS
/////////////// */

// SNACKBAR GENERATION FUNCTION

export function createSnackbar(options = {}) {
    // OPTION DEFAULTS
    const { msg, status = UI_STATUS_FEEDBACK.info, undo = false } = options;

    // ERROR CONDITIONS - msg must exist
    if (!msg) throw new Error("Provide a message for Snackbar");

    // SNACKBAR CONSTRUCTION
    let snackbar = document.createElement("div");
    snackbar.classList.add("snackbar", status)

    // Close button, if undo() exists, else just close
    let closeBtn = undo
        ? `<button class="text close-snackbar-btn undo-btn">Undo</button>`
        : `<button class="icon close-snackbar-btn"><i class="bi bi-x-lg"></i></button>`;
    snackbar.innerHTML = `<p class="fs-400 msg">${msg}</p> ${closeBtn}`;
    document.querySelector(".snackbar-sec").prepend(snackbar);

    // SNACKBAR CLOSING - Automatic - Add animation and remove
    setTimeout(() => snackbar.style.animation = `fadeScaleOut 0.5s linear`, 4600);
    setTimeout(() => snackbar.remove(), 5000);

    // Snackbar Closing - On close / undo button click
    closeBtn = snackbar.querySelector(".close-snackbar-btn");
    closeBtn.addEventListener("click", function () {
        if (undo) undo();

        // SNACKBAR CLOSING - On Click - Add animation and remove
        snackbar.style.animation = `fadeScaleOut 0.5s linear`;
        setTimeout(() => snackbar.remove(), 500);
    })
}


//  DIALOG BOX COMPONENT CREATOR

export function createDialog(options = {}) {
    // INITIALIZATION - Set default options and handle mandatory conditons
    const {
        illustration,
        headline,
        description,
        componentID,
        componentPreset = function (component) { },
        fullscreen = false,
        primaryBtnLabel = "Continue",
        secondaryBtnLabel = "Cancel",
        primaryAction = function () { return true },
        secondaryAction = function () { return true },
    } = options;

    if (!headline) throw new Error("Provide a headline for Dialog");

    // GET AND MAKE COMPONENT VISIBLE
    const component = document.querySelector(`[data-dialog-id="${componentID}"]`);
    component?.setAttribute("aria-hidden", "false");

    if (componentPreset) componentPreset(component);

    // DIALOG SECTION CONSTRUCTION
    const dialogSec = document.createElement("section");
    dialogSec.classList.add("dialog-sec");
    if (fullscreen) dialogSec.classList.add("fullscreen")
    dialogSec.innerHTML = `
    <section class="dialog" style="animation: fadeScaleDownIn 0.5s linear">
        <h3 class="fs-500 center">${headline}</h3>
        <section class="dialog-body">
            ${illustration ? `<div><picture class="center dialog-illus"><img src="./assets/illus/${illustration}"></picture></div>` : ""}
            ${description ? `<div><p class="msg subtitle center">${description}</p></div>` : ""}
            ${component ? `<div class="dialog-component">${component?.outerHTML}</div>` : ""}
        </section>
        <div class="btn-box">
            ${secondaryBtnLabel !== false ? `<button class="ghost secondary-btn">${secondaryBtnLabel}</button>` : ""}
            <button class="primary primary-btn">${primaryBtnLabel}</button>
        </div>
    </section>
            `;

    // REMOVE COMPONENT temporarily from DOM to avoid duplicancy issues before DialogSec population
    component?.remove();
    document.body.prepend(dialogSec);
    dialogSec.style.animation = `fadeIn 0.5s linear`;

    refreshInputs();

    // Function Remove the Dialog box
    function removeDialogBox() {
        component?.setAttribute("aria-hidden", "true");
        document.body.prepend(component);
        dialogSec.style.animation = `fadeOut 0.5s linear`;
        dialogSec.querySelector(".dialog").style.animation = `fadeScaleOut 0.5s linear`;
        setTimeout(() => {
            document.body.querySelector(".dialog-sec").remove();
        }, 400);
    }

    // CLOSE DIALOG BY CANCEL BUTTON PRESS
    let secondaryBtn = dialogSec.querySelector(".secondary-btn");
    if (secondaryBtn) {
        secondaryBtn.addEventListener("click", function () {
            secondaryAction();
            removeDialogBox();
            return false;
        })
    }

    // CLOSE DIALOG BY PRIMARY BUTTON PRESS
    let primaryBtn = dialogSec.querySelector(".primary-btn");
    primaryBtn.addEventListener("click", function () {
        if (primaryAction()) {
            removeDialogBox();
            return true;
        }
    })
}

/* ///////////////
    MISCELLANEOUS HELPER UTILITY FUNCTION
/////////////// */

// Convert single digit number to 2 digit
export function toTwoDigit(num) {
    return ("0" + num).slice(-2);
}

// Generate random integer between given number
// FISHER YATES SHUFFLE 
export function getRandomInRange(min, max) {
    // Create an array [start,......,end]
    const allNumbers = [];
    for (let i = min; i <= max; i++) {
        allNumbers.push(i);
    }
    // Fisher-Yates Array shuffle
    let i = allNumbers.length;
    while (i !== 0) {
        let randomIndex = Math.floor(Math.random() * i);
        i--;
        // Swap current element with random index
        [allNumbers[i], allNumbers[randomIndex]] = [allNumbers[randomIndex], allNumbers[i]];
    }

    // Return Random Array element
    return allNumbers[Math.floor(Math.random() * allNumbers.length)];
}