import { useState } from "react"
import Selection from "./Selection"

interface QuestionAndCandidates {
    id: number,
    question: string,
    candidates: string[]
}

interface Vote {
    [id: number]: string
}

interface BallotProps {
    electionName: string,
    instruction?: string,
    questionsAndCandidates: Array<QuestionAndCandidates>
}

const Ballot = (props: BallotProps) => {
    const [ballot, setBallot] = useState<Vote>({});
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
    }

    return (
        <div className="mx-3 my-6">
            <h1 className="text-3xl mb-2">{props.electionName}</h1>
            <p><span className="font-bold text-primary">Instruction: </span>{props.instruction}</p>
            {
                props.questionsAndCandidates ? props.questionsAndCandidates.map((questionAndCandidates: QuestionAndCandidates, key: number) => {
                    return <Selection id={questionAndCandidates.id} question={questionAndCandidates.question} candidates={questionAndCandidates.candidates} handleSelection={handleSelection} key={key} />
                }) : <p>Titles and Candidates information are missing</p>
            }
            <button onClick={handleSubmit} className="border-2 border-black rounded bg-gray-200 px-2 py-1">Submit</button>
        </div>
    )
}

export default Ballot