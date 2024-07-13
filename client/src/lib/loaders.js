import apiRequest from "./apiRequest.js";

// const singlePageLoader = async ({ request, params }) => {
//     const res = await apiRequest("/posts/" + params.id);
//     return res.data
// };

// export {
//     singlePageLoader,
// } 

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
  };