import { useState } from "react"
import FormSignUpUserDetails from "../components/FormSignUpUserDetails"
import FormSignUpConfirm from "../components/FormSignUpConfirm"

export default function SignUp() {
    const [state, setState] = useState({
        step: 1,
        id: '',
    })

    const nextStep = () => {
        const { step, id } = state
        setState({
            step: step + 1,
            id: id,
        });
    }

    const prevStep = () => {
        const { step, id } = state
        setState({
            step: step - 1,
            id: id,
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { step } = state
        setState({
            step: step,
            id: e.target.value
        })
        console.log(e.target.value, fieldName);
    }

    switch(state.step) {
        case 2:
            return <FormSignUpConfirm prevStep={prevStep} handleChange={handleChange} state={state}/>

        default:
            return <FormSignUpUserDetails nextStep={nextStep} handleChange={handleChange} state={state}/>
    }
}
