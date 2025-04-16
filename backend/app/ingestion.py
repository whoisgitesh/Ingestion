import pandas as pd
from .clickhouse_client import get_clickhouse_client
import asyncio

async def ingest_clickhouse_to_file(config, columns):
    client = get_clickhouse_client(config)
    query = f"SELECT {', '.join(columns)} FROM {config.database}.{config.table}"
    # Fetch data in chunks
    data_iter = client.execute_iter(query)
    total_records = 0
    with open('output.csv', 'w') as f:
        for batch in data_iter:
            df = pd.DataFrame(batch, columns=columns)
            df.to_csv(f, index=False, header=f.tell()==0)
            total_records += len(df)
    return total_records

async def ingest_file_to_clickhouse(config, file: UploadFile, columns):
    df = pd.read_csv(file.file, usecols=columns)
    client = get_clickhouse_client(config)
    records = df.to_dict('records')
    # Insert data
    await asyncio.get_event_loop().run_in_executor(
        None,
        client.execute,
        f"INSERT INTO {config.database}.{config.table} ({', '.join(columns)}) VALUES",
        records
    )
    return len(records)
  