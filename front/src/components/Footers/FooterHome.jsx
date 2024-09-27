export default function FooterHome() {
    return (
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm"> 2024 Sistema ERP.</p>
          <div className="flex justify-center mt-4 space-x-6">
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Contacto</a>
          </div>
        </div>
      </footer>
    );
  }