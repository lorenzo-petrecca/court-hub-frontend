import { format } from "date-fns";

export const routes = {
    home: '/',
    prenota: '/prenota',
    account: '/account',
    accountApi: '/api/account',
    login: '/login',
    loginAPI: '/api/login',
    logoutAPI: '/api/logout',
    signup: '/signup',
    signupAPI: '/api/signup',
    prenotazioni: '/prenotazioni',
    prenotazioniAPI: '/api/my-bookings',
    privacyPolicy: '/privacy-policy',
    cookiePolicy: '/cookie-policy',
    checkUsernameAPI: (username, id) => 
        `/api/check-username?username=${username}&userId=${id}`,
    prenotaAPI: '/api/prenota',
    bookingResult: '/booking-result',
    regolamento: '/regolamento',
    deleteAccountApi: '/api/delete-account',
    deleteBookingAPI: '/api/delete-booking',
    comingSoon: '/coming-soon',
};

export const api = {
    login: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
    signup: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
    account: `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    updateAccount: (id) => `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    checkUsername: ({ username, id }) => `${process.env.NEXT_PUBLIC_API_URL}/api/users?filters[username][$eq]=${username}&filters[id][$ne]=${id}`,
    getCourts: `${process.env.NEXT_PUBLIC_API_URL}/api/campi?populate=immagine`,
    getPrenotazioni: ({ data, court }) => {
        const formattedData = format(data, "yyyy-MM-dd");
        return `${process.env.NEXT_PUBLIC_API_URL}/api/prenotazioni?data=${formattedData}&campo=${court}`;
    },
    prenotazioni: `${process.env.NEXT_PUBLIC_API_URL}/api/prenotazioni`,
    deleteAccount: `${process.env.NEXT_PUBLIC_API_URL}/api/account/delete`,
    deleteBooking: ({ documentId }) => `${process.env.NEXT_PUBLIC_API_URL}/api/prenotazioni/${documentId}`,
}

export default {routes, api};