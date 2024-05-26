import { supabase } from "@/redux/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";
import { NewUserDetailsSchema } from "@/schemas";
import { showErrorToast, showSucessToast } from "@/utils/toasts";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }: any, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/auth/register`,
        {},
        {
          params: {
            email: email,
            password: password,
            name: name,
          },
        }
      );
      if (res.status == 200) {
        showSucessToast("Registration successful 😎");
        return res.data;
      }
    } catch (error: any) {
      showErrorToast(error.response.data, true);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/auth/login`, {
        params: {
          email: email,
          password: password,
        },
      });
      if (res.data) {
        delete res?.data?.password;
        showSucessToast("Login successful 😎, Welcome back!!");
        return { user: res.data, userData: res.data.main_userprofile };
      }
      return null;
    } catch (error: any) {
      showErrorToast(error.response.data, true);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      // await persistor.flush();
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUserProfile = createAsyncThunk(
  "auth/createUserProfile",
  async (
    {
      userData,
      userId,
    }: {
      userData: z.infer<typeof NewUserDetailsSchema>;
      userId: string;
    },
    thunkAPI
  ) => {
    console.log("userData:", userData);
    console.log("userId:", userId);
    try {
      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/auth/${userId}/create`,
        {},
        {
          params: {
            ...userData,
          },
        }
      );
      if (req.status == 200) {
        showSucessToast("Profile created successfully 😎");
        return req.data;
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      showErrorToast(error.response.data, true);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const updateUserProfile = createAsyncThunk(
//   "user/updateUserProfile",
//   async (
//     {
//       userProfile,
//       userAddress,
//       userId,
//     }: {
//       userProfile: z.infer<typeof UserDetailsFormSchema>;
//       userAddress: z.infer<typeof AddressDetailsSchema>;
//       userId: string;
//     },
//     thunkAPI
//   ) => {
//     try {
//       const req = await axios.post(
//         `http://localhost:3000/api/auth/${userId}/update`,
//         {},
//         {
//           params: {
//             ...userProfile,
//             ...userAddress,
//           },
//         }
//       );
//       if (req.status == 200) {
//         return req.data;
//       } else {
//         throw new Error("Registration failed");
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchUserProfile = createAsyncThunk(
//   "user/fetchUserProfile",
//   async (userId: string, thunkAPI) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/auth/${userId}/profile`
//       );
//       if (res.status == 200) {
//         return res.data;
//       } else {
//         throw new Error("Registration failed");
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchUserAddresses = createAsyncThunk(
//   "user/fetchUserAddresses",
//   async (userId: string, thunkAPI) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/auth/${userId}/addresses`
//       );
//       if (res.status == 200) {
//         return res.data;
//       } else {
//         throw new Error("Registration failed");
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
