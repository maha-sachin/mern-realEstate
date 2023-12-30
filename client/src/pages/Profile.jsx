import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const profileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0); // since its a percentage it goes from 0 - 100
  const [fileUploadError, setFileUploadError] = useState(false);
  // defaultValue={currentUser.username}
  const [formData, setFormData] = useState({
    username:  currentUser.username,
    email: currentUser.email,
    // password: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const fileStorage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(fileStorage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) =>
          setFormData({ ...formData, avatar: downloadurl })
        );
      }
    );
  };

  const changeHanlder = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("submit")
    try {
      dispatch(updateUserStart());
      //console.log("update user start")
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
    if (data.success === false){
      dispatch(updateUserFailure(data.message))
      return
    }
    dispatch(updateUserSuccess(data))
    setUpdateSuccess(true)

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
   
  }

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart())
      const response = await fetch(`/api/user/delete/${currentUser._id}`,
      {
        method: 'DELETE',
      }
      )

      const data = await response.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data))

    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async() => {
    try{
      dispatch(signoutUserStart())
      const response = await fetch('/api/auth/signout')
      const data = await response.json()
      // console.log("res")
      if(data.success === false){
        dispatch(signoutUserFailure(data.message))
        return
      }
      dispatch(signoutUserSuccess(data))
    }catch(error){
      dispatch(signoutUserFailure(error.message))
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={profileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => profileRef.current.click()}
          className="rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className=" text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-600">
              {`Image UpLoading...${filePerc}%`}
            </span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Successfully Updated.</span>
          ) : (
            ""
          )}
        </p>
        <input
          className="border p-3 rounded-lg"
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Enter UserName"
          onChange={changeHanlder}
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Enter Email"
          onChange={changeHanlder}
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          id="password"
          placeholder="Enter PassWord"
          onChange={changeHanlder}
        />
        <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-70">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span  onClick={handleDeleteUser} className="text-red-700 uppercase cursor-pointer">
          Delete account?
        </span>
        <span onClick={handleSignOut} className="text-red-700 uppercase cursor-pointer">sign out</span>
      </div>
      {/* <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p> */}
    </div>
  );
}

export default Profile;

