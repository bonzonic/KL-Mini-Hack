import Selection from "./Selection"

interface titleAndCorrespondingCandidates {
    title: string,
    candidates: string[]
}

interface BallotProps {
    electionName: string,
    instruction?: string,
    titlesAndCandidates: Array<{title: string, candidates: string[]}>
}


const Ballot = (props:BallotProps) => {
    return (
        <div className="mx-3 my-6">
            <h1 className="text-xl">{props.electionName}</h1>
            <p>{props.instruction}</p>
            {
                props.titlesAndCandidates ? props.titlesAndCandidates.map((question:{title: string, candidates: string[]}, key: number) => (
                    <Selection title={question.title} candidates={question.candidates} key={key} />
                )) : <p>Titles and Candidates information are missing</p>
            }

            <button className="border-2 border-black rounded bg-gray-200 px-2 py-1">Submit</button>
        </div>
    )
}

export default Ballot