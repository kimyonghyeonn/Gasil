<template>
  <div>
    <!-- 검색창 영역 (Element Plus) -->
    <div class="search-bar">
      <el-input
        v-model="searchAddress"
        placeholder="주소를 입력하세요"
        style="width: 300px; margin-right: 10px"
        @keyup.enter="searchLocation"
      />
      <el-button type="primary" @click="searchLocation">검색</el-button>
    </div>

    <!-- 지도 영역 -->
    <div id="map" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus"; // 알림용 메시지

let map = null;
let marker = null;
const searchAddress = ref("");

function initializeMap(lat, lng) {
  const container = document.getElementById("map");
  const options = {
    center: new window.kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  map = new window.kakao.maps.Map(container, options);

  marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
    map: map,
  });
}

function moveMarker(lat, lng) {
  const newPosition = new window.kakao.maps.LatLng(lat, lng);
  map.setCenter(newPosition);
  marker.setPosition(newPosition);
}

function searchLocation() {
  if (!searchAddress.value) {
    ElMessage.warning("주소를 입력해주세요.");
    return;
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(searchAddress.value, function (result, status) {
    if (status === window.kakao.maps.services.Status.OK) {
      const lat = result[0].y;
      const lng = result[0].x;
      console.log("검색 성공:", lat, lng);
      moveMarker(lat, lng);
    } else {
      ElMessage.error("검색 결과가 없습니다.");
    }
  });
}

function loadKakaoMap() {
  if (window.kakao && window.kakao.maps) {
    initializeMap(37.5665, 126.978);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          moveMarker(lat, lng);
        },
        (error) => {
          console.error("내 위치를 가져오는 데 실패했습니다.", error);
        }
      );
    }
  } else {
    console.error("kakao maps가 아직 로드되지 않았습니다.");
  }
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(() => {
      loadKakaoMap();
    });
  } else {
    const script = document.querySelector('script[src*="dapi.kakao.com"]');
    if (script) {
      script.addEventListener("load", () => {
        loadKakaoMap();
      });
    } else {
      console.error("Kakao SDK 스크립트를 찾을 수 없습니다.");
    }
  }
});
</script>

<style scoped>
.search-bar {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: white;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
