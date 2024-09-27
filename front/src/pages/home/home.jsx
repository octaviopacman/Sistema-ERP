import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,


} from "@nextui-org/react";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import './home.css';
import { NavHome } from "../../components/Navbars/NavHome";
import FooterHome from "../../components/Footers/FooterHome";



export default function Home() {
  return (
    <div>
      <NavHome/>
      <div className="m-5">
        <div className="p-6 m-auto text-center presentacion">
          
          <div>

            <h1 className="titulo">Sistema ERP</h1>
            <h1>Gestiona tus operaciones empresariales con facilidad.</h1>
            <h3>Un ERP diseñado para optimizar tus ingresos, gastos, y control de inventario en múltiples sucursales.</h3>
          </div>
        </div>
        <Card>
          <CardHeader className="justify-center">Todo lo que estás buscando para tu negocio</CardHeader>
          <CardBody className="p-5 columns-2">
            <div style={{ width: '100px', height: '100px' }}>
             {/* Aquí puedes agregar una imagen relevante
              <img src="#" className="w-full h-full" /> */}
            </div>
            <div>
              <h3 className="text-lg font-semibold">¿Qué ofrecemos?</h3>
              <p>
                En [Nombre de tu Empresa], nuestro ERP está diseñado para ser una herramienta integral que te permite gestionar todas las facetas de tu negocio.
                Desde la gestión de inventarios hasta la planificación financiera, ofrecemos todo lo que necesitas para operar de manera eficiente y efectiva.
              </p>
              <p>
                Con una interfaz fácil de usar y funcionalidades personalizables, podrás adaptar el sistema a las necesidades específicas de tu empresa, lo que te permitirá ahorrar tiempo y reducir costos.
              </p>
            </div>
          </CardBody>
        </Card>

        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Por qué elegir nuestro ERP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <i className="bi bi-speedometer2 text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Ahorro de tiempo</h3>
              <p className="text-gray-600">Automatiza procesos repetitivos y mejora la productividad.</p>
            </div>
            <div className="p-4">
              <i className="bi bi-graph-up-arrow text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Reportes en tiempo real</h3>
              <p className="text-gray-600">Genera reportes instantáneos para tomar decisiones basadas en datos.</p>
            </div>
            <div className="p-4">
              <i className="bi bi-layers text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Escalabilidad</h3>
              <p className="text-gray-600">Nuestro ERP crece contigo, permitiendo agregar módulos a medida que expandes tu negocio.</p>
            </div>
          </div>
          </section>
          <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Testimonios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-4">
                <CardBody>
                  <blockquote className="italic">"El sistema ERP ha transformado la forma en que gestionamos nuestro negocio. ¡Altamente recomendable!"</blockquote>
                  <p className="font-semibold mt-2">— Juan Pérez, Gerente General</p>
                </CardBody>
              </Card>

              <Card className="p-4">
                <CardBody>
                  <blockquote className="italic">"Gracias a este ERP, hemos logrado optimizar nuestros procesos y aumentar nuestra productividad."</blockquote>
                  <p className="font-semibold mt-2">— María López, Directora de Operaciones</p>
                </CardBody>
              </Card>

              <Card className="p-4">
                <CardBody>
                  <blockquote className="italic">"La integración de módulos es increíble. Puedo personalizar el sistema según nuestras necesidades."</blockquote>
                  <p className="font-semibold mt-2">— Carlos García, Administrador de Proyectos</p>
                </CardBody>
              </Card>
            </div>
          </section>

          <section className="py-8 bg text-center text-white">
            <h2 className="text-2xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
            <Button color="primary" size="lg" variant="shadow">
              Solicita una Demostración
            </Button>
          </section>

      </div>
      <FooterHome/>
    </div>

  )

}







