from clickhouse_driver import Client
import asyncio

def get_clickhouse_client(config):
    client = Client(
        host=config.host,
        port=config.port,
        user=config.user,
        password=config.jwt_token,
        secure=True,
        settings={'use_jwt_authentication': True}
    )
    return client

async def execute_query(client, query):
    return await asyncio.get_event_loop().run_in_executor(None, client.execute, query)
