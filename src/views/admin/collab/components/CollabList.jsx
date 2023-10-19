import { useAuth } from 'contexts/AuthContext';
import { collabInvites } from 'firebase-config';
import React, { useEffect, useState } from 'react'

const CollabList = (props) => {
  const { post, authorData,handleEdit,postId } = props;
  const { currentUser } = useAuth();

  // Retrieve the showEdit state from localStorage or default to 'showInvite'
  // `showEdit_${post.id}` ===> this represents a unique state for each doc depending on its id
  const initialShowEditState = localStorage.getItem(`showEdit_${post.id}`) || 'showInvite';

  const [showEdit, setShowEdit] = useState(initialShowEditState);
  useEffect(() => {
    // saving the Edit state
    localStorage.setItem(`showEdit_${post.id}`, showEdit);
  }, [post.id,showEdit]);

  const handleInvite = async () => {
    // API function to call the docs who have invited this user
    await collabInvites(currentUser.uid)
    // setting Edit state
    setShowEdit("showEdit"); 
  };

  return (
    <div className=" dark:text-white w-full md:w-64 overflow-hidden h-64 bg-gray-200 shadow-md dark:bg-darkmid rounded-lg m-2">
      <img className="h-32 w-full object-cover" src={post.imageUrl} alt="post tile" />
      <div className="p-5 flex flex-col items-start justify-center h-fit">
        <div className="">
          Invited by: <span className="font-bold">{authorData.name.slice(0,20)}{authorData.name.length > 20 ?`..`: ''}</span>
        </div>
        <div className="">
          Title: <span className="font-bold">{post.title.slice(0,20)}{post.title.length > 20 ?`..`: ''}</span>
        </div>
        {/* conditional rendering of the buttons */}
        {showEdit==="showEdit" ? (
          <button 
          onClick={()=>handleEdit(postId)}
          className="flex my-2 h-5 sm:h-8 w-auto items-center justify-between rounded-lg dark:bg-brandLinear bg-blueSecondary p-3 sm:p-4 text-xs sm:text-base font-bold">
            Edit
          </button>
        ) : <button
          className="flex my-2 h-5 sm:h-8 w-auto items-center justify-between rounded-lg dark:bg-brandLinear bg-blueSecondary p-3 sm:p-4 text-xs sm:text-base font-bold"
          onClick={handleInvite}
        >
          Accept Invite
        </button>}
      </div>
    </div>
  )
}
export default CollabList;
