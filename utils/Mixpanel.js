import mixpanel from 'mixpanel-browser'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)



// let env_check = process.env.NEXT_PUBLIC_NODE_ENV === 'production'
// if (env_check) mixpanel.track(name, props)

const Mixpanel = {
    event: (name, props) => {
        mixpanel.track(name, props)
    }
}

export default Mixpanel