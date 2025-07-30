import { api } from "../utils/routes"

export default async function handler (req, res) {
    const { username, userId } = req.query;

    if (!username) {
        return res.status(400).json({error: "Username is required"});
    }

    try {
        const response = await fetch(api.checkUsername({ 
            username: username, 
            id: userId
        }), 
        {
            headers: {
                'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN_USERNAME}`,
            }
        });

        const users = await response.json();
         if (!Array.isArray(users)) {
            console.error('Strapi returned unexpected response:', users);
            return res.status(500).json({ error: "Invalid response from server", details: users });
        }
    
        res.status(200).json({ exists: users.length > 0 });

    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong',
            details: error.message
        })
    }
}