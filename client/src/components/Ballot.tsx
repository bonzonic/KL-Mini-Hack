import { Vote } from "../pages/Home"
import { QuestionAndCandidates } from "../pages/Home"
import Selection from "./Selection"
import { Election } from "../pages/Home"
import Sweetalert2 from 'sweetalert2';
import { useSelector } from "react-redux";

interface BallotProps {
    election: Election,
    ballot: Vote,
    nextStep: () => void
    handleSelection: (id: number, selection: string) => void
}

const Ballot = (props: BallotProps) => {
    const loggedIn = useSelector((state: RootState) => (state.authentication! as AuthenticationState).loggedIn);

    const handleClick = () => {

        if (!loggedIn) {
            Sweetalert2.fire({
                icon: 'error',
                iconColor: 'teal',
                title: 'To login...',
                text: 'You are not logged in!',
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login'; // replace '/login' with the actual URL of your login page
                  }
              })
          }
        else {

            const response = fetch('http://localhost:8080/user', {
                method: 'POST',
                body: JSON.stringify({ email: localStorage.getItem("email") }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                let resJson = response.json();
                return resJson;
            }).then(json => {
                if ("history" in json) {
                    if (props.election.name in json["history"]) {
                        Sweetalert2.fire({
                            icon: 'error',
                            iconColor: 'teal',
                            title: 'Unable to vote...',
                            text: 'You have already voted!',
                          })
                    }
                    else {
                        props.nextStep()
                    }
                }
                else {
                    props.nextStep()
                }
            })
        }
    }

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
            <button onClick={handleClick} className="border-2 border-black rounded bg-gray-200 px-2 py-1 transition duration-500 hover:scale-90">Continue</button>
        </div>
    )
}

export default Ballot