import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const basePath = '/Cannvida';

  const sendWhatsAppMessage = (messageType: string) => {
    let message = '';
    switch (messageType) {
      case 'productos':
        message = 'Hola! Me interesa conocer más sobre sus productos de cannabis terapéutico.';
        break;
      case 'consulta':
        message = 'Hola! Me gustaría agendar una consulta con un especialista.';
        break;
      case 'info':
        message = 'Hola! Quisiera más información sobre Cannavida y sus servicios.';
        break;
      case 'talleres':
        message = 'Hola! Me interesa participar en sus talleres educativos.';
        break;
      default:
        message = 'Hola! Me gustaría obtener más información sobre Cannavida.';
    }
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/56950282666?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAssistant = () => {
    setShowAssistant(true);
    const responses: Record<string, string> = {
      'hola': '¡Hola! ¿En qué puedo ayudarte hoy con Cannavida?',
      'productos': 'Ofrecemos CannaOil, CannaCaps, CannaGummy y CannaCream. ¿Te interesa alguno en particular?',
      'consulta': 'Puedes agendar una consulta enviándonos un mensaje o usando el formulario de contacto.',
      'info': 'Cannavida ofrece productos y terapias naturales desde Puerto Montt. ¿Qué más te gustaría saber?',
      'default': 'Lo siento, no entendí. Prueba con "productos", "consulta" o "info".',
    };
    const response = responses[userInput.toLowerCase()] || responses['default'];
    setAssistantMessage(response);
    setUserInput('');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email enviado:', { email, message });
    setEmailSent(true);
    setEmail('');
    setMessage('');
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-purple-50 text-gray-800 font-sans overflow-x-hidden">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-lg rounded-full px-8 py-3 shadow-xl border border-white/20">
        <div className="flex items-center space-x-8">
          <Link href="#home" className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors">Inicio</Link>
          <Link href="#productos" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">Productos</Link>
          <Link href="#servicios" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">Servicios</Link>
          <Link href="#contacto" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">Contacto</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Image src="/logo2.png" alt="Cannavida Logo" width={100} height={100} className="object-contain" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-purple-700 bg-clip-text text-transparent leading-tight">
            Cannavida
          </h1>
          
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600 mb-12 leading-relaxed font-medium">
            Terapias y productos naturales a base de cannabis para una vida más equilibrada y saludable.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              onClick={() => sendWhatsAppMessage('productos')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 font-semibold"
            >
              <span className="flex items-center space-x-2">
                <span>Conocer Productos</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => sendWhatsAppMessage('consulta')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-purple-500/25 transition-all duration-300 font-semibold"
            >
              <span className="flex items-center space-x-2">
                <span>Agendar Consulta</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-gray-400">
            <span className="text-sm font-medium">Descubre más</span>
            <div className="w-px h-8 bg-gradient-to-b from-emerald-400 to-transparent animate-bounce"></div>
          </div>
        </motion.div>
      </header>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white via-emerald-50/30 to-purple-50/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-700 to-purple-700 bg-clip-text text-transparent">
            Nuestra Misión
          </h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              En Cannavida, nos dedicamos a mejorar la calidad de vida a través de productos y terapias naturales derivadas del cannabis. Desde Puerto Montt, ofrecemos soluciones seguras, certificadas y respaldadas científicamente para el bienestar integral.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-white to-purple-50">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-700 to-emerald-700 bg-clip-text text-transparent"
        >
          Productos Premium
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { name: 'CannaOil', desc: 'Aceite sublingual premium para uso terapéutico', img: '/1.jpeg', gradient: 'from-emerald-500 to-emerald-600' },
            { name: 'CannaCaps', desc: 'Cápsulas de liberación controlada y natural', img: '/2.jpeg', gradient: 'from-purple-500 to-purple-600' },
            { name: 'CannaGummy', desc: 'Gomitas con extracto terapéutico de calidad', img: '/3.jpeg', gradient: 'from-emerald-600 to-purple-500' },
            { name: 'CannaCream', desc: 'Crema analgésica para aplicación tópica', img: '/4.jpeg', gradient: 'from-purple-600 to-emerald-500' },
          ].map(({ name, desc, img, gradient }, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              onClick={() => sendWhatsAppMessage('productos')}
            >
              <div className="relative overflow-hidden">
                <Image 
                  src={img} 
                  alt={name} 
                  width={400} 
                  height={250} 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-emerald-600 text-sm font-semibold">Ver más</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {name}
                </h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    sendWhatsAppMessage('productos');
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Consultar por WhatsApp
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-6 bg-gradient-to-br from-white via-purple-50/30 to-emerald-50/30">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-700 to-purple-700 bg-clip-text text-transparent"
        >
          Servicios Especializados
        </motion.h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: 'Consultas Profesionales', 
              desc: 'Agendar cita con terapeutas o médicos integrativos certificados para evaluación personalizada.',
              icon: '🩺',
              action: 'consulta'
            },
            { 
              title: 'Evaluación Personalizada', 
              desc: 'Análisis completo para determinar el uso adecuado de cannabis medicinal según tu condición.',
              icon: '📋',
              action: 'info'
            },
            { 
              title: 'Educación y Talleres', 
              desc: 'Aprende sobre el uso responsable, legal y efectivo del cannabis terapéutico.',
              icon: '📚',
              action: 'talleres'
            },
            { 
              title: 'Apoyo Holístico', 
              desc: 'Charlas sobre autocuidado, fitoterapia y bienestar integral para tu salud.',
              icon: '🧘',
              action: 'info'
            },
          ].map(({ title, desc, icon, action }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
              onClick={() => sendWhatsAppMessage(action)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendWhatsAppMessage(action);
                    }}
                    className="bg-gradient-to-r from-purple-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Contactar por WhatsApp
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-6 bg-gradient-to-br from-purple-50 via-emerald-50 to-slate-50">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-700 to-purple-700 bg-clip-text text-transparent"
        >
          Múltiples Formas de Contacto
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50"
        >
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4 group cursor-pointer">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">📧</div>
              <div className="text-center">
                <p className="text-gray-600 font-medium mb-1">Correo Electrónico</p>
                <a 
                  href="mailto:cannavida2025@gmail.com" 
                  className="text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors group-hover:underline"
                >
                  cannavida2025@gmail.com
                </a>
              </div>
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            
            <div className="flex items-center justify-center space-x-4 group cursor-pointer" onClick={() => sendWhatsAppMessage('info')}>
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">📱</div>
              <div className="text-center">
                <p className="text-gray-600 font-medium mb-1">WhatsApp Directo</p>
                <span className="text-xl font-bold text-purple-600 hover:text-purple-700 transition-colors group-hover:underline">
                  +56 9 5028 2666
                </span>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tu mensaje"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Enviar Mensaje
              </motion.button>
              {emailSent && <p className="text-green-600 text-center">¡Mensaje enviado con éxito!</p>}
            </form>
          </div>
        </motion.div>
      </section>

      {/* Assistant Virtual */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: showAssistant ? 1 : 0, x: showAssistant ? 0 : 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-24 right-6 w-80 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-gray-200 z-50"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-emerald-700">Asistente Virtual</h3>
          <button onClick={() => setShowAssistant(false)} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>
        <div className="mb-4 text-gray-600">{assistantMessage || '¡Hola! Escribe "productos", "consulta" o "info" para ayudarte.'}</div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAssistant()}
          placeholder="Escribe aquí..."
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAssistant}
          className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          Enviar
        </motion.button>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-purple-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">C</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Cannavida</h3>
          <p className="text-emerald-200 mb-6">Bienestar natural desde Puerto Montt, Chile</p>
          <div className="flex justify-center space-x-8 mb-6">
            <button onClick={() => sendWhatsAppMessage('info')} className="text-emerald-300 hover:text-white transition-colors">
              WhatsApp
            </button>
            <a href="mailto:cannavida2025@gmail.com" className="text-emerald-300 hover:text-white transition-colors">
              Email
            </a>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-6"></div>
          <p className="text-sm text-emerald-200/80">© {new Date().getFullYear()} Cannavida. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          onClick={() => sendWhatsAppMessage('info')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl group-hover:animate-bounce">💬</span>
            <span className="font-semibold hidden group-hover:block transition-all duration-300">WhatsApp</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Assistant Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-24 right-8 z-50"
      >
        <motion.button
          onClick={() => setShowAssistant(!showAssistant)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-purple-500 to-emerald-500 text-white p-3 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
        >
          <span className="text-xl">🤖</span>
        </motion.button>
      </motion.div>
    </main>
  );
}