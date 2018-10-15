import React from 'react'
import { expect } from 'chai'
import Scenario from '@examples/basics/UncontrolledFields'

describe('Uncontrolled fields', function() {
  before(() => {
    cy.loadStory(<Scenario getRef={(form) => (this.form = form)} />)
  })

  afterEach(() => {
    this.form.reset()
    cy.wait(50)
  })

  it('Mounts with proper initial state', () => {
    cy.get('#form').should(() => {
      const serialized = this.form.serialize()
      expect(serialized).to.deep.equal({
        inputTwo: 'foo',
        select: 'two',
        radio: 'potato',
        checkbox1: false,
        checkbox2: true,
        textareaTwo: 'something',
      })
    })
  })

  it('Updates form state on field change', () => {
    cy.get('#inputOne').type('first value')
    cy.get('#inputTwo')
      .clear()
      .typeIn('second value')
    cy.get('#radio3').markChecked()
    cy.get('#checkbox1').markChecked()
    cy.get('#checkbox2').markUnchecked()
    cy.get('#select').select('three')
    cy.get('#textareaOne')
      .clear()
      .typeIn('foo')
    cy.get('#textareaTwo')
      .clear()
      .typeIn('another')

    cy.then(() => {
      const serialized = this.form.serialize()
      expect(serialized).to.deep.equal({
        inputOne: 'first value',
        inputTwo: 'second value',
        radio: 'cucumber',
        checkbox1: true,
        checkbox2: false,
        select: 'three',
        textareaOne: 'foo',
        textareaTwo: 'another',
      })
    })
  })
})