const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        otsikko
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        kirjoittaja
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">tallenna blogi</button>
    </form>
  )
}

export default BlogForm