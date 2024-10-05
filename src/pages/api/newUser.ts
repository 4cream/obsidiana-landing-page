import type { APIRoute } from 'astro';
import { turso } from "@/lib/tursoDb.ts";
// import { turso } from "@/turso.ts";

export const POST: APIRoute = async ({ request }) => {
    console.log("Que sale en el request?", request);
    
    const { email } = await request.json();

    if (!email) {
        console.log("Que llega al methodo POST?", email);
               return new Response(JSON.stringify({ message: "Datos inválidos" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        console.log("Entramos al metodo POST");
        
        const result = await turso.execute({
            sql: "INSERT INTO customers (email) VALUES (?)",
            args: [email],
        });

        if (result.rowsAffected === 1) {
            return new Response(JSON.stringify({ message: "Información registrada exitosamente" }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            throw new Error("No se pudo insertar el registro");
        }
    } catch (error) {
        console.error("Error al insertar datos:", error);
        return new Response(JSON.stringify({ message: "Error al registrar la información" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};