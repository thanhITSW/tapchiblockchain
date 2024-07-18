require("dotenv").config();
const axios = require('axios');
const FormData = require('form-data');

const { genSign } = require('../utils/sercurityApi')
const {genNewSign} = require('../utils/sercurityNewApi')

const api_user = process.env.API_USER

module.exports.get_all = (req, res) => {
    let user = req.session.user || {}
    const url = process.env.API_KEY + '/webblockchain' + genSign({company: 'vds'})
    axios.get(url)
        .then(response => {
            topics = response.data.result
            let topicTime = topics.map(topic => {
                const dateParts = topic.time.split('/');
                const yyyyMMdd = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                return { ...topic, time: yyyyMMdd };
            });
    
            topicTime.sort((a, b) => {
                return new Date(b.time) - new Date(a.time);
            });
            let topicView = topics.sort((a, b) => b.view - a.view)
            let firstTopicTime = topicTime[0]
            let secondTopicTime = topicTime[1]
            let firstTopicView = topicView[0]
            let topicTinTuc = topicTime.filter(topic => topic.category === 'tintuc');
            let topicBlockChain = topicTime.filter(topic => topic.category === 'blockchain');
            let topicCrypto = topicTime.filter(topic => topic.category === 'crypto');
            let topicTaiChinh = topicTime.filter(topic => topic.category === 'taichinh');
            res.render('home', {firstTopicTime, secondTopicTime, firstTopicView, topicTinTuc, topicBlockChain, topicCrypto, topicTaiChinh, topicTime, user})
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports.get_detail = (req, res) => {
    let user = req.session.user || {}
    const url = process.env.API_KEY + '/webblockchain'
    let url_comment = process.env.API_KEY + '/comment/webblockchain/' + req.params.id + genSign({company: 'vds'})
    axios.get(url + '/detail/' + req.params.id + genSign({company: 'vds'}))
        .then(response => {
            topic = response.data.topic || {}
            axios.get(url + genSign({company: 'vds'}))
                .then(response => {
                    topics = response.data.result
                    let topicTime = topics.map(topic => {
                        const dateParts = topic.time.split('/');
                        const yyyyMMdd = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                        return { ...topic, time: yyyyMMdd };
                    });
            
                    topicTime.sort((a, b) => {
                        return new Date(b.time) - new Date(a.time);
                    });
                    if(topic){
                        axios.get(url_comment)
                        .then(resComment => {
                            comments = resComment.data.comment || {}
                            res.render('bao', {topic, topicTime, user, comments})
                        })
                    }
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
    url_update = process.env.API_KEY + '/webblockchain' + '/updateView/' + req.params.id + genSign({company: 'vds'})
    axios.patch(url_update)
        .then(response => {
            res.json({ code: 0, message: 'Update view successfull' })
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports.postLogin = async (req, res) => {
    url = api_user + '/user/signin' + genNewSign({company: 'vds'})
    let { email, password} = req.body
    let account = undefined
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('website', 'webblockchain');
    
    try{
        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        if(response.data.code == 0 ){
            account = response.data.u
            req.session.user =  account
            req.session.token = response.data.token
            res.json({code: 0, message: 'Login success'})
        }
        else{
            res.json({code: 1, message: response.data.message})
        }
    }
    catch(e){
        return res.redirect('/login')
    }
}

module.exports.getCategory = (req, res) => {
    let user = req.session.user || {}
    const {category} = req.params
    if (category == 'event' || category == 'contact' || category == 'login' || 
        category == 'register' || category == 'logout' || category == 'forgotpassword' 
        || category == 'account') {
        if(category == 'login'){
            if(req.session.user) {
                return res.redirect('/')
            }
            res.render('login', {user})
        }
        else if(category == 'register'){
            if(req.session.user) {
                return res.redirect('/')
            }
            res.render('register')
        }
        else if(category == 'logout'){
            req.session.destroy()
            res.redirect('/')
        }
        else if(category == 'forgotpassword'){
            res.render('forgotPassword')
        }
        else if(category == 'account'){
            if(!req.session.user) {
                return res.redirect('/')
            }
            res.render('account', {user})
        }
        else {
            res.render(category, {user})
        }
    }
    else{
        type = ''
        if(category == 'news'){
            type = 'tintuc'
        }
        else if(category == 'blockchain'){
            type = 'blockchain'
        }
        else if(category == 'crypto'){
            type = 'crypto'
        }
        else if(category == 'finance'){
            type = 'taichinh'
        }

        const url = process.env.API_KEY + '/webblockchain' + '/category/' + type + genSign({company: 'vds'})
        axios.get(url)
        .then(response => {
            topics = response.data.topic || []
            res.render('bao_category', {topics, user, type})
        })
        .catch(error => {
            console.error(error);
        });
    }
}

module.exports.updateShare = (req, res) => {
    url_update = process.env.API_KEY + '/webblockchain' + '/updateShare/' + req.params.id + genSign({company: 'vds'})
    axios.get(url_update)
        .then(response => {
            console.log(response.data.message)
            res.json({ code: 0, message: 'Update share successfull' })
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports.addComment = (req, res) => {
    const user = req.session.user || {}
    let {name, email, comment} = req.body
    if(req.session.user){
        name = user.name
        email = user.email
    }
    const {topicId} = req.params
    let data = {
        name,
        email,
        comment,
        topicId,
        website: 'webblockchain'
    }
    let url = process.env.API_KEY + '/comment/addComment' + genSign({company: 'vds'})

    axios.post(url, data)
    .then(response => {
        const message = response.data.message
        if(response.data.code == 0){
            res.json({code : 0, message: message})
        }
        else{
            res.json({code : 1, message: message})
        }
    })
    .catch(error => {
        console.error(error);
    });
}

module.exports.postRegister = async (req, res) => {
    url = api_user + '/user/register' + genNewSign({company: 'vds'})
    let { name, email, password, phone, repassword} = req.body

    if(password != repassword){
        return res.json({code: 1, message: 'Mật khẩu nhập lại không khớp'})
    }
    if(password.length < 4){
        return res.json({code: 1, message: 'Mật khẩu phải có ít nhất 4 ký tự'})
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('website', 'webblockchain');
    
    try{
        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        if(response.data.code == 0 ){
            res.json({code: 0, message: 'Register success'})
        }
        else{
            res.json({code: 1, message: response.data.message})
        }
    }
    catch(e){
        return res.redirect('/register')
    }
}

module.exports.postForgotPassword = async (req, res) => {
    url = api_user + '/user/forgotpassword' + genNewSign({company: 'vds'})
    let { email } = req.body

    let data = {
        email,
        website: 'webblockchain'
    }

    axios.post(url, data)
    .then(response => {
        if(response.data.code == 0){
            res.json({code: 0, message: 'Mật khẩu mới đã được gửi đến email. Vui lòng kiểm tra email'})
        }
        else{
            res.json({code: 1, message: response.data.message})
        }
    })
    .catch(error => {
        console.error(error);
    });
}

module.exports.changeInformation = async (req, res) => {
    let user = req.session.user || {}
    url = api_user + '/user/update/' + user._id + genNewSign({company: 'vds'})

    const {name, phone} = req.body
    const file = req.file;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);

    if (file) {
        formData.append('image', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype
        });
    }


    try {
        const response = await axios.put(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        const message = response.data.message
        const account = response.data.user
        if(response.data.code == 0){
            req.session.user = account
            res.json({ code: 0, message: message});
        }
        else{
            res.json({ code: 1, message: message});
        }

    } catch (error) {
        res.json({ code: 1, message: 'Failed to update user', error: err.message });
    }
}

module.exports.changePassword = async (req, res) => {
    let user = req.session.user || {}
    url = api_user + '/user/changepassword/' + user._id + genNewSign({company: 'vds'})

    const {oldPassword, newPassword} = req.body

    const data = {
        oldPassword,
        newPassword
    }

    axios.put(url, data)
    .then(response => {
        const message = response.data.message
        if(response.data.code == 0){
            res.json({ code: 0, message: message});
        }
        else{
            res.json({ code: 1, message: message});
        }
    })
    .catch(err => {
        res.json({ code: 1, message: 'Failed to update password', error: err.message });
    })
}