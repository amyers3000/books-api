const express = require('express')
const router = express.Router()

const Books = require('../models/books')

router.get('/seed', (req, res) => {
    Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})



router.get('/', async(req,res) => {
    try {
        const books = await Books.find()
        res.json(books)

    } catch (error) {
        res.status(500).json({'message': String(error)})
    }
})

router.get('/:id', async(req,res) => {
    try {
        const{ id }= req.params
        const book = await Books.findById(id)
        res.json(book)

    } catch (error) {
        res.status(500).json({'message': String(error)})
    }
})

router.post('/', async(req,res) => {
    try {
        const { title, description, year, quantity, imageURL } = req.body
    const createdBook = await new Books({
        title,
        description,
        year,
        quantity,
        imageURL
    }).save()
    res.json({'message': 'user created'})
    console.log('done')
    } catch (error) {
        res.status(400).json({'message': String(error)})
    }
})

router.put('/:id', async(req,res) => {
    try {
    const { id } = req.params
    const book = await Books.findByIdAndUpdate(id, req.body)
    res.json({'message': 'user updated'})
    } catch (error) {
        res.status(500).json({'message': String(error)})
    }
})

router.delete('/:id', async(req,res) => {
    try {
        const{ id } = req.params
        const book = await Books.findOneAndDelete({ _id: id })
        res.json(book)
    } catch (error) {
        res.status(500).json({'message': String(error)})
    }
})

module.exports = router
