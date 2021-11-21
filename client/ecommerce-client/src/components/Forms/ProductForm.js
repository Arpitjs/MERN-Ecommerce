import { Select } from 'antd'
let { Option } = Select

const ProductForm = ({ handleSubmit, values, handleChange, subsActive, setValues, subOptions,
  loading, handleCategoryChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={values.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Categories</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Please select</option>
          {values.categories.length &&
            values.categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {subsActive && <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please Select"
          value={values.subs}
          onChange={val => setValues({ ...values, subs: val })}
        >
          {subOptions.length && subOptions.map(option => (
            <Option key={option.__id} value={option._id}>{option.name}
            </Option>
          ))}
        </Select>
      </div>}
      <br />
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={values.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={values.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {values.colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {values.brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {loading ? <h3>loading...</h3> : <button className="btn btn-outline-info">Save</button>}
    </form>
  )
}

export default ProductForm
