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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}