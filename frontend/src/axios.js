import axios from 'axios'
const instance=axios.create({
    baseURL:'https://mern--chat--app--backend.herokuapp.com'
})
export default instance