import prismadb from "@/lib/prismadb";
import { supabase } from "@/redux/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { UserDetailsFormSchema } from "@/schemas";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }: any, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: "http://localhost:3000/",
        },
      });
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: any, thunkAPI) => {
    console.log("Details:", username, password);
    try {
      const res = await axios.get("http://localhost:3000/api/auth/login", {
        params: {
          username: username,
          password: password,
        },
      });
      if (res.data) {
        return { user: res.data, userData: res.data.main_userprofile };
      }
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      localStorage.removeItem("persist:root");
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userProfile: z.infer<typeof UserDetailsFormSchema>, thunkAPI) => {
    console.log(userProfile);
  }
);

// export const fetchUserProfile = createAsyncThunk(
//   "user/fetchUserProfile",
//   async (uid: string, thunkAPI) => {
//     try {
//       const doc = await firestore.collection("seefood-users").doc(uid).get();
//       if (doc.exists) {
//         return doc.data();
//       } else {
//         throw new Error("User profile not found");
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updateUserProfile = createAsyncThunk(
//   "user/updateUserProfile",
//   async (
//     { uid, userProfile }: { uid: string; userProfile: User },
//     thunkAPI
//   ) => {
//     try {
//       await firestore.collection("seefood-users").doc(uid).update(userProfile);
//       return userProfile;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const signInWithGoogle = createAsyncThunk(
//   "auth/signInWithGoogle",
//   async (_, thunkAPI) => {
//     try {
//       const { user } = await auth.signInWithPopup(googleProvider);
//       const userData = {
//         uid: user?.uid,
//         name: user?.displayName,
//         email: user?.email,
//         credit: 6,
//         recipes: [],
//       };
//       const userRef = await firestore
//         .collection("seefood-users")
//         .doc(userData.uid)
//         .get();
//       if (!userRef.exists) {
//         await firestore
//           .collection("seefood-users")
//           .doc(userData.uid)
//           .set(userData);
//       }
//       return userData;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const logInWithGoogle = createAsyncThunk(
//   "auth/logInWithGoogle",
//   async (_, thunkAPI) => {
//     try {
//       const { user } = await auth.signInWithPopup(googleProvider);
//       const doc = await firestore
//         .collection("seefood-users")
//         .doc(user?.uid)
//         .get();
//       if (doc.exists) {
//         return doc.data() as User;
//       } else {
//         throw new Error("User profile not found");
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
