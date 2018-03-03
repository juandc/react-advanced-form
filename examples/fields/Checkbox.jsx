import React from 'react';
import PropTypes from 'prop-types';
import { createField, fieldPresets } from '../../lib';

class Checkbox extends React.Component {
  static propTypes = {
    /* General */
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,

    /* Inherited */
    fieldProps: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired
  }

  render() {
    const { fieldProps, fieldState, id, name, className, label } = this.props;
    const { valid, invalid, errors } = fieldState;

    const inputClassNames = [
      'custom-control-input',
      valid && 'is-valid',
      invalid && 'is-invalid',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input id={ id || name } className={ inputClassNames } { ...fieldProps } />
          <label className="custom-control-label" htmlFor={ id || name }>{ label }</label>

          { errors && errors.map((error, index) => (
            <div key={ index } className="invalid-feedback">{ error }</div>
          )) }
        </div>
      </div>
    );
  }
}

export default createField(fieldPresets.checkbox)(Checkbox);