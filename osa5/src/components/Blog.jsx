import { useState } from 'react'

const Blog = ({ blog, onLike, onDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const canRemove =
    blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {visible ? 'piilota' : 'näytä'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            tykkäyksiä {blog.likes || 0}{' '}
            <button onClick={() => onLike(blog)}>tykkää</button>
          </div>
          {blog.user && (
            <div>
              {blog.user.name} ({blog.user.username})
            </div>
          )}
          {canRemove && (
            <div>
              <button onClick={() => onDelete(blog)}>poista</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog