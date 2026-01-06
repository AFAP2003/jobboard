
export const fetchLogin = async (data:any)=>{
        const loginRes = await fetch("http://localhost:8000/api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })
        return await loginRes.json()
    }

// Add refreshAccessToken for NextAuth JWT callback
export const refreshAccessToken = async (token: any) => {
    try {
        const res = await fetch("http://localhost:8000/api/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken: token.refreshToken })
        });
        const data = await res.json();
        console.log('refreshAccessToken response:', data); // Debug log
        if (!data.success) throw new Error("Failed to refresh token: " + (data.message || JSON.stringify(data)));
        return {
            ...token,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            accessTokenExpires: Date.now() + data.data.expiresIn * 1000,
            error: undefined
        };
    } catch (error) {
        console.error('refreshAccessToken error:', error);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        };
    }
};

     

     

