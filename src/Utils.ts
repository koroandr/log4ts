var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

export function escapeHtml(string: string) {
    return string.replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
