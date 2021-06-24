import {authenticate} from "passport";
const BearerAuthenticate = authenticate('bearer', {session: false})
export default BearerAuthenticate