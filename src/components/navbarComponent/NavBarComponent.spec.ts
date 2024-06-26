import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NavBarComponent from './NavBarComponent.vue';


describe('NavBarComponent Content', () => {
    it('Renders the Users Name', () => {
        const wrapper = mount(NavBarComponent,
            {
                global: {
                    mocks: {
                        $store: {
                            state: {
                                activeUser: {
                                    firstName: "Olivier",
                                    lastName: "Van Ransbeeck"
                                }
                            }
                        }
                    }
                }              
            });
        expect(wrapper.html()).toContain("Welkom Olivier Van Ransbeeck")
        wrapper.unmount();
    });
});