const db = require('./db')

const articleSchema = new db.Schema({
  title: String,
	date: Date,
	articleContent: String,
	state: String,
	label: String,
})

const tagSchema = new db.Schema({
  tagName: String,
  tagNumber: Number,
})

const Models = {
  Article: db.model('Article', articleSchema),
  Tag: db.model('TagList', tagSchema)
}

module.exports = Models