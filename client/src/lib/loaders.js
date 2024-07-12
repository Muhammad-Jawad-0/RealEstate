import apiRequest from "./apiRequest";

const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/posts/" + params.id);
    return res.data
};

export {
    singlePageLoader,
} 