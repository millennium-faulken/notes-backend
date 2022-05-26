const express = require('express');
const router = express.Router();
const Note = require('./noteSchema');

router.get('/', (req, res) => {
  Note
		.find()
		.then(notes => {
			res.status(202).json(notes);
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({msg: "Please try again"});
		});
})

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const _id = {id}
	console.log(_id)
	// console.log(req.body.id)
	Note
		.findOne({"_id" : id})
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({msg: "Please try again"});
		});
})

router.post('/', (req, res) => {
	const note = new Note(req.body);
	console.log(note.id)
	console.log(req.body)
	console.log(req.params.id)
  note
		.save()
		.then(newNote => {
			res.status(201).json(newNote);
		})
		.catch(err => {
			res.status(500).json({msg: "Please try again"});
		});
})

router.delete('/:id', (req, res) => {
	const  id  = req.params;
	Note
		.findByIdAndRemove(id)
		.then(removedNote => {
			res.status(200).json(removedNote);
		})
		.catch(err => {
			res.status(500).json({msg: "Please try again"});
		});
})

router.put('/:id', (req, res) => {
	const  id  = req.params;
	Note
		.findByIdAndUpdate(id, req.body)
		.then(updatedNote => {
			res.status(200).json(updatedNote);
		})
		.catch(err => {
			res.status(500).json({msg: "Please try again"});
		});
})

module.exports = router;