/*
Author: Zeyu Xie
Time: 2025-04-13 11:28 CET
*/

function createSlotItem(name) {
    return $("<img>", {
        class: `slotitem slotitem-${name}`,
        src: `./src/images/slotitems/${name}.png`,
        alt: name.charAt(0).toUpperCase() + name.slice(1)
    })[0];
}
const twice_slotitems = [
    "star", "apple", "watermelon", "grape", "star",
    "grape", "apple", "grape", "apple", "watermelon",
    "grape", "kunkun", "apple", "star", "apple", "star", "apple", "watermelon", "grape", "star",
    "grape", "apple", "grape", "apple", "watermelon",
    "grape", "kunkun", "apple", "star", "apple"
]
export const slotitems = (start) => {
    start = (start % 15 + 15) % 15;
    if (start > 0) {
        return twice_slotitems.slice(start - 1, start + 14).map(createSlotItem);
    }
    return ["apple", ...twice_slotitems.slice(start, start + 14)].map(createSlotItem);
}
export const slotitem_name = (idx) => {
    return twice_slotitems[idx % 15];
}