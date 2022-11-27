import { acessUrl as api } from './modules/api.js'
let number = Math.floor(Math.random() * 200)

const object = await api(number)

const img = document.getElementById('img-pokemon')

img.src = object.img