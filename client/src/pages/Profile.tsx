import { useEffect, useState } from 'react'
import ScrollReveal from 'scrollreveal';
import profilePic from '../assets/person-fill.svg'
import wallet from '../assets/wallet2.svg'
import coin from '../assets/coin.svg'
import priceTag from '../assets/tag.svg'
import './Profile.css'
import { useSelector } from 'react-redux';
import Sweetalert2 from 'sweetalert2';

const Profile = (props: any) => {
    const [Username, setUsername] = useState('');

    useEffect(() => {
        const sr = ScrollReveal();
        sr.reveal('.profile-info', {
          duration: 500,
          distance: '40px',
          easing: 'ease-out',
          origin: 'bottom',
          reset: true,
          viewFactor: 1,
          delay: 0,
        });

        sr.reveal('.crypto-wallet', {
          duration: 250,
          distance: '40px',
          easing: 'ease-out',
          origin: 'right',
          reset: true,
          viewFactor: 1,
          delay: 250,
        });

        sr.reveal('.crypto-wallet-storage', {
            duration: 250,
            distance: '40px',
            easing: 'ease-out',
            origin: 'right',
            reset: true,
            viewFactor: 1,  
            delay: 350,
          });
      }, []);

      const loggedIn = useSelector((state: boolean) => (state.authentication! as AuthenticationState).loggedIn);

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

    //send the form data to the server using fetch
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
        sessionStorage.setItem("userdata", Object(json)["username"])
        // console.log("FIRST")
        // console.log(json)
        // console.log(Object(json)["username"])
        // console.log(Object.keys(json));
        setUsername(Object(json)["username"])
    });

    return (
        <div className="wrapper-dashboard">
            {loggedIn && (
            <div className="dashboard grid md:grid-cols-2 md:grid-rows-3 gap-6 m-6">
                <div className="grid-item row-span-3 profile-info">
                    <img src={profilePic} className="w-32 h-32 p-1 mx-auto border-solid border-4 border-teal-500 rounded-full bg-slate-50" alt="profile picture" />
                    <h1 className="text-5xl text-center mt-3">{Username}</h1>
                    <table className="profile-table mt-4">
                        <tr>
                            <td>Phone</td>
                            <td>{"+60 123 456 789"}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{"johndoe@gmail.com"}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td>{"2003/1/1"}</td>
                        </tr>
                        <tr>
                            <td>IC Number</td>
                            <td>{"030101-15-1234"}</td>
                        </tr>
                    </table>
                </div>

                <div className="grid-item crypto-wallet flex justify-center items-center row-span-1 flex-col">
                    <div className='flex flex-row justify-center items-end'>
                        <h2 className="text-6xl text-center">
                            {new Intl.NumberFormat('en-us').format(152693)}
                        </h2>
                        <p>CBC</p>
                    </div>
                    
                    {/* <ul className="flex flex-row justify-evenly w-full mt-8 cbc-actions">
                        <li>Send</li>
                        <li>Receive</li>
                        <li>Buy</li>
                        <li>Trade</li>
                    </ul> */}
                </div>

                {/* Connect crypto wallet: https://www.coinbase.com/cloud/discover/dev-foundations/use-web3-react-to-connect-wallet */}
                <div className="grid-item row-span-2 crypto-wallet-storage">
                    <div className="flex flex-row">
                        <img src={wallet} className="w-10 h-10" alt="Crypto wallet" />
                        <h2 className="text-3xl ml-4">Crypto Wallets</h2>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default Profile