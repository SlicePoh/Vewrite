import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPeopleCircle } from 'react-icons/io5'
import { FcInvite } from 'react-icons/fc';
import { useAuth } from 'contexts/AuthContext';
import { addCollabMail } from 'firebase-config';
import { useLocation } from 'react-router-dom';

export const CollabModal = (props) => {
    const location = useLocation();
    const { selectedPost } = location.state || {};


    const [isOpen, setOpen] = useState(false);
    const [email, setEmail] = useState('');

    const {currentUser}=useAuth()
    const handleInvite= async ()=>{
        console.log(currentUser.id);
        await addCollabMail(selectedPost.id,email)
        setOpen(!isOpen)
        toast.success(`Collab Invite Sent`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
        
        console.log(email);
        setEmail('')
    }
    return (
        <div className="">
            <button
                className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary  sm:p-3 p-1 text-xs sm:text-base font-bold text-white dark:bg-brandLinear dark:text-[#000]"
                onClick={() => setOpen(!isOpen)}
            >
                <IoPeopleCircle className="mr-1 sm:mr-2" />
                <div>Collaborate</div>
            </button>
            {isOpen && (
                <div
                    className="absolute -translate-x-32 z-10 mt-5 flex flex-col w-3/5 sm:w-96 h-32 items-center justify-center rounded-lg bg-blueSecondary p-3 text-sm font-bold text-white dark:bg-brandLinear dark:text-[#000] md:text-base"
                    onClose={() => setOpen(false)}
                >
                    <div className="md:text-lg ">
                        Send invitation to collab
                    </div>
                    <div className="flex items-center mt-3 text-xs md:text-base">
                        <input
                            id="email"
                            value={email}
                            type="email"
                            placeholder="abc@gmail.com"
                            onChange={(e)=>setEmail(e.target.value)}
                            className="text-[#000] w-11/12 md:w-56 rounded-lg border-none p-2"
                        />
                        <button onClick={handleInvite} className="ml-3 flex items-center text-[#000] dark:text-white bg-navy-200 dark:bg-navy-900 rounded-lg p-2 h-fit">
                            <div className="">Invite</div>
                            <FcInvite className="ml-1" />
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
    )
}
