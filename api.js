import { createClient } from 'contentful'

const SPACE_ID = 'hz8shqd8njrb'
const ACCESS_TOKEN = 'iFdc0FqW5DDf-LYA6e-oLiiMoucIQdcRIqC_dKHbdQE'



export default class API {

    constructor() {
        this.client = createClient({
            space: SPACE_ID,
            accessToken: ACCESS_TOKEN,
        })
    }

    get(params) {
        return this.client.getEntries(params).then(response => response)
    }

    getOne(params) {
        return this.client.getEntry(params).then(response => response)
    }
}