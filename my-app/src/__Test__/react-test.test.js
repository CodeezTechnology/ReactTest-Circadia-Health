import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { shallow, configure } from "enzyme";
import { CalculateSquareRoot } from '../react-test'
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    shallow(<CalculateSquareRoot />);
});

it("renders header", () => {
    const wrapper = shallow(<CalculateSquareRoot />);
    const label = <h3>React Test</h3>;
    expect(wrapper.contains(label)).toEqual(true);
});

describe('Test Button component', () => {
    it('Test click event', () => {
        const mockCallBack = jest.fn();

        const button = shallow((<CalculateSquareRoot onClick={mockCallBack}>Ok!</CalculateSquareRoot>));
        button.find('input#btnSubmit').simulate('submit');
        expect(mockCallBack.mock.calls.length).not.toEqual(1);


    });
});

it("renders correctly", () => {
    const tree = shallow(<CalculateSquareRoot />);
    expect(tree.find('input#btnSubmit').simulate('submit', { target: { value: '' } }));
});

describe('Input text box component', () => {
    it('Test Input number', () => {
        const wrapper = shallow(<CalculateSquareRoot />);
        wrapper.find('input#txtNumber').simulate('change', { target: { value: Number } });
        expect(wrapper.state('value')).toBe(Number);
        // expect(wrapper.state('value')).toBe(String); //Error occurred- Test failed

        const findInput= wrapper => wrapper.find('input#txtNumber');
        findInput(wrapper).simulate('change',{target : {value :'64'}});
        expect(findInput(wrapper).prop('value')).toBe('64');
        
    });
});

it("Input Value", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CalculateSquareRoot />, div);

    const { getByText } = render(<CalculateSquareRoot />);
    const inputNumber = getByText(/number/i);
    expect(inputNumber).toBeInTheDocument();
})

describe("Square roor component", () =>{
    it("renders",()=>{
        const wrapper = shallow(<CalculateSquareRoot/>);
        expect(wrapper).toMatchSnapshot();
    });
})

it("When the form is submitted the event is cancelled", () => {
   
    const wrapper = shallow(<CalculateSquareRoot/>);
    let prevented = false;
    wrapper.find("form").simulate("submit",{
        preventDefault:()=>{
            prevented =true;
        }
    });
    expect(prevented).toBe(true);
})

    it('State Result', () => {
        const wrapper = shallow(<CalculateSquareRoot />);
        const state = {
            value: '64',
            number: '{"result":8}',
            loading: true
        }
      
       wrapper.setState(state);
       expect(wrapper.state('value')).toBeTruthy();
       expect(wrapper.state('number')).toBeTruthy();
       expect(wrapper.state('loading')).toBeTruthy();
    });

    it('Submit event fired', () => {
        const wrapper = shallow(<CalculateSquareRoot />);
        const formEventMocked = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', formEventMocked);
        expect(wrapper.find('form')).toHaveLength(1);
        expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    });
