from pydantic import BaseModel, Field
from typing import List, Optional

class ClickHouseConfig(BaseModel):
    host: str
    port: int
    user: str
    jwt_token: str
    database: str
    table: str

class SchemaResponse(BaseModel):
    tables: Optional[List[str]] = None
    columns: Optional[List[dict]] = None

class ColumnSelection(BaseModel):
    columns: List[str]

class IngestionResponse(BaseModel):
    records_processed: int
