export default function FormSignUpConfirm(props: any) {
  return (
    <div className="confirm">
        <h2>Confirm The Details</h2>
        <p>ID: {props.state.id}</p>
        <button onClick={props.prevStep}>Back</button>
        <button>Sign Up</button>
    </div>
  )
}
