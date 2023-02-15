interface FormInputProps {
    label: string,
    propclass: string,
    placeholder: string,
}

const FormInput = (props: FormInputProps) => {
    return (
        <div className="form-input">
            <label className={props.propclass}>{props.label}</label>
            <input type="text" placeholder={props.placeholder}></input>
        </div>
    )
}

export default FormInput