import Register from "@/components/Register"
import {shallowMount, createLocalVue} from "@vue/test-utils";
import flushPromises from "flush-promises";
import routes from "@/router/routes"
import VueRouter from "vue-router";

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Register', () => {
    let mountComponent = options => shallowMount(Register, {...options})
    let component
    let $router
    beforeEach(() => {
        $router = new VueRouter({routes, mode: 'history'})
        component = mountComponent({
            localVue,
            $router
        })
    })

    it('confirms that component mounts and exists', function () {
        expect(component.exists()).toBeTruthy()
    });

    it('should confirm that the name field is not less than three', function () {
        component.vm.$set(component.vm, 'name', 'Segun')
        expect(component.vm.name.length).toBeGreaterThan(2)
    });

    it('should confirm that user role options click triggers a selection', async function () {
        const radioElement = component.find("input[value='Student']")
        expect(radioElement.exists()).toBeTruthy()
        await radioElement.trigger('click')
        await flushPromises()
        expect(component.vm.userType).toMatch('Student')
    });

    it('should confirm that register button triggers register', async function () {
        jest.spyOn(component.vm, 'registerUser')
        const button = component.find("#register-btn")
        expect(button.exists()).toBe(true)
        const form = component.find('form')
        await form.trigger('submit')
        await flushPromises()
        expect(component.vm.registerUser).toHaveBeenCalled()
    });

    it('should confirm that user is routed to login if registration is successful', function () {
        console.log($router, $router.path)
        $router.push('/')

    });
})