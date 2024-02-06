import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeComponent from '../homeComponent/HomeComponent.vue';
import PersonalPageComponent from './PersonalPageComponent.vue';
import NavBarComponent from '../navbarComponent/NavBarComponent.vue';

import { createRouter, createWebHistory } from 'vue-router';

// Define a simple set of routes for testing purposes
const routes = [
    { path: '/', name: 'home', component: HomeComponent },
    { path:"/PersonalPage", name:"PersonalPageComponent", component: PersonalPageComponent},
    { path: "/home", name: "home", component: HomeComponent}
  ];

// Create the router instance for testing
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('PersonalPageComponent Navigation', () => {

    beforeEach(async () => {
        router.push('/'); // Reset the router to the initial route before each test
        await router.isReady(); // Wait for the router to be ready
    });

    it('navigates to HomeComponent when navigateTo is called', async () => {
        const wrapper = mount(PersonalPageComponent, {
        global: {
            plugins: [router]
        }
        });
        await wrapper.find('#routeToHomeComponent').trigger('click');
        await flushPromises(); // Wait for all pending promises to resolve
        expect(router.currentRoute.value.name).toBe("home");
        
        wrapper.unmount();
    });

});

describe('NavBarComponent Rendering', () => {

    it('renders the component', () => {
        const wrapper = mount(NavBarComponent);
        expect(wrapper.html()).toContain('v-app-bar');
        wrapper.unmount();
    });
});
