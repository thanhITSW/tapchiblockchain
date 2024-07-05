require("dotenv").config();
const axios = require('axios');

const { genSign } = require('../utils/sercurityApi')

module.exports.get_all = (req, res) => {
    const url = process.env.API_KEY + genSign({company: 'vds'})
    axios.get(url)
        .then(response => {
            topics = response.data.result
            res.render('home', {topics})
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports.get_detail = (req, res) => {
    const url = process.env.API_KEY
    url_update = process.env.API_KEY + '/updateView/' + req.params.id + genSign({company: 'vds'})
    axios.get(url + '/detail/' + req.params.id + genSign({company: 'vds'}))
        .then(response => {
            topic = response.data.topic
            axios.get(url + genSign({company: 'vds'}))
                .then(response => {
                    topics = response.data.result
                    res.render('bao', {topic, topics})
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports.updateView = (req, res) => {
    url_update = process.env.API_KEY + '/updateView/' + req.params.id + genSign({company: 'vds'})
    axios.patch(url_update)
        .then(response => {
            res.json({ code: 0, message: 'Update view successfull' })
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports.getCategory = (req, res) => {
    const {category} = req.params
    const url = process.env.API_KEY + '/category/' + category + genSign({company: 'vds'})
    axios.get(url)
        .then(response => {
            topics = response.data.topic
            res.render('bao_category', {topics})
        })
        .catch(error => {
            console.error(error);
        });
}