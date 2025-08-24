# Imagen base con JDK 17
FROM openjdk:17-jdk-slim

# Definir directorio de trabajo
WORKDIR /app

# Copiar el pom.xml y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn package -DskipTests

# Ejecutar la aplicación
CMD ["java", "-jar", "target/videogames-0.0.1-SNAPSHOT.jar"]
