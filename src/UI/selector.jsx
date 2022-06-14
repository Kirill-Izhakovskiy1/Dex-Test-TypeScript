import Select from 'react-select'

function Selector ({label,  onInput, value, multiple, options}) {
  // const onChange = (a,b) => {
  //   console.log(a)
  // }
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]
 return <div className="SELECT">
   {/* <p className="selectLabel"> {label}  </p>
   <select className="select2" value={value} onInput={onInput} multiple={multiple} >
   {options.map((option) => { 
       return <option value={option.value || option}>{option.name || option}</option>
     })} */}
     {/* [{name: "stenly", value: 2546}] */}
    {/* </select> */}
      <Select options={options} onChange={onInput} isMulti={multiple} value={value}/>  
    </div>
}

Selector.defaultProps = {
  label: '',
  options: [],
  multiple: false
}


export default Selector