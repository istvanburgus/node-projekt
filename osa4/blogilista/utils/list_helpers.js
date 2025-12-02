// 4.3 dummy-funktio – palauttaa aina arvon 1
const dummy = (blogs) => {
  return 1
}

// 4.4 totalLikes – laskee blogien yhteenlasketut tykkäykset
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + (blog.likes || 0)
  }, 0)
}

// 4.5 favouriteBlog – palauttaa eniten tykkäyksiä saaneen blogin
const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favourite = blogs[0]

  blogs.forEach((blog) => {
    if (blog.likes > favourite.likes) {
      favourite = blog
    }
  })

  // Jos usealla blogilla on sama määrä tykkäyksiä,
  // palautetaan listassa ensimmäisenä oleva suosikki
  return favourite
}

// 4.6 mostBlogs – palauttaa kirjoittajan, jolla eniten blogeja
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const countsByAuthor = {}

  blogs.forEach((blog) => {
    const author = blog.author
    if (!countsByAuthor[author]) {
      countsByAuthor[author] = 0
    }
    countsByAuthor[author] += 1
  })

  let topAuthor = null
  let maxBlogs = 0

  Object.keys(countsByAuthor).forEach((author) => {
    if (countsByAuthor[author] > maxBlogs) {
      maxBlogs = countsByAuthor[author]
      topAuthor = author
    }
  })

  return {
    author: topAuthor,
    blogs: maxBlogs,
  }
}

// 4.7 mostLikes – palauttaa kirjoittajan, jonka blogeilla eniten tykkäyksiä yhteensä
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = {}

  blogs.forEach((blog) => {
    const author = blog.author
    if (!likesByAuthor[author]) {
      likesByAuthor[author] = 0
    }
    likesByAuthor[author] += blog.likes || 0
  })

  let topAuthor = null
  let maxLikes = 0

  Object.keys(likesByAuthor).forEach((author) => {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author]
      topAuthor = author
    }
  })

  return {
    author: topAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}