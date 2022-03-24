import { assert, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BuyToken from '../src/components/BuyToken.vue'


describe('another suite', () => {
    it('test token', () => {
    const wrapper = mount(BuyToken)
      // Test skipped, as tests are running in Only mode

      assert(wrapper.text()).toContain('Purchase')
    })
  
  })