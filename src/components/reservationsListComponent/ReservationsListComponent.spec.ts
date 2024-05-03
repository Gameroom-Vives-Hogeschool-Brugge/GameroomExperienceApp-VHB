import { mount, flushPromises } from '@vue/test-utils'
import MyReservationView from '../../views/myReservationsView/MyReservationsView.vue'
import PersonalPageView from '../../views/personalPageView/PersonalPageView.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/MyReservations', name: 'MyReservationsComponent', component: MyReservationView },
    { path: '/PersonalPage', name: 'PersonalPageView', component: PersonalPageView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('MyReservationComponent Navigation', () => {

    beforeEach(async () => {
        router.push('/');
        await router.isReady();
    });

    it('navigates to PersonalPageView when backbutton is clicked', async () => {
        const wrapper = mount(MyReservationView, {
            global: {
                plugins: [router]
            }
        });

        await wrapper.find('#routeToPersonalPage').trigger('click');
        await flushPromises();
        expect(router.currentRoute.value.name).toBe("PersonalPageView");
        wrapper.unmount();
    });

});