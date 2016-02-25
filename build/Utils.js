"use strict";
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};
function escapeHtml(string) {
    return string.replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
exports.escapeHtml = escapeHtml;
