const debugEnabled = true;

function Debug(type, text) {
    if (!debugEnabled) return;
    
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

    console.log(message)
};