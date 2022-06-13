// Write your code here

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    isFiltered: false,
    appointmentList: [],
  }

  toggleMarkButton = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onFilter = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitAppointmentForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFiltered} = this.state

    if (isFiltered) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, isFiltered} = this.state
    const starButtonClassName = isFiltered
      ? 'filtered'
      : 'starred-appointment-button'
    const filters = this.getFilteredAppointmentsList()
    console.log(filters)
    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="add-appointment-container">
            <div>
              <h1 className="add-appointment-heading"> Add Appointment </h1>
              <form
                className="appointment-form"
                onSubmit={this.onSubmitAppointmentForm}
              >
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  className="title-input"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="appointmentDate" className="label">
                  DATE
                </label>
                <input
                  id="appointmentDate"
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointmentImage"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointment-display-container">
            <h1 className="appointment-heading">Appointments </h1>
            <button
              type="button"
              className={starButtonClassName}
              testid="button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {filters.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleMarkButton={this.toggleMarkButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
