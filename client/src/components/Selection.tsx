import { useEffect, useState } from "react";

interface SelectionProps {
    id: number,
    question: string,
    candidates: string[]
    key?: any
    checkedCandidate?: string,
    handleSelection: (id: number, selection: string) => void
}

const Selection = (props: SelectionProps) => {
    // Usestate for candidates
    const [candidates, setCandidate] = useState([]);


    const handleClick = (e:React.MouseEvent) => {
        const input = e.currentTarget.querySelector("input") as HTMLInputElement
        // Prevent's double clicking of the radio input
        if (e.target !== input) {
            input.click()
        }
    }

    useEffect(() => {
        const handleCandidate = fetch('http://localhost:8080/zk/getCandidates', {
          method: "GET",
        }).then(response => {
          return response.json()
        }).then(data => {
          console.log(data)
          setCandidate(prevCandidates => {
            const newCandidates = data.filter(newCandidate => {
              return !prevCandidates.some(existingCandidate => newCandidate[0] === existingCandidate[0])
            })
            return [...prevCandidates, ...newCandidates]
          })
        })    
      },[])

    return (
        <div className="rounded-xl bg-slate-50 p-3 my-4 shadow">
            <h2 className="text-black">{props.question}</h2>
            {
            candidates.map(([candidate, key]) => {
                return (
                <div key={key} className="relative transition duration-500 hover:scale-95" onClick={(e) => handleClick(e)}>
                    <input type="radio"
                    id={candidate}
                    name={props.question}
                    value={candidate}
                    defaultChecked={candidate === props.checkedCandidate}
                    onClick={() => props.handleSelection(props.id, candidate)}
                    className="ml-2 absolute top-1/2 -translate-y-1/2 w-4 h-4" />
                    <label className="border-2 flex bg-gray-200 rounded-xl p-2 pl-7 my-3 box-border" htmlFor={candidate} onClick={(e) => { e.stopPropagation() }}>
                    <div>
                        {candidate}
                    </div>
                    </label>
                </div>
                );
            })
            }
        </div>
    )
}

export default Selection