import React from "react";

export const ProfileFormsCardTitle = {
  pfpImage: "Choose you Profile Images",
  profileDetails: "Update your profile details",
  userAddress: "Add or Edit your Address",
} as { [key: string]: string };

export interface ProfileFormTabContent {
  title: string;
  description: string;
  value: string;
  nextValue: string;
  content: React.ReactNode;
}

export const ProfileTabData = [
  {
    title: "Choose you Profile Images",
    description: "Choose your Profile Images",
    value: "pfpImage",
    nextValue: "profileDetails",
    content: "Choose your Profile Images",
  },
  {
    title: "Update your profile details",
    description: "Update your profile details",
    value: "profileDetails",
    nextValue: "userAddress",
    content: "Update your profile details",
  },
  {
    title: "Add or Edit your Address",
    description: "Add or Edit your Address",
    value: "userAddress",
    nextValue: "pfpImage",
    content: "Add or Edit your Address",
  },
] as ProfileFormTabContent[];
