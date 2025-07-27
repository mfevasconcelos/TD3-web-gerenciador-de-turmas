# Build do Front-end (React) 
FROM node:18 AS build-frontend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Build do Back-end (.NET) 
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend

WORKDIR /src

COPY ["GerenciadorDeTurmas.API/GerenciadorDeTurmas.API.csproj", "GerenciadorDeTurmas.API/"]
RUN dotnet restore "GerenciadorDeTurmas.API/GerenciadorDeTurmas.API.csproj"

COPY . .
WORKDIR "/src/GerenciadorDeTurmas.API"

RUN dotnet publish "GerenciadorDeTurmas.API.csproj" -c Release -o /app/publish


# Imagem Final 
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build-backend /app/publish .

COPY --from=build-frontend /app/dist ./wwwroot

ENTRYPOINT ["dotnet", "GerenciadorDeTurmas.API.dll"]