import fetch from 'cross-fetch';


//const url="http://localhost:3500/logIn"
export const getAuthentificationToken = async (url: string, credentials: any): Promise<any> => {
    const token: any = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return token.json()
}
