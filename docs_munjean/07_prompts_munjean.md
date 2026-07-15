Bitácora de Proceso y Uso de IA

Este documento registra de manera detallada el uso de herramientas de Inteligencia Artificial (IA) y fuentes de información externa utilizadas como apoyo durante el desarrollo de la administración del servidor Linux y el despliegue del sitio.

---

## 1. Decisiones y Correcciones Tomadas (Momento y Solución)

A lo largo de este laboratorio, se tomaron tres decisiones críticas de corrección con la asistencia de la IA para asegurar que los servicios de Linux funcionaran correctamente:

### Decisión 1: Estrategia de copiado para evitar el "Sitio en blanco" en Nginx
* **Momento:** Durante la fase de copiado del sitio compilado a la ruta del servidor web (Punto E.3).
* **Problema/Decisión:** La guía sugería ejecutar `sudo cp dist/ /var/www/wiki/`. Al analizarlo con la IA, se identificó que esto podría anidar la carpeta `/dist/` dentro de `/wiki/`, resultando en un error de "Sitio en blanco" (pantalla vacía) debido a rutas incorrectas en Nginx.
* **Solución aplicada:** Se decidió utilizar una variante más segura en la consola: `sudo cp -r dist/* /var/www/wiki/`. Esto copió únicamente el *contenido estático* directo, asegurando que el archivo `index.html` quedara ubicado correctamente en la raíz.

### Decisión 2: Resolución de atajos de teclado y guardado en el Editor Nano
* **Momento:** Durante la creación del archivo de configuración del sitio Nginx (Punto E.4).
* **Problema/Decisión:** Hubo confusión al presionar los atajos en una laptop Lenovo. Se intentó guardar con `Ctrl + 0` (el número cero debido a una confusión visual en el PDF) agregando un carácter `*` erróneo al buffer del nombre del archivo, y no se lograba cerrar Nano de forma segura con Ctrl + X.
* **Solución aplicada:** Con la guía de la IA, se canceló la operación con `Ctrl + C`, se clarificó que el comando correcto es `Ctrl + O` (la letra O, de *WriteOut*) seguido de la tecla *Enter* para confirmar, y luego `Ctrl + X` para salir exitosamente tras responder positivamente al buffer modificado ("Y").

### Decisión 3: Corrección del error de tipeo en la ruta de configuración de Nginx ("sities" vs "sites")
* **Momento:** Inmediatamente posterior al intento de guardar la configuración de Nginx (Punto E.4).
* **Problema/Decisión:** Se detectó un error de tipeo heredado de la lectura del PDF donde se intentó guardar en `/etc/nginx/sities-available/wiki` (usando una "i" adicional). Nginx requiere estrictamente que los sitios disponibles se almacenen en `sites-available`.
* **Solución aplicada:** Se descartó el borrador erróneo en Nano, se volvió a la consola, y se abrió un archivo limpio en la ruta correcta ejecutando `sudo nano /etc/nginx/sites-available/wiki`. Con esto, el enlace simbólico del paso E.5 pudo realizarse sin fallas de ruta ("No such file or directory").

---

## 2. Herramientas y Fuentes Utilizadas

Para completar este proyecto con éxito se utilizaron los siguientes recursos:

1. **VirtualBox (Software de Virtualización):** Utilizado en el Paso B para crear y configurar la máquina virtual con red NAT y reenvío de puertos (puertos 8080 y 2222).
2. **Ubuntu Server 24.04 LTS (Sistema Operativo):** Servidor central donde se administraron permisos, cortafuegos (UFW), y se alojó el servicio web.
3. **Nginx (Servidor Web):** Utilizado en el Paso E para servir el sitio estático construido en el puerto 80 local.
4. **Git & GitHub (Control de versiones):** Usados para clonar el repositorio de la wiki web en el servidor y mantener el código público en la nube.
5. **Node.js & npm (Entorno de ejecución y gestor de paquetes):** Utilizados para instalar las dependencias del proyecto React y compilar la carpeta de producción (`dist/`).
6. **Gemini (Inteligencia Artificial):** Utilizado como asistente virtual de chat en tiempo real para diagnosticar los errores de Nano, corregir las rutas de Nginx y validar el despliegue local.

---

## 3. Reflexión sobre el Proceso de Trabajo

El uso de la Inteligencia Artificial durante este laboratorio representó un cambio metodológico sustancial. Inicialmente, utilicé la IA como un **chatbot de consulta rápida** para resolver dudas sintácticas (como el significado de los comandos en Nano). Sin embargo, a medida que surgieron dificultades de configuración y errores de tipeo con Nginx, la interacción evolucionó a un rol de **asistente técnico/agente de depuración**. 

La IA no se limitó a "hacer el trabajo", sino que me enseñó a entender qué hacía cada comando (por ejemplo, la diferencia entre copiar el contenido o la carpeta de producción en `/var/www/`). Esto evitó bloqueos frustrantes por pequeños detalles (como un carácter de más en la terminal) y me permitió asimilar de mejor manera los conceptos prácticos de la administración de servidores Linux mediante comandos de consola. El balance final es sumamente positivo: la tecnología acelera el aprendizaje siempre y cuando se comprenda el trasfondo de las soluciones propuestas.

* **El Chatbot Externo (Como Gemini o Claude):** Actúa de forma conversacional y puntual. Requiere que el programador tenga una comprensión técnica sólida del problema para poder estructurar la pregunta adecuadamente y filtrar la teoría errónea de la correcta. Su gran beneficio reside en la asimilación conceptual abstracta y el formateo de datos textuales.
* **El Agente Inteligente (Como GitHub Copilot):** Es un co-procesador omnipresente en el editor de código. No explica conceptos teóricos a menos que se le consulte, pero comprende perfectamente el contexto de los ficheros del proyecto React, automatizando de forma sumamente veloz las tareas rutinarias, como el mapeo de arrays de links en el menú, autocompletado de clases repetitivas de Tailwind y corrección de llaves faltantes de importación.

En conclusión, la combinación de ambas tecnologías aceleró de forma masiva el despliegue de nuestra Wiki. Sin embargo, se demuestra que la presencia humana e intelectual es irreemplazable, ya que sin los conocimientos tácticos de administración y la capacidad crítica del estudiante para identificar errores (como el comando inválido de la guía o las directivas de reenvío de puertos de VirtualBox), la máquina simplemente generaría soluciones incompletas o inoperables en el servidor real.
 