import successLogo from "../assets/success-filled-svgrepo-com.svg"
import failureLogo from "../assets/alarm-filled-svgrepo-com.svg"

interface WalletProps {
    address?: string,
    handleAddUserAddress: () => void
}

const Wallet = (props: WalletProps) => {

    return (
        <div className="crypto-wallet mt-3 flex items-center flex-col">
            <div className="mt-6 mb-2">
                {props.address ? <img src={successLogo} alt="success" className="w-20 h-20 mx-auto"/> : <img src={failureLogo} alt="failure" className="w-20 h-20 mx-auto"/> }
            </div>

            {props.address ? 
                <button className="bg-slate-50 rounded-xl px-2 py-1 shadow w-full mt-3 transition duration-500 hover:scale-110" 
                    onClick={props.handleAddUserAddress}>Edit Crypto Wallet
                </button> :
                <button className="bg-slate-50 rounded-xl px-2 py-1 shadow w-full mt-3 transition duration-500 hover:scale-110" 
                    onClick={props.handleAddUserAddress}>Add Crypto Wallet
                </button>
            }

        </div>
    )
}

export default Wallet