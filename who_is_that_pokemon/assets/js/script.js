import { acessUrl as api } from './modules/api.js'

const object = await api()

const img = document.getElementById('img-pokemon')

img.src = object.img