const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Ensimmäinen blogi',
    author: 'Testaaja 1',
    url: 'http://example.com/1',
    likes: 5,
  },
  {
    title: 'Toinen blogi',
    author: 'Testaaja 2',
    url: 'http://example.com/2',
    likes: 10,
  },
]

// palauttaa kaikki blogit tietokannasta
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

// palauttaa id:n, jota ei enää ole tietokannassa
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Poistettava blogi',
    author: 'Testaaja x',
    url: 'http://example.com/poistettava',
    likes: 0,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
}