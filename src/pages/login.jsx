import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "../utils/FirebaseConfig";

import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";

export default function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  useEffect(() => {
    console.log({ userInfo });
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser, router]);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, {
          email,
        });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "Available",
            },
          });
          router.push("/onboarding");
        } else {
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.data.id,
              email: data.data.email,
              name: data.data.name,
              profileImage: data.data.profilePicture,
              status: data.data.about,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-8 text-white mb-7">
        <Image
          src="/echo_transparent.png"
          alt="echo"
          height={400}
          width={500}
        />
        {/* <span className="text-9xl">Echo</span> */}
      </div>
      <button
        className="flex items-center justify-center gap-3 bg-search-input-container-background p-3 rounded-lg"
        onClick={login}
      >
        <FcGoogle className="text-3xl" />
        <span className="text-white text-xl pb-1">Login With Google</span>
      </button>
    </div>
  );
}
