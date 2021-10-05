import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tableid:'table1',
    screenstate:'active',
    isInTable:false,
    isSignIn:false,
    memberaccount:null,
    memberID:null,
    memberName:null,
    memberPoint:null,
    memberPwd:null,
}

export const memberSlice = createSlice({
    name:'member',
    initialState,
    reducers:{
        setTableID:(state, action)=>{
            state.tableid = action.payload;
        },
        setScreenState:(state, action)=>{
            state.screenstate = action.payload;
        },
        setMemberAccount:(state, action)=>{
            state.memberaccount = action.payload;
        },
        setIsInTable:(state, action)=>{
            state.isInTable = action.payload;
        },
        setIsSignIn:(state, action) =>{
            state.isSignIn = action.payload;
        },
        setMemberID:(state, action) =>{
            state.memberID = action.payload;
        },
        setMemberName:(state, action) =>{
            state.memberName = action.payload;
        },
        setMemberPoint:(state, action) =>{
            state.memberPoint = action.payload;
        },
        setMemberPwd:(state, action) =>{
            state.memberPwd = action.payload;
        }
    },
});

export const { setTableID ,setScreenState ,setMemberAccount ,setIsInTable ,setIsSignIn , setMemberID, setMemberName, setMemberPoint, setMemberPwd} = 
    memberSlice.actions;

// Selectors
export const selectTableID = (state) => state.member.tableid;
export const selectScreenState = (state) => state.member.screenstate;
export const selectMemberAccount = (state) => state.member.memberaccount;
export const selectIsInTable = (state) => state.member.isInTable;
export const selectIsSignIn = (state) => state.member.isSignIn;
export const selectMemberID = (state) => state.member.memberID;
export const selectMemberName = (state) => state.member.memberName;
export const selectMemberPoint = (state) => state.member.memberPoint;
export const selectMemberPwd = (state) => state.member.memberPwd;

export default memberSlice.reducer; //nav(name) Reducer ==> navReducer