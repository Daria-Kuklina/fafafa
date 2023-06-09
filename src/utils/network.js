export const postData = async (path, body) => {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`/api/v1${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};


export const uploadImage = async (photo) => {
  // const headers = { "Content-Type": "multipart/form-data>" };
  const formData = new FormData()

  // const token = localStorage.getItem("token");
  // if (token) headers["Authorization"] = `Bearer ${token}`;

  formData.append("photo", photo, photo.name)

  console.log(photo)
  const response = await fetch("/api/v1/photos/create", {
    method: "POST",
    // headers,
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};

export const uploadModel = async (model) => {
  // const headers = { "Content-Type": "multipart/form-data>" };
  const formData = new FormData()

  // const token = localStorage.getItem("token");
  // if (token) headers["Authorization"] = `Bearer ${token}`;

  formData.append("model", model, model.name)

  console.log(model)
  const response = await fetch("/api/v1/models/create", {
    method: "POST",
    // headers,
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};

export const uploadGroup = async (group) => {
  // const headers = { "Content-Type": "multipart/form-data>" };
  const formData = new FormData()

  // const token = localStorage.getItem("token");
  // if (token) headers["Authorization"] = `Bearer ${token}`;

  formData.append("group", group, group.name)

  console.log(group)
  const response = await fetch("/api/v1/groups/create", {
    method: "POST",
    // headers,
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};

export const getData = async (path, body) => {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`/api/v1${path}`, {
    method: "GET",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((error) => ({
      error,
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};
