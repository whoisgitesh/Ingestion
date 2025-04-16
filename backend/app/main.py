from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.responses import JSONResponse
from typing import List
from .models import (
    ClickHouseConfig, SchemaResponse, ColumnSelection, IngestionResponse
)
from .schema_discovery import get_clickhouse_schema, get_flatfile_schema
from .ingestion import ingest_clickhouse_to_file, ingest_file_to_clickhouse
from .auth import verify_jwt_token

app = FastAPI()

@app.get("/schema/clickhouse")
async def fetch_clickhouse_schema(config: ClickHouseConfig):
    try:
        schema = await get_clickhouse_schema(config)
        return SchemaResponse(tables=schema)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/schema/flatfile")
async def fetch_flatfile_schema(file: UploadFile = File(...), delimiter: str = ','):
    try:
        schema = get_flatfile_schema(file, delimiter)
        return SchemaResponse(columns=schema)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/ingest/clickhouse-to-file")
async def clickhouse_to_file(config: ClickHouseConfig, columns: List[str], token: str = Depends(verify_jwt_token)):
    try:
        count = await ingest_clickhouse_to_file(config, columns)
        return IngestionResponse(records_processed=count)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/ingest/file-to-clickhouse")
async def file_to_clickhouse(config: ClickHouseConfig, columns: List[str], file: UploadFile = File(...), token: str = Depends(verify_jwt_token)):
    try:
        count = await ingest_file_to_clickhouse(config, file, columns)
        return IngestionResponse(records_processed=count)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
