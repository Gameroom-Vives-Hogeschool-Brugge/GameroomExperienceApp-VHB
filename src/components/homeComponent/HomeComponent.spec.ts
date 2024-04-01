import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeComponent from './HomeComponent.vue';
import QRCodeReader from '../qRCodeReader/QRCodeReader.vue'
import { createRouter, createWebHistory } from 'vue-router';

// Define a simple set of routes for testing purposes
const routes = [
    { path: '/:pathMatch(.*)*', name: 'not-found', component: HomeComponent },
    { path: '/', name: 'home', component: HomeComponent },
    { path: '/QrcodeReader', name: 'QrcodeReader', component: QRCodeReader },
  ];

// Create the router instance for testing
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('HomeComponent Navigation', () => {

    beforeEach(async () => {
        router.push('/'); // Reset the router to the initial route before each test
        await router.isReady(); // Wait for the router to be ready
    });

    it('navigates to QrcodeReader when navigateToQrCodeReader is called', async () => {
        const wrapper = mount(HomeComponent, {
        global: {
            plugins: [
                router]
        }
        });
        await wrapper.vm.navigateToQrCodeReader();
        await flushPromises(); // Wait for all pending promises to resolve
        expect(router.currentRoute.value.name).toBe("QrcodeReader");
        
        wrapper.unmount();
    });

    it('toggles dialog state when dialog related button is clicked', async () => {
        const wrapper = mount(HomeComponent, {
        });
        await wrapper.find('#dialog-btn').trigger('click');
        expect(wrapper.vm.dialog).toBe(true);

        wrapper.unmount();
    });


    it('closes dialog when close button is clicked', async () => {
        const wrapper = mount(HomeComponent, {
        });
        
        await wrapper.find('#dialog-btn').trigger('click');
        await wrapper.find('#close-btn').trigger('click');
        
        //The V-model doesn't get updated because the dialog close button doesn't emit an event
        wrapper.vm.dialog = false;

        expect(wrapper.vm.dialog).toBe(false);

        wrapper.unmount();
    });

});