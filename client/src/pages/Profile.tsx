import { useEffect, useState } from 'react'
import Wallet from '../components/Wallet';
import ScrollReveal from 'scrollreveal';
import profilePic from '../assets/person-fill.svg'
import wallet from '../assets/wallet2.svg'
import history from '../assets/history.svg'
import './Profile.css'
import { useSelector } from 'react-redux';
import Sweetalert2 from 'sweetalert2';
import Swal from 'sweetalert2'

import { AuthenticationState } from '../slice/authenticationSlice';

const Profile = (props: any) => {
    const [Username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        const sr = ScrollReveal();
        sr.reveal('.profile-info', {
          duration: 500,
          distance: '40px',
          easing: 'ease-out',
          origin: 'bottom',
          reset: true,
          viewFactor: 0.5,
          delay: 0,
        });

        sr.reveal('.crypto-wallet', {
          duration: 250,
          distance: '40px',
          easing: 'ease-out',
          origin: 'right',
          reset: true,
          viewFactor: 0.5,
          delay: 250,
        });

        sr.reveal('.crypto-wallet-storage', {
            duration: 250,
            distance: '40px',
            easing: 'ease-out',
            origin: 'right',
            reset: true,
            viewFactor: 0.5,  
            delay: 350,
          });

          
        sr.reveal('.history-profile', {
            duration: 250,
            distance: '40px',
            easing: 'ease-out',
            origin: 'left',
            reset: true,
            viewFactor: 0.2,  
            delay: 500,
          });
        
      }, []);

      const loggedIn = useSelector((state: RootState) => (state.authentication as AuthenticationState).loggedIn);

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
        setEmail(localStorage.getItem("email")!)
        setUserAddress(Object(json)["wallet"])
    });


    const updateAddress = async () => {
        const url = 'http://localhost:8080/user'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email})
        })

        if (!response.ok) {
            throw new Error("Network was not ok")
        }

        const result = await response.json()
        console.log("result", await result.wallet)
        setUserAddress(await result.wallet)
    }

    const handleAddUserAddress = async () => {
        Swal.fire({
            title: 'Add your crypto wallet.',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add a Wallet',
            showLoaderOnConfirm: true,
            preConfirm: (address) => {
              return fetch('http://localhost:8080/user/wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, address: address}),
            })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  console.log(response.status)
                  console.log("Added user address successfully")
                  return response.status
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                icon: "success",
                title: `Successfully added a crypto wallet`,
                // imageUrl: result.value.avatar_url
              })
            }
          })

        updateAddress()

    }

    


    return (
        <div className="wrapper-dashboard">
            {loggedIn && (
            <div className="dashboard grid md:grid-cols-2 md:grid-rows-4 gap-6 m-6">
                <div className="grid-item row-span-3 profile-info">
                    <img src={profilePic} className="w-32 h-32 p-1 mx-auto border-solid border-4 border-teal-500 rounded-full bg-slate-50" alt="profile picture" />
                    <h1 className="text-5xl text-center mt-3">{Username}</h1>
                    <table className="profile-table mt-10">
                        <tr>
                            <td>Phone</td>
                            <td className="text-right">{"+60 123 456 789"}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className="text-right">{email}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td className="text-right">{"2003/1/1"}</td>
                        </tr>
                        <tr>
                            <td>IC Number</td>
                            <td className="text-right">{"030101-15-1234"}</td>
                        </tr>
                    </table>
                </div>

                <div className="grid-item crypto-wallet flex justify-center items-center row-span-1 flex-col">
                    <div className='flex flex-row justify-center items-end'>
                        <h2 className="text-6xl text-right">
                            {new Intl.NumberFormat('en-us').format(0)}
                        </h2>
                        <p className="text-right">CBC</p>
                    </div>
                </div>

                {/* Connect crypto wallet: https://www.coinbase.com/cloud/discover/dev-foundations/use-web3-react-to-connect-wallet */}
                <div className="grid-item row-span-2 crypto-wallet-storage ">
                    <div className="flex flex-row">
                        <img src={wallet} className="w-10 h-10" alt="Crypto wallet" />
                        <h2 className="text-3xl ml-4">Crypto Wallet</h2>
                    </div>
                    <Wallet address={userAddress}
                        handleAddUserAddress={handleAddUserAddress} 
                    />
                </div>

                <div className='grid-item col-span-2 history-profile'>
                    <div className="flex flex-row">
                        <img src={history} className="w-10 h-10 mr-auto" alt="History" />
                        <h2 className="text-3xl ml-4 text-left">Voter History</h2>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default Profile