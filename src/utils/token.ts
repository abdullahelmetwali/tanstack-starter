import Cookies from "js-cookie";

const TOKEN_VAR = "your-variable-here";
const GET_TOKEN = () => Cookies.get(TOKEN_VAR);
export const token = GET_TOKEN();