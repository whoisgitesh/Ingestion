import pytest
import httpx

BASE_URL = "http://localhost:8000"

# Helper function to perform API calls
def api_post(path, json=None, files=None, params=None, headers=None):
    return httpx.post(f"{BASE_URL}{path}", json=json, files=files, params=params, headers=headers)

def api_get(path, params=None, headers=None):
    return httpx.get(f"{BASE_URL}{path}", params=params, headers=headers)

# 1. Test single table export
def test_single_table_to_flatfile():
    # Connect to ClickHouse
    connect_params = {
        "host": "localhost",
        "port": 8123,
        "user": "default",
        "jwt_token": "valid_token",
        "database": "default",
        "table": "uk_price_paid"
    }
    # Fetch tables
    resp = api_get("/tables", params=connect_params)
    assert resp.status_code == 200
    assert "uk_price_paid" in resp.json()

    # Run ingestion for selected columns
    response = api_post("/ingest/clickhouse-to-file", json={
        **connect_params,
        "columns": ["price", "date"]
    }, headers={"Authorization": "Bearer valid_token"})
    assert response.status_code == 200
    assert "records_processed" in response.json()
    print(f"Records exported: {response.json()['records_processed']}")

# 2. Test CSV upload to new table
def test_csv_upload_to_clickhouse():
    csv_file_path = "sample_data.csv"
    with open(csv_file_path, "rb") as f:
        files = {"file": ("sample_data.csv", f, "text/csv")}
        response = api_post("/ingest/file-to-clickhouse", files=files, json={
            "columns": ["id", "name"]
        }, headers={"Authorization": "Bearer valid_token"})
    assert response.status_code == 200
    assert "records_processed" in response.json()

# 3. Test join tables → flat file
def test_join_tables_to_flatfile():
    join_req = {
        "tables": ["table1", "table2"],
        "join_conditions": ["table1.id = table2.id"],
        "columns": ["table1.id", "table2.name"],
        "database": "default"
    }
    # Build join query
    resp = api_post("/join-query", json=join_req)
    assert resp.status_code == 200
    query = resp.json().get("query")
    assert "JOIN" in query

    # Preview data
    preview_resp = api_post("/preview", json={"query": query})
    assert preview_resp.status_code == 200
    assert "preview" in preview_resp.json()

# 4. Connection failure
def test_invalid_connection():
    resp = api_post("/tables", params={
        "host": "badhost",
        "port": 1234,
        "user": "wrong",
        "jwt_token": "badtoken",
        "database": "default"
    })
    assert resp.status_code != 200

# 5. Data preview
def test_data_preview():
    resp = api_post("/preview", json={"query": "SELECT * FROM default.uk_price_paid LIMIT 100"})
    assert resp.status_code == 200
    data = resp.json().get("preview")
    assert isinstance(data, list)
    assert len(data) <= 100
