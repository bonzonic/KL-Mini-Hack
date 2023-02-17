import { Vote } from "../pages/Home"
import { QuestionAndCandidates } from "../pages/Home"
import Selection from "./Selection"
import { Election } from "../pages/Home"

interface BallotProps {
    election: Election,
    ballot: Vote,
    nextStep: () => void
    handleSelection: (id: number, selection: string) => void
}

const Ballot = (props: BallotProps) => {
    return (
        <div className="mx-3 my-6">
            <h1 className="text-3xl mb-2">{props.election.name}</h1>
            <p><span className="font-bold text-primary">Instruction: </span>{props.election.instruction}</p>
            {
                props.election.questionsAndCandidates ? props.election.questionsAndCandidates.map((questionAndCandidates: QuestionAndCandidates, key: number) => {
                    const checkedCandidate = props.ballot[questionAndCandidates.id]
                    return <Selection 
                                id={questionAndCandidates.id} 
                                question={questionAndCandidates.question} 
                                candidates={questionAndCandidates.candidates}
                                checkedCandidate={checkedCandidate}
                                handleSelection={props.handleSelection} key={key} 
                            />
                }) : <p>Titles and Candidates information are missing</p>
            }
            <button onClick={props.nextStep} className="border-2 border-black rounded bg-gray-200 px-2 py-1">Continue</button>
        </div>
    )
}

export default Ballot