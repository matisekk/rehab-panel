export function getStatusLabel(status: "todo" | "in_progress" | "done") {
    switch (status) {
        case "todo":
            return "Not started";
        case "in_progress":
            return "In progress";
        case "done":
            return "Completed";
        default:
            return "";
    }
}

export function getStatusColor(status: "todo" | "in_progress" | "done") {
    switch (status) {
        case "todo":
            return "orange";
        case "in_progress":
            return "blue";
        case "done":
            return "green";
        default:
            return "gray";
    }
}

export function getButtonLabel(status: "todo" | "in_progress" | "done") {
    switch (status) {
        case "todo":
            return "Start";
        case "in_progress":
            return "Continue";
        case "done":
            return "Completed";
        default:
            return "Start";
    }
}