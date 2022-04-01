import { motion, AnimatePresence } from 'framer-motion'
import { useContext} from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList () {
  const { feedbacks, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedbacks || feedbacks.length < 1)) {
    return <p>No feedbacks</p>
  }

  return isLoading ? <Spinner/> : (
    <div className="feedback-list">
      <AnimatePresence>
        {
          feedbacks.map((feedback) => {
            return <motion.div key={feedback.id}
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}>
              <FeedbackItem item={feedback}/>
            </motion.div>
          })
        }
      </AnimatePresence>
    </div>
  )

  // return (
  //   <div className="feedback-list">
  //     {
  //       feedbacks.map((feedback) => {
  //         return <FeedbackItem key={feedback.id}
  //                              item={feedback}
  //                              handleDelete={handleDelete}/>
  //       })
  //     }
  //   </div>
  // );
}

export default FeedbackList;
