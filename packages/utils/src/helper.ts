type Props = {
    url: string,
    body?: any,
    token?: string,
    method: string
}
export const Helper = async({url, body, token, method}:Props)=>{
    try{
        const response = await fetch(url,{
            method: method,
            headers: {
                'content-type': "application/json",
                ...(token && {'authorization': `Bearer ${token}`})
            },
            body: JSON.stringify(body)
        })

        const result = await response.json()
        console.log(`Result from helper service =>`,result)
        return result

    }catch(err){
         console.error('Error creating user:', err);
    }


}