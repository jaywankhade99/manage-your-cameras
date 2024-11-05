// src/api.js
const BASE_URL = "https://api-app-staging.wobot.ai/app/v1";
const AUTH_TOKEN = "4ApVMIn5sTxeW7GQ5VWeWiy";

export const fetchCameras = async () => {
  const response = await fetch(`${BASE_URL}/fetch/cameras`, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return response.json();
};

export const updateCameraStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/update/camera/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id, status }),
  });
  console.log(response);

  return response.json();
};
