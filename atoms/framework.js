import { atom } from "recoil";
import data from "data/terms.json"

export const termsState = atom({
   key: 'termsState',
   default: data.terms
})

export const currentTermSlugState = atom({
   key: 'currentTermSlugState',
   default: null
})

export const frameworkVersionState = atom({
   key: 'frameworkVersionState',
   default: data.version || "0.1.0"
})