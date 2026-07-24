export const data = [{
    title: "Architecture A1 — Token in localStorage",
    description: "Token storage: localStorage — visible to client-side JavaScript",
    link: "http://localhost:3001/",
    options: [
        "The access token is stored in the browser's localStorage after login.",
        "Any JavaScript running on the page (including injected scripts) can read the token.",
        "API calls are made directly from the browser using the token in an Authorization header.",
        "This architecture is the most susceptible to Cross-Site Scripting (XSS) token theft."
    ]
},{
    title: "Architecture A2 — Token in HttpOnly Cookie",
    description: "Token storage: HttpOnly Cookie — hidden from JavaScript",
    link: "http://localhost:3002/",
    options: [
        "The server sets the access token in an HttpOnly, Secure cookie after authentication.",
        "Client-side JavaScript cannot read or modify the cookie contents.",
        "API calls still go directly from the browser, but the cookie is attached automatically.",
        "This reduces XSS-based token theft but remains exposed to Cross-Site Request Forgery (CSRF) without additional protections."
    ]   
},{
    title: "Architecture A3 — Backend-for-Frontend with Redis",
    description: "Token storage: Backend-for-Frontend with Redis — fully isolated from the browser",
    link: "http://localhost:3000",
    options: [
        "The browser never receives or stores the access token; it only holds an opaque session ID in an HttpOnly cookie.",
        "A Backend-for-Frontend (BFF) proxy manages the token lifecycle and stores tokens server-side in Redis.",
        "All API calls are routed through the BFF — the browser never contacts the API directly.",
        "This provides the strongest isolation: neither XSS nor CSRF can extract the access token."
    ]   
}]