import { AuthUser, Profile } from "@/types/authType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  user: AuthUser|null;
  profile: Profile|null;

}


const initialState: User= {
  user: null,
  profile:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser:(state,action:PayloadAction<AuthUser|null>)=>{
       state.user= action.payload
    },
    setProfile:(state,action:PayloadAction<Profile|null>)=>{
       state.profile=action.payload
    },
    logout:(state)=>{
      state.user = null
      state.profile=null
    }
  },
});

export const {setUser, setProfile, logout } = authSlice.actions;
export default authSlice.reducer;