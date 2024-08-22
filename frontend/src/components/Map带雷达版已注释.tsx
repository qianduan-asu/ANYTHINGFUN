// src/components/Map.tsx
import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import "../assets/Map.css"; // 引入CSS样式文件
import MAPBOX_ACCESS_TOKEN from "../config"; // 导入配置文件中的token
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(16);
  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        center: [lng, lat],
        zoom: zoom,
      });
      // 添加缩放控件
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // 添加方向控件
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "top-right"
      );

      // 添加比例尺控件
      map.current.addControl(
        new mapboxgl.ScaleControl({
          maxWidth: 80,
          unit: "metric",
        }),
        "bottom-left"
      );
      const size = 1500;

      //   const pulsingDot = {
      //     width: size,
      //     height: size,
      //     data: new Uint8Array(size * size * 4),
      //     onAdd: function () {
      //       const canvas = document.createElement("canvas");
      //       canvas.width = this.width;
      //       canvas.height = this.height;
      //       this.context = canvas.getContext("2d");
      //     },

      //     render: function () {
      //       const duration = 5000;
      //       const t = (performance.now() % duration) / duration;

      //       const radius = (size / 2) * 0.05;
      //       const outerRadius = (size / 2) * 0.7 * t + radius;
      //       const context = this.context;

      //       context.clearRect(0, 0, this.width, this.height);
      //       context.beginPath();
      //       context.arc(
      //         this.width / 2,
      //         this.height / 2,
      //         outerRadius,
      //         0,
      //         Math.PI * 2
      //       );
      //       context.fillStyle = `rgba(100, 155, 100, ${1 - t})`;
      //       context.fill();
      //       context.beginPath();
      //       context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      //       context.fillStyle = "rgba(0, 255, 0, 1)";
      //       context.strokeStyle = "white";
      //       context.lineWidth = 2 + 1 * (1 - t);
      //       context.fill();
      //       context.stroke();

      //       this.data = context.getImageData(0, 0, this.width, this.height).data;

      //       map.current.triggerRepaint();

      //       return true;
      //     },
      //   };
      map.current.on("load", () => {
        // map.current.setMinZoom(16);
        // map.current.setMaxZoom(16);
        // 添加缩放控件
        //   map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        //   // 添加方向控件
        //   map.current.addControl(new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //       enableHighAccuracy: true
        //     },
        //     trackUserLocation: true,
        //     showUserHeading: true
        //   }), "top-right");

        //   // 添加比例尺控件
        //   map.current.addControl(new mapboxgl.ScaleControl({
        //     maxWidth: 80,
        //     unit: 'metric'
        //   }), "bottom-left");
        // 添加 3D 地形
        map.current.addSource("terrain-source", {
          type: "raster-dem",
          url: "mapbox://mapbox.terrain-rgb", // Mapbox 地形瓦片源
        });
        map.current.setTerrain({ source: "terrain-source", exaggeration: 1.5 });
        // 设置光照属性
        map.current.setLight({
          anchor: "viewport", // 将光照锚定到视口
          color: "#fff", // 光照颜色
          intensity: 0.8, // 光照强度
          position: [lng, lat, 8000], // 光照的位置
        });

        navigator.geolocation.getCurrentPosition((position) => {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
          map.current?.setCenter([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          //   map.current.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
          const el = document.createElement("div");
          el.className = "location-icon";
          new mapboxgl.Marker(el)
            .setLngLat([position.coords.longitude, position.coords.latitude])
            .addTo(map.current!);
          map.current.addSource("dot-point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      position.coords.longitude,
                      position.coords.latitude,
                    ],
                  },
                },
              ],
            },
          });
          // Add radar layer for the scanning animation
          map.current.addLayer({
            id: "layer-with-pulsing-dot",
            type: "symbol",
            source: "dot-point",
            layout: {
              "icon-image": "pulsing-dot",
            },
          });
        });
      });
    }
  }, []);
  return (
    <>
      <h1>AnythingFun</h1>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};

export default Map;
