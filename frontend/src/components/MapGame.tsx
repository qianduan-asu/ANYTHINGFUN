// src/components/Map.tsx
import mapboxgl from "mapbox-gl"
import React, { useEffect, useRef, useState } from "react"
import UserService from "../api/UserService"; // 导入UserService
import userIcon from "../assets/icon.png"; // 导入图片
import "../assets/Map.css"; // 引入CSS样式文件
import MAPBOX_ACCESS_TOKEN from "../config"; // 导入配置文件中的token
import { getBrowserFingerprint } from "../utils/fingerprint"
import Demo from "./SetDemo"
import StartPage from "./StartPage"
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
interface UserInfo {
  name: string;
  coordinates: string;
  onlineSince: string;
}

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(16);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [fingerprint, setFingerprint] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 地图是否加载完成
  const [showStartPage, setShowStartPage] = useState(false);

  useEffect(() => {
    const initializeMap = async () => {
      const fingerprint = await getBrowserFingerprint(); // 获取指纹
      setFingerprint(fingerprint);
      if (map.current || !mapContainer.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "top-right"
      );

      map.current.addControl(
        new mapboxgl.ScaleControl({ maxWidth: 80, unit: "metric" }),
        "bottom-left"
      );

      map.current.on("load", () => {
        map.current!.addSource("terrain-source", {
          type: "raster-dem",
          url: "mapbox://mapbox.terrain-rgb",
        });
        map.current!.setTerrain({
          source: "terrain-source",
          exaggeration: 1.5,
        });
        map.current!.setLight({
          anchor: "viewport",
          color: "#fff",
          intensity: 0.8,
          position: [lng, lat, 8000],
        });
        setIsMapLoaded(true); // 地图加载完成
        navigator.geolocation.getCurrentPosition((position) => {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);

          map.current?.setCenter([
            position.coords.longitude,
            position.coords.latitude,
          ]);

          const userId = fingerprint;
          UserService.getUserById(userId)
            .then((info: UserInfo) => {
              setUserInfo({
                name: info.name,
                coordinates: info.coordinates,
                onlineSince: info.onlineSince,
              });
              addUserMarker(
                position.coords.longitude,
                position.coords.latitude,
                info
              );
            })
            .catch((error: any) => {
              console.error("Failed to fetch user info:", error);
            });
        });
      });
    };

    initializeMap();
  }, [fingerprint, lng, lat, zoom]);

  const addUserMarker = (
    longitude: number,
    latitude: number,
    info: UserInfo
  ) => {
    // 创建 Marker 实例
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([longitude, latitude])
      .addTo(map.current!);

    // 创建 Popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setLngLat([
      longitude,
      latitude,
    ]).setHTML(`
      <div style="text-align: center;">
        <img src="${userIcon}" alt="${info.name}'s avatar" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 8px;"/>
        <h4>${info.name}</h4>
        <p>Location: ${info.coordinates}</p>
        <p>Time: ${info.onlineSince}</p>
      </div>
    `);

    // 为 Marker 设置 Popup
    marker.setPopup(popup);
    // // 创建一个 Marker 的 DOM 元素
    // const el = document.createElement("div");
    // el.className = "user-marker";
    // el.style.backgroundImage = `url(${userIcon})`; // 替换为用户头像的路径
    // el.style.width = "50px";
    // el.style.height = "50px";
    // el.style.backgroundSize = "cover";
    // el.style.borderRadius = "50%";
    // el.style.border = "2px solid #fff"; // 添加白色边框以增强可见性
    // el.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)"; // 添加阴影以增强视觉效果
    // el.style.cursor = "pointer"; // 设置鼠标悬停时为手型光标

    // // 创建 Marker 实例
    // const marker = new mapboxgl.Marker(el)
    //   .setLngLat([longitude, latitude])
    //   .addTo(map.current!);
    // // 创建 Popup
    // const popup = new mapboxgl.Popup({ offset: 25 }).setLngLat([
    //   longitude,
    //   latitude,
    // ]).setHTML(`
    //     <h4>${info.name}</h4>
    //     <p>Location: ${info.location}</p>
    //     <p>Time: ${info.time}</p>
    //   `);

    // // 添加 Popup 到 Marker
    // marker.setPopup(popup);
  };

  return (
    <div>
      <Demo></Demo>
      <div ref={mapContainer} className="map-container" />
      {showStartPage && (
        <StartPage
          onStart={() => setShowStartPage(false)}
          isMapLoaded={isMapLoaded}
        />
      )}
    </div>
  );
};

export default Map;
