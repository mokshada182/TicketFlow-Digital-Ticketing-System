'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const logout = () => {
        // Log the user out of your application here

        // Open a new window with the Google logout URL
        const logoutWindow = window.open("https://accounts.google.com/logout", "LogoutWindow", "width=500,height=500");

        // Close the new window after 2 seconds
        setTimeout(() => {
            logoutWindow.close();

            // Redirect to your page after the window is closed
            router.push("/");
        }, 2000);
    };

    return (
        <button className='btn' onClick={logout}>Logout</button>
    );
}
