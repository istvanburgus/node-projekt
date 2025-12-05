import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
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
        </div>
      )}
    </div>
  )
}

export default Blog