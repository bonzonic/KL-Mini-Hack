interface SelectionProps {
    id: number,
    question: string,
    candidates: string[]
    key?: any
    handleSelection: (id: number, selection: string) => void
}

const Selection = (props: SelectionProps) => {
    const handleClick = (e:React.MouseEvent) => {
        const input = e.currentTarget.querySelector("input") as HTMLInputElement
        // Prevent's double clicking of the radio input
        if (e.target !== input) {
            input.click()
        }
    }

    return (
        <div className="rounded-lg bg-gray-100 p-3 my-3">
            <h2>{props.question}</h2>
            {
                props.candidates.map((candidate: string, key: number) => {
                    return (
                        <div key={key} className={`bg-gray-200 rounded-xl p-2 my-3`} onClick={(e) => handleClick(e)}>
                            <input type="radio" id={candidate} name={props.question} value={candidate} onClick={() => props.handleSelection(props.id, candidate)} className="mr-2"/>
                            <label htmlFor={candidate} onClick={(e) => {e.stopPropagation()}}>{candidate}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Selection