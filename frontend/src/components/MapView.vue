<template>
  <div>
    <!-- 🔵 검색창 + 결과를 감싸는 Wrapper -->
    <div class="search-wrapper">
      <div class="search-bar">
        <el-input
          v-model="searchAddress"
          placeholder="장소나 주소를 입력하세요"
          style="width: 300px; margin-right: 10px"
          @keyup.enter="searchLocation"
        />
        <el-button type="primary" @click="searchLocation">검색</el-button>
      </div>

      <!-- 🔵 검색 결과 목록 -->
      <div v-if="places.length > 0" class="result-list">
        <el-scrollbar height="400px">
          <ul>
            <li
              v-for="(place, index) in places"
              :key="index"
              @click="moveToPlace(place)"
              style="
                padding: 10px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
              "
            >
              <strong>{{ place.place_name }}</strong
              ><br />
              <small>{{ place.road_address_name || place.address_name }}</small>
            </li>
          </ul>
          <div>목록 닫기</div>
        </el-scrollbar>
      </div>
    </div>

    <!-- 지도 -->
    <div id="map" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

let map = null;
let markers = [];
const searchAddress = ref("");
const places = ref([]);

function initializeMap(lat, lng) {
  const container = document.getElementById("map");
  const options = {
    center: new window.kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  map = new window.kakao.maps.Map(container, options);
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function searchLocation() {
  if (!searchAddress.value) {
    ElMessage.warning("검색어를 입력하세요.");
    return;
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(searchAddress.value, (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      places.value = data;
      clearMarkers();

      const bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        const lat = data[i].y;
        const lng = data[i].x;

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          map: map,
        });

        markers.push(marker);
        bounds.extend(new window.kakao.maps.LatLng(lat, lng));
      }

      map.setBounds(bounds);
    } else {
      places.value = [];
      clearMarkers();
      ElMessage.error("검색 결과가 없습니다.");
    }
  });
}

function moveToPlace(place) {
  const lat = place.y;
  const lng = place.x;

  map.setCenter(new window.kakao.maps.LatLng(lat, lng));

  clearMarkers();
  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
    map: map,
  });
  markers.push(marker);
}

function loadKakaoMap() {
  if (window.kakao && window.kakao.maps) {
    initializeMap(37.5665, 126.978);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        },
        (error) => {
          console.error("현재 위치 가져오기 실패", error);
        }
      );
    }
  } else {
    console.error("kakao maps가 아직 로드되지 않았습니다.");
  }
}

// onMounted(() => {
//   if (window.kakao && window.kakao.maps) {
//     window.kakao.maps.load(() => {
//       loadKakaoMap();
//     });
//   } else {
//     const script = document.querySelector('script[src*="dapi.kakao.com"]');
//     if (script) {
//       script.addEventListener("load", () => {
//         loadKakaoMap();
//       });
//     } else {
//       console.error("Kakao SDK 스크립트를 찾을 수 없습니다.");
//     }
//   }
// });
onMounted(() => {
  const kakaoMapScriptId = "kakao-map-script";
  const existingScript = document.getElementById(kakaoMapScriptId);

  if (!existingScript) {
    const script = document.createElement("script");
    script.id = kakaoMapScriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_APP_KEY
    }&autoload=false&libraries=services`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        loadKakaoMap();
      });
    };
    document.head.appendChild(script);
  } else {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        loadKakaoMap();
      });
    }
  }
});
</script>

<style scoped>
.search-wrapper {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.result-list {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
</style>
