const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const variable = [{ }]
const productosController = {
  obtenerTodos: async (req, res) => {
    const productos = await prisma.producto.findMany();
    return res.json(productos);
  },

  obtenerUno: async (req, res) => {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!producto) {
      return res.status(404).send({message: 'No se encontro el producto'})
    }

    return res.json(producto)
  },

  crear: async (req, res) => {
    const { nombre, categoria, precio, imgUrl } = req.body;

    const productoNuevo = await prisma.producto.create({
      data: {nombre, categoria, precio, imgUrl}
    })

    return res.json(productoNuevo)
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, precio, imgUrl } = req.body;

    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: { nombre, categoria, precio, imgUrl }
    })

    return res.json({message: 'Producto actualizado con exito', productoActualizado})
  },

  borrar: async (req, res) => {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!producto) {
      return res.status(404).send({message: 'No se encontro el producto'})
    }

    await prisma.producto.delete({
      where: {
        id: Number(id)
      }
    })

    return res.json({message: "Producto eliminado con exito"})
  }
}

module.exports = productosController