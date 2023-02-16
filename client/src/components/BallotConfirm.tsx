import { Vote } from "../pages/Home"
import { QuestionAndCandidates } from "../pages/Home"

interface BallotConfirmProps {
    ballot: Vote,
    questionsAndCandidates: QuestionAndCandidates[],
    prevStep: () => void,
    handleSubmit: () => void,
}

const BallotConfirm = (props: BallotConfirmProps) => {
    return (
        <div className="mx-3 my-6">
            <h1 className="text-3xl mb-2">Ballot Confirm</h1>
            <p className="text-red-600">Carefully review your selections. You will not be able to amend your selections once you submit your ballot.</p>
            {
                props.questionsAndCandidates.map((questionAndCandidates: QuestionAndCandidates, key: number) => {
                    return (
                        <div key={key} className={`bg-gray-200 rounded-xl p-2 my-3`}>
                            <h2 className="text-lg">{questionAndCandidates.question}</h2>
                            <p className="text-base"><span className="font-bold">YOU CHOSE:</span> {props.ballot[questionAndCandidates.id]}</p>
                        </div>
                    )
                })
            }
            <div className="flex justify-between">
                <button onClick={props.prevStep} className="border-2 border-black rounded bg-gray-200 px-2 py-1">Back</button>
                <button onClick={props.handleSubmit} className="border-2 border-black rounded bg-gray-200 px-2 py-1">Submit</button>
            </div>
            
        </div>
        
    )
}

export default BallotConfirm