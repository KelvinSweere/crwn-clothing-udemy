import {shallow} from 'enzyme';

import Button from './button.component';
import { BUTTON_TYPE_CLASSES } from './button.component';
import { LoadingSpinner, InvertedButton, GoogleSignInButton } from './button.styles';

describe('<Button />', () => {
	let children = {};
	let buttonType = BUTTON_TYPE_CLASSES.base;
	let isLoading = false;

	it('Get button type', () => {
		buttonType = BUTTON_TYPE_CLASSES.google;
		const wrapper = shallow(<Button children={children} buttonType={buttonType} isLoading={isLoading}/>);
		
		const result = wrapper.getElement('CustomButton');
		expect(result.type).toEqual(GoogleSignInButton);
		expect(result.type).not.toEqual(InvertedButton);
  });

	it('loading spinner is true', () => {
		isLoading = true;
		const wrapper = shallow(<Button children={children} buttonType={buttonType} isLoading={isLoading}/>);
		
		expect(wrapper.containsMatchingElement(<LoadingSpinner />)).toEqual(true);
		expect(wrapper.containsMatchingElement(children)).toEqual(false);
	});
});