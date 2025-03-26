export default async function handler(req, res) {
    const response = await fetch("http://120.72.85.88:8080" + req.url.replace("/api/proxy", ""), {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
}
