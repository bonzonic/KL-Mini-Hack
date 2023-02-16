const FormSignUpUserDetails = (props: any) => {
  return (
    <div className="user-details">
        <h2>Sign Up User Details</h2>
        <form action="#">
            <label htmlFor="idField">ID</label>
            <input type="text" onChange={(e) => props.handleChange(e, 'id')} value={props.state.id}/>
        </form>
        <button onClick={props.nextStep}>Continue</button>
    </div>
  )
}

export default FormSignUpUserDetails