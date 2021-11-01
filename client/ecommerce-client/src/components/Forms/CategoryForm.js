const CategoryForm = ({ handleCategory, name, setName, loading }) => {
    return (
      <form onSubmit={handleCategory}>
          <label>Name</label>
          <input type="text" className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus required
          /> <br />
        {loading ? <h4>loading...</h4> : <button className="btn btn-outline-primary">Save</button>}
      </form>
    )
}

export default CategoryForm
