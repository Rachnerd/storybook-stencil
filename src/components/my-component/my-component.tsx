import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';
import { format } from '../../utils/utils';

/**
 * This is the main description of the component.
 */
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * Event added to show SB Actions work
   */
  @Event() testEvent: EventEmitter<string>;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div onClick={() => this.testEvent.emit('Foo')}>Hello, World! I'm {this.getText()}</div>;
  }
}
