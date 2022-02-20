import { Select } from "antd";
let { Option } = Select;

const ProductForm = ({
  edit,
  handleSubmit,
  values,
  handleChange,
  subsActive,
  setValues,
  subOptions,
  loading,
  handleCategoryChange,
  categories,
  subsIds,
  setSubsIds
}) => {
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
          value={values.category}
        >
        { !edit && <option>
          Please select a category!
          </option>}

          {edit &&
            categories.length &&
            categories
            .map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}

          {!edit &&
            values.categories.length &&
            values.categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {!edit && subsActive && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select"
            value={values.subs}
            onChange={(val) => setValues({ ...values, subs: val })}
          >
            {subOptions.length &&
              subOptions.map((option) => (
                <Option key={option.__id} value={option._id}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      { edit && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select"
            value={subsIds}
            onChange={(val) => setSubsIds(val)}
          >
            {subOptions.length &&
              subOptions.map((option) => (
                <Option key={option._id} value={option._id}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

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
          value={
            edit ? (values.shipping === "Yes" ? "Yes" : "No") : "Please Select"
          }
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
        <select name="color" className="form-control" onChange={handleChange}>
          {edit ? (
            <option>{values.color}</option>
          ) : (
            <option>Please select</option>
          )}
          {values.colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          {edit ? (
            <option>{values.brand}</option>
          ) : (
            <option>Please select</option>
          )}
          {values.brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <h3>loading...</h3>
      ) : (
        <button className="btn btn-outline-info">Save</button>
      )}
    </form>
  );
};

export default ProductForm;
