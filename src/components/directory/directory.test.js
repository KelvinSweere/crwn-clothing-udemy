import React from 'react';
import { shallow } from 'enzyme';
import Directory from './directory.component';
import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.styles';

describe('Directory component', () => {
  let wrapper;


  beforeEach(() => {
    wrapper = shallow(<Directory />);
  });

  it('should render the DirectoryContainer', () => {
    expect(wrapper.find(DirectoryContainer)).toHaveLength(1);
  });

  it('should render the same number of DirectoryItem components as the length of the categories array', () => {
    expect(wrapper.find(DirectoryItem)).toHaveLength(5);
  });

  it('should pass minimal the first and last props.', () => {
    const firstItemProps = wrapper.find(DirectoryItem).first().props();
    expect(firstItemProps.category).toEqual({
      id: 1,
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      route: 'shop/hats',
    });
		const lastItemProps = wrapper.find(DirectoryItem).last().props();
		expect(lastItemProps.category).toEqual({
			id: 5,
			title: 'mens',
			imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
			route: 'shop/mens',
    });
  });
});
