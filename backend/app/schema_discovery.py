from typing import List
from .clickhouse_client import get_clickhouse_client
import pandas as pd
from fastapi import UploadFile

async def get_clickhouse_schema(config) -> List[str]:
    client = get_clickhouse_client(config)
    query = f"DESCRIBE TABLE {config.database}.{config.table}"
    result = await client.execute(query)
    return [row[0] for row in result]

def get_flatfile_schema(file: UploadFile, delimiter=',') -> List[dict]:
    df = pd.read_csv(file.file, nrows=10, delimiter=delimiter)
    return [{"column_name": col, "dtype": str(dtype)} for col, dtype in df.dtypes.items()]
