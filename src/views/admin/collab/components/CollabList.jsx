import { useAuth } from 'contexts/AuthContext';
import { collabInvites } from 'firebase-config';
import React, { useEffect, useState } from 'react'

const CollabList = (props) => {
  const { post, authorData } = props;
  const { currentUser } = useAuth();
  // Retrieve the showEdit state from localStorage or default to 'showInvite'
  // `showEdit_${post.id}` ===> this represents a unique state for each doc depending on its id
  const initialShowEditState = localStorage.getItem(`showEdit_${post.id}`) || 'showInvite';

  const [showEdit, setShowEdit] = useState(initialShowEditState);
  useEffect(() => {
    // saving the Edit state
    localStorage.setItem(`showEdit_${post.id}`, showEdit);
  }, [post.id,showEdit]);

  const handleCollab=()=>{
    console.log("editor open");
  }
  const handleInvite = async () => {
    // API function to call the docs who have invited this user
    await collabInvites(currentUser.uid)
    // setting Edit state
    setShowEdit("showEdit"); 
  };

  return (
    <div className=" dark:text-white w-64 overflow-hidden h-72 bg-gray-200 shadow-md dark:bg-darkmid sm:rounded-lg m-2">
      <img className="h-32 w-full object-cover" src={post.imageUrl} alt="post tile" />
      <div className="p-5 flex flex-col items-start justify-center h-fit">
        <div className="">
          Invited by: <span className="font-bold">{authorData.name}</span>
        </div>
        <div className="">
          Title: <span className="font-bold">{post.title}</span>
        </div>
        {/* conditional rendering of the buttons */}
        {showEdit==="showEdit" ? (
          <button 
          onClick={handleCollab}
          className="flex my-2 h-5 sm:h-8 w-auto items-center justify-between rounded-lg dark:bg-brandLinear bg-blueSecondary sm:p-3 p-1 text-xs sm:text-base font-bold">
            Edit
          </button>
        ) : <button
          className="flex my-2 h-5 sm:h-8 w-auto items-center justify-between rounded-lg dark:bg-brandLinear bg-blueSecondary sm:p-3 p-1 text-xs sm:text-base font-bold"
          onClick={handleInvite}
        >
          Accept Invite
        </button>}
      </div>
    </div>
  )
}
export default CollabList;
