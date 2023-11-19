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

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const profileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          h-24
          w-20
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className=" text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image upload (image must be less than 2 mb)</span>
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
          placeholder="Enter UserName"
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          id="email"
          placeholder="Enter Email"
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          id="password"
          placeholder="Enter PassWord"
        />
        <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-70">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 uppercase cursor-pointer">
          delete account?
        </span>
        <span className="text-red-700 uppercase cursor-pointer">sign out</span>
      </div>
    </div>
  );
}

export default Profile;
