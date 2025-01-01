"use client";

import { sessionConfig } from "@/configs/session.config";

export const branchSession = {
    signIn: function (branchId: string)
    {
        localStorage.setItem(sessionConfig.LOCAL_STORAGE_SESSION_KEY, branchId);
    },
    signOut: function ()
    {
        localStorage.removeItem(sessionConfig.LOCAL_STORAGE_SESSION_KEY);
    },
    getBranchId: function ()
    {
        return localStorage.getItem(sessionConfig.LOCAL_STORAGE_SESSION_KEY);
    }
}