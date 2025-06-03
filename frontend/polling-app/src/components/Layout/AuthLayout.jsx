import React from 'react'
// import UI_ELEMENT from "../../assets/images/ui-element.png";
// import CARD_1 from "../../assets/images/auth-card-1.png";
// import CARD_2 from "../../assets/images/auth-card-2.png";
// import CARD_3 from "../../assets/images/auth-card-3.png";


const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-1/2 px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Polling App</h2>
        {children}
        </div>

        <div className="hidden md:block w-1/2 h-screen bg-sky-50  bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow:hidden relative"></div>
        {/* <img src={UI_ELEMENT} className=''/>
        <img src={UI_ELEMENT} className=''/>

        <img src={CARD_1} className=''/>
        <img src={CARD_2} className=''/>
        <img src={CARD_3} className=''/> */}
    </div>
  )
}

export default AuthLayout
