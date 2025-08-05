import { routes } from "./routes";

export default {
    password: {
        isValid: (password) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            return regex.test(password);
        },
    },
    username: {
        isValidLength: (username) => {
            if (!username) return false;
            if (username.length < 3 || username.length > 30) return false;
            return true;
        },
        isValidRegex: (username) => {
            if (!username) return false;
            const regex = /^[a-zA-Z][a-zA-Z0-9_.-]*$/;
            return regex.test(username);
        },
        isAvailable: async (username, currentUserId) => {
            if (!username) return false;
            const res = await fetch(`${routes.checkUsernameAPI(username, currentUserId)}`);
            const json = await res.json();
            return !json.exists;
        }
    }
};