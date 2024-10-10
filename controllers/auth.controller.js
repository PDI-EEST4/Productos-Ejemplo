const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const productosController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      return res.status(403).json({ message: 'Usuario o contraseña incorrectos'})
    }
    
    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      return res.status(403).json({ message: 'Usuario o contraseña incorrectos'})
    } 
    
    // Crear token
    const token = await jwt.sign({ user: user.id }, process.env.JWT_SECRET , { expiresIn: '7d'})
    return res.status(200).json({ token })
  },

  register: async (req, res) => {
    const {username, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {username, password: hashedPassword},
    })

    if (user) {
      return res.status(201).json({message: 'Usuario creado con exito', user})
    } else {
      return res.status(400).json({message: 'Error al crear el usuario'})
    }
  },
}

module.exports = productosController