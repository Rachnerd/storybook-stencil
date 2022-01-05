export default {
  title: 'Demo/MyComponent',
  component: 'my-component',
};

const Template = args => <my-component {...args}></my-component>;

export const Primary = Template.bind({});
