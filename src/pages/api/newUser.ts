import type { APIRoute } from 'astro';
import { turso } from "@/lib/tursoDb.ts";
// import { turso } from "@/turso.ts";

export const POST: APIRoute = async ({ request }) => {
    console.log("Que sale en el request?", request);
    
    const { nombre, email, phone } = await request.json();

    if (!nombre || !email || !phone) {
        console.log("Que llega al methodo POST?", nombre, email, phone);
               return new Response(JSON.stringify({ message: "Datos inválidos" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        console.log("Entramos al metodo POST");
        
        const result = await turso.execute({
            sql: "INSERT INTO ProspectiveCustomers (nombre, email, phone) VALUES (?, ?, ?)",
            args: [nombre, email, phone],
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