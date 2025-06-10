import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables from .env file
dotenv.config();

export const sendEmail = async (req, res) => {
    const { name, email,tel, message } = req.body;

    // Configuração do transporter (usando SMTP do cPanel)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // 
        port: process.env.SMTP_PORT, 
        secure: true, 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS  
        }
    });

    try {
        // Enviar email
        await transporter.sendMail({
            from: `"${name}" <${email}> <${tel}>`, // remetente
            to: process.env.EMAIL_USER, // enviando para você mesmo
            subject: `Mensagem de ${name} via mymobisolutions.com`, // assunto
            text: message,
            html: `<p>${message}</p><p>Enviado por: ${name} (${email})</p>`
        });

        res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, message: 'Erro ao enviar email' });
    }
};