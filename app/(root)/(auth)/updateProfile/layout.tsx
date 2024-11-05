"use client"
import React from 'react'

interface UserProfileFormLayoutProps {
    children: React.ReactNode  
}

const UserProfileFormLayout: React.FC<UserProfileFormLayoutProps> = ({
    children
}) => {
  return (
    <div className="flex flex-col w-full bg-background my-8 p-8">
      {children}
    </div>
  )
}

export default UserProfileFormLayout