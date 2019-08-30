import React from 'react';
import { shallow , mount} from 'enzyme';
import RegisterButton from './components/RegisterButton';
import RegistrationPage from './components/RegistrationPage';
import Form from 'react-bootstrap/Form';

const app = shallow(<RegisterButton/>);
const wrapper = mount(<RegistrationPage/>);

const data = {
  users : {
    firstName: "Riya",
    lastName: "Kapoor",
    emailID: "riyacool@gmail.com",
    phoneNo: "9505199106",
 
    passwordHistory:{
        pwd1:"Riya@123"
    },
    securityAns:{
        securityQueID1:1,
        securityQueID2:2,
        securityAnsID1:"CTC",
        securityAnsID2:"DDLJ"
    }
  }
}
const flushData = {
  users : {
    firstName: "",
    lastName: "",
    emailID: "",
    phoneNo: "",
 
    passwordHistory:{
        pwd1:""
    },
    securityAns:{
        securityQueID1:1,
        securityQueID2:2,
        securityAnsID1:"",
        securityAnsID2:""
    }
  },

}

it('renders correctly', () => {
    expect(app).toMatchSnapshot();
});


it('calls onSubmit prop function when form is submitted', () => {
    const validate = jest.fn();
    const wrapper1 = mount(<Form onSubmit={validate}/>);
    const form = wrapper1.find('form');
    form.simulate('submit');
    expect(validate).toHaveBeenCalledTimes(1);
    wrapper1.unmount();
  });

  
  describe('Checking the types of all the fields in form ',() => {
    it('FirstName',() => {
        const input =  wrapper.find('input[name="firstName"]');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
    })
    
    it('LastName',() => {
        const input =  wrapper.find('input[name="lastName"]');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
    })
    
    it('Email',() => {
        const input =  wrapper.find('input[name="emailID"]');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('email');
    })

    it('phoneNumber',() => {
      const input =  wrapper.find('input[name="phoneNo"]');
      expect(input).toHaveLength(1);
      expect(input.prop('type')).toEqual('number');
  })
    
    it('Password',() => {
        const input =  wrapper.find('input[name="pwd1"]');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('password');
    })
    
    it('Confirm password',() => {
        const input =  wrapper.find('input[name="confirmPassword"]');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('password');
    })

    it('security answer 1',() => {
      const input =  wrapper.find('input[name="securityAnsID1"]');
      expect(input).toHaveLength(1);
      expect(input.prop('type')).toEqual('text');
  })

  it('security answer 2',() => {
    const input =  wrapper.find('input[name="securityAnsID2"]');
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual('text');
})

  });

describe('Checking if the values are assigned properly to users',() => {

    afterAll(() => {
        wrapper.setState({users:flushData.users});
    })
it('FirstName check',() => {
    expect(wrapper.state().users.firstName).toEqual('');
    const input = wrapper.find('input[name="firstName"]');
    input.simulate('change',{ target:{ name:'firstName',value:data.users.firstName }})
    expect(wrapper.state().users.firstName).toEqual(data.users.firstName);
})

it('LastName check',() => {
    expect(wrapper.state().users.lastName).toEqual('');
    const input = wrapper.find('input[name="lastName"]');
    input.simulate('change',{ target:{ name:'lastName',value:data.users.lastName }})
    expect(wrapper.state().users.lastName).toEqual(data.users.lastName);
})

it('Email check',() => {
    expect(wrapper.state().users.emailID).toEqual('');
    const input = wrapper.find('input[name="emailID"]');
    input.simulate('change',{ target:{ name:'emailID',value:data.users.emailID }})
    expect(wrapper.state().users.emailID).toEqual(data.users.emailID);
})

it('phoneNumber check',() => {
  expect(wrapper.state().users.phoneNo).toEqual('');
  const input = wrapper.find('input[name="phoneNo"]');
  input.simulate('change',{ target:{ name:'phoneNo',value:data.users.phoneNo }})
  expect(wrapper.state().users.phoneNo).toEqual(data.users.phoneNo);
})

it('Password check',() => {
    expect(wrapper.state().users.passwordHistory.pwd1).toEqual('');
    const input = wrapper.find('input[name="pwd1"]');
    input.simulate('change',{ target:{ name:'pwd1',value:data.users.passwordHistory.pwd1 }})
    expect(wrapper.state().users.passwordHistory.pwd1).toEqual(data.users.passwordHistory.pwd1);
})

it('Security Answer 1 check',() => {
  expect(wrapper.state().users.securityAns.securityAnsID1).toEqual('');
  const input = wrapper.find('input[name="securityAnsID1"]');
  input.simulate('change',{ target:{ name:'securityAnsID1',value:data.users.securityAns.securityAnsID1 }})
  expect(wrapper.state().users.securityAns.securityAnsID1).toEqual(data.users.securityAns.securityAnsID1);
})

it('Security Answer 2 check',() => {
  expect(wrapper.state().users.securityAns.securityAnsID2).toEqual('');
  const input = wrapper.find('input[name="securityAnsID2"]');
  input.simulate('change',{ target:{ name:'securityAnsID2',value:data.users.securityAns.securityAnsID2 }})
  expect(wrapper.state().users.securityAns.securityAnsID2).toEqual(data.users.securityAns.securityAnsID2);
})

});
