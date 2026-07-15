## PROTOCOLO 3.1.4: GESTIÓN DE PAQUETES CON APT Y CRITERIO DE FACTIBILIDAD 

Skynet requiere herramientas robustas de diagnóstico del hardware en tiempo real.  Para instalarlas de forma segura, el sistema de paquetes APT (Advanced Package Tool) se rige bajo una secuencia de prioridades estrictas.

---

## 1. FLUJO ATÓMICO DE ACTUALIZACIÓN DEL SOFTWARE 

Para evitar que se instalen dependencias corruptas o de repositorios no autenticados, el flujo operativo comprende tres pasos esenciales de línea de comandos:

1.  **`update` (Sincronización):** El comando `sudo apt update` descarga y actualiza los índices locales desde las bases de datos oficiales de Ubuntu. No altera ni actualiza ningún programa instalado; simplemente informa al sistema qué paquetes nuevos existen.
2.  **`show` (Auditoría):** El comando `apt show <paquete>` despliega los metadatos de un paquete sin necesidad de descargarlo. Permite conocer de forma inmediata su peso, dependencias, descripción y la licencia de origen, garantizando un análisis de seguridad previo.
3.  **`install` (Inyección):** El comando `sudo apt install -y <paquete>` descarga las dependencias asociadas, las compila y despliega el binario ejecutable en el sistema. [cite_start]La bandera `-y` responde afirmativamente de manera automatizada a las confirmaciones.

---

## 2. ANÁLISIS DE FACTIBILIDAD PARA DIAGNÓSTICO DE SISTEMAS

[cite_start]Para proveer una herramienta útil de monitoreo de procesos en la terminal de nuestra VM `srv-wiki`, se evalúan tres alternativas presentes en los repositorios de distribución libre:

| Alternativa | Ventajas Técnicas | Desventajas Operativas | Factibilidad (Soporte y Recursos) |
| :--- | :--- | :--- | :--- |
| **`top`** | Preinstalado por defecto. Consumo nulo de almacenamiento en disco y uso mínimo de memoria RAM[cite: 240]. | Interfaz completamente monótona, monocolor, y muy compleja para matar procesos o filtrar hilos de ejecución de manera ágil. | **Baja-Media:** Es nativo, pero carece de la interactividad requerida para la gestión reactiva. |
| **`htop`** | Interfaz visual interactiva con colores muy intuitivos. Permite scrollear listas completas, buscar procesos con un botón, y ordenar por uso de CPU o memoria de forma gráfica. | Requiere instalación manual. | **Alta (Seleccionado):** Altamente soportado de forma oficial en los repositorios de Ubuntu, sumamente ligero y con nulas dependencias externas complejas. |
| **`btop`** | Interfaz ultra moderna con paneles complejos de telemetría de red, discos y CPU. | Peso considerable en megabytes y requiere mayor potencia de renderizado de consola. | **Baja:** Consumo excesivo de recursos computacionales para un nodo de procesamiento ligero sin entorno gráfico. |

**Justificación Estratégica de Skynet:** Se selecciona e instala **`htop`** debido a que ofrece el balance óptimo entre consumo mínimo de hardware y una interfaz enriquecida de visualización interactiva para el operador.

---

## 3. INSTALACIÓN DE DIAGNÓSTICOS EN CALIENTE 


# Paso 1: Localizar los metadatos lógicos antes del despliegue del paquete htop
apt show htop

# Paso 2: Inyectar htop y tree al repositorio local de la VM
sudo apt install -y htop tree 
4. EVIDENCIA DE INSTALACIÓN Y VERIFICACIÓN   A continuación, se documenta la inyección del paquete htop en la base de datos central de nuestro sistema operativo:(Captura del comando apt show htop visualizando la información en consola)   (Captura de htop ejecutándose en la máquina virtual, mostrando procesos activos)