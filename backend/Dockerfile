FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY MindfulMotion.Api/*.csproj MindfulMotion.Api/
RUN dotnet restore MindfulMotion.Api/MindfulMotion.Api.csproj
COPY MindfulMotion.Api/ MindfulMotion.Api/
RUN dotnet publish MindfulMotion.Api/MindfulMotion.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "MindfulMotion.Api.dll"]
