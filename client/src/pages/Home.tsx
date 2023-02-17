import { useState } from "react";
import Ballot from "../components/Ballot";
import BallotConfirm from "../components/BallotConfirm";
import BallotSent from "../components/BallotSent";
import { useOutletContext } from "react-router-dom";

export interface Vote {
  [id: number]: string;
}

export interface QuestionAndCandidates {
  id: number;
  question: string;
  candidates: string[];
}

export interface Election {
  name: string;
  instruction?: string;
  date_begin?: Date;
  date_end?: Date;
  questionsAndCandidates: QuestionAndCandidates[];
}

const questionsAndCandidates = [
  {
    id: 0,
    question: "Please select a candidate for President",
    candidates: ["Obama", "Trump", "Biden"],
  },
  {
    id: 1,
    question: "Please select a candidate for Treasurer",
    candidates: ["Bill", "Clinton"],
  },
  {
    id: 2,
    question: "Please select a candidate for Mayor",
    candidates: ["Peter", "Michael Jackson"],
  },
];

const election: Election = {
  name: "Presidential Election 2023",
  instruction:
    "Please view the questions and choices and make your selections.",
  questionsAndCandidates: questionsAndCandidates,
};

const VOTE_STEP = 1;
const CONFIRM_VOTE_STEP = 2;
const VOTE_HAS_BEEN_SENT_STEP = 3;

const Home = () => {
  const [ballot, setBallot] = useState<Vote>({});
  const [step, setStep] = useState<number>(1);
  const [userCanVote, setUserCanVote] = useState(true);
  const [coins, setCoins] = useOutletContext();

  const handleSelection = (id: number, selection: string) => {
    console.log("handleSelection() id:", id, ", selection:", selection);
    const newBallot = ballot;
    newBallot[id] = selection;
    setBallot(newBallot);
  };

  const handleSubmit = async () => {
    console.log("ballot", ballot);

    const url = "http://localhost:8080/user/vote";

    const userAndBallot = {
      email: localStorage.getItem("email"),
      electionName: election.name,
      ballot: ballot,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAndBallot),
    });

    if (!response.ok) {
      throw new Error("Net work response was not ok");
    }

    console.log("Success: ", response);
    const email = localStorage.getItem("email") || "";
    if (email !== undefined && email !== "") {
      await fetch(`http://localhost:8080/user/wallet?email=${email}`, {
        method: "GET",
      })
        .then((response) => {
          let resJson = response.json();
          return resJson;
        })
        .then(async (json) => {
          const wallet = Object(json)["address"];
          if (wallet !== undefined && wallet !== "") {
            await fetch(`http://localhost:8080/user/send-coin`, {
              method: "POST",
              body: JSON.stringify({ walletAddress: wallet }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((resp) => {
                let resJson = resp.json();
                return resJson;
              })
              .then((json) => {
                setCoins(Object(json)["coins"]);
                console.log('yipee coins!')
              });
          }
        });
    }
    nextStep();
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  // REMOVE THIS IF YOU WANT
  const canUserVote = async (electionName: string) => {
    /* User can vote if they have not */
    const url = "http://localhost:8080/user";

    const userEmail = localStorage.email as string;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });

    if (!response.ok) {
      throw new Error("Net work response was not ok");
    }

    const result = await response.json();

    console.log(result);

    try {
      if (electionName in (await result.history)) {
        setUserCanVote(false);
      } else {
        setUserCanVote(true);
      }
    } catch (err) {
      console.log(err);
      setUserCanVote(true);
    }
  };
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const nextStep = () => {
    setStep((prevStep) => Math.min(VOTE_HAS_BEEN_SENT_STEP, prevStep + 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(VOTE_STEP, prevStep - 1));
  };

  //canUserVote(election.name)

  if (userCanVote) {
    switch (step) {
      case CONFIRM_VOTE_STEP:
        return (
          <div className="container mx-auto">
            <BallotConfirm
              ballot={ballot}
              election={election}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </div>
        );

      default: // `VOTE_STEP` is the default step
        return (
          <div className="container mx-auto">
            <Ballot
              election={election}
              ballot={ballot}
              handleSelection={handleSelection}
              nextStep={nextStep}
            />
          </div>
        );
    }
  } else if (step === VOTE_HAS_BEEN_SENT_STEP) {
    return (
      <div className="container mx-auto">
        <BallotSent />
      </div>
    );
  } else {
    return (
      <div className="container mx-auto">
        <h1>You may not vote twice.</h1>
      </div>
    );
  }
};

export default Home;
