import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeView from '@/views/homeView/HomeView.vue';
import PersonalPageView from './PersonalPageView.vue';
import NavBarComponent from '@/components/navbarComponent/NavBarComponent.vue';

import { createRouter, createWebHistory } from 'vue-router';

// Define a simple set of routes for testing purposes
const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path:"/PersonalPage", name:"PersonalPageView", component: PersonalPageView},
    { path: "/home", name: "home", component: HomeView}
  ];

// Create the router instance for testing
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('PersonalPageView Navigation', () => {

    beforeEach(async () => {
        router.push('/'); // Reset the router to the initial route before each test
        await router.isReady(); // Wait for the router to be ready
    });

    it('navigates to homeView when navigateTo is called', async () => {
        const wrapper = mount(PersonalPageView, {
        global: {
            plugins: [router]
        }
        });
        await wrapper.find('#routeTohomeView').trigger('click');
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
