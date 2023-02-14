interface SelectionProps {
    title: string,
    candidates: string[]
    key?: any
}

const Selection = (props: SelectionProps) => {
    console.log("in selection")
    return (
        <div className="rounded-lg bg-gray-200 p-3 my-3">
            <h2>{props.title}</h2>
            <form action="">
                {
                    props.candidates.map((candidate: string, key: number) => (
                        <div key={key}>
                            <input type="radio" id={candidate} name={props.title} value={candidate} className="mr-2"/>
                            <label htmlFor={candidate}>{candidate}</label>
                        </div>
                    ))
                }
            </form>
        </div>
    )
}

export default Selection