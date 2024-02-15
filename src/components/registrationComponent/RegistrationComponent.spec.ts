//make test 

import RegistrationComponent from "./RegistrationComponent.vue";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount ,mount, flushPromises } from '@vue/test-utils';

describe("RegistrationComponent", () => {
  it("should render the component", () => {
    const wrapper = mount(RegistrationComponent);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('RegistrationComponent', () => {
    it('should return an error message if the name is not selected', () => {
      const wrapper = shallowMount(RegistrationComponent);
      const rules = wrapper.vm.rules;
      const errorMessage = rules[0]('');
  
      expect(errorMessage).toBe('Selecteer Uw Naam');
    });
  
    it('should return true if the name is selected', () => {
      const wrapper = shallowMount(RegistrationComponent);
      const rules = wrapper.vm.rules;
      const result = rules[0]('John Doe');
  
      expect(result).toBe(true);
    });
  });

describe('RegistrationComponent', () => {
it('should return the correct title', () => {
    const registeredPerson = {
    firstName: 'John',
    lastName: 'Doe'
    }

    const wrapper = shallowMount(RegistrationComponent)
    const result = wrapper.vm.registeredPersonsProps(registeredPerson)

    expect(result.title).toBe('John Doe')
})
})




