import Ballot from "../components/Ballot"

const election = "Presidential Election"
const instruction = "Please view the questions and choices and make your selections."
const titles = ["Please select a candidate for President", "Please select a candidate for Treasurer", "Please select a candidate for Mayor"]
const candidates = [["Obama", "Trump", "Biden"], ["Bill", "Clinton"], ["Peter", "Michael Jackson"]]

const titlesAndCandidates = [
    {
        title: "Please select a candidate for President",
        candidates: ["Obama", "Trump", "Biden"]
    },
    {
        title: "Please select a candidate for Treasurer",
        candidates: ["Bill", "Clinton"]
    },
    {
        title: "Please select a candidate for Mayor",
        candidates: ["Peter", "Michael Jackson"]
    }
]

const Home = () => {
    return (
        <div className="container mx-auto">
            <Ballot electionName={election} instruction={instruction} titlesAndCandidates={titlesAndCandidates}/>
        </div>
    )
}

export default Home