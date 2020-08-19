import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleOptionSelected } from '../actions/shared'

import Avatar from './Avatar'
import OptionBox from './OptionBox'

class Qpage extends Component {
    componentDidMount() {
        document.querySelectorAll('.option-stats')
        .forEach(stat => {
            stat.setAttribute('style', 'display: none')
        })

        //check if user has already answered question
        this.checkUserAnswers()
    }

    //if updated by option selection show which the user chose
    componentDidUpdate() {
        this.checkUserAnswers()
    }

    //compare users answers against displayed question id, if a match show which option the user selected
    checkUserAnswers = () => {
        const { userAnswers, question_id } = this.props
        //grab keys from answers object so it can be iterable and check if it's been answered by user
        Object.keys(userAnswers).forEach(answer => {
            if(answer === question_id) {
                this.displayAnsweredInfo(userAnswers[question_id])
                //disable click events on option boxes
                document.querySelectorAll('.option-box').forEach(box => {
                    box.classList.add('no-click')
                })
            }
        })
    }

    //if question has been answered bu authedUser then show which option selected and stats
    displayAnsweredInfo = (optionSelected) => {
        document.querySelector(`#${optionSelected}`).classList.add('selected-option')
        document.querySelectorAll('.option-stats')
        .forEach(stat => {
            stat.removeAttribute('style')
        })
    }

    handleOptionClick = (evt) => {
        evt.preventDefault()
        const { qToShow, authedUser, dispatch } = this.props

        dispatch(handleOptionSelected({
            authedUser,
            qId: qToShow.id,
            answer: evt.target.id
        }))
    }

    render() {
        const { qToShow, votesTotal } = this.props
        
        return(
            <div className='qpage-container'>
                <Avatar id={qToShow.author} />
                <h2>Would you rather</h2>
                <OptionBox
                    click={this.handleOptionClick}
                    id='optionOne'
                    info={qToShow.optionOne}
                    votesNum={votesTotal} />
                <OptionBox
                    click={this.handleOptionClick}
                    id='optionTwo'
                    info={qToShow.optionTwo}
                    votesNum={votesTotal} />
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
    //grab param from url / router that passes the question id ':question_id'
    const { question_id } = props.match.params

    return {
        question_id,
        authedUser,
        userAnswers: users[authedUser].answers,
        qToShow: questions[question_id],
        votesTotal: questions[question_id].optionOne.votes.length + questions[question_id].optionTwo.votes.length
    }
}

export default connect(mapStateToProps)(Qpage)