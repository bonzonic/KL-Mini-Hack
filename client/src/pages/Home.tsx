import Ballot from "../components/Ballot"

const election = "Presidential Election"
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

const Home = () => {
    return (
        <div className="container mx-auto">
            <Ballot electionName={election} instruction={instruction} questionsAndCandidates={questionsAndCandidates}/>
        </div>
    )
}

export default Home