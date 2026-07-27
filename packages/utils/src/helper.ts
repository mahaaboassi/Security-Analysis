type Props = {
    url: string,
    body?: any,
    token?: string,
    method: string,
    isInclude?: boolean
}
export const Helper = async({url, body, token, method, isInclude}:Props)=>{
    try{
        const response = await fetch(url,{
            method: method,
            headers: {
                'content-type': "application/json",
                ...(token && {'authorization': `Bearer ${token}`}),
            },
            credentials: isInclude ? "include" : "same-origin",
            body: JSON.stringify(body)
        })

        const result = await response.json()
        console.log(`Result from helper service =>`,result)
        return result

    }catch(err){
         console.error('Error creating user:', err);
    }


}