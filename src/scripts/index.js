/*
Author: Zeyu Xie
Time: 2025-04-13 11:28 CET
*/

import { slotitems, slotitem_name } from "./make_items.js"

/*
================================
= Functions and Variables Part =
================================
*/

// Reels DOM
const reels = [$("#reel-1")[0], $("#reel-2")[0], $("#reel-3")[0]];

// Random Function
const three_randoms = () => Array.from({ length: 3 }, () => Math.floor(Math.random() * 15))

// Init function
let idxs = [0, 0, 0];
const init_reel = (i1, i2, i3) => {
    reels.forEach(reel => {
        reel.innerHTML = "";
        reel.style.translateY = "0";
        reel.style.animation = "none";
    });
    reels[0].append(...slotitems(i1), ...slotitems(i1));
    reels[1].append(...slotitems(i2), ...slotitems(i2));
    reels[2].append(...slotitems(i3), ...slotitems(i3));
    idxs = [i1, i2, i3];
}

// Spin function
const animation_period = 3000;
let tot = 0;
const _spin = (spin_idx1, spin_idx2, spin_idx3) => {
    tot++;
    let spin_idxs = [spin_idx1, spin_idx2, spin_idx3];
    for (let i = 0; i < 3; i++) {
        reels[i].append(...slotitems(idxs[i]));
        $(reels[i]).css("animation", `spin_${spin_idxs[i]} ${animation_period}ms ease-in-out forwards`);
    }
    setTimeout(() => {
        idxs = idxs.map((idx, i) => (idx + spin_idxs[i]) % 15);
        init_reel(...idxs);
        console.log(`Spinning Time ${tot} Result: [ ${idxs[0]} (${slotitem_name(idxs[0])}) | ${idxs[1]} (${slotitem_name(idxs[1])}) | ${idxs[2]} (${slotitem_name(idxs[2])}) ]`);
    }, animation_period + 10);
}
const random_spin = () => {
    _spin(...three_randoms());
}

/*
================================
=       Main Script Part       =
================================
*/

// Console logs
console.log("Welcome to Timothy Slot Games! ")
console.log("Author: Zeyu Xie")

init_reel(...three_randoms());
console.log(`Starting Status: [ ${idxs[0]} (${slotitem_name(idxs[0])}) | ${idxs[1]} (${slotitem_name(idxs[1])}) | ${idxs[2]} (${slotitem_name(idxs[2])}) ]`);

// Button
let in_animation = false;
$("#button").on("click", () => {
    if (in_animation) {
        return;
    }
    in_animation = true;
    random_spin();
    setTimeout(() => {
        in_animation = false;
    }, animation_period + 15);
})