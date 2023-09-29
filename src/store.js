import {writable} from 'svelte/store';


export const references=writable([]);
export const segments=writable([]);
export const dirty=writable(false);
export const cm1=writable(null);
export const cm2=writable(null);
export const cursorline=writable(0);
export const selectedRef=writable(0);
export const APPVER='2023.9.27'