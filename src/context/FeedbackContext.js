import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    feedback: {},
    edit: false
  })


  useEffect(() => {
    fetchFeedbacks()
  }, [])


  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/feedbacks?_sort=id&_order=desc`)
      const data = await response.json()

      setFeedbacks(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error, 'tu smo')
    }

  }

  // Delete Feedback

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you  sure you want to delete?')) {
      const response = await fetch(`http://localhost:5000/feedbacks/${id}`, {
        method: 'DELETE'
      })

      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id))
    }
  }

  // Add Feedback

  const addFeedback = async (newFeedback) => {
    const response = await fetch(`http://localhost:5000/feedbacks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFeedback)
      })

    const data = await response.json()
    // newFeedback.id = uuidv4()
    setFeedbacks([data, ...feedbacks])
  }

  // Set feedback to be updated

  const editFeedback = (feedback) => {
    setFeedbackEdit({
      feedback,
      edit: true
    })
  }

  // Update feedback

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`http://localhost:5000/feedbacks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()

    setFeedbacks(feedbacks.map((item) => (item.id === id ? { ...item, ...data } : item)))
    setFeedbackEdit({ feedbacks: {}, edit: false })
  }

  return <FeedbackContext.Provider value={{
    feedbacks,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}


export default FeedbackContext
