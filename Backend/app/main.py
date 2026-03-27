from fastapi import FastAPI

from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Bienvenido a Platziflix API"}


@app.get("/health")
async def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
    }
