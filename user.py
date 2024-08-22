import requests
import pytest

BASE_URL = "http://localhost:3000/users"  # 请确保此处的 URL 正确

# 测试获取用户信息的接口
def test_get_user():
    user_id = "64f2d33b9d8e4a4e8497d91e"  # 使用有效的用户ID进行测试
    response = requests.get(f"{BASE_URL}/{user_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["_id"] == user_id
    assert "nickname" in data
    assert "avatar" in data
    assert "coordinates" in data
    assert "onlineSince" in data

# 测试添加用户信息的接口
def test_add_user():
    payload = {
        "browserId": "unique_browser_id_1233",
        "nickname": "test_nickname2",
        "avatar": "http://example.com/avatar.jpg",
        "coordinates": {"latitude": 37.7749, "longitude": -122.4194},
        "onlineSince": "2024-08-21T10:20:30Z"
    }
    response = requests.post(f"{BASE_URL}/add", json=payload)
    print(response.text)
    assert response.status_code == 201
    data = response.json()
    assert "nickname" in data
    assert data["nickname"] == payload["nickname"]
    assert "avatar" in data
    assert data["avatar"] == payload["avatar"]

# 测试用户已存在时的添加接口
def test_add_user_already_exists():
    payload = {
        "browserId": "existing_browser_id_456",
        "nickname": "test_nickname_existing",
        "avatar": "http://example.com/avatar.jpg",
        "coordinates": {"latitude": 37.7749, "longitude": -122.4194},
        "onlineSince": "2024-08-21T10:20:30Z"
    }
    # 第一次添加应成功
    response = requests.post(f"{BASE_URL}/add", json=payload)
    assert response.status_code == 201

    # 第二次添加应返回用户已存在的错误
    response = requests.post(f"{BASE_URL}/add", json=payload)
    assert response.status_code == 400
    assert response.json()["error"] == "用户已存在"

# 测试更新用户信息的接口
def test_update_user():
    user_id = "64f2d33b9d8e4a4e8497d91e"  # 使用有效的用户ID进行测试
    payload = {
        "avatar": "http://example.com/new_avatar.jpg",
        "coordinates": {"latitude": 40.7128, "longitude": -74.0060},
        "onlineSince": "2024-08-22T11:30:40Z"
    }
    response = requests.put(f"{BASE_URL}/update/{user_id}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["_id"] == user_id
    assert data["avatar"] == payload["avatar"]
    assert data["coordinates"]["latitude"] == payload["coordinates"]["latitude"]
    assert data["coordinates"]["longitude"] == payload["coordinates"]["longitude"]

# 测试更新不存在的用户信息
def test_update_user_not_found():
    user_id = "non_existing_user_id"  # 使用无效的用户ID进行测试
    payload = {
        "avatar": "http://example.com/new_avatar.jpg",
        "coordinates": {"latitude": 40.7128, "longitude": -74.0060},
        "onlineSince": "2024-08-22T11:30:40Z"
    }
    response = requests.put(f"{BASE_URL}/update/{user_id}", json=payload)
    assert response.status_code == 404
    assert response.json()["error"] == "用户未找到"

if __name__ == "__main__":
    test_add_user()