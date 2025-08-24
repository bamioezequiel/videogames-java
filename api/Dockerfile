# Etapa 1: Construcción
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar pom.xml y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final liviana
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copiar el jar generado desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Exponer puerto
EXPOSE 8080

# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]
