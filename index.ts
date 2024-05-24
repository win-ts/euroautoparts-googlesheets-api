import  * as Service from "./service";

const server = Bun.serve({
    port: process.env.PORT,
    async fetch (req) {
        const path = new URL(req.url).pathname;

        // GET all products from Google Sheets
        if (req.method === "GET" && path === "/products") {
            const products = await Service.getProducts();
            return Response.json({ success: true, products });
        }
    
        // POST new lead to Google Sheets
        if (req.method === "POST" && path === "/lead") {
            const payload = await req.formData();
            const newLead = await Service.newLead(payload);
            return Response.json({ success: true, newLead });
        }

        if (req.method === "GET" && path === "/products/best-selling") {
            const products = await Service.getBestSellingProducts();
            return Response.json({ success: true, products });
        }

        return new Response("Page not found", { status: 404 });
    }
})

console.log(`Listening on ${server.url}`);