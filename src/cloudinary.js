const CLOUD_NAME = "dviuulgv6";
const UPLOAD_PRESET = "shot_flicks_portfolio"; // unsigned preset — create this in Cloudinary dashboard

export async function uploadToCloudinary(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "shot-flicks");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      if (xhr.status === 200) resolve(res);
      else reject(new Error(res.error?.message || "Upload failed"));
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(formData);
  });
}
