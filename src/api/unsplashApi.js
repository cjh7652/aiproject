import axios from "axios";

const UNSPLASH_KEY = "UBGWTeCrfnuF0a5Mf13Nw1aKFocbEtJ9DzL9Hss9Ums";

export const fetchPlaceImage = async (query) => {
  try {
    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          per_page: 1,
          orientation: "landscape",
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_KEY}`,
        },
      }
    );
    console.log(res.data);

    // 이미지 없을 경우 대비
    if (res.data.results.length === 0) {
      return "/img/no-image.jpg";
    }

    return res.data.results[0].urls.small;

  } catch (err) {
    console.error("Unsplash Error:", err);
    return "/img/no-image.jpg";
  }
};