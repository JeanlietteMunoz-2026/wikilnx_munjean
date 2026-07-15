## PROTOCOLO 3.1.2: INSTALACIÓN Y ENDURECIMIENTO DE RED 

El inicio del procesador neuronal requiere la correcta parametrización de red, el nombramiento de la unidad de control, la inyección de actualizaciones críticas y el levantamiento de un escudo térmico contra ciberataques (UFW).

---

## 1. CONCEPTOS DE ENLACE TÁCTICO

* **¿Qué es NAT (Network Address Translation)?**
    Es un mecanismo de red que permite que múltiples computadores dentro de una red privada utilicen una única dirección IP pública para interactuar con internet. En nuestro laboratorio, VirtualBox actúa como el enrutador NAT, permitiendo que la VM acceda de forma segura a los repositorios externos de Ubuntu.
* **¿Para qué sirve el Reenvío de Puertos (Port Forwarding)?**
    Dado que una red NAT oculta las interfaces de la VM, el reenvío de puertos crea túneles estáticos que asocian un puerto del PC físico (Anfitrión) con un puerto de la máquina virtual (Huérfano). Sin este protocolo, la estación física no podría consultar la web expuesta en el puerto 80 del servidor virtual ni acceder por SSH.
* **DHCP frente a IP Fija (Estática):**
    * **DHCP (Dynamic Host Configuration Protocol):** Asigna configuraciones de red e IPs dinámicamente y con caducidad. No es recomendable para servidores, ya que si la IP cambia, todos los clientes de la red perderían el acceso.
    * **IP Fija:** Se define manualmente en el sistema. Es la norma para servidores corporativos de Cyberdyne Systems, garantizando accesibilidad perpetua en un punto de montaje inalterable.

---

## 2. SECUENCIA DE COMANDOS DE DESPLIEGUE

```bash
# Configurar la identidad táctica del servidor en la red de Skynet
sudo hostnamectl set-hostname srv-wiki 

# Identificar la dirección IP local de enlace asignada por VirtualBox
ip a 

# Descargar índices e inyectar todas las actualizaciones críticas de seguridad (hardenización)
sudo apt update && sudo apt upgrade -y 

# Endurecimiento del Cortafuegos (UFW)
# ADVERTENCIA CRÍTICA: Se debe abrir el puerto SSH primero, de lo contrario se perderá el control de la terminal
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable 

# Inspeccionar el escudo protector del firewall con detalles
sudo ufw status verbose
3. EVIDENCIA DE CONFIGURACIÓN DEL SISTEMA   
A. Identidad Táctica (Hostname)   (Captura del output de hostnamectl confirmando el nombre srv-wiki)   
B. Mapeo de Direcciones de Red (IP Address)   (Captura del comando ip a mostrando la interfaz en la red local)   
C. Inyección de Código de Seguridad (Upgrades)   (Captura del proceso exitoso de apt update && apt upgrade)   
D. Reglas del Escudo Térmico (UFW Status)   (Captura de ufw status verbose mostrando puertos 22/tcp y 80/tcp activos)   