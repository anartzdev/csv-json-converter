# Convertir CSV <-> JSON

Convertidor de ficheros CSV a JSON y viceversa para usarlo con ficheros de traducción JSON que suele haber en proyectos de Angular, React, Qwik,...para poder adaptarlos de una manera rápida y sencilla a un formato Excel, para que personas que tienen que traducir, lo hagan de una manera cómoda y así, cuando estén listos todos los textos poder hacer la conversión inversa.

## Instalación y aspectos a tener en cuenta
Para instalar el generador en nuestro equipo de manera global y usarlo para generar nuevos proyectos a partir de las plantillas que disponemos, **debemos de descargar el proeycto completo**.

Instalamos las dependencias del proyecto:
```yarn```

Una vez descargado e instalado las dependencias para trabajar con ello, debemos de crear el paquete en formato ***.tgz** para poder instalarlo de manera global en nuestra máquina:
```yarn prod```

Esto lo que hará es compilar los ficheros en un directorio `dist` y posteriormente empaquetarlo como una aplicación Node con la entrada en el `index.js` dentro del directorio `dist`.

Nos debe de aparecer un mensaje similar a este para indicar que se ha creado correctamente el ejecutable empaquetado

```
anartz:~/json-csv-converter$ yarn prod
yarn run v1.22.19
success Wrote tarball to "/home/anartz/json-csv-converter/mugan86-csv-json-converter-v0.1.8.tgz".
Done in 5.03s.
```
Generado el paquete distribuible hay que tener en cuenta lo siguiente:
> 
> Genera un fichero con extensión **.tgz** cuyo nombre sigue esta estructura:
> ```mugan86-csv-json-converter-v<N_VERSION>.tgz```
> Si en el package.json tenemos en la propiedad **version** el valor **1.0.0** el fichero que se creará será:
>```mugan86-csv-json-converter-v1.0.0.tgz```

Para poder instalar el CLI en nuestro equipo de manera global debemos de ejecutar el siguiente comando:
```npm i -g <FICHERO TGZ>```
Donde **FICHERO TGZ** tenemos por ejemplo el fichero mencionado **mugan86-csv-json-converter-v1.0.0.tgz**. El apartado que será fijo es **mugan86-csv-json-converter-** y luego varía dependiendo de la versión.

```
anartz@AT-5CD20222D5:~/$ npm i -g ./mugan86-csv-json-converter-v0.1.8.tgz

changed 72 packages in 2s

20 packages are looking for funding
  run `npm fund` for details
  ```

## Comprobación

Una vez instalado el CLI para realizar las conversiones de los ficheros CSV / JSON debemos de ejecutar el siguiente comando:

```csv-json-converter```

Una vez ejecutado nos aparece algo similar a lo siguiente con opciones de un asistente (que puede ir cambiando):

```
? ¿A qué formato quieres convertir? (Use arrow keys)
❯ JSON 
  CSV 
? ¿Cuál es el nombre del fichero? <NOMBRE FICHERO> (Aquí podemos poner la ruta especificando el path desde donde estamos)
```



