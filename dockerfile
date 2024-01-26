# Etapa 1: Construcción de la aplicación
###! VERSION MAS LIGERA
###! FROM node:20-bullseye as build
FROM node:21 as build

# Instala tzdata
RUN apt update && apt install
ENV TZ=America/Puerto_Rico

# Establece el directorio de trabajo
WORKDIR /app

# Copia el resto de los archivos de la aplicación
COPY . .

# Comandos básicos
RUN npm install --force
RUN npm run build

# Ejecuta el comando npm run pg:run-mg
#RUN npm run pg:run-mg


# Etapa 2: Creación de la imagen final
###! VERSION MAS LIGERA
###! FROM node:20-bullseye
FROM node:21


# Configurar las variables de entorno
ENV URL_PLATFORM=URL_PLATFORM
ENV PORT=3000
ENV TOKEN_TELEGRAM=TOKEN_TELEGRAM

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app /app

# Establece el directorio de trabajo
WORKDIR /app

# Comando para iniciar la aplicación en producción
CMD ["npm", "run", "start:prod"]

# Exponer el puerto
EXPOSE $PORT