import { useState, useContext, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import FeedbackContext from '../context/FeedbackContext'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm () {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.feedback.text)
      setRating(feedbackEdit.feedback.rating)
    }

  }, [feedbackEdit])

  const handleTextChange = (e) => {
    const input = e.target.value

    if (!input) {
      setBtnDisabled(true)
      setMessage(null)
    } else if (input !== '' && input.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Your message is below 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }


    setText(input)

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      if(feedbackEdit.edit) {
        updateFeedback(feedbackEdit.feedback.id,newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setRating(0)
      setText('')
    }


  }

  let formHeader

  if(feedbackEdit.edit) {
    formHeader = <div className='form-header'>
      <h2>Edit your feedback</h2>
      <button onClick={()=>{  }}><FaTimes color="#ff6a95" size="24"/></button>
    </div>
  } else {
    formHeader = <div className='form-header'>
      <h2>How would you rate your service with us?</h2>
    </div>
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className={feedbackEdit.edit ? 'editing' : ''}>
        {formHeader}
        <RatingSelect select={(rating) => {setRating(rating)}}/>
        <div className="input-group">
          <input type="text"
                 onChange={handleTextChange}
                 value={text}
                 placeholder="Write a review"/>
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm;
