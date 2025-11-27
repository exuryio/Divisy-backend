import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'
const TO_EMAIL = process.env.TO_EMAIL || 'rts@divisy.co'

function formatContactEmail(data) {
  const { data: formData } = data
  return {
    subject: `Nueva Consulta de Negocio - ${formData.company || 'Sin empresa'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Consulta de Negocio</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0F4C75 0%, #0D7377 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Nueva Consulta de Negocio</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulario de Contacto - Divisy</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #0F4C75; margin-top: 0;">Información del Cliente</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0D7377;">
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${formData.name || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Empresa:</strong> ${formData.company || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #0D7377; text-decoration: none;">${formData.email || 'N/A'}</a></p>
              ${formData.phone ? `<p style="margin: 8px 0;"><strong>Teléfono:</strong> ${formData.phone}</p>` : ''}
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0F4C75;">
              <h3 style="color: #0F4C75; margin-top: 0;">Detalles del Proyecto</h3>
              <p style="margin: 8px 0;"><strong>Tipo de Proyecto:</strong> ${formData.projectType || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Presupuesto:</strong> ${formData.budget || 'N/A'}</p>
              ${formData.message ? `<p style="margin: 8px 0;"><strong>Mensaje:</strong></p><p style="margin: 8px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">${formData.message}</p>` : ''}
            </div>
            
            <div style="background: #e7f5f5; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #14A085;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong>ID de Referencia:</strong> ${data.submissionId}<br>
                <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Nueva Consulta de Negocio - Divisy

Información del Cliente:
- Nombre: ${formData.name || 'N/A'}
- Empresa: ${formData.company || 'N/A'}
- Email: ${formData.email || 'N/A'}
${formData.phone ? `- Teléfono: ${formData.phone}` : ''}

Detalles del Proyecto:
- Tipo de Proyecto: ${formData.projectType || 'N/A'}
- Presupuesto: ${formData.budget || 'N/A'}
${formData.message ? `\nMensaje:\n${formData.message}` : ''}

ID de Referencia: ${data.submissionId}
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
    `.trim(),
  }
}

function formatJobApplicationEmail(data) {
  const { data: formData } = data
  return {
    subject: `Nueva Solicitud de Empleo - ${formData.position || 'Sin posición'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Solicitud de Empleo</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0F4C75 0%, #0D7377 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Nueva Solicitud de Empleo</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulario de Carreras - Divisy</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #0F4C75; margin-top: 0;">Información del Candidato</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0D7377;">
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${formData.fullName || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #0D7377; text-decoration: none;">${formData.email || 'N/A'}</a></p>
              <p style="margin: 8px 0;"><strong>Perfil de LinkedIn:</strong> <a href="${formData.linkedinProfile}" target="_blank" style="color: #0D7377; text-decoration: none;">Ver Perfil →</a></p>
              <p style="margin: 8px 0;"><strong>Posición Solicitada:</strong> ${formData.position || 'N/A'}</p>
            </div>
            
            ${formData.coverLetter ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0F4C75;">
              <h3 style="color: #0F4C75; margin-top: 0;">Carta de Presentación</h3>
              <p style="margin: 0; padding: 10px; background: #f8f9fa; border-radius: 4px; white-space: pre-wrap;">${formData.coverLetter}</p>
            </div>
            ` : ''}
            
            <div style="background: #e7f5f5; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #14A085;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong>ID de Referencia:</strong> ${data.submissionId}<br>
                <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Nueva Solicitud de Empleo - Divisy

Información del Candidato:
- Nombre: ${formData.fullName || 'N/A'}
- Email: ${formData.email || 'N/A'}
- Perfil de LinkedIn: ${formData.linkedinProfile || 'N/A'}
- Posición Solicitada: ${formData.position || 'N/A'}

${formData.coverLetter ? `Carta de Presentación:\n${formData.coverLetter}\n` : ''}

ID de Referencia: ${data.submissionId}
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
    `.trim(),
  }
}

function formatRecruiterRequestEmail(data) {
  const { data: formData } = data
  return {
    subject: `Nueva Solicitud de Acceso al Talent Pool - ${formData.company || 'Sin empresa'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Solicitud de Acceso al Talent Pool</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0F4C75 0%, #0D7377 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Nueva Solicitud de Acceso</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Talent Pool - Divisy</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #0F4C75; margin-top: 0;">Información de la Empresa</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0D7377;">
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${formData.fullName || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Empresa:</strong> ${formData.company || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #0D7377; text-decoration: none;">${formData.email || 'N/A'}</a></p>
              ${formData.phone ? `<p style="margin: 8px 0;"><strong>Teléfono:</strong> ${formData.phone}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Rol:</strong> ${formData.role || 'N/A'}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0F4C75;">
              <h3 style="color: #0F4C75; margin-top: 0;">Necesidades de Contratación</h3>
              <p style="margin: 8px 0;"><strong>Posiciones Necesarias:</strong> ${formData.positionsNeeded || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Tamaño del Equipo:</strong> ${formData.teamSize || 'N/A'}</p>
              ${formData.message ? `<p style="margin: 8px 0;"><strong>Mensaje:</strong></p><p style="margin: 8px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">${formData.message}</p>` : ''}
            </div>
            
            <div style="background: #e7f5f5; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #14A085;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong>ID de Referencia:</strong> ${data.submissionId}<br>
                <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Nueva Solicitud de Acceso al Talent Pool - Divisy

Información de la Empresa:
- Nombre: ${formData.fullName || 'N/A'}
- Empresa: ${formData.company || 'N/A'}
- Email: ${formData.email || 'N/A'}
${formData.phone ? `- Teléfono: ${formData.phone}` : ''}
- Rol: ${formData.role || 'N/A'}

Necesidades de Contratación:
- Posiciones Necesarias: ${formData.positionsNeeded || 'N/A'}
- Tamaño del Equipo: ${formData.teamSize || 'N/A'}
${formData.message ? `\nMensaje:\n${formData.message}` : ''}

ID de Referencia: ${data.submissionId}
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
    `.trim(),
  }
}

export async function sendFormNotificationEmail(data) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email notification')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    let emailContent

    switch (data.type) {
      case 'contact':
        emailContent = formatContactEmail(data)
        break
      case 'job-application':
        emailContent = formatJobApplicationEmail(data)
        break
      case 'recruiter-request':
        emailContent = formatRecruiterRequestEmail(data)
        break
      default:
        throw new Error(`Unknown form type: ${data.type}`)
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.data.email || FROM_EMAIL,
      ...emailContent,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

