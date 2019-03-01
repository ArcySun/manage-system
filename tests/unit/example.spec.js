import {shallowMount} from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = {
            tagsList: [],
            collapse: false,
        }
        const wrapper = shallowMount(Home, {
            data: {msg}
        })
        expect(wrapper.text()).toMatch(msg)
    })
})
