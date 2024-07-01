// src/store.js
import { atom } from 'jotai';

export const userNameAtom = atom('');
export const rankingAtom = atom([]);
export const currentLevelAtom = atom(1);
export const currentPairIndexAtom = atom(0);
export const scoreAtom = atom(0);
