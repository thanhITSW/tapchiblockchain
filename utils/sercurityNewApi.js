require("dotenv").config();
const md5 = require('md5')

const keyToken = process.env.keySecret;

const getRandomNonce = num => {
    return Math.floor((Math.random() + Math.floor(Math.random() * 5 + 1)) * Math.pow(5, num - 1))
}

const genNewSign = (params) => {
    const stime = Date.now()
    const nonce = getRandomNonce(20).toString()

    params.stime = stime
    params.nonce = nonce
    params.keyToken = keyToken
    params.v = 'v1'

    const sortKeys = []

    for(const key in params){
        if(key !== 'sign'){
            sortKeys.push(key)
        }
    }

    sortKeys.sort()

    let paramsHolder = ''

    sortKeys.forEach( key => {
        paramsHolder += key + params[key]
    })

    params.sign = md5(paramsHolder).toString()
    return '?' + new URLSearchParams(params).toString()
}

module.exports = { genNewSign };