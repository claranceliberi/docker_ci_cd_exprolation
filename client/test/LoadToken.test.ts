import { assert, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadToken from '../src/components/LoadToken.vue'


describe('Load token', () => {
    it('test LoadToken', () => {
    const wrapper = mount(LoadToken)
      // Test skipped, as tests are running in Only mode

      assert(wrapper.text()).toContain('Purchase')
    })
  
  })