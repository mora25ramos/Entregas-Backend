import { createProductService, getProductsService, getProductByIdService, updateProductService, deleteProductService } from '../services/productService.js';
import { ProductoDTO } from '../dto/productDTO.js';
import nodemailer from 'nodemailer';

export const getAllProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  const productData = req.body;
  try {
    const createdProduct = await createProductService(productData);

    // Lógica para enviar un correo electrónico al admin
    if (req.user.role === 'admin') {
      const message = {
        from: 'mora25ramos@gmail.com',
        to: `${req.user.email}`,
        subject: 'Producto agregado exitosamente',
        text: `El producto ${createdProduct.nombre} ha sido agregado por ${req.user.username}`,
      };

      // Crear un objeto transporter con las opciones de configuración del servicio de correo electrónico
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mora25ramos@gmail.com',
          pass: 'micontraseña',
        },
      });

      // Enviar el mensaje usando el objeto transporter
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Email enviado: ${info.response}`);
        }
      });
    }

    res.json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await updateProductService(id, productData);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Lógica para enviar un correo electrónico al admin
    if (req.user.role === 'admin') {
      const message = {
        from: 'mora25ramos@gmail.com',
        to: `${req.user.email}`,
        subject: 'Producto actualizado exitosamente',
        text: `El producto con ID ${id} ha sido actualizado por ${req.user.username}`,
      };

      // Crear un objeto transporter con las opciones de configuración del servicio de correo electrónico
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mora25ramos@gmail.com',
          pass: 'micontraseña',
        },
      });

      // Enviar el mensaje usando el objeto transportar
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Email enviado: ${info.response}`);
        }
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProductService(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Lógica para enviar un correo electrónico al admin
    if (req.user.role === 'admin') {
      const message = {
        from: 'mora25ramos@gmail.com',
        to: `${req.user.email}`,
        subject: 'Producto eliminado exitosamente',
        text: `El producto con ID ${id} ha sido eliminado por ${req.user.username}`,
      };

      // Crear un objeto transporter con las opciones de configuración del servicio de correo electrónico
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mora25ramos@gmail.com',
          pass: 'micontraseña',
        },
      });

      // Enviar el mensaje usando el objeto transportar
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Email enviado: ${info.response}`);
        }
      });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};