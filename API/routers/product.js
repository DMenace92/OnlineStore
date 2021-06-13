const express = require('express');
const Item = require('../modules/product');
const auth = require('../middleWare/auth');
const Router = new express.Router();
// Router.post('/create/product', async, (res))
Router.post('/create/product', async (req, res) => {
    const item = new Item({
        ...req.body,
    })
    try {
        await item.save()
        res.status(200).send(item)
    } catch (e) {
        res.send(e)
    }
})
// get multiple
Router.get('/product', async (req, res) => {
    try {
        const item = await Item.find()
        res.status(200).send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})
//get single 
Router.get('/product/:id', async (req, res) => {

    try {
        const item = await Item.findById(req.params.id)
        res.status(200).send(item)
    } catch (e) {
        req.status(400).send(e)
    }
})

Router.patch('/product/:id', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "inputs cannot be empty"
        });
    }
    Item.findByIdAndUpdate(req.params.id, {
        item_name: req.body.item_name,
        item_discription: req.body.item_discription,
        item_inventory: req.body.item_inventory,
        item_sale: req.body.item_sale,
        item_price: req.body.itemProce,
        item_extra_discription: req.body.item_extra_discription

    }, {
        new: true
    })
        .then(item => {
            if (!item) {
                return res.status(400).send({
                    message: "Item not found with id " + req.params
                })
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(400).send({
                    message: "Note not found with id " + req.params
                });
            }
            return res.status(500).send({
                message: "Error updating with id " + req.params.id
            })

            // if (!req.body.item)
            // const updateItem = Object.keys(req.body)
            // const allowedUpdates = ["item_name", "item_discription", "item_invintory", "item_sale", "item_price", "item_extra_discription"]
            // const isValidOperation = updateItem.every((update) => allowedUpdates.inclueds(update))
            // if (!isValidOperation) {
            //     return res.status(400).send({ error: 'invalid update' })
            // }
            // try {
            //     updateItem.forEach((update) => req.item[update] = req.body[update])
            //     await req.item.save()
            //     res.send(item)
            // } catch (e) {
            //     res.status(400).send(e)
            // }
        })
    // Router.delete('/product/:id', auth, async (req, res) => {

})
module.exports = Router;