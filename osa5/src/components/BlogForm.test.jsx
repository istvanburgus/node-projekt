import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm-komponentti', () => {
  test('kutsuu createBlogia oikeilla tiedoilla kun lomake lähetetään', async () => {
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText(/otsikko/i)
    const authorInput = screen.getByLabelText(/kirjoittaja/i)
    const urlInput = screen.getByLabelText(/^url$/i)
    const submitButton = screen.getByText(/tallenna blogi/i)

    await user.type(titleInput, 'Testiblogi')
    await user.type(authorInput, 'Testaaja')
    await user.type(urlInput, 'http://example.com/testi')

    await user.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)

    const calledWith = createBlog.mock.calls[0][0]
    expect(calledWith.title).toBe('Testiblogi')
    expect(calledWith.author).toBe('Testaaja')
    expect(calledWith.url).toBe('http://example.com/testi')
  })
})