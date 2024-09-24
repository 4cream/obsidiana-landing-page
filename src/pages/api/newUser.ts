import type { APIRoute } from 'astro';
import { turso } from "@/lib/tursoDb";

export const POST: APIRoute = async ({ request }) => {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
        return new Response(JSON.stringify({ message: "Datos inválidos" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        console.log("Entramos al metodo POST");
        
        const result = await turso.execute({
            sql: "INSERT INTO ProspectiveCustomers (name, email, phone) VALUES (?, ?, ?)",
            args: [name, email, phone],
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