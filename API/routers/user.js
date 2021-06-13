const express = require('express')
const User = require('../modules/users')
const auth = require('../middleWare/auth');
const privliges = require('../middleWare/privileges')
const Router = new express.Router()

Router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
Router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
Router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.token = req.user.token.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})
//UPDATE
Router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.kyes(req.body);
    const allowedUpdates = ['first_name', 'last_name', 'username', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid update' })
    }
    try {
        update.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Privlige Update
// Router.patch('/user/privleges',auth, async(req,res)=>{
//     const update = Object.keys(req.body);
//     const allowedUpdate = ['privileges']
// })

//DELETE
Router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = Router;








// const express = require('express')
// const User = require('../modules/users')
// const auth = require('../middleWare/auth');
// const privliges = require('../middleWare/privileges')
// const Router = new express.Router()

// Router.post('/users', async (req,res)=>{
//     const user = new User(req.body)

//     try{
//         await user.save()
//         const token = user.generateAuthToken()
//         res.status(201).send({user,token})
//     }catch(e){
//         res.status(400).send(e)
//     }
// })
// Router.post('/user/login', async(req,res)=>{
//     try{
//         const user = await User.findByCredentials(req.body.username, req.body.password)
//         const token = await user.generateAuthToken()
//         res.send({user, token})
//     }catch(e){
//         res.status(400).send(e)
//     }
// })
// Router.post('/user/logout', auth, async (req,res)=>{
//     try{
//         req.user.token = req.user.token.filter((token)=>{
//             return token.token !== req.token
//         })
//         await req.user.save()
//         res.send()
//     }catch(e){
//         res.status(500).send(e)
//     }
// })
// module.exports = Router;
