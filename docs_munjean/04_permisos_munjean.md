## PROTOCOLO 3.1.3: CONTROL DE ACCESOS Y CAPAS ESPECIALES POR CLI 

Para que Skynet impida el sabotaje de la resistencia humana, cada archivo de comando, binario y carpeta debe estar estrictamente regulado con permisos de bajo nivel y directivas de pertenencia del sistema.

---

## 1. COMPRENSIÓN METADATA DE SEGURIDAD 

Al ejecutar un escaneo en frío con 'ls -l', el procesador central del T-800 lee un patrón de 10 caracteres como el siguiente:

Cada indicador representa una operación atómica:
* **`r` (Read / Lectura):** Valor binario **4**. Permite ver el contenido de los archivos u hojas del directorio[cite: 167, 234].
* **`w` (Write / Escritura):** Valor binario **2**. Habilita la alteración o destrucción de datos en el archivo o añadir/borrar ficheros en carpetas[cite: 167, 234].
* **`x` (Execute / Ejecución):** Valor binario **1**. Permite a la CPU ejecutar binarios, scripts, o al usuario ingresar a un directorio con `cd`.

---

## 2. MODIFICACIONES: FORMATO NUMÉRICO VS SIMBÓLICO

Para alterar los privilegios, existen dos metodologías de comando ejecutadas por el operador de Skynet:
* **Modo Octal/Numérico:** Suma los pesos lógicos de cada terna[cite: 235]. Por ejemplo, `600` equivale a:
    * Propietario: $r(4) + w(2) = 6$.
    * Grupo: Nada $(0) = 0$.
    * Otros: Nada $(0) = 0$.
    * *Comando:* `chmod 600 nota.txt` (El dueño lee y escribe; nadie más tiene acceso).
* **Modo Simbólico:** Utiliza letras explícitas para agregar o sustraer permisos.
    * *Comando:* `chmod u+x,go-rwx privado` (Añade ejecución al dueño, remueve cualquier permiso de lectura, escritura y ejecución al grupo y a otros de manera directa).

---

## 3. CONTROL DE PERTENENCIA: EL COMANDO `CHOWN`

El comando `chown` (Change Owner) modifica el propietario y el grupo dueño de un nodo en el sistema de archivos[cite: 167, 286]. 
Al ejecutar `sudo chown root:root nota.txt`, arrebatamos el archivo al usuario común `inacap` y lo asignamos al superusuario raíz `root` y a su grupo primario, impidiendo que procesos no privilegiados modifiquen los ficheros estratégicos[cite: 146, 163, 167].

---

## 4. PERMISOS ESPECIALES DE SEGURIDAD (SETGID Y STICKY BIT)

Para asegurar el almacenamiento compartido y la integridad de los directorios públicos, se aplican técnicas avanzadas de administración:

1.  **SetGID (Set Group ID) en directorios compartidos:**
    * *Acción:* `sudo mkdir /srv/compartido && sudo chmod 2775 /srv/compartido`.
    * *Explicación:* El bit `2` (o la `s` en la terna del grupo) activa el SetGID. Esto obliga a que cualquier archivo nuevo creado dentro de esta carpeta herede de forma automatizada el grupo del directorio padre (en este caso, el grupo de `/srv/compartido`), independientemente de cuál sea el grupo primario del usuario que lo cree. Facilita enormemente el desarrollo colaborativo en sistemas corporativos de Cyberdyne Systems.
2.  **Sticky Bit (Bit de Persistencia) en carpetas temporales:**
    * *Acción:* `sudo chmod +t /tmp`.
    * *Explicación:* Representado por la `t` al final de la cadena de permisos. Evita que usuarios sin privilegios eliminen o renombren archivos pertenecientes a otros usuarios dentro de carpetas de escritura pública como `/tmp`. Solo el dueño de un archivo o 'root' pueden borrarlo.

---

## 5. EVIDENCIA DE PERMISOS EN LA CONSOLA 

A continuación, se adjunta el mapa de estado de permisos de archivos generado en la consola para auditar los cambios aplicados en la sección de demostración:

![Comandos chmod y chown básicos](img_<aaa><nnn>/04_permisos_basicos.png)
*(Captura mostrando ls -l y la aplicación exitosa de chmod y chown sobre nota.txt y privado)* 

![Permisos Especiales del Sistema](img_<aaa><nnn>/04_permisos_especiales.png)
*(Captura del comando ls -ld /srv/compartido /tmp demostrando los bits "s" y "t" en acción)* 