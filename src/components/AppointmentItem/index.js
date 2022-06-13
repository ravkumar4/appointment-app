// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleMarkButton} = props
  const {id, title, date, isStarred} = appointmentDetails

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickMarkButton = () => {
    toggleMarkButton(id)
  }

  const starImageClassName = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="title-star-container">
        <h1 className="appointment-title">{title} </h1>
        <button
          type="button"
          className="mark-starred-button"
          testid="star"
          onClick={onClickMarkButton}
        >
          <img src={starImageClassName} alt="star" className="starred-image" />
        </button>
      </div>
      <p className="display-date">Date: {formattedDate}</p>
    </li>
  )
}
export default AppointmentItem
