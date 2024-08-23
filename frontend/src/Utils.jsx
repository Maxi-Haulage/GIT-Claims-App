export default function blankCheck(attr) {
    if (attr === null || attr === "") {
        return "-";
    }
    return attr;
}
