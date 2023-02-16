import { useState } from "react"
import Ballot from "../components/Ballot"
import BallotConfirm from "../components/BallotConfirm"
import BallotSent from "../components/BallotSent"

export interface Vote {
    [id: number]: string
}

export interface QuestionAndCandidates {
    id: number,
    question: string,
    candidates: string[]
}

export interface Election {
    name: string,
    instructin?: string,
    date_begin?: Date,
    date_end?: Date,
    questionsAndCandidates: QuestionAndCandidates[]
}

const election = "Presidential Election 2023"
const instruction = "Please view the questions and choices and make your selections."

const questionsAndCandidates = [
    {
        id: 0,
        question: "Please select a candidate for President",
        candidates: ["Obama", "Trump", "Biden"]
    },
    {
        id: 1,
        question: "Please select a candidate for Treasurer",
        candidates: ["Bill", "Clinton"]
    },
    {
        id: 2,
        question: "Please select a candidate for Mayor",
        candidates: ["Peter", "Michael Jackson"]
    }
]

const VOTE_STEP = 1
const CONFIRM_VOTE_STEP = 2
const VOTE_HAS_BEEN_SENT_STEP = 3


const Home = () => {
    const [ballot, setBallot] = useState<Vote>({})
    const [step, setStep] = useState<number>(1)

    const url = "api/vote" // Change to appropriate API url

    const handleSelection = (id: number, selection: string) => {
        console.log("handleSelection() id:", id, ", selection:", selection)
        const newBallot = ballot
        newBallot[id] = selection
        setBallot(newBallot)
    }

    const handleSubmit = async () => {
        console.log("ballot", ballot)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ballot),
        })

        if (!response.ok) {
            throw new Error("Net work response was not ok")
        }

        const result = response.json()

        console.log("Success: ", result)

        nextStep()
    }

    const nextStep = () => {
        setStep(prevStep => Math.min(VOTE_HAS_BEEN_SENT_STEP, prevStep + 1))
    }

    const prevStep = () => {
        setStep(prevStep => Math.max(VOTE_STEP, prevStep - 1))
    }

    switch(step) {
        case CONFIRM_VOTE_STEP:
            return (
                <div className="container mx-auto">
                    <BallotConfirm ballot={ballot} questionsAndCandidates={questionsAndCandidates} prevStep={prevStep} handleSubmit={handleSubmit}/>
                </div>
            )
        
        case VOTE_HAS_BEEN_SENT_STEP:
            return (
                <div className="container mx-auto">
                    <BallotSent />
                </div>
            )

        default: // `VOTE_STEP` is the default step
            return (
                <div className="container mx-auto">
                    <Ballot electionName={election} 
                        instruction={instruction} 
                        questionsAndCandidates={questionsAndCandidates} 
                        ballot={ballot}
                        handleSelection={handleSelection}
                        nextStep={nextStep}
                    />
                </div>
            )
            
    }
}

export default Home