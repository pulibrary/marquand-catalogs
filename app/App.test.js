import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.js';

let wrapper;
describe('App', () => {
  beforeEach(() => {
    wrapper = mount(App, {});
  });
  test('page title', () => {
    expect(wrapper.find('.page-title').text()).toBe(
      'Marquand Library of Art and Archaeology'
    );
  }),
    test('header title', () => {
      expect(wrapper.find('.header-title').text()).toBe(
        'Marquand Sales Catalogs'
      );
    });
  describe('Routing', () => {
    test('changing page title by url', () => {
      Object.defineProperty(window, 'location', {
        value: new URL(
          'https://library.princeton.edu/static_tables/faculty-and-professional-staff-index'
        )
      });
      wrapper = mount(App);
      expect(wrapper.find('.page-title').text()).toBe(
        'Faculty and Professional Staff Index, 1764-2006'
      );
    });
  });
});
