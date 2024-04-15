import prismadb from "@/lib/prismadb";
import { supabase } from "@/redux/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import axios from "axios";

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
        try {
          await prismadb.auth_user.create({
            data: {
              email: email,
              password: password,
              first_name: "",
              last_name: "",
              date_joined: new Date(),
              username: name,
              is_active: true,
              is_staff: false,
              is_superuser: false,
            },
            include: {
              main_userprofile: true,
            },
          });
        } catch (error: any) {
          console.log(error);
          throw new Error("Error creating user in prisma");
        }
        return data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      const res = await axios.get("http://localhost:3000/api/userDetails", {
        params: {
          email: email,
        },
      });
      if (res.data) {
        return { user: data.user, userData: res.data };
      }
      return { user: data.user, userData: null };
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
