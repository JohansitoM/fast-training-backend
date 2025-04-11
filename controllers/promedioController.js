const {Promedio, Equipo, Jugador } = require("../models")

const PromediarDatos= async(req,res)=>{
    try {
        const { equipoId } = req.params;
        const jugadores = await Jugador.findAll({ where: { equipoId } });
        const promedios = [];

        for (const jugador of jugadores) {
            const promedio = await Promedio.findOne({ where: { jugadorId: jugador.id } });
            if (promedio) {
                promedios.push(promedio);
            }
        }

        res.status(200).json(promedios);
    } catch (error) {
        console.error("Error al obtener los promedios:", error);
        res.status(500).json({ error: "Error al obtener los promedios" });
    }
}