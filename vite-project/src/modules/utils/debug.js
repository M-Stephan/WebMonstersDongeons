// Set to true to enable debug system
const debugEnabled = true;

// Set to true to enable debug system whan a function is called
const debugFunctionEnabled = true;

export function Debug(type, text, functionCall) {

    if ((functionCall && !debugFunctionEnabled) || !debugEnabled) return;

    let prefix;
    let message;

    switch (type) {
        case "info":
            prefix = "INFO";
            break;
        case "success":
            prefix = "SUCCESSFUL";
            break;
        case "error":
            prefix = "ERROR";
            break;
        default:
            prefix = "LOG";
            break;
    };

    if (type === "success") {
        message = `[${prefix} ATTEMPT]: ${text}`;
    } else {
        message =`[SCRIPT ${prefix}]: ${text}`;
    };

    console.log(message);
};