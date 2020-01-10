<style lang ="less" scoped>
.colmap {
  background: #050926;
  position: relative;
  border: .02rem solid rgba(32, 64, 129, 0.71);
  box-shadow: 0rem 0rem .30rem rgb(54, 100, 134) inset;
}
.L {
  position: absolute;
  background-size: 100% 100%;
  width: .20rem;
  height: .20rem;
}
.L:nth-child(1) {
  background-image: url(~@/assets/img/top-left.png);
  top: -.04rem;
  left: -.04rem;
}
.L:nth-child(2) {
  background-image: url(~@/assets/img/top-right.png);
  top: -.04rem;
  right: -.04rem;
}
.L:nth-child(3) {
  background-image: url(~@/assets/img/bot-left.png);
  bottom: -.04rem;
  left: -.04rem;
}
.L:nth-child(4) {
  background-image: url(~@/assets/img/bot-rig.png);
  bottom: -.04rem;
  right: -.04rem;
}
.ec-extension-bmap{
  background:#050926 !important;
}

</style>
<template>
  <div class="colmap" v-on="{ mouseenter: onmouse, mouseleave: offmouse }">
    <div ref="map" class="map" style="background:#050926"></div>
    <div class="kuang">
      <div class="L"></div>
      <div class="L"></div>
      <div class="L"></div>
      <div class="L"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
import "echarts/extension/bmap/bmap";

export default {
  name: "Map",
  data() {
    return {
      chart: echarts.ECharts,
      ifMouseOn: false,
      // const
      bmap: {},
      // mDevGpsX经度， mDevGpsY纬度，mDevStatus0非工作中，mDevStatus1工作中
      mapData: [
        // 拌和站209，碾压机211，摊铺机210
        {
          mDevGpsY: 109.4743093819,
          mDevGpsX: 24.5080777697,
          mDevName: "拌合机ff1",
          mDevStatus: 0,
          colori: "#6996F3",
          mDevTypeName:'拌和站',
          symbol:'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZCQjAzQjt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNEOTk5MDA7fQ0KCS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojODg4ODg4O30NCgkuc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0U1MDAxMzt9DQoJLnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI1NS4yLDE2MS42bC00NC4zLTUwLjFjMCwwLTAuNy0yLjEtNy43LTQuOWwtODIuOS0xNi45YzAsMC0zLjMtMS4yLTkuOCwwbC02MS44LDMzLjJjMCwwLTIuMSwwLjctNS42LDYuMw0KCQlsLTE3LjYsNzEuM2MwLDAtMS40LDQuMiwwLDguNWw1My40LDY0LjJsOTAuNywxMi43bDY5LjktMjIuOWwxNS44LTguMVYxNjEuNnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAyLjIsMTE1LjRjLTYsMC0xMS44LDAuNS0xNy41LDEuNXYyMS4yYzUuNi0xLjIsMTEuNS0xLjksMTcuNS0xLjljNDMuMiwwLDc4LjIsMzMuNiw3OC4yLDc1cy0zNSw3NS03OC4yLDc1DQoJCWMtNiwwLTExLjktMC43LTE3LjUtMS45djIyLjZjNS43LDEsMTEuNiwxLjUsMTcuNSwxLjVjNTUuNiwwLDEwMC43LTQzLjIsMTAwLjctOTYuNVMzNTcuOCwxMTUuNCwzMDIuMiwxMTUuNHoiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDY4LjIsMzIxSDMzLjhjLTUuOSwwLTEwLjgtNC45LTEwLjgtMTAuOHYtMTBjMC01LjksNC45LTEwLjgsMTAuOC0xMC44aDQzNC40YzUuOSwwLDEwLjgsNC45LDEwLjgsMTAuOHYxMA0KCQlDNDc5LDMxNi4xLDQ3NC4xLDMyMSw0NjguMiwzMjF6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI4NSwyOTcuNWgtNi4yYy0zLjcsMC02LjctMy02LjctNi43VjEyMy45YzAtMy43LDMtNi43LDYuNy02LjdoNi4yYzMuNywwLDYuNywzLDYuNyw2Ljd2MTY2LjkNCgkJQzI5MS43LDI5NC41LDI4OC43LDI5Ny41LDI4NSwyOTcuNXoiLz4NCgk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjEwMS4yLDI3Ni4yIDEzMi41LDI4MC42IDE2NC42LDk4LjcgMTMzLjYsOTIuNCAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MyIgcG9pbnRzPSIxMzIuMiwyODAuNiAxNjMuNSwyODQuOSAxOTUuMiwxMDUgMTY0LjMsOTguNiAJIi8+DQoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTI2Ni43LDI1OS42aC02LjJjLTMuNywwLTYuNy0zLTYuNy02Ljd2LTkxLjhjMC0zLjcsMy02LjcsNi43LTYuN2g2LjJjMy43LDAsNi43LDMsNi43LDYuN3Y5MS44DQoJCUMyNzMuNCwyNTYuNiwyNzAuNCwyNTkuNiwyNjYuNywyNTkuNnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDY1LjcsMjg5LjRIMjg4LjJ2LTg3aDEyMS41YzMwLjgsMCw1NiwyNS4yLDU2LDU2VjI4OS40eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00NDUsMzAxLjdINTQuOGMtNS45LDAtMTAuOC00LjktMTAuOC0xMC44di0xMGMwLTUuOSw0LjktMTAuOCwxMC44LTEwLjhINDQ1YzUuOSwwLDEwLjgsNC45LDEwLjgsMTAuOHYxMA0KCQlDNDU1LjgsMjk2LjgsNDUxLDMwMS43LDQ0NSwzMDEuN3oiLz4NCgk8Y2lyY2xlIGNsYXNzPSJzdDQiIGN4PSIzNTIuNyIgY3k9IjMzMC41IiByPSI1OC4yIi8+DQoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMzUyLjciIGN5PSIzMzAuNSIgcj0iMjMuOSIvPg0KCTxjaXJjbGUgY2xhc3M9InN0NCIgY3g9IjE1Ni4zIiBjeT0iMzM0IiByPSI1OC4yIi8+DQoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTU2LjMiIGN5PSIzMzQiIHI9IjIzLjkiLz4NCjwvZz4NCjwvc3ZnPg0K'
        },
        {
          mDevGpsY: 108.4031798089,
          mDevGpsX: 22.9996102015,
          mDevName: "碾压机4",
          mDevStatus: 1,
          fontWeight:'bold',
          colori: "#FEAB67",
          mDevTypeName:'碾压机',
          symbol:'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0Y2QUYwMDt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGQUNBNkU7fQ0KCS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMkYyMzI4O30NCgkuc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6Izg4ODg4ODt9DQoJLnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNEOTk5MDA7fQ0KCS5zdDV7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRTUwMDEzO30NCgkuc3Q2e2ZpbGw6I0Y2QUYwMDt9DQo8L3N0eWxlPg0KPGc+DQoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxOTAuOSwyMzkuMiAxOTAuOSwzNDAuOCA0NzkuMSwzNDAuOCA0NjIuNSwyMzkuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSI0NjQuOCwyNTMuNSA0NjIuNSwyMzkuMiAxOTAuOSwyMzkuMiAxOTAuOSwyNTMuNSAJIi8+DQoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQwOC4yLDI3OWM2My42LDExLjQsNDMuNCwxMDQuMS0xOC41LDkxYy0yMy41LTQuOS00My45LTI3LjUtMzcuMS01Ni4yQzM1Ny42LDI5Mi42LDM3OS45LDI3My45LDQwOC4yLDI3OXoiDQoJCS8+DQoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTQwNSwzMDNjMzEuNCw5LjMsMTYuOCw1MS4yLTEyLjIsNDIuOUMzNjMuMiwzMzcuNCwzNzcsMjk0LjcsNDA1LDMwM3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTI0LjEsMjMwLjJjOTcuMiwxNy41LDY2LjQsMTU5LjItMjguMywxMzkuMmMtMzUuOS03LjYtNjcuMS00Mi01Ni43LTg1LjlDNDYuOCwyNTAuOCw4MC44LDIyMi40LDEyNC4xLDIzMC4yDQoJCXoiLz4NCgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTI0LjYsMjQ2LjFjNzguMiwyMy4yLDQxLjgsMTI3LjctMzAuNCwxMDdDMjAuNSwzMzEuOSw1NC44LDIyNS40LDEyNC42LDI0Ni4xeiIvPg0KCTxnPg0KCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMjYyLjYsOTguN0wyNjIuNiw5OC43Yy03LjYsMC0xMy44LDYtMTMuOCwxMy4zdjEzLjNjMCwxLjIsMC4yLDIuNCwwLjUsMy42aDI2LjVjMC4zLTEuMSwwLjUtMi4zLDAuNS0zLjYNCgkJCVYxMTJDMjc2LjQsMTA0LjcsMjcwLjIsOTguNywyNjIuNiw5OC43eiIvPg0KCQk8cmVjdCB4PSIyNDUuMiIgeT0iMTI1LjMiIGNsYXNzPSJzdDMiIHdpZHRoPSIzNC45IiBoZWlnaHQ9IjguOSIvPg0KCTwvZz4NCgk8cmVjdCB4PSIyMDEuNiIgeT0iMTMzLjgiIGNsYXNzPSJzdDQiIHdpZHRoPSIxMTkuNCIgaGVpZ2h0PSIxOCIvPg0KCTxnPg0KCQk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjIzLjEsMjkwLjggMjMuMSwzMTIuNyAyMzUuMiwzMjAuMiAyMzUuMiwyODMuMyAJCSIvPg0KCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjIzLjEsMjkwLjggMjMuMSwzMDEuMyAyMzUuMiwzMDAuOSAyMzUuMiwyODMuMyAJCSIvPg0KCTwvZz4NCgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTIwLjQsMjc0LjhIOTQuNXYyNS43YzAsNy4yLDUuOCwxMi45LDEyLjksMTIuOWwwLDBjNy4yLDAsMTIuOS01LjgsMTIuOS0xMi45VjI3NC44eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTQuNSwzMDJjMC0zLjgtMy4xLTYuOS02LjktNi45Yy0zLjgsMC02LjksMy4xLTYuOSw2LjljMCwzLjgsMy4xLDYuOSw2LjksNi45DQoJCUMxMTEuNCwzMDguOCwxMTQuNSwzMDUuOCwxMTQuNSwzMDJ6Ii8+DQoJPHJlY3QgeD0iMzg0IiB5PSIxOTYuMiIgY2xhc3M9InN0MCIgd2lkdGg9IjM0LjQiIGhlaWdodD0iNDMiLz4NCgk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjQyMywxMjcuMyAzOTMuOSwxNTIuOSAzOTMuOSwxOTYuMyA0MTEuNSwxOTYuMyA0MTEuNSwxNTcuNCA0MjMuMiwxNDYgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMDEuMiwxNTAuOGwtMTguNiw2NS40bDEwLDIyaDE0NC4zdi0xNi45bC0xNS03MS40QzMyMS45LDE0OS45LDIwMS4yLDE1MC4zLDIwMS4yLDE1MC44eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNTcuOSwxNTguOGMtMjEuNywwLjEtNDAuOCwwLjMtNTAuMSwwLjRsLTE2LDU2LjNsNi40LDE0aDU5LjZWMTU4Ljh6Ii8+DQoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTMxNSwxNTguNWMtMTUuNSwwLjEtMzMuMSwwLjEtNDkuNywwLjJ2NzAuOGg2My4xdi03LjRMMzE1LDE1OC41eiIvPg0KPC9nPg0KPC9zdmc+DQo='
        }
        ,
        {
          mDevGpsY: 108.9,
          mDevGpsX: 23.9996102015,
          mDevName: "摊铺机325",
          mDevStatus: 1,
          colori: "#FEAB67",
          mDevTypeName:'摊铺机',
          symbol:'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0Q5OTkwMDt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNEQkRDREM7fQ0KCS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRjdCNjJEO30NCgkuc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzIzMTkxNjt9DQoJLnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7fQ0KCS5zdDV7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNzE3MTcxO30NCgkuc3Q2e2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0U1MDAxMzt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ3Ny4zLDI1OC4yYy0wLjcsMTAuMy0xLjIsMTguNC0xLjcsMjIuMmMtOC4yLTExLjEtMTgtMjkuOS0zOC45LTM4LjNjLTM1LjctMTQuMi01NS42LTEwLjUtODYuMSwxMS4yDQoJCWMtNSwzLjYtMTQuMSwxNC4yLTE3LjYsMjAuOGMtMTIuMSwyMi42LTEzLjIsMzYuMi05LjcsNjUuNmwtNjIuNi0wLjFjLTIuNS01LjUtMy45LTEyLjEtNi41LTE3LjhjLTIwLjQtNDQuMy04Ny40LTMyLjQtOTIuMywxOC44DQoJCWMtNy44LTMuOS02LjYtNy44LTE1LTMuMWMtMi44LDEuNi0xMC44LDcuMy0xMy42LDkuOGMwLjMsMTAuMSwyLjIsMjQuNC0yLjYsMzIuNmwtMTA5LjQtMS43YzUuMy04LjYsMTMuNC0xLjQsMjAuMS0xNC44DQoJCWMxOC41LTM2LjgsMjEuMS0xNCwyMC40LTUxLjJjLTAuNS0yNS43LTkuNC04LTkuNC0yNy42bDI4LjYsOC41bC0xLjgsMTEuM2MyLjUtMiwwLjQsMCwyLjQtMi41bDYuMS04YzEzLDEuNiwzMS42LDE2LjgsMzcuMSwzMS40DQoJCWM1LjktMy4zLDYuMy02LjksMTMuMi0xNS4yYzYuOS04LjMsNi4yLTcuOSw3LjYtMjEuN2wxMS43LTUuNmwwLjYtMzBsLTExLjgtMC4yYy0yLjktMTguNSwyMS41LTI5LDM1LjItMzMuMmw1MS4xLTE3LjlsMC4xLTQzLjQNCgkJYy0yLjQtOS43LTUsMC45LTUuMi05LjZjLTAuMS0zLjEsMS44LTExLjIsMi4xLTE1LjJjMzAuNyw1LjksMjIuMiwyNy43LDIzLDYxLjZsMTQuOC01LjFjNi4zLTI2LjItMS42LTYxLjgsMTkuNy03NC41DQoJCWM5LjQtNS42LDEyLjctNS4yLDI0LjUtNi43YzAuMy0xMC40LTAuOC0xMS40LDQuNi0xNy4yYzUuOC0xLjIsMTMuOS0yLjIsMTkuMSwwLjVjNS44LDMsNS4yLDksNS40LDE2LjhsNzAuMywwLjVsMTcuOCwxMDkuNQ0KCQljMCwwLTEuMS0xLjUsMTAsMy44QzQ2Mi4xLDIzNSw0NzcuMywyNTguMiw0NzcuMywyNTguMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMzLjksMzYzLjljLTAuMSw2LTAuNywxMS44LTMuMiwxNmwtMTA5LjQtMS43YzUuMi04LjUsMTMuMi0xLjYsMTkuOS0xNC4zSDEzMy45eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MzYuNywyNDIuMmMtNDQuNi03LjktNjQuMy00LjItODYuMSwxMS4yYy01LDMuNi0xNC4xLDE0LjItMTcuNiwyMC44Yy0yLjQsNC41LTQuNCw4LjctNiwxMi43SDE0OC44bDguNS00LjENCgkJbDAuNi0zMGwtMTEuOC0wLjJjLTIuOS0xOC41LDIxLjUtMjksMzUuMi0zMy4ybDUxLjEtMTcuOWwwLjEtNDMuNGMtMi40LTkuNy01LDAuOS01LjItOS42Yy0wLjEtMy4xLDEuOC0xMS4yLDIuMS0xNS4yDQoJCWMzMC43LDUuOSwyMi4yLDI3LjcsMjMsNjEuNmwxNC44LTUuMWM2LjMtMjYuMi0xLjYtNjEuOCwxOS43LTc0LjVjOS40LTUuNiwxMi43LTUuMiwyNC41LTYuN2MwLjMtMTAuNC0wLjgtMTEuNCw0LjYtMTcuMg0KCQljNS44LTEuMiwxMy45LTIuMiwxOS4xLDAuNWM1LjgsMyw1LjIsOSw1LjQsMTYuOGw2OC44LDAuNUw0MzYuNywyNDIuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNDEwLjIsMjUxLjFjMTkuNCwyLjUsMzMuOCwxMS42LDQzLjIsMjMuOWMxNi4zLDIxLjQsMTkuOSw1Ni42LDUuNiw3OWMtMS43LDIuNi0xLjksMi41LTMuNCw0LjkNCgkJYy0xLjQsMi4yLTEuNSwzLjEtMy4xLDUuMmMtOS43LDEzLTM2LjMsMjcuMS01OS42LDIzLjNjLTM1LjUtNS45LTYxLTQwLjgtNTYuMy03N0MzNDEuMiwyNzUuNSwzNzEuMSwyNDYuMSw0MTAuMiwyNTEuMXoiLz4NCgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNDAyLjIsMjE1LjZjLTYuMyw1LjEtNDAuNiw0LjQtNTEuNiw1LjhjLTYuNywwLjgtNS4zLDAuNS04LjQsNC45TDMyMi41LDI1MmwtMzQuNCwwLjFsOC41LTEwMS43DQoJCWMxLjEtMTEsMS42LTE0LjEsMTIuNC0xNC4ybDgwLDAuM0w0MDIuMiwyMTUuNnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjE4LjksMzA0LjljMTguMywzLjMsMzYuMSwyNC42LDMxLjYsNDguN2MtMy42LDE5LjMtMjIuOSwzOC40LTQ2LjUsMzMuNUMxNTMuNCwzNzYuNiwxNjUsMjk1LDIxOC45LDMwNC45eiINCgkJLz4NCgk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNNDA5LjIsMjg2LjljMzIuMiw4LjMsMjkuNSw0OC41LDExLjIsNTkuMWMtNyw0LjEtMTYuMSw3LjUtMjYsNC42QzM1My41LDMzOC43LDM3MS4zLDI3Ny4yLDQwOS4yLDI4Ni45eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDYiIGQ9Ik0zOTIuMywyMjEuN2wtNDYuMyw0LjZsMC4zLTE3LjRjOS45LTYuOSwxNC41LTQuMiwyOC00LjdjMS44LTE5LjUtNS43LTMxLjEsMTcuNS0yOS44TDM5Mi4zLDIyMS43eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0yMTguNywzMjcuOGMyNC4zLDExLjgsNS44LDQ3LjItMTUuNSwzNi4zQzE3OS44LDM1Mi4xLDE5Ni41LDMxNy4xLDIxOC43LDMyNy44eiIvPg0KPC9nPg0KPC9zdmc+DQo='
        }
      ],
      // 公共样式
      styles:{
        // 工作中
        onWorkC: "#FEAB67",
        // 非工作中颜色
        offWorkC: "#6996F3",
        symbol209: 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZCQjAzQjt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNEOTk5MDA7fQ0KCS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojODg4ODg4O30NCgkuc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0U1MDAxMzt9DQoJLnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI1NS4yLDE2MS42bC00NC4zLTUwLjFjMCwwLTAuNy0yLjEtNy43LTQuOWwtODIuOS0xNi45YzAsMC0zLjMtMS4yLTkuOCwwbC02MS44LDMzLjJjMCwwLTIuMSwwLjctNS42LDYuMw0KCQlsLTE3LjYsNzEuM2MwLDAtMS40LDQuMiwwLDguNWw1My40LDY0LjJsOTAuNywxMi43bDY5LjktMjIuOWwxNS44LTguMVYxNjEuNnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAyLjIsMTE1LjRjLTYsMC0xMS44LDAuNS0xNy41LDEuNXYyMS4yYzUuNi0xLjIsMTEuNS0xLjksMTcuNS0xLjljNDMuMiwwLDc4LjIsMzMuNiw3OC4yLDc1cy0zNSw3NS03OC4yLDc1DQoJCWMtNiwwLTExLjktMC43LTE3LjUtMS45djIyLjZjNS43LDEsMTEuNiwxLjUsMTcuNSwxLjVjNTUuNiwwLDEwMC43LTQzLjIsMTAwLjctOTYuNVMzNTcuOCwxMTUuNCwzMDIuMiwxMTUuNHoiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDY4LjIsMzIxSDMzLjhjLTUuOSwwLTEwLjgtNC45LTEwLjgtMTAuOHYtMTBjMC01LjksNC45LTEwLjgsMTAuOC0xMC44aDQzNC40YzUuOSwwLDEwLjgsNC45LDEwLjgsMTAuOHYxMA0KCQlDNDc5LDMxNi4xLDQ3NC4xLDMyMSw0NjguMiwzMjF6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI4NSwyOTcuNWgtNi4yYy0zLjcsMC02LjctMy02LjctNi43VjEyMy45YzAtMy43LDMtNi43LDYuNy02LjdoNi4yYzMuNywwLDYuNywzLDYuNyw2Ljd2MTY2LjkNCgkJQzI5MS43LDI5NC41LDI4OC43LDI5Ny41LDI4NSwyOTcuNXoiLz4NCgk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjEwMS4yLDI3Ni4yIDEzMi41LDI4MC42IDE2NC42LDk4LjcgMTMzLjYsOTIuNCAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MyIgcG9pbnRzPSIxMzIuMiwyODAuNiAxNjMuNSwyODQuOSAxOTUuMiwxMDUgMTY0LjMsOTguNiAJIi8+DQoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTI2Ni43LDI1OS42aC02LjJjLTMuNywwLTYuNy0zLTYuNy02Ljd2LTkxLjhjMC0zLjcsMy02LjcsNi43LTYuN2g2LjJjMy43LDAsNi43LDMsNi43LDYuN3Y5MS44DQoJCUMyNzMuNCwyNTYuNiwyNzAuNCwyNTkuNiwyNjYuNywyNTkuNnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDY1LjcsMjg5LjRIMjg4LjJ2LTg3aDEyMS41YzMwLjgsMCw1NiwyNS4yLDU2LDU2VjI4OS40eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00NDUsMzAxLjdINTQuOGMtNS45LDAtMTAuOC00LjktMTAuOC0xMC44di0xMGMwLTUuOSw0LjktMTAuOCwxMC44LTEwLjhINDQ1YzUuOSwwLDEwLjgsNC45LDEwLjgsMTAuOHYxMA0KCQlDNDU1LjgsMjk2LjgsNDUxLDMwMS43LDQ0NSwzMDEuN3oiLz4NCgk8Y2lyY2xlIGNsYXNzPSJzdDQiIGN4PSIzNTIuNyIgY3k9IjMzMC41IiByPSI1OC4yIi8+DQoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMzUyLjciIGN5PSIzMzAuNSIgcj0iMjMuOSIvPg0KCTxjaXJjbGUgY2xhc3M9InN0NCIgY3g9IjE1Ni4zIiBjeT0iMzM0IiByPSI1OC4yIi8+DQoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTU2LjMiIGN5PSIzMzQiIHI9IjIzLjkiLz4NCjwvZz4NCjwvc3ZnPg0K',
        symbol211: 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0Y2QUYwMDt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGQUNBNkU7fQ0KCS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMkYyMzI4O30NCgkuc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6Izg4ODg4ODt9DQoJLnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNEOTk5MDA7fQ0KCS5zdDV7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRTUwMDEzO30NCgkuc3Q2e2ZpbGw6I0Y2QUYwMDt9DQo8L3N0eWxlPg0KPGc+DQoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxOTAuOSwyMzkuMiAxOTAuOSwzNDAuOCA0NzkuMSwzNDAuOCA0NjIuNSwyMzkuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSI0NjQuOCwyNTMuNSA0NjIuNSwyMzkuMiAxOTAuOSwyMzkuMiAxOTAuOSwyNTMuNSAJIi8+DQoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQwOC4yLDI3OWM2My42LDExLjQsNDMuNCwxMDQuMS0xOC41LDkxYy0yMy41LTQuOS00My45LTI3LjUtMzcuMS01Ni4yQzM1Ny42LDI5Mi42LDM3OS45LDI3My45LDQwOC4yLDI3OXoiDQoJCS8+DQoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTQwNSwzMDNjMzEuNCw5LjMsMTYuOCw1MS4yLTEyLjIsNDIuOUMzNjMuMiwzMzcuNCwzNzcsMjk0LjcsNDA1LDMwM3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTI0LjEsMjMwLjJjOTcuMiwxNy41LDY2LjQsMTU5LjItMjguMywxMzkuMmMtMzUuOS03LjYtNjcuMS00Mi01Ni43LTg1LjlDNDYuOCwyNTAuOCw4MC44LDIyMi40LDEyNC4xLDIzMC4yDQoJCXoiLz4NCgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTI0LjYsMjQ2LjFjNzguMiwyMy4yLDQxLjgsMTI3LjctMzAuNCwxMDdDMjAuNSwzMzEuOSw1NC44LDIyNS40LDEyNC42LDI0Ni4xeiIvPg0KCTxnPg0KCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMjYyLjYsOTguN0wyNjIuNiw5OC43Yy03LjYsMC0xMy44LDYtMTMuOCwxMy4zdjEzLjNjMCwxLjIsMC4yLDIuNCwwLjUsMy42aDI2LjVjMC4zLTEuMSwwLjUtMi4zLDAuNS0zLjYNCgkJCVYxMTJDMjc2LjQsMTA0LjcsMjcwLjIsOTguNywyNjIuNiw5OC43eiIvPg0KCQk8cmVjdCB4PSIyNDUuMiIgeT0iMTI1LjMiIGNsYXNzPSJzdDMiIHdpZHRoPSIzNC45IiBoZWlnaHQ9IjguOSIvPg0KCTwvZz4NCgk8cmVjdCB4PSIyMDEuNiIgeT0iMTMzLjgiIGNsYXNzPSJzdDQiIHdpZHRoPSIxMTkuNCIgaGVpZ2h0PSIxOCIvPg0KCTxnPg0KCQk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjIzLjEsMjkwLjggMjMuMSwzMTIuNyAyMzUuMiwzMjAuMiAyMzUuMiwyODMuMyAJCSIvPg0KCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjIzLjEsMjkwLjggMjMuMSwzMDEuMyAyMzUuMiwzMDAuOSAyMzUuMiwyODMuMyAJCSIvPg0KCTwvZz4NCgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTIwLjQsMjc0LjhIOTQuNXYyNS43YzAsNy4yLDUuOCwxMi45LDEyLjksMTIuOWwwLDBjNy4yLDAsMTIuOS01LjgsMTIuOS0xMi45VjI3NC44eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTQuNSwzMDJjMC0zLjgtMy4xLTYuOS02LjktNi45Yy0zLjgsMC02LjksMy4xLTYuOSw2LjljMCwzLjgsMy4xLDYuOSw2LjksNi45DQoJCUMxMTEuNCwzMDguOCwxMTQuNSwzMDUuOCwxMTQuNSwzMDJ6Ii8+DQoJPHJlY3QgeD0iMzg0IiB5PSIxOTYuMiIgY2xhc3M9InN0MCIgd2lkdGg9IjM0LjQiIGhlaWdodD0iNDMiLz4NCgk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjQyMywxMjcuMyAzOTMuOSwxNTIuOSAzOTMuOSwxOTYuMyA0MTEuNSwxOTYuMyA0MTEuNSwxNTcuNCA0MjMuMiwxNDYgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMDEuMiwxNTAuOGwtMTguNiw2NS40bDEwLDIyaDE0NC4zdi0xNi45bC0xNS03MS40QzMyMS45LDE0OS45LDIwMS4yLDE1MC4zLDIwMS4yLDE1MC44eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNTcuOSwxNTguOGMtMjEuNywwLjEtNDAuOCwwLjMtNTAuMSwwLjRsLTE2LDU2LjNsNi40LDE0aDU5LjZWMTU4Ljh6Ii8+DQoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTMxNSwxNTguNWMtMTUuNSwwLjEtMzMuMSwwLjEtNDkuNywwLjJ2NzAuOGg2My4xdi03LjRMMzE1LDE1OC41eiIvPg0KPC9nPg0KPC9zdmc+DQo=',
        symbol210: 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAwIDUwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0Q5OTkwMDt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNEQkRDREM7fQ0KCS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRjdCNjJEO30NCgkuc3Qze2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzIzMTkxNjt9DQoJLnN0NHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7fQ0KCS5zdDV7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNzE3MTcxO30NCgkuc3Q2e2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0U1MDAxMzt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ3Ny4zLDI1OC4yYy0wLjcsMTAuMy0xLjIsMTguNC0xLjcsMjIuMmMtOC4yLTExLjEtMTgtMjkuOS0zOC45LTM4LjNjLTM1LjctMTQuMi01NS42LTEwLjUtODYuMSwxMS4yDQoJCWMtNSwzLjYtMTQuMSwxNC4yLTE3LjYsMjAuOGMtMTIuMSwyMi42LTEzLjIsMzYuMi05LjcsNjUuNmwtNjIuNi0wLjFjLTIuNS01LjUtMy45LTEyLjEtNi41LTE3LjhjLTIwLjQtNDQuMy04Ny40LTMyLjQtOTIuMywxOC44DQoJCWMtNy44LTMuOS02LjYtNy44LTE1LTMuMWMtMi44LDEuNi0xMC44LDcuMy0xMy42LDkuOGMwLjMsMTAuMSwyLjIsMjQuNC0yLjYsMzIuNmwtMTA5LjQtMS43YzUuMy04LjYsMTMuNC0xLjQsMjAuMS0xNC44DQoJCWMxOC41LTM2LjgsMjEuMS0xNCwyMC40LTUxLjJjLTAuNS0yNS43LTkuNC04LTkuNC0yNy42bDI4LjYsOC41bC0xLjgsMTEuM2MyLjUtMiwwLjQsMCwyLjQtMi41bDYuMS04YzEzLDEuNiwzMS42LDE2LjgsMzcuMSwzMS40DQoJCWM1LjktMy4zLDYuMy02LjksMTMuMi0xNS4yYzYuOS04LjMsNi4yLTcuOSw3LjYtMjEuN2wxMS43LTUuNmwwLjYtMzBsLTExLjgtMC4yYy0yLjktMTguNSwyMS41LTI5LDM1LjItMzMuMmw1MS4xLTE3LjlsMC4xLTQzLjQNCgkJYy0yLjQtOS43LTUsMC45LTUuMi05LjZjLTAuMS0zLjEsMS44LTExLjIsMi4xLTE1LjJjMzAuNyw1LjksMjIuMiwyNy43LDIzLDYxLjZsMTQuOC01LjFjNi4zLTI2LjItMS42LTYxLjgsMTkuNy03NC41DQoJCWM5LjQtNS42LDEyLjctNS4yLDI0LjUtNi43YzAuMy0xMC40LTAuOC0xMS40LDQuNi0xNy4yYzUuOC0xLjIsMTMuOS0yLjIsMTkuMSwwLjVjNS44LDMsNS4yLDksNS40LDE2LjhsNzAuMywwLjVsMTcuOCwxMDkuNQ0KCQljMCwwLTEuMS0xLjUsMTAsMy44QzQ2Mi4xLDIzNSw0NzcuMywyNTguMiw0NzcuMywyNTguMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMzLjksMzYzLjljLTAuMSw2LTAuNywxMS44LTMuMiwxNmwtMTA5LjQtMS43YzUuMi04LjUsMTMuMi0xLjYsMTkuOS0xNC4zSDEzMy45eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MzYuNywyNDIuMmMtNDQuNi03LjktNjQuMy00LjItODYuMSwxMS4yYy01LDMuNi0xNC4xLDE0LjItMTcuNiwyMC44Yy0yLjQsNC41LTQuNCw4LjctNiwxMi43SDE0OC44bDguNS00LjENCgkJbDAuNi0zMGwtMTEuOC0wLjJjLTIuOS0xOC41LDIxLjUtMjksMzUuMi0zMy4ybDUxLjEtMTcuOWwwLjEtNDMuNGMtMi40LTkuNy01LDAuOS01LjItOS42Yy0wLjEtMy4xLDEuOC0xMS4yLDIuMS0xNS4yDQoJCWMzMC43LDUuOSwyMi4yLDI3LjcsMjMsNjEuNmwxNC44LTUuMWM2LjMtMjYuMi0xLjYtNjEuOCwxOS43LTc0LjVjOS40LTUuNiwxMi43LTUuMiwyNC41LTYuN2MwLjMtMTAuNC0wLjgtMTEuNCw0LjYtMTcuMg0KCQljNS44LTEuMiwxMy45LTIuMiwxOS4xLDAuNWM1LjgsMyw1LjIsOSw1LjQsMTYuOGw2OC44LDAuNUw0MzYuNywyNDIuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNDEwLjIsMjUxLjFjMTkuNCwyLjUsMzMuOCwxMS42LDQzLjIsMjMuOWMxNi4zLDIxLjQsMTkuOSw1Ni42LDUuNiw3OWMtMS43LDIuNi0xLjksMi41LTMuNCw0LjkNCgkJYy0xLjQsMi4yLTEuNSwzLjEtMy4xLDUuMmMtOS43LDEzLTM2LjMsMjcuMS01OS42LDIzLjNjLTM1LjUtNS45LTYxLTQwLjgtNTYuMy03N0MzNDEuMiwyNzUuNSwzNzEuMSwyNDYuMSw0MTAuMiwyNTEuMXoiLz4NCgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNDAyLjIsMjE1LjZjLTYuMyw1LjEtNDAuNiw0LjQtNTEuNiw1LjhjLTYuNywwLjgtNS4zLDAuNS04LjQsNC45TDMyMi41LDI1MmwtMzQuNCwwLjFsOC41LTEwMS43DQoJCWMxLjEtMTEsMS42LTE0LjEsMTIuNC0xNC4ybDgwLDAuM0w0MDIuMiwyMTUuNnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjE4LjksMzA0LjljMTguMywzLjMsMzYuMSwyNC42LDMxLjYsNDguN2MtMy42LDE5LjMtMjIuOSwzOC40LTQ2LjUsMzMuNUMxNTMuNCwzNzYuNiwxNjUsMjk1LDIxOC45LDMwNC45eiINCgkJLz4NCgk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNNDA5LjIsMjg2LjljMzIuMiw4LjMsMjkuNSw0OC41LDExLjIsNTkuMWMtNyw0LjEtMTYuMSw3LjUtMjYsNC42QzM1My41LDMzOC43LDM3MS4zLDI3Ny4yLDQwOS4yLDI4Ni45eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDYiIGQ9Ik0zOTIuMywyMjEuN2wtNDYuMyw0LjZsMC4zLTE3LjRjOS45LTYuOSwxNC41LTQuMiwyOC00LjdjMS44LTE5LjUtNS43LTMxLjEsMTcuNS0yOS44TDM5Mi4zLDIyMS43eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0yMTguNywzMjcuOGMyNC4zLDExLjgsNS44LDQ3LjItMTUuNSwzNi4zQzE3OS44LDM1Mi4xLDE5Ni41LDMxNy4xLDIxOC43LDMyNy44eiIvPg0KPC9nPg0KPC9zdmc+DQo='
      },
      legendData: [],
      centerXY: [108, 24],
      mapZoom: 6,
      trainIcon: `path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z`
      // trainIcon:`image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7`
    };
  },
  props: ["data","colorType"],
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (this.ifMouseOn && oldVal === []) {
          // 如果鼠标移动上去则不更新map
          return
        }
        console.log(JSON.stringify(newVal));

        // 测试时可以去掉开始
        newVal.map((item, index, array) => {
          if (index == 0) {
            this.centerXY = [item.mDevGpsX, item.mDevGpsY];
          }
          // 状态
          if (item.mDevStatus === 1) {
            item.colori = this.styles.onWorkC;
            
          } else {
            item.colori = this.styles.offWorkC;
            item.fontWeight = 'blod'
          }
          // 拌和站209，碾压机211，摊铺机210
          if(item.mDevType===209){
            item.symbol = this.styles.symbol209
          }else if(item.mDevType === 211){
            item.symbol =  this.styles.symbol211
          }else if(item.mDevType === 210){
            item.symbol =  this.styles.symbol210
          }
        });
        
        this.mapData = newVal;
        // 测试时可以去掉结束
        this.initMap();
      }
    },
    deep: true
  },
  mounted() {
    // this.initMap()
  },
  methods: {
    onmouse () {
      console.log("鼠标上去了")
      this.ifMouseOn = true
    },
    offmouse () {
      console.log("鼠标下来了")
      this.ifMouseOn = false
    },
    initMap() {
      this.chart = echarts.init(this.$refs.map);
      // this.getEffectData();

      this.chart.setOption({
        animation: false,
        // color: ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF'],
        dataRange: {
          x: "left",
          y: "top",
          splitList: [
            { start: 1, end: 1, label: "生产中",color:  this.styles.onWorkC },
            { start: 0, end: 0, label: "未生产", color: this.styles.offWorkC }
          ],
          textStyle:{
            color: '#14C6CA',
            fontSize: '16'
          }
        },
        bmap: {
          // 加载 bmap 组件
          center: this.centerXY,
          zoom: 8, // 地图当前的缩放比例
          roam: true // 开启鼠标缩放和平移漫游
          // scaleLimit: { min: 6, max: 12 } // echarts设置地图最小最大缩放比例的接口不起作用，要使用百度地图的接口设置
        },
        series: [
          // ...this.effectScatterSeries // 带有涟漪特效动画的散点（气泡）图
          {
          name: "设备状态",
          type: "effectScatter", // 带有涟漪特效动画的散点（气泡）图
          coordinateSystem: "bmap",
          symbol: this.trainIcon, // 使用自定义的SVG图标
          symbolSize: [50, 50],
          legendHoverLink: false,
          z: 6,
          effectType: "ripple",
          rippleEffect: {
            period: 2, // 涟漪特效的动画周期
            scale: 1, // 涟漪特效动画中波纹的最大缩放比例
            brushType: "fill" // 涟漪特效的波纹绘制方式
          },
          
          itemStyle: {

           color: {
              color:'#fff'
          }
           
          },
          data: this.mapData.map(function(itemOpt) {
            return {
              name: itemOpt.mDevName,
              value: [itemOpt.mDevGpsX, itemOpt.mDevGpsY, itemOpt.mDevName,itemOpt.colori],
              itemStyle: {
                color: itemOpt.colori
              },
              symbol:itemOpt.symbol,
              label: {
                show: true,
                position: "top",
                formatter: "{b}",
                color:itemOpt.colori,
                fontWeight: itemOpt.fontWeight,
                fontSize : 14
              }
          };
        })
          }
        ]
      });

      // 获取百度地图实例，使用百度地图自带的控件
      this.bmap = this.chart
        .getModel()
        .getComponent("bmap")
        .getBMap();
        if(this.colorType === 1 ){
          // 2b374d2c0e734558c2d30833e38775c6
          this.bmap.setMapStyleV2({
        styleId: "2b374d2c0e734558c2d30833e38775c6"
      });
        }else{
          this.bmap.setMapStyleV2({
        styleId: "21b4d884a2b1cd35fc79647a94a86a94"
      });
        }
      
      this.bmap.setMinZoom(6); // 设置地图最小缩放比例
      this.bmap.setMaxZoom(12); // 设置地图最大缩放比例
      // this.bmap.addControl(new BMap.MapTypeControl({ mapTypes: [] })) // 不显示地图右上方的控件
      this.bmap.addControl(
        new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })
      ); // 在左下角显示比例尺控件
      const _this = this;
      // 监听地图比例缩放， 可以根据缩放等级控制某些图标的显示
      this.bmap.addEventListener("zoomend", function() {
        _this.mapZoom = _this.bmap.getZoom();
      });
    }

  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
