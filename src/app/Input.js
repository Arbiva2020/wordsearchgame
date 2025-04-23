import React from 'react'
import "./Input.css"
import { inputs } from './inputData.js'

function Input({value, onChange, refs, onKeyDown, style, name, key }) {

  return (
    <div className='page_inputContainer'>
        {inputs.map((item, index)=> {
          const isDisabled = index === 0 ? false : !value[inputs[index - 1].name]; 

          return (
            <input
                style={style}
                key={index}
                className='page_input'
                name={item.name}
                value={value[item.name] || ''}
                maxLength={item.maxLength}
                minLength={item.minLength}
                // disabled={isDisabled}
                onChange={(e) => {
                  const { name, value: inputValue } = e.target;
                  onChange(e); 
                  if (inputValue.length === item.maxLength) {
                    const nextInputRef = refs[inputs[index + 1]?.name];
                    if (nextInputRef) {
                      nextInputRef.current.focus(); 
                    }
                  }
                  if (inputValue.length === 0) {
                    const prevInputRef = refs[inputs[index - 1]?.name];
                    if (prevInputRef) {
                      prevInputRef.current.focus(); 
                    }
                  }
                }}
                ref={refs[item.name]} 
                onKeyDown={onKeyDown}          
            />)
        })}
    </div>
  )
}

export default Input



