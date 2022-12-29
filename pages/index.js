/* eslint-disable @next/next/no-sync-scripts */

import Head from "next/head";
import { useEffect } from "react";
export default function Home() {
  //스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    //카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=15bc3e353ca7c2b385abcf010b802f96"
    );

    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.49956334371897, 127.03543077147464), //좌표설정
          level: 4,
        };
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(
          37.49956334371897,
          127.03543077147464
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    });
  }, []);
  return (
    <>
      <Head>
        <title>kakao api test</title>
        {/* kakaomap */}
        <script
          type="text/javascript"
          src="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=15bc3e353ca7c2b385abcf010b802f96"
        ></script>
      </Head>
      <div className="App">
        <div id="map" className="map" />
      </div>
    </>
  );
}
