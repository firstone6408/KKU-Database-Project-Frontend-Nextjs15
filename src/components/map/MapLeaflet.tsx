/** @format */

"use client";

import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";

const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

type LatLng = [number, number];

type LocationMarkerType = {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
  isMarker: boolean;
};

// component ใหม่
function LocationMarker({
  position,
  setPosition,
  isMarker,
}: LocationMarkerType) {
  if (isMarker) {
    const map = useMapEvents({
      // click แล้วบันทึกตำแหน่ง
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]); // set ตำแหน่งที่ได้จากการ click
        map.flyTo(e.latlng); // ย้ายตำแหน่ง
      },
    });
  }

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

type MapType = {
  location?: { lat: number; lng: number };
  setValue?: (value: { lat: number; lng: number }) => void;
  title?: any;
  defaultLocation?: LatLng | [13, 100];
  value?: { lat: number; lng: number };
  isMarker?: boolean;
};

export default function Map({
  location,
  setValue,
  title,
  defaultLocation,
  value,
  isMarker,
}: MapType) {
  const _defaultLocation: LatLng = defaultLocation
    ? defaultLocation
    : [13, 100];
  const [position, setPosition] = useState<LatLng | null>(null);

  //console.log(position);

  useEffect(() => {
    if (position && setValue) {
      setValue({ lat: position[0], lng: position[1] });
    }
  }, [position]);

  useEffect(() => {
    if (value) {
      if (
        !position ||
        position[0] !== value.lat ||
        position[1] !== value.lng
      ) {
        setPosition([value.lat, value.lng]);
      }
    }
  }, [value]);

  return (
    <div>
      {title ? (
        title
      ) : (
        <Label className="font-semibold text-xl">แผนที่</Label>
      )}

      <MapContainer
        className="h-[80vh] rounded-lg z-0 relative"
        center={location || _defaultLocation}
        zoom={7}
        scrollWheelZoom={true}
      >
        {/* <Marker position={location || defaultLocation} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}

        {/* เรียกใช้ LocationMarker */}
        <LocationMarker
          isMarker={isMarker ? isMarker : false}
          position={position}
          setPosition={setPosition}
        />

        {/* รูปแบบการแสดง Map */}
        {/* 
        ไปหาใน https://leaflet-extras.github.io/leaflet-providers/preview/?ref=enmilocalfunciona.io
        แล้ว copy url เฉพาะ L.tileLayer(<url>)
        */}
        <LayersControl>
          <LayersControl.BaseLayer name="Openstreetmap" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stadia Maps" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="ESRI Imagery" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
