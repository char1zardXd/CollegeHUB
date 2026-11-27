FROM --platform=$BUILDPLATFORM eclipse-temurin:25-jdk-alpine AS build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN --mount=type=cache,target=/root/.m2 chmod +x mvnw && ./mvnw dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 ./mvnw package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]